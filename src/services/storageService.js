import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Storage service for uploading and managing images, documents, and media assets in Supabase Storage.
 */
export const storageService = {
  /**
   * Upload an asset file (image or PDF)
   * @param {File} file - Browser File object
   * @param {string} folder - Destination subfolder (e.g. 'certificates', 'thumbnails', 'resumes')
   * @param {string} bucketName - Supabase storage bucket name (default: 'portfolio-assets')
   * @returns {Promise<string>} Public URL of the uploaded file
   */
  async uploadFile(file, folder = 'uploads', bucketName = 'portfolio-assets') {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Check your .env credentials.');
    }

    if (!file) throw new Error('No file provided.');

    // Max 15MB file size limit
    const MAX_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is 15MB.`);
    }

    // Allowed extensions
    const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
    const allowed = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif', 'pdf'];
    if (!allowed.includes(fileExt)) {
      throw new Error(`File type .${fileExt} is not supported. Allowed: ${allowed.join(', ')}`);
    }

    // Set correct MIME type to prevent browser download prompts
    const contentType = file.type || (fileExt === 'pdf' ? 'application/pdf' : `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`);

    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${folder}/${Date.now()}_${cleanName}`;

    // Upload to primary bucket with fallback to 'project-images' if bucket not created
    let targetBucket = bucketName;
    let { error: uploadError } = await supabase.storage
      .from(targetBucket)
      .upload(fileName, file, { 
        upsert: true,
        contentType: contentType 
      });

    if (uploadError && targetBucket !== 'project-images') {
      // Fallback try project-images
      targetBucket = 'project-images';
      const retry = await supabase.storage
        .from(targetBucket)
        .upload(fileName, file, { 
          upsert: true,
          contentType: contentType 
        });
      uploadError = retry.error;
    }

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(targetBucket)
      .getPublicUrl(fileName);

    return publicUrl;
  },

  /**
   * Delete an asset file from Supabase Storage by public URL or relative path.
   * Safe against non-Supabase URLs and local assets.
   * @param {string} publicUrlOrPath - Full Supabase storage public URL or path inside bucket
   * @param {string} defaultBucket - Default bucket if unable to parse from URL (default: 'portfolio-assets')
   * @returns {Promise<{ success: boolean, skipped?: boolean, reason?: string, path?: string, error?: string }>}
   */
  async deleteFile(publicUrlOrPath, defaultBucket = 'portfolio-assets') {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Supabase is not configured' };
    }
    if (!publicUrlOrPath || typeof publicUrlOrPath !== 'string') {
      return { success: false, error: 'No URL or path provided' };
    }

    // If it's a local bundled asset (e.g. /assets/... or data:...), skip safely
    if (!publicUrlOrPath.includes('supabase.co') && !publicUrlOrPath.startsWith('http')) {
      return { success: true, skipped: true, reason: 'Local asset, not stored in Supabase' };
    }

    let bucket = defaultBucket;
    let filePath;

    // Parse Supabase public URL:
    // Format: .../storage/v1/object/public/<bucket>/<path-to-file>
    const storageMatch = publicUrlOrPath.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (storageMatch) {
      bucket = storageMatch[1];
      filePath = decodeURIComponent(storageMatch[2]);
    } else {
      filePath = publicUrlOrPath.replace(/^\/+/, '');
    }

    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        console.warn(`Storage delete failed for ${filePath} in ${bucket}:`, error);
        return { success: false, error: error.message, bucket, path: filePath };
      }

      return { success: true, data, bucket, path: filePath };
    } catch (err) {
      console.warn(`Storage delete exception for ${filePath}:`, err);
      return { success: false, error: err.message, bucket, path: filePath };
    }
  }
};
