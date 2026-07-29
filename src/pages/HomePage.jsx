import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import FeaturedProjectsSection from "../components/sections/FeaturedProjectsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import CertificationsSection from "../components/sections/CertificationsSection";
import ContactSection from "../components/sections/ContactSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection />
    </>
  );
}

export default HomePage;
