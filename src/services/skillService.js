import { skillsData } from '../data/skillsData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const skillService = {
  /**
   * Fetch all skills (flat list)
   */
  async getSkills() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('name', { ascending: true });

        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Error fetching skills from Supabase:', err);
      }
    }

    // Flatten static skillsData
    const flat = [];
    skillsData.forEach(cat => {
      const catSlug = cat.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      cat.skills.forEach(s => {
        const nameSlug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        flat.push({
          id: `${catSlug}_${nameSlug}`,
          name: s.name,
          category: cat.category,
          level: s.level || 'Advanced',
          icon: s.icon || '',
          years_of_experience: 1,
          featured: false
        });
      });
    });
    return flat;
  },

  /**
   * Fetch skills grouped by category (for public SkillsSection)
   */
  async getGroupedSkills() {
    const skills = await this.getSkills();
    const categories = await this.getCategories();

    // Map categories with their skills
    const grouped = categories.map(cat => {
      const catSkills = skills.filter(
        s => s.category?.toLowerCase() === cat.name?.toLowerCase()
      );
      return {
        category: cat.name,
        description: cat.description || '',
        skills: catSkills.map(s => ({
          name: s.name,
          level: s.level,
          icon: s.icon,
          years_of_experience: s.years_of_experience
        }))
      };
    }).filter(group => group.skills.length > 0);

    if (grouped.length > 0) return grouped;
    return skillsData;
  },

  /**
   * Fetch categories list
   */
  async getCategories() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('skill_categories')
          .select('*')
          .order('sort_order', { ascending: true });

        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Error fetching skill categories from Supabase:', err);
      }
    }

    return skillsData.map((s, idx) => ({
      id: s.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: s.category,
      description: s.description,
      sort_order: idx
    }));
  },

  /**
   * ADMIN: Create Skill
   */
  async createSkill(skill) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const catSlug = (skill.category || 'general').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const nameSlug = (skill.name || 'skill').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = skill.id || `${catSlug}_${nameSlug}`;
    const { data, error } = await supabase
      .from('skills')
      .upsert([{ ...skill, id }], { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * ADMIN: Update Skill
   */
  async updateSkill(id, skill) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const catSlug = (skill.category || 'general').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const nameSlug = (skill.name || 'skill').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const finalId = id || skill.id || `${catSlug}_${nameSlug}`;
    const { data, error } = await supabase
      .from('skills')
      .upsert({ ...skill, id: finalId }, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * ADMIN: Delete Skill
   */
  async deleteSkill(id) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  /**
   * ADMIN: Create Category
   */
  async createCategory(cat) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const id = cat.id || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { data, error } = await supabase
      .from('skill_categories')
      .upsert([{ ...cat, id }], { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * ADMIN: Update Category
   */
  async updateCategory(id, cat) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const finalId = id || cat.id || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { data, error } = await supabase
      .from('skill_categories')
      .upsert({ ...cat, id: finalId }, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * ADMIN: Delete Category
   */
  async deleteCategory(id) {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const { error } = await supabase
      .from('skill_categories')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  /**
   * ADMIN: Reorder Skills
   */
  async reorderSkills(orderedIds) {
    if (!isSupabaseConfigured || !supabase) return;
    const updates = orderedIds.map((id, index) => 
      supabase.from('skills').update({ sort_order: index }).eq('id', id)
    );
    await Promise.all(updates);
  }
};
