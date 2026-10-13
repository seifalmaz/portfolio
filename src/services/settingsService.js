import { supabase, isSupabaseConfigured } from '../lib/supabase';

const defaultSettings = {
  section_visibility: {
    hero: true,
    about: true,
    skills: true,
    projects: true,
    experience: true,
    certifications: true,
    education: true,
    contact: true
  },
  section_order: ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'education', 'contact'],
  show_resume_button: true,
  site_title: 'Seif Ahmed Almaz | Data Analytics & AI Engineer',
  site_description: 'Personal Portfolio & Case Studies for Data Analytics, Machine Learning, and Business Intelligence.',
  accent_color: '#3b82f6'
};

function fromDBRow(row) {
  if (!row) return defaultSettings;
  return {
    section_visibility: {
      ...defaultSettings.section_visibility,
      ...(row.section_visibility || {})
    },
    section_order: Array.isArray(row.section_order) && row.section_order.length > 0 
      ? row.section_order 
      : defaultSettings.section_order,
    show_resume_button: row.show_resume_button ?? true,
    site_title: row.site_title || defaultSettings.site_title,
    site_description: row.site_description || defaultSettings.site_description,
    accent_color: row.accent_color || defaultSettings.accent_color
  };
}

export const settingsService = {
  /**
   * Fetch portfolio settings
   */
  async getSettings() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('portfolio_settings')
          .select('*')
          .eq('id', 'default')
          .single();

        if (!error && data) {
          return fromDBRow(data);
        }
      } catch (err) {
        console.warn('Error fetching settings from Supabase:', err);
      }
    }

    return defaultSettings;
  },

  /**
   * ADMIN: Update portfolio settings
   */
  async updateSettings(settings) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const row = {
      id: 'default',
      section_visibility: settings.section_visibility || defaultSettings.section_visibility,
      section_order: settings.section_order || defaultSettings.section_order,
      show_resume_button: settings.show_resume_button ?? true,
      site_title: settings.site_title || defaultSettings.site_title,
      site_description: settings.site_description || defaultSettings.site_description,
      accent_color: settings.accent_color || defaultSettings.accent_color,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('portfolio_settings')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return fromDBRow(data);
  }
};
