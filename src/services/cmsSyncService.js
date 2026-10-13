import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { projectsData } from '../data/projectsData';
import { skillsData } from '../data/skillsData';
import { experienceData } from '../data/experienceData';
import { certificationsData } from '../data/certificationsData';
import { personalData } from '../data/personalData';
import { toDBRow as projectToDBRow } from './projectService';
import { certificationService } from './certificationService';

export const cmsSyncService = {
  /**
   * Helper to generate stable unique skill ID based on category and skill name
   */
  generateSkillId(category, name) {
    const catSlug = (category || 'general').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const nameSlug = (name || 'skill').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${catSlug}_${nameSlug}`;
  },

  /**
   * Synchronizes the current active dashboard state to Supabase.
   * This ensures any modifications currently in the CMS are safely persisted.
   */
  async syncCurrentDashboardToSupabase(currentState = {}) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Check your .env variables.');
    }

    const results = {
      projects: 0,
      skills: 0,
      categories: 0,
      experiences: 0,
      certifications: 0,
      education: 0,
      profile: false,
      settings: false,
      warnings: []
    };

    const errors = [];

    // 1. Projects
    if (Array.isArray(currentState.projects) && currentState.projects.length > 0) {
      try {
        const payload = currentState.projects.map((p, idx) => {
          const row = projectToDBRow(p);
          row.sort_order = p.sort_order ?? idx;
          return row;
        });

        let { data, error } = await supabase
          .from('projects')
          .upsert(payload, { onConflict: 'id' })
          .select();

        // If schema cache lacks benchmark_table, gracefully fallback without benchmark_table and warn
        if (error && error.message && error.message.includes('benchmark_table')) {
          console.warn('Projects upsert failed due to missing benchmark_table column. Retrying without benchmark_table...');
          const fallbackPayload = payload.map(row => {
            const copy = { ...row };
            delete copy.benchmark_table;
            return copy;
          });

          const retry = await supabase
            .from('projects')
            .upsert(fallbackPayload, { onConflict: 'id' })
            .select();

          if (retry.error) throw retry.error;
          data = retry.data;
          results.warnings.push(
            "Projects synced successfully, but Supabase is missing the 'benchmark_table' column. " +
            "Candidate benchmarks were preserved locally. To persist benchmarks to Supabase, run this migration in Supabase SQL editor: " +
            "ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS benchmark_table JSONB DEFAULT '[]'::jsonb;"
          );
        } else if (error) {
          throw error;
        }

        results.projects = data?.length || payload.length;
      } catch (err) {
        errors.push(`Projects: ${err.message}`);
      }
    }

    // 2. Categories & Skills
    if (Array.isArray(currentState.categories) && currentState.categories.length > 0) {
      try {
        const catPayload = currentState.categories.map((c, idx) => ({
          id: c.id || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: c.name,
          description: c.description || '',
          sort_order: c.sort_order ?? idx
        }));
        const { error } = await supabase
          .from('skill_categories')
          .upsert(catPayload, { onConflict: 'id' });
        if (error) throw error;
        results.categories = catPayload.length;
      } catch (err) {
        errors.push(`Skill Categories: ${err.message}`);
      }
    }

    if (Array.isArray(currentState.skills) && currentState.skills.length > 0) {
      try {
        const skillPayload = currentState.skills.map((s, idx) => ({
          id: s.id || this.generateSkillId(s.category, s.name),
          name: s.name,
          category: s.category,
          level: s.level || 'Advanced',
          icon: s.icon || '',
          years_of_experience: Number(s.years_of_experience) || 1,
          featured: Boolean(s.featured),
          sort_order: s.sort_order ?? idx,
          updated_at: new Date().toISOString()
        }));
        const { data, error } = await supabase
          .from('skills')
          .upsert(skillPayload, { onConflict: 'id' })
          .select();
        if (error) throw error;
        results.skills = data?.length || skillPayload.length;
      } catch (err) {
        errors.push(`Skills: ${err.message}`);
      }
    }

    // 3. Experiences
    if (Array.isArray(currentState.experiences) && currentState.experiences.length > 0) {
      try {
        const expPayload = currentState.experiences.map((exp, idx) => ({
          id: exp.id || `exp-${idx}-${Date.now()}`,
          role: exp.role,
          organization: exp.organization,
          type: exp.type || 'Professional Program',
          period: exp.period,
          location: exp.location || '',
          description: exp.description || '',
          highlights: Array.isArray(exp.highlights) ? exp.highlights : [],
          technologies: Array.isArray(exp.technologies) ? exp.technologies : [],
          logo_url: exp.logo_url || (typeof exp.logo === 'string' ? exp.logo : null),
          certificate_title: exp.certificate?.title || exp.certificate_title || null,
          certificate_issuer: exp.certificate?.issuer || exp.certificate_issuer || null,
          certificate_image: exp.certificate?.image || exp.certificate_image || null,
          is_current: Boolean(exp.is_current),
          sort_order: exp.sort_order ?? idx,
          updated_at: new Date().toISOString()
        }));
        const { data, error } = await supabase
          .from('experiences')
          .upsert(expPayload, { onConflict: 'id' })
          .select();
        if (error) throw error;
        results.experiences = data?.length || expPayload.length;
      } catch (err) {
        errors.push(`Experiences: ${err.message}`);
      }
    }

    // 4. Certifications
    if (Array.isArray(currentState.certifications)) {
      try {
        const deletedIds = certificationService.getDeletedIds ? certificationService.getDeletedIds() : new Set();
        const activeCerts = currentState.certifications.filter(c => !deletedIds.has(c.id));

        // If there are certificates that were deleted locally, ensure they are also cleaned up in Supabase
        if (deletedIds.size > 0) {
          try {
            await supabase
              .from('certifications')
              .delete()
              .in('id', Array.from(deletedIds));
          } catch (delErr) {
            console.warn('Sync cleanup of deleted certifications warning:', delErr);
          }
        }

        if (activeCerts.length > 0) {
          const certPayload = activeCerts.map((c, idx) => ({
            id: c.id || `cert-${idx}-${Date.now()}`,
            title: c.title,
            issuer: c.issuer,
            issue_date: c.date || c.issue_date || c.issueDate || '',
            expiry_date: c.expiry_date || c.expiryDate || null,
            credential_id: c.credential_id || c.credentialId || null,
            verify_url: c.verify_url || c.verifyUrl || '#',
            image_url: c.imageUrl || c.image_url || (typeof c.image === 'string' ? c.image : null),
            thumbnail_url: c.thumbnailUrl || c.thumbnail_url || null,
            skills: Array.isArray(c.skills) ? c.skills : [],
            category: c.category || 'Specialized',
            featured: Boolean(c.featured),
            sort_order: c.sort_order ?? idx,
            updated_at: new Date().toISOString()
          }));

          let currentCertPayload = certPayload;
          let { data, error } = await supabase
            .from('certifications')
            .upsert(currentCertPayload, { onConflict: 'id' })
            .select();

          // Resilient retry loop: if any column is missing from remote schema cache (e.g. thumbnail_url, category),
          // dynamically strip it and retry so synchronization never crashes.
          let retryCount = 0;
          while (error && error.message && error.message.includes('in the schema cache') && retryCount < 5) {
            retryCount++;
            const match = error.message.match(/Could not find the '([^']+)' column/);
            const missingCol = match ? match[1] : null;
            if (!missingCol) break;

            console.warn(`Column '${missingCol}' not found in remote certifications schema. Retrying sync without it...`);
            currentCertPayload = currentCertPayload.map(row => {
              const copy = { ...row };
              delete copy[missingCol];
              return copy;
            });

            const retry = await supabase
              .from('certifications')
              .upsert(currentCertPayload, { onConflict: 'id' })
              .select();

            error = retry.error;
            data = retry.data;
          }

          if (error) {
            throw error;
          }

          results.certifications = data?.length || currentCertPayload.length;
        } else {
          results.certifications = 0;
        }
      } catch (err) {
        errors.push(`Certifications: ${err.message}`);
      }
    }

    // 5. Education
    if (Array.isArray(currentState.education) && currentState.education.length > 0) {
      try {
        const eduPayload = currentState.education.map((edu, idx) => ({
          id: edu.id || `edu-${idx}`,
          institution: edu.institution,
          degree: edu.degree,
          field_of_study: edu.field_of_study || '',
          period: edu.period || '',
          start_date: edu.start_date || '',
          end_date: edu.end_date || '',
          is_current: Boolean(edu.is_current),
          gpa: edu.gpa || '',
          description: edu.description || '',
          achievements: Array.isArray(edu.achievements) ? edu.achievements : [],
          logo_url: edu.logo_url || null,
          sort_order: edu.sort_order ?? idx,
          updated_at: new Date().toISOString()
        }));
        const { data, error } = await supabase
          .from('education')
          .upsert(eduPayload, { onConflict: 'id' })
          .select();
        if (error) throw error;
        results.education = data?.length || eduPayload.length;
      } catch (err) {
        errors.push(`Education: ${err.message}`);
      }
    }

    // 6. Profile
    if (currentState.profile && typeof currentState.profile === 'object') {
      try {
        const p = currentState.profile;
        const profilePayload = {
          id: 'main',
          name: p.name || personalData.name,
          title: p.title || personalData.title,
          roles: Array.isArray(p.roles) ? p.roles : personalData.roles || [],
          tagline: p.tagline ?? personalData.tagline,
          location: p.location ?? personalData.location,
          university: p.university ?? personalData.university,
          degree: p.degree ?? personalData.degree,
          email: p.email ?? personalData.email,
          socials: p.socials || personalData.socials || {},
          resume_url: p.resumeUrl || p.resume_url || null,
          resume_filename: p.resumeFilename || p.resume_filename || 'Seif_Almaz_CV.pdf',
          profile_image: p.profileImage || p.profile_image || null,
          bio_headline: p.bioHeadline || p.bio_headline || '',
          bio_paragraphs: Array.isArray(p.bioParagraphs || p.bio_paragraphs) ? (p.bioParagraphs || p.bio_paragraphs) : [],
          stats: Array.isArray(p.stats) ? p.stats : [],
          availability_status: p.availabilityStatus || p.availability_status || 'Open for Opportunities',
          is_available: p.isAvailable ?? p.is_available ?? true,
          updated_at: new Date().toISOString()
        };
        const { error } = await supabase
          .from('portfolio_profile')
          .upsert(profilePayload, { onConflict: 'id' });
        if (error) throw error;
        results.profile = true;
      } catch (err) {
        errors.push(`Profile: ${err.message}`);
      }
    }

    // 7. Settings
    if (currentState.settings && typeof currentState.settings === 'object') {
      try {
        const s = currentState.settings;
        const settingsPayload = {
          id: 'default',
          section_visibility: s.section_visibility || {},
          section_order: Array.isArray(s.section_order) ? s.section_order : ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'education', 'contact'],
          show_resume_button: s.show_resume_button ?? true,
          site_title: s.site_title || 'Seif Ahmed Almaz | Data Analytics & AI Engineer',
          site_description: s.site_description || 'Personal Portfolio & Case Studies for Data Analytics, Machine Learning, and Business Intelligence.',
          accent_color: s.accent_color || '#3b82f6',
          updated_at: new Date().toISOString()
        };
        const { error } = await supabase
          .from('portfolio_settings')
          .upsert(settingsPayload, { onConflict: 'id' });
        if (error) throw error;
        results.settings = true;
      } catch (err) {
        errors.push(`Settings: ${err.message}`);
      }
    }

    if (errors.length > 0) {
      throw new Error(`Sync completed with errors: ${errors.join('; ')}`);
    }

    return results;
  },

  /**
   * Safely seed tables that are currently empty without overwriting existing data.
   */
  async seedEmptyTablesOnly() {
    if (!isSupabaseConfigured || !supabase) {
      return {};
    }

    const results = {};

    // 1. Projects check
    try {
      const { count: projCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      if (!projCount || projCount === 0) {
        const projectPayload = projectsData.map((p, idx) => {
          const row = projectToDBRow(p);
          row.sort_order = idx;
          return row;
        });
        const { error: pErr } = await supabase.from('projects').upsert(projectPayload, { onConflict: 'id' });
        if (pErr && pErr.message && pErr.message.includes('benchmark_table')) {
          const fallbackPayload = projectPayload.map(r => {
            const copy = { ...r };
            delete copy.benchmark_table;
            return copy;
          });
          await supabase.from('projects').upsert(fallbackPayload, { onConflict: 'id' });
        }
        results.projects = projectPayload.length;
      }
    } catch (e) {
      console.warn('Projects seed check error:', e);
    }

    // 2. Categories check
    try {
      const { count: catCount } = await supabase.from('skill_categories').select('*', { count: 'exact', head: true });
      if (!catCount || catCount === 0) {
        const catPayload = skillsData.map((c, idx) => ({
          id: c.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: c.category,
          description: c.description || '',
          sort_order: idx
        }));
        await supabase.from('skill_categories').upsert(catPayload, { onConflict: 'id' });
        results.categories = catPayload.length;
      }
    } catch (e) {
      console.warn('Categories seed check error:', e);
    }

    // 3. Skills check
    try {
      const { count: skillCount } = await supabase.from('skills').select('*', { count: 'exact', head: true });
      if (!skillCount || skillCount === 0) {
        const skillPayload = [];
        skillsData.forEach(c => {
          c.skills.forEach((s, idx) => {
            skillPayload.push({
              id: this.generateSkillId(c.category, s.name),
              name: s.name,
              category: c.category,
              level: s.level || 'Advanced',
              icon: s.icon || '',
              years_of_experience: 1,
              featured: false,
              sort_order: idx,
              updated_at: new Date().toISOString()
            });
          });
        });
        await supabase.from('skills').upsert(skillPayload, { onConflict: 'id' });
        results.skills = skillPayload.length;
      }
    } catch (e) {
      console.warn('Skills seed check error:', e);
    }

    // 4. Experiences check
    try {
      const { count: expCount } = await supabase.from('experiences').select('*', { count: 'exact', head: true });
      if (!expCount || expCount === 0) {
        const expPayload = experienceData.map((exp, idx) => ({
          id: exp.id || `exp-${idx}-${Date.now()}`,
          role: exp.role,
          organization: exp.organization,
          type: exp.type || 'Professional Program',
          period: exp.period,
          location: exp.location || '',
          description: exp.description || '',
          highlights: Array.isArray(exp.highlights) ? exp.highlights : [],
          technologies: Array.isArray(exp.technologies) ? exp.technologies : [],
          logo_url: exp.logo_url || (typeof exp.logo === 'string' ? exp.logo : null),
          certificate_title: exp.certificate?.title || exp.certificate_title || null,
          certificate_issuer: exp.certificate?.issuer || exp.certificate_issuer || null,
          certificate_image: exp.certificate?.image || exp.certificate_image || null,
          is_current: Boolean(exp.is_current),
          sort_order: exp.sort_order ?? idx,
          updated_at: new Date().toISOString()
        }));
        await supabase.from('experiences').upsert(expPayload, { onConflict: 'id' });
        results.experiences = expPayload.length;
      }
    } catch (e) {
      console.warn('Experiences seed check error:', e);
    }

    // 5. Certifications check
    try {
      const { count: certCount } = await supabase.from('certifications').select('*', { count: 'exact', head: true });
      const wasInitialized = typeof window !== 'undefined' && localStorage.getItem('portfolio_certs_initialized');
      const deletedIds = certificationService.getDeletedIds ? certificationService.getDeletedIds() : new Set();

      // Only seed on first-ever load when table is empty and no deletions have occurred
      if ((!certCount || certCount === 0) && !wasInitialized && deletedIds.size === 0) {
        const certPayload = certificationsData
          .filter(c => !deletedIds.has(c.id))
          .map((c, idx) => ({
            id: c.id || `cert-${idx}-${Date.now()}`,
            title: c.title,
            issuer: c.issuer,
            issue_date: c.date || c.issue_date || c.issueDate || '',
            expiry_date: c.expiry_date || c.expiryDate || null,
            credential_id: c.credential_id || c.credentialId || null,
            verify_url: c.verify_url || c.verifyUrl || '#',
            image_url: c.image_url || c.imageUrl || (typeof c.image === 'string' ? c.image : null),
            thumbnail_url: c.thumbnailUrl || c.thumbnail_url || null,
            skills: Array.isArray(c.skills) ? c.skills : [],
            category: c.category || 'Specialized',
            featured: Boolean(c.featured),
            sort_order: c.sort_order ?? idx,
            updated_at: new Date().toISOString()
          }));

        let currentCertPayload = certPayload;
        let { error: certErr } = await supabase.from('certifications').upsert(currentCertPayload, { onConflict: 'id' });

        let retryCount = 0;
        while (certErr && certErr.message && certErr.message.includes('in the schema cache') && retryCount < 5) {
          retryCount++;
          const match = certErr.message.match(/Could not find the '([^']+)' column/);
          const missingCol = match ? match[1] : null;
          if (!missingCol) break;

          console.warn(`Column '${missingCol}' missing in remote schema cache during seed. Retrying without it...`);
          currentCertPayload = currentCertPayload.map(r => {
            const copy = { ...r };
            delete copy[missingCol];
            return copy;
          });

          const retry = await supabase.from('certifications').upsert(currentCertPayload, { onConflict: 'id' });
          certErr = retry.error;
        }

        if (typeof window !== 'undefined') {
          localStorage.setItem('portfolio_certs_initialized', 'true');
        }
        results.certifications = certPayload.length;
      }
    } catch (e) {
      console.warn('Certifications seed check error:', e);
    }

    // 6. Education check
    try {
      const { count: eduCount } = await supabase.from('education').select('*', { count: 'exact', head: true });
      if (!eduCount || eduCount === 0) {
        const eduPayload = [{
          id: 'hnu-data-science',
          institution: 'Helwan National University',
          degree: 'Bachelor of Computer Science & Artificial Intelligence',
          field_of_study: 'Data Science & Big Data Analytics',
          period: '2023 - 2027',
          start_date: '2023',
          end_date: '2027',
          is_current: true,
          gpa: '3.67 / 4.00 (Excellent)',
          description: 'Specializing in Machine Learning, Statistical Inference, and Database Architectures.',
          achievements: ["Dean's Honor List", 'ICPC Regional Contestant'],
          logo_url: null,
          sort_order: 0,
          updated_at: new Date().toISOString()
        }];
        await supabase.from('education').upsert(eduPayload, { onConflict: 'id' });
        results.education = eduPayload.length;
      }
    } catch (e) {
      console.warn('Education seed check error:', e);
    }

    // 7. Profile check
    try {
      const { count: profCount } = await supabase.from('portfolio_profile').select('*', { count: 'exact', head: true });
      if (!profCount || profCount === 0) {
        const profilePayload = {
          id: 'main',
          name: personalData.name,
          title: personalData.title,
          roles: personalData.roles || [],
          tagline: personalData.tagline,
          location: personalData.location,
          university: personalData.university,
          degree: personalData.degree,
          email: personalData.email,
          socials: personalData.socials || {},
          resume_url: personalData.resumeUrl || null,
          resume_filename: personalData.resumeFilename || 'Seif_Almaz_CV.pdf',
          profile_image: null,
          bio_headline: personalData.bioHeadline || '',
          bio_paragraphs: personalData.bioParagraphs || [],
          stats: personalData.stats || [],
          availability_status: 'Open for Full-Time Roles, Internships & Projects',
          is_available: true,
          updated_at: new Date().toISOString()
        };
        await supabase.from('portfolio_profile').upsert(profilePayload, { onConflict: 'id' });
        results.profile = true;
      }
    } catch (e) {
      console.warn('Profile seed check error:', e);
    }

    // 8. Settings check
    try {
      const { count: setCount } = await supabase.from('portfolio_settings').select('*', { count: 'exact', head: true });
      if (!setCount || setCount === 0) {
        const settingsPayload = {
          id: 'default',
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
          accent_color: '#3b82f6',
          updated_at: new Date().toISOString()
        };
        await supabase.from('portfolio_settings').upsert(settingsPayload, { onConflict: 'id' });
        results.settings = true;
      }
    } catch (e) {
      console.warn('Settings seed check error:', e);
    }

    return results;
  },

  /**
   * Legacy entry point - now safely delegates to syncCurrentDashboardToSupabase or seedEmptyTablesOnly
   */
  async syncAllToSupabase(currentState) {
    if (currentState && Object.keys(currentState).length > 0) {
      return this.syncCurrentDashboardToSupabase(currentState);
    }
    return this.seedEmptyTablesOnly();
  }
};

