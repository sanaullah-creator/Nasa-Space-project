import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import type { ReactNode } from 'react';
import { ProgressProvider } from './hooks/ProgressContext';
import { AuthProvider, useAuth } from './hooks/AuthContext';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { MissionDetailPage } from './pages/MissionDetailPage';
import { MapPage } from './pages/MapPage';
import { TimelinePage } from './pages/TimelinePage';
import { WhereNowPage } from './pages/WhereNowPage';
import { QuizPage } from './pages/QuizPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { PatchLabPage } from './pages/PatchLabPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { LogoutPage } from './pages/LogoutPage';
import { CreditsPage } from './pages/CreditsPage';

/** Remounts progress (badges) whenever a different user signs in, so each account keeps its own. */
function UserProgress({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return <ProgressProvider key={user?.id ?? 'guest'}>{children}</ProgressProvider>;
}

/**
 * HashRouter is used so the site works on any static host (Vercel, GitHub Pages, Netlify, a USB stick)
 * with no server rewrite rules. Swap for BrowserRouter if you prefer clean URLs — vercel.json already
 * contains the SPA rewrite needed for that.
 */
export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <UserProgress>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/missions/:id" element={<MissionDetailPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/where-are-they-now" element={<WhereNowPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/patch-lab" element={<PatchLabPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/credits" element={<CreditsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </UserProgress>
      </AuthProvider>
    </HashRouter>
  );
}
