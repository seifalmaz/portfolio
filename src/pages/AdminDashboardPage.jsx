import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTriangleExclamation } from 'react-icons/fa6';
import { supabase } from '../lib/supabase';
import { projectService } from '../services/projectService';
import { skillService } from '../services/skillService';
import { experienceService } from '../services/experienceService';
import { certificationService } from '../services/certificationService';
import { educationService } from '../services/educationService';
import { profileService } from '../services/profileService';
import { settingsService } from '../services/settingsService';
import { cmsSyncService } from '../services/cmsSyncService';
import { usePortfolio } from '../context/PortfolioContext';

// Admin Components & Tabs
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import ConfirmModal from '../components/admin/ConfirmModal';
import OverviewTab from '../components/admin/tabs/OverviewTab';
import ProjectsTab from '../components/admin/tabs/ProjectsTab';
import SkillsTab from '../components/admin/tabs/SkillsTab';
import ExperienceTab from '../components/admin/tabs/ExperienceTab';
import CertificationsTab from '../components/admin/tabs/CertificationsTab';
import EducationTab from '../components/admin/tabs/EducationTab';
import ProfileTab from '../components/admin/tabs/ProfileTab';
import ContactTab from '../components/admin/tabs/ContactTab';
import SettingsTab from '../components/admin/tabs/SettingsTab';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { refreshPortfolioData } = usePortfolio();

  // Navigation
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Data states
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [education, setEducation] = useState([]);
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [syncing, setSyncing] = useState(false);

  // Alerts & Confirmations
  const [alert, setAlert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // { type, id, name }

  const showAlert = useCallback((type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4500);
  }, []);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      // Ensure any empty tables (such as skills) are initialized once under the active admin session
      try {
        await cmsSyncService.seedEmptyTablesOnly();
      } catch (seedErr) {
        console.warn('Initial empty tables seed check:', seedErr);
      }

      const [
        projData,
        skData,
        catData,
        expData,
        certData,
        eduData,
        profData,
        setData
      ] = await Promise.all([
        projectService.getProjects({ sortBy: 'newest' }),
        skillService.getSkills(),
        skillService.getCategories(),
        experienceService.getExperiences(),
        certificationService.getCertifications(),
        educationService.getEducation(),
        profileService.getProfile(),
        settingsService.getSettings()
      ]);

      setProjects(projData);
      setSkills(skData);
      setCategories(catData);
      setExperiences(expData);
      setCertifications(certData);
      setEducation(eduData);
      setProfile(profData);
      setSettings(setData);
      setLastUpdated(new Date().toISOString());

      // Refresh public app context
      refreshPortfolioData();
    } catch (err) {
      showAlert('error', `Failed to load dashboard data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [showAlert, refreshPortfolioData]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    fetchAllData();
  }, [fetchAllData]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleSyncAll = async () => {
    setSyncing(true);
    try {
      const currentState = {
        projects,
        skills,
        categories,
        experiences,
        certifications,
        education,
        profile,
        settings
      };
      const results = await cmsSyncService.syncCurrentDashboardToSupabase(currentState);
      if (results.warnings && results.warnings.length > 0) {
        showAlert('warning', `Synced (${results.projects} projects, ${results.skills} skills, ${results.certifications} certs) with notice: ${results.warnings.join(' ')}`);
      } else {
        showAlert('success', `Saved and synced to Supabase successfully! (${results.projects} projects, ${results.skills} skills, ${results.experiences} experiences, ${results.certifications} certs)`);
      }
      await fetchAllData();
    } catch (err) {
      showAlert('error', `Sync failed: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const { type, id, name } = deleteTarget;

    try {
      let result;
      if (type === 'project') {
        result = await projectService.deleteProject(id);
      } else if (type === 'skill') {
        result = await skillService.deleteSkill(id);
      } else if (type === 'experience') {
        result = await experienceService.deleteExperience(id);
      } else if (type === 'certification') {
        result = await certificationService.deleteCertification(id);
      } else if (type === 'education') {
        result = await educationService.deleteEducation(id);
      }

      if (type === 'certification' && result?.storageResult?.error) {
        showAlert('warning', `Deleted "${name}" from database. Note: Storage cleanup warning: ${result.storageResult.error}`);
      } else {
        showAlert('success', `Deleted "${name}" successfully.`);
      }
      setDeleteTarget(null);
      await fetchAllData();
    } catch (err) {
      showAlert('error', `Delete error: ${err.message}`);
    }
  };

  // Computed counts for badges & overview
  const counts = {
    projects: projects.length,
    featuredProjects: projects.filter(p => p.featured).length,
    skills: skills.length,
    experiences: experiences.length,
    certifications: certifications.length,
    education: education.length
  };

  const tabTitles = {
    overview: 'Portfolio Overview & Statistics',
    projects: 'Project Catalog & Case Studies',
    skills: 'Technical Skills & Competencies',
    experience: 'Career Experience & Timeline',
    certifications: 'Verified Certifications & Credentials',
    education: 'Academic Degrees & Education',
    profile: 'Personal Profile & Hero Section',
    contact: 'Contact Info & Social Profiles',
    settings: 'Portfolio Settings & SEO'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white flex">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onSignOut={handleSignOut}
        counts={counts}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader
          activeTabTitle={tabTitles[activeTab] || 'Admin Dashboard'}
          onToggleMobileSidebar={() => setMobileSidebarOpen(prev => !prev)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Toast Notification */}
          <AnimatePresence>
            {alert && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-6 p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 shadow-xl ${
                  alert.type === 'success'
                    ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'
                    : alert.type === 'warning'
                    ? 'bg-amber-950/80 border-amber-500/30 text-amber-300'
                    : 'bg-red-950/80 border-red-500/30 text-red-300'
                }`}
              >
                {alert.type === 'success' ? (
                  <FaCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <FaTriangleExclamation className={`w-4 h-4 shrink-0 ${alert.type === 'warning' ? 'text-amber-400' : 'text-red-400'}`} />
                )}
                <span>{alert.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Initial Data Loading State */}
          {loading && !lastUpdated ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-10 h-10 border-4 border-[#D2C7B6]/20 border-t-[#6E2638] rounded-full animate-spin" />
              <p className="text-xs uppercase tracking-widest text-[#9AA69A] font-mono">Loading CMS Data...</p>
            </div>
          ) : (
            <>
              {/* Tab Views */}
              {activeTab === 'overview' && (
            <OverviewTab
              counts={counts}
              lastUpdated={lastUpdated}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSyncAll={handleSyncAll}
              syncing={syncing}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab
              projects={projects}
              onRefresh={fetchAllData}
              onShowAlert={showAlert}
              onOpenDeleteConfirm={(target) => setDeleteTarget(target)}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsTab
              skills={skills}
              categories={categories}
              onRefresh={fetchAllData}
              onShowAlert={showAlert}
              onOpenDeleteConfirm={(target) => setDeleteTarget(target)}
            />
          )}

          {activeTab === 'experience' && (
            <ExperienceTab
              experiences={experiences}
              onRefresh={fetchAllData}
              onShowAlert={showAlert}
              onOpenDeleteConfirm={(target) => setDeleteTarget(target)}
            />
          )}

          {activeTab === 'certifications' && (
            <CertificationsTab
              certifications={certifications}
              onRefresh={fetchAllData}
              onShowAlert={showAlert}
              onOpenDeleteConfirm={(target) => setDeleteTarget(target)}
            />
          )}

          {activeTab === 'education' && (
            <EducationTab
              education={education}
              onRefresh={fetchAllData}
              onShowAlert={showAlert}
              onOpenDeleteConfirm={(target) => setDeleteTarget(target)}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileTab
              profile={profile}
              onRefresh={fetchAllData}
              onShowAlert={showAlert}
            />
          )}

          {activeTab === 'contact' && (
            <ContactTab
              profile={profile}
              onRefresh={fetchAllData}
              onShowAlert={showAlert}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              settings={settings}
              onRefresh={fetchAllData}
              onShowAlert={showAlert}
            />
          )}
            </>
          )}
        </main>
      </div>

      {/* Reusable Delete Confirmation Dialog */}
      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Confirm Deletion"
        message={`Are you sure you want to permanently delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete Permanently"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
