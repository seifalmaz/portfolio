import { experienceData } from '../data/experienceData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

function fromDBRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    role: row.role,
    organization: row.organization,
    type: row.type || 'Professional Program',
    period: row.period,
    location: row.location || '',
    description: row.description || '',
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    logo: row.logo_url || null,
    logo_url: row.logo_url || null,
    is_current: Boolean(row.is_current),
    sort_order: row.sort_order ?? 0,
    certificate: row.certificate_title ? {
      title: row.certificate_title,
      issuer: row.certificate_issuer || '',
      image: row.certificate_image || null
    } : null
  };
}

function toDBRow(exp) {
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
    logo_url: exp.logo_url || exp.logo || null,
    certificate_title: exp.certificate?.title || exp.certificate_title || null,
    certificate_issuer: exp.certificate?.issuer || exp.certificate_issuer || null,
    certificate_image: exp.certificate?.image || exp.certificate_image || null,
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
