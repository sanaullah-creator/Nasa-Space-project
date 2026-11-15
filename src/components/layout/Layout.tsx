import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Starfield } from '../ui/Starfield';
import { AchievementToast } from '../ui/AchievementToast';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Starfield />
      <ScrollToTop />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <AchievementToast />
    </div>
  );
}
