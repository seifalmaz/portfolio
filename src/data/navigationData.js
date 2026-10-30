import { personalData } from "./personalData";

export const navItems = [
  { label: "Home", href: "/", sectionId: "hero", type: "hybrid" },
  { label: "About", href: "/#about", sectionId: "about", type: "hybrid" },
  { label: "Skills", href: "/#skills", sectionId: "skills", type: "hybrid" },
  { label: "Projects", href: "/projects", sectionId: "projects", type: "route" },
  { label: "Experience", href: "/#experience", sectionId: "experience", type: "hybrid" },
  { label: "Education", href: "/#education", sectionId: "education", type: "hybrid" },
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
 * - If already at the target hash on the homepage, smoothly scrolls to the element.
 * - Otherwise navigates to the target URL; the single-source-of-truth ScrollToTop manager
 *   coordinates smooth scrolling once the target page and element are ready.
 */
export function handleHybridNavigation(e, item, location, navigate) {
  if (item.type === "route") {
    // Standard route navigation handled by React Router Link / useNavigate
    return;
  }

  if (item.type === "hybrid") {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    const targetHash = item.sectionId === "hero" ? "" : `#${item.sectionId}`;
    const targetUrl = targetHash ? `/${targetHash}` : "/";

    if (location.pathname === "/" && location.hash === targetHash) {
      if (item.sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(item.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(targetUrl);
    }
  }
}
