/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CosmicBackground } from './components/CosmicBackground';
import { Navbar } from './components/Navbar';
import { OpeningPortalScreen } from './components/OpeningPortalScreen';
import { VisitorHome } from './components/visitor/VisitorHome';
import { WingConstellationSection } from './components/visitor/WingConstellationSection';
import { WingDetailPage } from './components/visitor/WingDetailPage';
import { PublicEventsPage } from './components/visitor/PublicEventsPage';
import { PublicGalleryPage } from './components/visitor/PublicGalleryPage';
import { PublicAboutPage } from './components/visitor/PublicAboutPage';
import { MemberLogin } from './components/member/MemberLogin';
import { MemberDashboard } from './components/member/MemberDashboard';
import { CommitteeLogin } from './components/committee/CommitteeLogin';
import { CommitteeDashboard } from './components/committee/CommitteeDashboard';
import { DisciplinePlatform } from './components/discipline/DisciplinePlatform';
import { Sidebar } from './components/Sidebar';
import { LoginModal } from './components/auth/LoginModal';
import { TwoColumnAuthView } from './components/auth/TwoColumnAuthView';
import { MeetTheTeamSection } from './components/team/MeetTheTeamSection';
import { AudioProvider } from './context/AudioContext';
import { AudioPromptModal } from './components/audio/AudioPromptModal';
import { WingId } from './types';

const MainRouter: React.FC = () => {
  const { currentRoute, selectedWingId, navigateTo, setIsLoginModalOpen } = useApp();

  // If separate Discipline frontend website
  if (currentRoute === 'discipline') {
    return (
      <div className="relative min-h-screen bg-[#08090d] text-slate-100">
        <Sidebar />
        <LoginModal />
        <DisciplinePlatform />
      </div>
    );
  }

  // Check if viewing individual wing page
  const wingMatch = currentRoute.match(/^visitor\/wings\/([a-z_]+)$/);
  const activeWingId = wingMatch ? (wingMatch[1] as WingId) : selectedWingId;

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 flex flex-col justify-between">
      <CosmicBackground />
      <Navbar />
      <Sidebar />
      <LoginModal />

      <main className="flex-1 w-full relative z-10">
        {/* Default common page accessible to all */}
        {(currentRoute === 'visitor' || currentRoute === '' || currentRoute === 'portal_select') && <VisitorHome />}
        {currentRoute === 'visitor/wings' && (
          <div className="py-12">
            <WingConstellationSection />
          </div>
        )}
        {wingMatch && activeWingId && <WingDetailPage wingId={activeWingId} />}
        {currentRoute === 'visitor/events' && <PublicEventsPage />}
        {currentRoute === 'visitor/gallery' && <PublicGalleryPage />}
        {currentRoute === 'visitor/about' && <PublicAboutPage />}
        {currentRoute === 'visitor/team' && (
          <div className="py-8">
            <MeetTheTeamSection />
          </div>
        )}
        {(currentRoute === 'auth' || currentRoute === 'signin' || currentRoute === 'signup') && (
          <TwoColumnAuthView />
        )}

        {/* Member routes */}
        {currentRoute === 'member/login' && <MemberLogin />}
        {currentRoute.startsWith('member/dashboard') && <MemberDashboard />}
        {currentRoute === 'member/profile' && <MemberDashboard />}
        {currentRoute === 'member/leaderboard' && <MemberDashboard />}

        {/* Committee routes */}
        {currentRoute === 'committee/login' && <CommitteeLogin />}
        {currentRoute.startsWith('committee/dashboard') && <CommitteeDashboard />}
        {currentRoute === 'committee/manage' && <CommitteeDashboard />}
      </main>

      {/* Global Clean Site Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md py-10 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 p-1 flex items-center justify-center">
              <img
                src="/assets/aistudio/image_13ebcba2.png"
                alt="ORION Logo"
                className="w-full h-full object-contain filter invert contrast-125"
              />
            </div>
            <div>
              <span className="font-display font-bold text-white tracking-wider">ORION</span>
              <span className="mx-2 text-slate-700">·</span>
              <span className="text-cyan-400 font-mono">Earned, Not Favored!</span>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono">
            <button onClick={() => navigateTo('visitor')} className="hover:text-slate-300">
              Campus Home
            </button>
            <button onClick={() => navigateTo('visitor/wings')} className="hover:text-slate-300">
              Five Wings
            </button>
            <button onClick={() => navigateTo('visitor/team')} className="hover:text-slate-300">
              Meet the Team
            </button>
            <button onClick={() => navigateTo('discipline')} className="hover:text-red-400">
              Discipline
            </button>
            <button onClick={() => navigateTo('auth')} className="hover:text-cyan-400">
              Sign In / Sign Up
            </button>
          </div>

          <div className="text-right font-mono text-[11px] text-slate-600">
            © 2026 ORION — A Multidisciplinary Club. All systems operational.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AudioProvider>
        <AudioPromptModal />
        <MainRouter />
      </AudioProvider>
    </AppProvider>
  );
}
