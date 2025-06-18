import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('[ScrollToTop] Pathname:', pathname, 'Is LiveMap:', pathname === '/live-map');
    // Only scroll to top if not on the live map page
    if (pathname !== '/live-map') {
      console.log('[ScrollToTop] Scrolling to top for path:', pathname);
      window.scrollTo(0, 0);
    } else {
      console.log('[ScrollToTop] Not scrolling for /live-map');
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop; 