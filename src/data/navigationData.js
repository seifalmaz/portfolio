import { personalData } from "./personalData";

export const navItems = [
  { label: "Home", href: "/", sectionId: "hero", type: "hybrid" },
  { label: "About", href: "/#about", sectionId: "about", type: "hybrid" },
  { label: "Skills", href: "/#skills", sectionId: "skills", type: "hybrid" },
  { label: "Projects", href: "/projects", sectionId: "projects", type: "route" },
  { label: "Experience", href: "/#experience", sectionId: "experience", type: "hybrid" },
  { label: "Contact", href: "/#contact", sectionId: "contact", type: "hybrid" }
];

export const socialLinks = [
  { name: "GitHub", url: personalData.socials.github, icon: "FaGithub" },
  { name: "LinkedIn", url: personalData.socials.linkedin, icon: "FaLinkedin" },
  { name: "Kaggle", url: personalData.socials.kaggle, icon: "FaKaggle" },
  { name: "Email", url: personalData.socials.email, icon: "FaEnvelope" }
];

/**
 * Handles hybrid navigation:
 * - If on home page and target is a section anchor, performs smooth scrolling.
 * - If on another route and target is a section anchor, navigates to "/" and scrolls after mount.
 */
export function handleHybridNavigation(e, item, location, navigate) {
  if (item.type === "route") {
    // Standard route navigation handled by React Router Link / useNavigate
    return;
  }

  if (item.type === "hybrid") {
    e.preventDefault();
    const isHomePage = location.pathname === "/";

    if (isHomePage) {
      const element = document.getElementById(item.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (item.sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Navigate to homepage first, then scroll
      navigate(`/#${item.sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(item.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (item.sectionId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    }
  }
}
