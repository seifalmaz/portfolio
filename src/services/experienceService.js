import { experienceData } from '../data/experienceData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

function isInvalidPath(url) {
  return typeof url === 'string' && (url.startsWith('/src/') || url.includes('localhost'));
}

export function fromDBRow(row) {
  if (!row) return null;
  const local = experienceData.find(e => e.id === row.id) ||
                experienceData.find(e => e.role === row.role && e.organization === row.organization) ||
                experienceData.find(e => e.organization === row.organization);

  const expLogo = (row.logo_url && !isInvalidPath(row.logo_url))
    ? row.logo_url
    : (local?.logo || local?.logo_url || null);

  const certImage = (row.certificate_image && !isInvalidPath(row.certificate_image))
    ? row.certificate_image
    : (local?.certificate?.image || null);

  return {
    id: row.id,
    role: row.role || local?.role || '',
    organization: row.organization || local?.organization || '',
    type: row.type || local?.type || 'Professional Program',
    period: row.period || local?.period || '',
    location: row.location || local?.location || '',
    description: row.description || local?.description || '',
    highlights: Array.isArray(row.highlights) && row.highlights.length > 0 ? row.highlights : (local?.highlights || []),
    technologies: Array.isArray(row.technologies) && row.technologies.length > 0 ? row.technologies : (local?.technologies || []),
    logo: expLogo,
    logo_url: expLogo,
    is_current: Boolean(row.is_current),
    sort_order: row.sort_order ?? (local?.sort_order ?? 0),
    certificate: (row.certificate_title || local?.certificate?.title) ? {
      title: row.certificate_title || local?.certificate?.title,
      issuer: row.certificate_issuer || local?.certificate?.issuer || '',
      image: certImage
    } : null
  };
}

export function toDBRow(exp) {
  const cleanLogo = isInvalidPath(exp.logo_url || exp.logo)
    ? null
    : (exp.logo_url || (typeof exp.logo === 'string' && !isInvalidPath(exp.logo) ? exp.logo : null));

  const cleanCert = isInvalidPath(exp.certificate?.image || exp.certificate_image)
    ? null
    : (exp.certificate?.image || exp.certificate_image || null);

  return {
    id: exp.id || `exp-${Date.now()}`,
    role: exp.role,
    organization: exp.organization,
    type: exp.type || 'Professional Program',
    period: exp.period,
    location: exp.location || '',
    description: exp.description || '',
    highlights: exp.highlights || [],
    technologies: exp.technologies || [],
    logo_url: cleanLogo,
    certificate_title: exp.certificate?.title || exp.certificate_title || null,
    certificate_issuer: exp.certificate?.issuer || exp.certificate_issuer || null,
    certificate_image: cleanCert,
    is_current: Boolean(exp.is_current),
    sort_order: Number(exp.sort_order) || 0,
    updated_at: new Date().toISOString()
  };
}

export const experienceService = {
  /**
   * Fetch all experiences
   */
  async getExperiences() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map(fromDBRow);
        }
      } catch (err) {
        console.warn('Error fetching experiences from Supabase:', err);
      }
    }

    return [...experienceData];
  },

  /**
   * ADMIN: Create experience
   */
  async createExperience(exp) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const row = toDBRow(exp);
    const { data, error } = await supabase
      .from('experiences')
      .upsert([row], { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return fromDBRow(data);
  },

  /**
   * ADMIN: Update experience
   */
  async updateExperience(id, exp) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const row = toDBRow(exp);
    row.id = id || row.id;
    const { data, error } = await supabase
      .from('experiences')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return fromDBRow(data);
  },

  /**
   * ADMIN: Delete experience
   */
  async deleteExperience(id) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  /**
   * ADMIN: Reorder experiences
   */
  async reorderExperiences(orderedIds) {
    if (!isSupabaseConfigured || !supabase) return;
    const updates = orderedIds.map((id, index) => 
      supabase.from('experiences').update({ sort_order: index }).eq('id', id)
    );
    await Promise.all(updates);
  }
};
