import { useState, useEffect, useCallback } from 'react';
import { projectService } from '../services/projectService';

/**
 * Custom Hook for managing project list, filtering, searching, sorting, and metadata.
 */
export function useProjects(initialParams = {}) {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState(initialParams.search || '');
  const [category, setCategory] = useState(initialParams.category || 'All');
  const [technology, setTechnology] = useState(initialParams.technology || 'All');
  const [sortBy, setSortBy] = useState(initialParams.sortBy || 'featured');

  // Load initial options (categories & technologies)
  useEffect(() => {
    let isMounted = true;
    Promise.all([projectService.getCategories(), projectService.getTechnologies()])
      .then(([cats, techs]) => {
        if (isMounted) {
          setCategories(cats);
          setTechnologies(techs);
        }
      })
      .catch(err => {
        if (isMounted) setError(err.message || 'Failed to load filters');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch projects when filters change
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.getProjects({
        category,
        search,
        technology,
        sortBy
      });
      setProjects(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [category, search, technology, sortBy]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const resetFilters = useCallback(() => {
    setSearch('');
    setCategory('All');
    setTechnology('All');
    setSortBy('featured');
  }, []);

  return {
    projects,
    categories,
    technologies,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    technology,
    setTechnology,
    sortBy,
    setSortBy,
    resetFilters,
    refreshProjects: fetchProjects
  };
}
