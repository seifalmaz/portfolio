import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { personalData } from '../data/personalData';
import { skillsData } from '../data/skillsData';
import { experienceData } from '../data/experienceData';
import { certificationsData } from '../data/certificationsData';
import { projectsData } from '../data/projectsData';
import { profileService } from '../services/profileService';
import { skillService } from '../services/skillService';
import { experienceService } from '../services/experienceService';
import { certificationService } from '../services/certificationService';
import { educationService, defaultEducation } from '../services/educationService';
import { settingsService } from '../services/settingsService';
import { projectService } from '../services/projectService';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState(personalData);
  const [skills, setSkills] = useState(skillsData);
  const [experience, setExperience] = useState(experienceData);
  const [certifications, setCertifications] = useState(certificationsData);
  const [education, setEducation] = useState(defaultEducation);
  const [projects, setProjects] = useState(projectsData);
  const [settings, setSettings] = useState({
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
  });
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [profData, skData, expData, certData, eduData, setData, projData] = await Promise.allSettled([
        profileService.getProfile(),
        skillService.getGroupedSkills(),
        experienceService.getExperiences(),
        certificationService.getCertifications(),
        educationService.getEducation(),
        settingsService.getSettings(),
        projectService.getProjects({ sortBy: 'featured' })
      ]);

      if (profData.status === 'fulfilled' && profData.value) setProfile(profData.value);
      if (skData.status === 'fulfilled' && skData.value) setSkills(skData.value);
      if (expData.status === 'fulfilled' && expData.value) setExperience(expData.value);
      if (certData.status === 'fulfilled' && certData.value) setCertifications(certData.value);
      if (eduData.status === 'fulfilled' && eduData.value) setEducation(eduData.value);
      if (setData.status === 'fulfilled' && setData.value) setSettings(setData.value);
      if (projData.status === 'fulfilled' && projData.value) setProjects(projData.value);
    } catch (err) {
      console.warn('Portfolio context data load error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        skills,
        experience,
        certifications,
        education,
        projects,
        settings,
        loading,
        refreshPortfolioData: loadData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    // Graceful fallback if outside provider
    return {
      profile: personalData,
      skills: skillsData,
      experience: experienceData,
      certifications: certificationsData,
      education: defaultEducation,
      projects: projectsData,
      settings: {
        section_visibility: {
          hero: true,
          about: true,
          skills: true,
          projects: true,
          experience: true,
          certifications: true,
          education: true,
          contact: true
        }
      },
      loading: false,
      refreshPortfolioData: () => {}
    };
  }
  return context;
}
