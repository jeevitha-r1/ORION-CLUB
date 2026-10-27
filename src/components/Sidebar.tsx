/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import {
  X,
  Compass,
  Calendar,
  Image as ImageIcon,
  Info,
  ShieldAlert,
  LogIn,
  LogOut,
  User,
  Users,
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
  Music,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    setIsLoginModalOpen,
    currentRoute,
    navigateTo,
    session,
    logout,
  } = useApp();
  const { isPlaying, isMuted, volume, toggleAudio, setVolume, openPromptModal } = useAudio();

  if (!isSidebarOpen) return null;

  const handleLinkClick = (route: string) => {
    setIsSidebarOpen(false);
    navigateTo(route);
  };

  const handleOpenLogin = () => {
    setIsSidebarOpen(false);
    navigateTo('auth');
  };

  const navItems = [
    { label: 'Campus Home', route: 'visitor', icon: Compass },
    { label: 'Five Wings', route: 'visitor/wings', icon: Layers },
    { label: 'Meet the Team', route: 'visitor/team', icon: Users },
    { label: 'Campus Events', route: 'visitor/events', icon: Calendar },
    { label: 'Media Gallery', route: 'visitor/gallery', icon: ImageIcon },
    { label: 'About ORION', route: 'visitor/about', icon: Info },
    { label: 'Discipline Wing', route: 'discipline', icon: ShieldAlert, highlight: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />

      {/* Slide-out Sidebar Panel */}
      <div className="w-full max-w-sm sm:max-w-md h-full bg-slate-950/95 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 p-1.5 flex items-center justify-center">
                <img
                  src="/assets/aistudio/image_13ebcba2.png"
                  alt="ORION"
                  className="w-full h-full object-contain filter invert contrast-125"
                />
              </div>
              <div>
                <span className="font-display font-extrabold text-white text-base tracking-wider block">
                  ORION
                </span>
                <span className="text-[10px] font-mono text-cyan-400">A Multidisciplinary Club</span>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-2 px-3">
              Campus Navigation
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentRoute === item.route || (item.route === 'visitor' && currentRoute === 'visitor');

              return (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.route)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                      : item.highlight
                      ? 'text-red-400 hover:text-red-300 hover:bg-red-950/20 border border-red-950/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              );
            })}
          </div>

          {/* Ambient Cosmic Music Controls */}
          <div className="mt-6 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-semibold text-white">Ambient Soundscape</span>
              </div>
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                  isPlaying && !isMuted
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {isPlaying && !isMuted ? (
                  <>
                    <Volume2 className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3 h-3" />
                    <span>Muted</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-400">Vol</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] font-mono text-cyan-400 w-7 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* User Authentication & Login Section in Sidebar */}
        <div className="pt-6 border-t border-slate-800 mt-6">
          {session.isAuthenticated ? (
            <div className="space-y-4">
              {/* Authenticated user badge */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <img
                  src={session.avatar}
                  alt={session.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                />
                <div className="flex-1 overflow-hidden">
                  <span className="text-xs font-bold text-white block truncate">{session.name}</span>
                  <span className="text-[10px] font-mono text-cyan-400 block truncate">
                    {session.roleTitle || session.role.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Direct Link to Dashboard */}
              {session.role === 'member' ? (
                <button
                  onClick={() => handleLinkClick('member/dashboard')}
                  className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <User className="w-4 h-4" />
                  <span>Open Member Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleLinkClick(
                      session.role === 'discipline_officer' ? 'discipline' : 'committee/dashboard'
                    )
                  }
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <Shield className="w-4 h-4" />
                  <span>Open Committee Console</span>
                </button>
              )}

              {/* Sign Out */}
              <button
                onClick={() => {
                  logout();
                  setIsSidebarOpen(false);
                }}
                className="w-full py-2 text-xs font-mono text-red-400 hover:text-red-300 flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-display font-bold text-white block">Official Club Portals</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/60 text-cyan-300">
                    REVA SSO
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Authenticate via REVA ID Microsoft SSO for Member Portal or Core Committee Operations.
                </p>
              </div>

              {/* Main Login Option in the Sidebar */}
              <button
                onClick={handleOpenLogin}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01]"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Sign Up</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
