import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const defaultEducation = [
  {
    id: 'hnu-data-science',
    institution: 'Helwan National University',
    degree: 'Bachelor of Science',
    field_of_study: 'Data Science Major',
    period: '2023 – 2027',
    is_current: true,
    gpa: '3.27 / 4.0',
    description: 'Specialized in machine learning algorithms, database architectures, and statistical inference.',
    achievements: [
      'Competitive Programming Mentor for ICPC Club',
      'Excellence in Advanced Mathematics and Algorithmic Design'
    ],
    logo_url: null,
    sort_order: 0
  }
];

function fromDBRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    institution: row.institution,
    degree: row.degree,
    field_of_study: row.field_of_study || '',
    period: row.period || '',
    start_date: row.start_date || '',
    end_date: row.end_date || '',
    is_current: Boolean(row.is_current),
    gpa: row.gpa || '',
    description: row.description || '',
    achievements: Array.isArray(row.achievements) ? row.achievements : [],
    logo_url: row.logo_url || null,
    sort_order: row.sort_order ?? 0
  };
}

function toDBRow(edu) {
  return {
    id: edu.id || `edu-${Date.now()}`,
    institution: edu.institution,
    degree: edu.degree,
    field_of_study: edu.field_of_study || '',
    period: edu.period || '',
    start_date: edu.start_date || '',
    end_date: edu.end_date || '',
    is_current: Boolean(edu.is_current),
    gpa: edu.gpa || '',
    description: edu.description || '',
    achievements: edu.achievements || [],
    logo_url: edu.logo_url || null,
    sort_order: Number(edu.sort_order) || 0,
    updated_at: new Date().toISOString()
  };
}

export const educationService = {
  /**
   * Fetch all education records
   */
  async getEducation() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map(fromDBRow);
        }
      } catch (err) {
        console.warn('Error fetching education from Supabase:', err);
      }
    }

    return [...defaultEducation];
  },

  /**
   * ADMIN: Create education entry
   */
  async createEducation(edu) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const row = toDBRow(edu);
    const { data, error } = await supabase
      .from('education')
      .upsert([row], { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return fromDBRow(data);
  },

  /**
   * ADMIN: Update education entry
   */
  async updateEducation(id, edu) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const row = toDBRow(edu);
    row.id = id || row.id;
    const { data, error } = await supabase
      .from('education')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return fromDBRow(data);
  },

  /**
   * ADMIN: Delete education entry
   */
  async deleteEducation(id) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  /**
   * ADMIN: Reorder education entries
   */
  async reorderEducation(orderedIds) {
    if (!isSupabaseConfigured || !supabase) return;
    const updates = orderedIds.map((id, index) => 
      supabase.from('education').update({ sort_order: index }).eq('id', id)
    );
    await Promise.all(updates);
  }
};
