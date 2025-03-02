import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollableDiv = document.querySelector(".scrollable-content");
    if (scrollableDiv) {
      scrollableDiv.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
