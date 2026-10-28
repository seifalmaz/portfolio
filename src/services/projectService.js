import { projectsData } from '../data/projectsData.js';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

/**
 * Normalizes a Supabase row into the format expected by the frontend
 */
export function fromDBRow(row) {
  if (!row) return null;

  const local = projectsData.find(p => p.id === row.id || p.slug === row.slug);

  // If the DB row is from the initial Oct 9 seed (before our verified project updates), use the verified local project
  const isStaleInitialSeed = row.updated_at && new Date(row.updated_at) <= new Date('2026-10-10T00:00:00Z');
  if (isStaleInitialSeed && local) {
    return { ...local };
  }

  // Prevent stale external Unsplash placeholder images, dev /src/ paths, or outdated /assets/ bundle hashes from overriding local verified assets
  const isInvalidAsset = (url) => typeof url === 'string' && (url.includes('unsplash.com') || url.startsWith('/src/') || url.startsWith('/assets/'));
  const validThumbnail = (row.thumbnail && !isInvalidAsset(row.thumbnail)) ? row.thumbnail : (local?.thumbnail || '');
  const validGallery = (row.gallery && row.gallery.length > 0 && !row.gallery.some(g => isInvalidAsset(typeof g === 'string' ? g : g?.url)))
    ? row.gallery
    : (local?.gallery || []);

  return {
    ...row,
    title: row.title || local?.title || '',
    subtitle: row.subtitle || local?.subtitle || '',
    category: row.category || local?.category || '',
    tagline: row.tagline || local?.tagline || '',
    thumbnail: validThumbnail,
    techStack: (row.tech_stack && row.tech_stack.length > 0) ? row.tech_stack : (local?.techStack || []),
    technologies: (row.tech_stack && row.tech_stack.length > 0) ? row.tech_stack : (local?.technologies || local?.techStack || []),
    businessProblem: row.business_problem || row.businessProblem || local?.businessProblem || '',
    datasetDescription: row.dataset_description || row.datasetDescription || local?.datasetDescription || '',
    architecture: row.architecture || local?.architecture || '',
    architectureImage: local?.architectureImage || row.architecture_image || null,
    methodology: row.methodology || local?.methodology || '',
    keyMetrics: (row.key_metrics && row.key_metrics.length > 0) ? row.key_metrics : (local?.keyMetrics || []),
    metricsDeepDive: (row.metrics_deep_dive && row.metrics_deep_dive.length > 0) ? row.metrics_deep_dive : (local?.metricsDeepDive || []),
    benchmarkTable: (row.benchmark_table && row.benchmark_table.length > 0) ? row.benchmark_table : (local?.benchmarkTable || []),
    codeSnippets: (row.code_snippets && row.code_snippets.length > 0) ? row.code_snippets : (local?.codeSnippets || []),
    keyFeatures: (row.key_features && row.key_features.length > 0) ? row.key_features : (local?.keyFeatures || []),
    challengesAndSolutions: (row.challenges_and_solutions && row.challenges_and_solutions.length > 0) ? row.challenges_and_solutions : (local?.challengesAndSolutions || []),
    businessInsights: (row.business_insights && row.business_insights.length > 0) ? row.business_insights : (local?.businessInsights || []),
    resultsAndImpact: (row.results_and_impact && row.results_and_impact.length > 0) ? row.results_and_impact : (local?.resultsAndImpact || []),
    lessonsLearned: (row.lessons_learned && row.lessons_learned.length > 0) ? row.lessons_learned : (local?.lessonsLearned || []),
    futureImprovements: (row.future_improvements && row.future_improvements.length > 0) ? row.future_improvements : (local?.futureImprovements || []),
    githubUrl: row.github_url || row.githubUrl || local?.githubUrl || null,
    liveDemoUrl: row.live_demo_url || row.liveDemoUrl || local?.liveDemoUrl || null,
    gallery: validGallery,
    objectives: (row.objectives && row.objectives.length > 0) ? row.objectives : (local?.objectives || []),
    pipeline: (row.pipeline && row.pipeline.length > 0) ? row.pipeline : (local?.pipeline || [])
  };
}

/**
 * Converts a camelCase project object into snake_case for Supabase
 */
