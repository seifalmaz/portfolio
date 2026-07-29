import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component automatically scrolls the viewport to top (0,0)
 * whenever the route path changes in React Router.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
