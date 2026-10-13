import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import FeaturedProjectsSection from "../components/sections/FeaturedProjectsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import CertificationsSection from "../components/sections/CertificationsSection";
import ContactSection from "../components/sections/ContactSection";
import PageTransition from "../components/layout/PageTransition";
import SEO from "../components/common/SEO";
import { usePortfolio } from "../context/PortfolioContext";

function HomePage() {
  const { settings } = usePortfolio();
  const vis = settings?.section_visibility || {};

  return (
    <PageTransition>
      <SEO pathname="/" />
      {vis.hero !== false && <HeroSection />}
      {vis.about !== false && <AboutSection />}
      {vis.skills !== false && <SkillsSection />}
      {vis.projects !== false && <FeaturedProjectsSection />}
      {vis.experience !== false && <ExperienceSection />}
      {vis.certifications !== false && <CertificationsSection />}
      {vis.contact !== false && <ContactSection />}
    </PageTransition>
  );
}

export default HomePage;