export function toDBRow(p) {
  return {
    id: p.id || p.slug,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle || '',
    category: p.category,
    featured: Boolean(p.featured),
    timeline: p.timeline || '',
    role: p.role || '',
    team: p.team || '',
    thumbnail: p.thumbnail || '',
    tagline: p.tagline || '',
    business_problem: p.businessProblem || p.business_problem || '',
    objectives: p.objectives || [],
    tech_stack: p.techStack || p.tech_stack || p.technologies || [],
    architecture: p.architecture || '',
    pipeline: p.pipeline || [],
    dataset_description: p.datasetDescription || p.dataset_description || '',
    key_metrics: p.keyMetrics || p.key_metrics || [],
    metrics_deep_dive: p.metricsDeepDive || p.metrics_deep_dive || [],
    benchmark_table: p.benchmarkTable || p.benchmark_table || [],
    code_snippets: p.codeSnippets || p.code_snippets || [],
    methodology: p.methodology || '',
    key_features: p.keyFeatures || p.key_features || [],
    challenges_and_solutions: p.challengesAndSolutions || p.challenges_and_solutions || [],
    business_insights: p.businessInsights || p.business_insights || [],
    results_and_impact: p.resultsAndImpact || p.results_and_impact || [],
    lessons_learned: p.lessonsLearned || p.lessons_learned || [],
    future_improvements: p.futureImprovements || p.future_improvements || [],
    github_url: p.githubUrl || p.github_url || null,
    live_demo_url: p.liveDemoUrl || p.live_demo_url || null,
    gallery: p.gallery || [],
    tags: p.tags || [],
    sort_order: p.sort_order ?? 0,
    updated_at: new Date().toISOString()
  };
}

/**
 * Fetch all raw projects (Supabase first, fallback to static projectsData)
 */
async function fetchAllRawProjects() {
  const activeSlugs = new Set(projectsData.map(p => p.slug || p.id));

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Map from DB row, filtering to only active projects in the portfolio catalog
        const dbProjects = data.map(fromDBRow).filter(p => p && (activeSlugs.has(p.slug) || activeSlugs.has(p.id)));
        const foundSlugs = new Set(dbProjects.map(p => p.slug || p.id));
        // Append any active local projects not yet present in Supabase (e.g. newly added waste-classifier)
        const missingLocal = projectsData.filter(p => !foundSlugs.has(p.slug) && !foundSlugs.has(p.id));
        return [...dbProjects, ...missingLocal];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to static projects:', err);
    }
  }
  return [...projectsData];
}

/**
 * Service Layer abstraction for Projects Data.
 * Works seamlessly with Supabase PostgreSQL and falls back to local data.
 */
