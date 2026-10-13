import { certificationsData } from '../data/certificationsData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { storageService } from './storageService';
import { isPdfUrl } from '../utils/fileUtils';

const DELETED_CERTS_KEY = 'portfolio_deleted_cert_ids';
const CERTS_INIT_KEY = 'portfolio_certs_initialized';

/**
 * Returns set of certificate IDs that were explicitly deleted by the user.
 */
function getDeletedCertIds() {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_CERTS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

/**
 * Persists a deleted certificate ID in localStorage tombstone.
 */
function markCertAsDeleted(id) {
  if (!id || typeof window === 'undefined') return;
  try {
    const ids = getDeletedCertIds();
    ids.add(id);
    localStorage.setItem(DELETED_CERTS_KEY, JSON.stringify(Array.from(ids)));
  } catch (err) {
    console.warn('Failed to save deleted cert ID:', err);
  }
}

/**
 * Removes a certificate ID from deleted tombstones (e.g. if re-created).
 */
function unmarkCertAsDeleted(id) {
  if (!id || typeof window === 'undefined') return;
  try {
    const ids = getDeletedCertIds();
    ids.delete(id);
    localStorage.setItem(DELETED_CERTS_KEY, JSON.stringify(Array.from(ids)));
  } catch (err) {
    console.warn('Failed to unmark deleted cert ID:', err);
  }
}

/**
 * Normalizes a database row into the format expected by the frontend.
 * Database values strictly take precedence over local static seed data.
 */
export function fromDBRow(row) {
  if (!row) return null;
  const local = certificationsData.find(c => c.id === row.id || c.title === row.title);
  // Guard against unbundled dev paths (e.g. '/src/assets/...') which fail in production builds
  const isInvalidPath = (url) => typeof url === 'string' && (url.startsWith('/src/') || url.includes('localhost'));

  // Prioritize DB image_url (such as uploaded PDFs or cloud images) over local static seed,
  // unless it is an unresolvable dev source path in production
  const certImage = (row.image_url && !isInvalidPath(row.image_url)) 
    ? row.image_url 
    : (local?.image || local?.imageUrl || row.image_url || null);

  const isPdf = isPdfUrl(certImage);

  const thumbImage = (row.thumbnail_url && !isInvalidPath(row.thumbnail_url))
    ? row.thumbnail_url
    : (local?.thumbnailUrl || (!isPdf ? certImage : null));

  return {
    id: row.id,
    title: row.title || local?.title || '',
    issuer: row.issuer || local?.issuer || '',
    date: row.issue_date || row.date || local?.date || '',
    issueDate: row.issue_date || local?.issueDate || local?.date || '',
    expiryDate: row.expiry_date || local?.expiryDate || '',
    credentialId: row.credential_id || local?.credentialId || '',
    verifyUrl: row.verify_url && row.verify_url !== '#' ? row.verify_url : (local?.verifyUrl || null),
    image: certImage,
    imageUrl: certImage,
    thumbnailUrl: thumbImage,
    skills: (Array.isArray(row.skills) && row.skills.length > 0) ? row.skills : (local?.skills || []),
    category: row.category || local?.category || 'Specialized',
    featured: Boolean(row.featured ?? local?.featured),
    sort_order: row.sort_order ?? local?.sort_order ?? 0
  };
}

/**
 * Normalizes a certificate object into a database row for Supabase.
 */
export function toDBRow(cert) {
  const imageVal = cert.imageUrl || cert.image;
  return {
    id: cert.id || `cert-${Date.now()}`,
    title: cert.title,
    issuer: cert.issuer,
    issue_date: cert.date || cert.issueDate || cert.issue_date || '',
    expiry_date: cert.expiryDate || cert.expiry_date || null,
    credential_id: cert.credentialId || cert.credential_id || null,
    verify_url: cert.verifyUrl || cert.verify_url || null,
    image_url: typeof imageVal === 'string' ? imageVal : null,
    thumbnail_url: typeof cert.thumbnailUrl === 'string' ? cert.thumbnailUrl : null,
    skills: Array.isArray(cert.skills) ? cert.skills : [],
    category: cert.category || 'Specialized',
    featured: Boolean(cert.featured),
    sort_order: Number(cert.sort_order) || 0,
    updated_at: new Date().toISOString()
  };
}

export const certificationService = {
  getDeletedIds: getDeletedCertIds,

  /**
   * Fetch all certifications.
   * Supabase database is authoritative; never resurrects deleted records.
   */
  async getCertifications() {
    const deletedIds = getDeletedCertIds();

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data)) {
          if (data.length > 0) {
            if (typeof window !== 'undefined') {
              localStorage.setItem(CERTS_INIT_KEY, 'true');
            }
            // Return active database records excluding any explicitly deleted IDs
            return data.map(fromDBRow).filter(c => c && !deletedIds.has(c.id));
          } else {
            // Database table is empty. If it was already initialized or user deleted items, preserve empty state!
            const wasInitialized = typeof window !== 'undefined' && localStorage.getItem(CERTS_INIT_KEY);
            if (wasInitialized || deletedIds.size > 0) {
              return [];
            }
          }
        }
      } catch (err) {
        console.warn('Error fetching certifications from Supabase:', err);
      }
    }

    // Static fallback (only when uninitialized or offline), filtering out any deleted IDs
    return certificationsData.filter(c => !deletedIds.has(c.id));
  },

  /**
   * ADMIN: Create certification
   */
  async createCertification(cert) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const row = toDBRow(cert);
    unmarkCertAsDeleted(row.id);

    let { data, error } = await supabase
      .from('certifications')
      .upsert([row], { onConflict: 'id' })
      .select()
      .single();

    let retryCount = 0;
    while (error && error.message && error.message.includes('in the schema cache') && retryCount < 5) {
      retryCount++;
      const match = error.message.match(/Could not find the '([^']+)' column/);
      const missingCol = match ? match[1] : null;
      if (!missingCol) break;

      console.warn(`Column '${missingCol}' missing in certifications table. Retrying...`);
      delete row[missingCol];

      const retry = await supabase
        .from('certifications')
        .upsert([row], { onConflict: 'id' })
        .select()
        .single();

      error = retry.error;
      data = retry.data;
    }

    if (error) throw error;

    if (typeof window !== 'undefined') {
      localStorage.setItem(CERTS_INIT_KEY, 'true');
    }
    return fromDBRow(data);
  },

  /**
   * ADMIN: Update certification
   */
  async updateCertification(id, cert) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const row = toDBRow(cert);
    row.id = id || row.id;
    unmarkCertAsDeleted(row.id);

    let { data, error } = await supabase
      .from('certifications')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    let retryCount = 0;
    while (error && error.message && error.message.includes('in the schema cache') && retryCount < 5) {
      retryCount++;
      const match = error.message.match(/Could not find the '([^']+)' column/);
      const missingCol = match ? match[1] : null;
      if (!missingCol) break;

      console.warn(`Column '${missingCol}' missing in certifications table. Retrying...`);
      delete row[missingCol];

      const retry = await supabase
        .from('certifications')
        .upsert(row, { onConflict: 'id' })
        .select()
        .single();

      error = retry.error;
      data = retry.data;
    }

    if (error) throw error;

    return fromDBRow(data);
  },

  /**
   * ADMIN: Delete certification with database verification and Storage cleanup
   */
  async deleteCertification(id) {
    if (!id) throw new Error('No certificate ID provided for deletion.');

    // 1. Capture associated image_url for potential storage cleanup prior to DB deletion
    let fileToDelete = null;
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: certRow } = await supabase
          .from('certifications')
          .select('id, image_url')
          .eq('id', id)
          .maybeSingle();
        if (certRow?.image_url) {
          fileToDelete = certRow.image_url;
        }
      } catch (err) {
        console.warn('Could not inspect certificate prior to deletion:', err);
      }
    }

    // 2. Perform DB deletion and verify
    let dbSuccess;
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Database deletion failed: ${error.message}`);
      }
      dbSuccess = true;
    } else {
      dbSuccess = true;
    }

    // 3. Mark as deleted in tombstone storage so it is NEVER resurrected by static fallbacks
    markCertAsDeleted(id);

    // 4. Safe Storage cleanup if associated with a Supabase Storage asset
    let storageResult = { attempted: false, success: true };
    if (fileToDelete && isSupabaseConfigured && supabase) {
      try {
        // Check if any OTHER certificate record shares the same file
        const { data: sharingCerts } = await supabase
          .from('certifications')
          .select('id')
          .eq('image_url', fileToDelete)
          .neq('id', id);

        if (!sharingCerts || sharingCerts.length === 0) {
          storageResult.attempted = true;
          const cleanRes = await storageService.deleteFile(fileToDelete);
          storageResult.success = cleanRes.success;
          storageResult.error = cleanRes.error;
        } else {
          storageResult.attempted = false;
          storageResult.skipped = true;
          storageResult.reason = 'File is referenced by other certificates';
        }
      } catch (storageErr) {
        storageResult.attempted = true;
        storageResult.success = false;
        storageResult.error = storageErr.message;
        console.warn('Storage cleanup warning:', storageErr);
      }
    }

    return {
      success: true,
      id,
      dbSuccess,
      storageResult
    };
  },

  /**
   * ADMIN: Reorder certifications
   */
  async reorderCertifications(orderedIds) {
    if (!isSupabaseConfigured || !supabase) return;
    const updates = orderedIds.map((id, index) => 
      supabase.from('certifications').update({ sort_order: index }).eq('id', id)
    );
    await Promise.all(updates);
  }
};
