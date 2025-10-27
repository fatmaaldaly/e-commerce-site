import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 👈 scroll to top
  }, [pathname]); // run this whenever the route changes

  return null; // this component doesn’t render anything
}