export const projectService = {
  /**
   * Fetch all projects matching filter parameters
   */
  async getProjects({ category = 'All', search = '', technology = '', sortBy = 'featured' } = {}) {
    const all = await fetchAllRawProjects();
    let result = [...all];

    // Filter by Category
    if (category && category !== 'All') {
      result = result.filter(
        p => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by Specific Technology
    if (technology && technology !== 'All') {
      const techLower = technology.toLowerCase();
      result = result.filter(p => {
        const stack = p.technologies || p.techStack || [];
        return stack.some(t => t.toLowerCase() === techLower);
      });
    }

    // Search query matching title, subtitle, tagline/overview, businessProblem, techStack, tags
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      result = result.filter(p => {
        const titleMatch = p.title?.toLowerCase().includes(q);
        const subtitleMatch = p.subtitle?.toLowerCase().includes(q);
        const taglineMatch = (p.tagline || p.overview || '').toLowerCase().includes(q);
        const problemMatch = (p.businessProblem || p.problem || '').toLowerCase().includes(q);
        const techMatch = (p.technologies || p.techStack || []).some(t => t.toLowerCase().includes(q));
        const categoryMatch = p.category?.toLowerCase().includes(q);
        const tagsMatch = (p.tags || []).some(t => t.toLowerCase().includes(q));

        return titleMatch || subtitleMatch || taglineMatch || problemMatch || techMatch || categoryMatch || tagsMatch;
      });
    }

    // Sorting
    if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
    }

    return result;
  },

  /**
   * Get project details by unique slug
   */
  async getProjectBySlug(slug) {
    if (!slug) return null;

    const localProject = projectsData.find(p => p.slug === slug || p.id === slug);
    if (!localProject) return null; // If not in active projects, do not return legacy/removed projects!

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .single();

        if (!error && data) {
          return fromDBRow(data);
        }
      } catch (err) {
        console.warn('Error fetching project by slug from Supabase:', err);
      }
    }

    return localProject || null;
  },

  /**
   * Get related projects based on shared category or technologies
   */
  async getRelatedProjects(slug, limit = 2) {
    const all = await fetchAllRawProjects();
    const current = all.find(p => p.slug === slug);
    if (!current) return [];

    const currentTech = current.technologies || current.techStack || [];

    const related = all
      .filter(p => p.slug !== slug)
      .map(p => {
        let score = 0;
        if (p.category === current.category) score += 3;
        const pTech = p.technologies || p.techStack || [];
        const commonTech = pTech.filter(t => currentTech.includes(t));
        score += commonTech.length;
        return { project: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .filter(item => item.score > 0)
      .map(item => item.project)
      .slice(0, limit);

    return related;
  },

  /**
   * Get adjacent (Previous and Next) projects for detail page navigation
   */
  async getAdjacentProjects(slug) {
    const all = await fetchAllRawProjects();
    const index = all.findIndex(p => p.slug === slug);
    if (index === -1) return { prev: null, next: null };

    const prev = index > 0 ? all[index - 1] : null;
    const next = index < all.length - 1 ? all[index + 1] : null;

    return { prev, next };
  },

  /**
   * Get unique categories list
   */
  async getCategories() {
    const all = await fetchAllRawProjects();
    const categories = Array.from(new Set(all.map(p => p.category).filter(Boolean)));
    return ['All', ...categories];
  },

  /**
   * Get unique tech stack items list
   */
  async getTechnologies() {
    const all = await fetchAllRawProjects();
    const techSet = new Set();
    all.forEach(p => {
      const stack = p.technologies || p.techStack || [];
      stack.forEach(t => techSet.add(t));
    });
    return Array.from(techSet);
  },

  /**
   * ADMIN: Create new project
   */
  async createProject(project) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured.');
    }
    const dbPayload = toDBRow(project);
    dbPayload.created_at = new Date().toISOString();

    let { data, error } = await supabase
      .from('projects')
      .upsert(dbPayload, { onConflict: 'id' })
      .select()
      .single();

    if (error && error.message && error.message.includes('benchmark_table')) {
      console.warn('Projects table in Supabase is missing benchmark_table column. Retrying without benchmark_table...');
      const fallbackPayload = { ...dbPayload };
      delete fallbackPayload.benchmark_table;
      const retry = await supabase
        .from('projects')
        .upsert(fallbackPayload, { onConflict: 'id' })
        .select()
        .single();
      if (retry.error) throw retry.error;
      data = retry.data;
    } else if (error) {
      throw error;
    }

    return fromDBRow(data);
  },

  /**
   * ADMIN: Update existing project
   */
  async updateProject(id, project) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured.');
    }
    const dbPayload = toDBRow(project);
    dbPayload.id = id || dbPayload.id || dbPayload.slug;

    let { data, error } = await supabase
      .from('projects')
      .upsert(dbPayload, { onConflict: 'id' })
      .select()
      .single();

    if (error && error.message && error.message.includes('benchmark_table')) {
      console.warn('Projects table in Supabase is missing benchmark_table column. Retrying without benchmark_table...');
      const fallbackPayload = { ...dbPayload };
      delete fallbackPayload.benchmark_table;
      const retry = await supabase
        .from('projects')
        .upsert(fallbackPayload, { onConflict: 'id' })
        .select()
        .single();
      if (retry.error) throw retry.error;
      data = retry.data;
    } else if (error) {
      throw error;
    }

    return fromDBRow(data);
  },

  /**
   * ADMIN: Delete project
   */
  async deleteProject(id) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured.');
    }
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  /**
   * ADMIN: Duplicate project
   */
  async duplicateProject(id) {
    const existing = await this.getProjectBySlug(id);
    if (!existing) throw new Error('Project not found');

    const copySlug = `${existing.slug}-copy-${Math.random().toString(36).substring(2, 6)}`;
    const copy = {
      ...existing,
      id: copySlug,
      slug: copySlug,
      title: `${existing.title} (Copy)`,
      featured: false
    };

    return await this.createProject(copy);
  },

  /**
   * ADMIN: Reorder projects
   */
  async reorderProjects(orderedIds) {
    if (!isSupabaseConfigured || !supabase) return;
    const updates = orderedIds.map((id, index) => 
      supabase.from('projects').update({ sort_order: index }).eq('id', id)
    );
    await Promise.all(updates);
  },

  /**
   * ADMIN: Upload image to Supabase Storage
   */
  async uploadImage(file) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured.');
    }
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  /**
   * ADMIN: Seed Supabase with initial projectsData
   */
  async seedProjectsFromLocal() {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured.');
    }

    const payload = projectsData.map((p, idx) => {
      const row = toDBRow(p);
      row.sort_order = idx;
      return row;
    });

    let { data, error } = await supabase
      .from('projects')
      .upsert(payload, { onConflict: 'slug' })
      .select();

    if (error && error.message && error.message.includes('benchmark_table')) {
      console.warn('Projects table in Supabase is missing benchmark_table column. Retrying seed without benchmark_table...');
      const fallbackPayload = payload.map(row => {
        const copy = { ...row };
        delete copy.benchmark_table;
        return copy;
      });
      const retry = await supabase
        .from('projects')
        .upsert(fallbackPayload, { onConflict: 'slug' })
        .select();
      if (retry.error) throw retry.error;
      data = retry.data;
    } else if (error) {
      throw error;
    }

    return data.map(fromDBRow);
  }
};
