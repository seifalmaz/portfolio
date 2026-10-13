import { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';

/**
 * Custom Hook to fetch a single project by slug along with related and adjacent projects.
 */
export function useProject(slug) {
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [adjacentProjects, setAdjacentProjects] = useState({ prev: null, next: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      projectService.getProjectBySlug(slug),
      projectService.getRelatedProjects(slug, 2),
      projectService.getAdjacentProjects(slug)
    ])
      .then(([proj, related, adjacent]) => {
        if (!isMounted) return;
        if (!proj) {
          setError('Project not found');
        } else {
          setProject(proj);
          setRelatedProjects(related);
          setAdjacentProjects(adjacent);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message || 'Failed to fetch project details');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { project, relatedProjects, adjacentProjects, loading, error };
}
