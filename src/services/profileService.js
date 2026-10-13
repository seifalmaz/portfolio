import { personalData } from '../data/personalData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

function fromDBRow(row) {
  if (!row) return null;
  return {
    name: row.name || personalData.name,
    title: row.title || personalData.title,
    roles: Array.isArray(row.roles) ? row.roles : personalData.roles,
    tagline: row.tagline || personalData.tagline,
    location: row.location || personalData.location,
    university: row.university || personalData.university,
    degree: row.degree || personalData.degree,
    email: row.email || personalData.email,
    socials: row.socials && typeof row.socials === 'object' ? row.socials : personalData.socials,
    resumeUrl: row.resume_url || personalData.resumeUrl,
    resumeFilename: row.resume_filename || personalData.resumeFilename,
    profileImage: row.profile_image || null,
    bioHeadline: row.bio_headline || personalData.bioHeadline,
    bioParagraphs: Array.isArray(row.bio_paragraphs) ? row.bio_paragraphs : personalData.bioParagraphs,
    stats: Array.isArray(row.stats) ? row.stats : personalData.stats,
    availabilityStatus: row.availability_status || 'Open for Full-Time Roles, Internships & Projects',
    isAvailable: row.is_available ?? true
  };
}

function toDBRow(profile) {
  return {
    id: 'main',
    name: profile.name,
    title: profile.title,
    roles: profile.roles || [],
    tagline: profile.tagline || '',
    location: profile.location || '',
    university: profile.university || '',
    degree: profile.degree || '',
    email: profile.email || '',
    socials: profile.socials || {},
    resume_url: profile.resumeUrl || null,
    resume_filename: profile.resumeFilename || 'Seif_Almaz_CV.pdf',
    profile_image: profile.profileImage || null,
    bio_headline: profile.bioHeadline || '',
    bio_paragraphs: profile.bioParagraphs || [],
    stats: profile.stats || [],
    availability_status: profile.availabilityStatus || '',
    is_available: Boolean(profile.isAvailable),
    updated_at: new Date().toISOString()
  };
}

export const profileService = {
  /**
   * Fetch portfolio profile info
   */
  async getProfile() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('portfolio_profile')
          .select('*')
          .eq('id', 'main')
          .single();

        if (!error && data) {
          return fromDBRow(data);
        }
      } catch (err) {
        console.warn('Error fetching profile from Supabase:', err);
      }
    }

    return { ...personalData, availabilityStatus: 'Open for Full-Time Roles, Internships & Projects', isAvailable: true };
  },

  /**
   * ADMIN: Update profile info
   */
  async updateProfile(profile) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const row = toDBRow(profile);
    const { data, error } = await supabase
      .from('portfolio_profile')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return fromDBRow(data);
  }
};
