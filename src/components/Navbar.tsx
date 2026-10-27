/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, User, LogOut, ChevronDown, Sparkles, Compass, Menu, LogIn } from 'lucide-react';
import { UserRole } from '../types';
import { AudioController } from './audio/AudioController';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    session,
    logout,
    switchRoleQuickly,
    setIsSidebarOpen,
    setIsLoginModalOpen,
  } = useApp();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const navLinks = [
    { label: 'About', route: 'visitor/about' },
    { label: 'Five Wings', route: 'visitor/wings' },
    { label: 'Events', route: 'visitor/events' },
    { label: 'Team', route: 'visitor/team' },
    { label: 'Media Gallery', route: 'visitor/gallery' },
    { label: 'Discipline', route: 'discipline' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone (Single-line wordmark with official logo) */}
        <div
          onClick={() => navigateTo('visitor')}
          className="flex items-center gap-3 cursor-pointer group whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 p-1 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
            <img
              src="/assets/aistudio/image_13ebcba2.png"
              alt="ORION"
              className="w-full h-full object-contain filter invert contrast-125 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors">
              ORION
            </span>
          </div>
        </div>

        {/* Zone 2: 4–5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route || (link.route === 'visitor' && currentRoute === 'visitor');
            const isDiscipline = link.route === 'discipline';
            return (
              <button
                key={link.label}
                onClick={() => navigateTo(link.route)}
                className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 flex items-center gap-1.5 ${
                  isActive
                    ? isDiscipline
                      ? 'border-red-500 text-red-300 font-semibold'
                      : 'border-cyan-400 text-cyan-300 font-semibold'
                    : isDiscipline
                    ? 'border-transparent text-slate-400 hover:text-red-300 hover:border-red-500/50'
                    : 'border-transparent hover:text-white hover:border-slate-500'
                }`}
              >
                <span>{link.label}</span>
                {isDiscipline && (
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-red-950/60 border border-red-900/60 text-red-400">
                    AUTH
                  </span>
                )}
              </button>
            );
          })}

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Right beside the menu bar: Sign in / Sign up option */}
          <button
            onClick={() => navigateTo('auth')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 flex items-center gap-1.5 font-semibold ${
              currentRoute === 'auth' || currentRoute === 'signin' || currentRoute === 'signup'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-cyan-400 hover:text-cyan-200 hover:border-cyan-400/60'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Sign Up</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action with fast role switcher drawer */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Ambient Cosmic Music Controller */}
          <AudioController />

          {/* Sidebar Trigger Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            title="Open Campus Navigation Sidebar"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors whitespace-nowrap shrink-0"
          >
            <Menu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Menu</span>
          </button>

          {/* User state badge / Login button */}
          {session.isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500 text-xs text-white transition-colors whitespace-nowrap shrink-0"
              >
                <img
                  src={session.avatar}
                  alt={session.name}
                  className="w-5 h-5 rounded-full object-cover border border-slate-600"
                />
                <span className="max-w-[110px] truncate font-medium">{session.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="text-xs text-slate-400">Authenticated Role</p>
                    <p className="text-sm font-semibold text-white capitalize">{session.role.replace('_', ' ')}</p>
                    <p className="text-[11px] font-mono text-cyan-400 truncate">{session.email}</p>
                  </div>

                  {session.role === 'member' && (
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        navigateTo('member/dashboard');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-violet-400" />
                      <span>Member Dashboard</span>
                    </button>
                  )}

                  {session.role !== 'visitor' && session.role !== 'member' && (
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        navigateTo(session.role === 'discipline_officer' ? 'discipline' : 'committee/dashboard');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Committee Dashboard</span>
                    </button>
                  )}

                  <div className="my-1 border-t border-slate-800 pt-1">
                    <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      Switch Role (Demo Mode)
                    </div>
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        switchRoleQuickly('visitor');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800/80 rounded"
                    >
                      Visitor
                    </button>
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        switchRoleQuickly('member');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-violet-300 hover:bg-slate-800/80 rounded"
                    >
                      Member (Alex Chen)
                    </button>
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        switchRoleQuickly('tech_admin');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-cyan-300 hover:bg-slate-800/80 rounded"
                    >
                      Tech Admin (Maya Patel)
                    </button>
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        switchRoleQuickly('ie_lead');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-sky-300 hover:bg-slate-800/80 rounded"
                    >
                      I&E Lead (Rohan Sharma)
                    </button>
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        switchRoleQuickly('cultural_lead');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-purple-300 hover:bg-slate-800/80 rounded"
                    >
                      Cultural Lead (Priya Verma)
                    </button>
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        switchRoleQuickly('media_lead');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-amber-300 hover:bg-slate-800/80 rounded"
                    >
                      Media Lead (Liam Vance)
                    </button>
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        switchRoleQuickly('discipline_officer');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-red-300 hover:bg-slate-800/80 rounded"
                    >
                      Discipline Officer (Marcus Vance)
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-800 mt-1">
                    <button
                      onClick={() => {
                        setShowRoleMenu(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-950/40 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('auth')}
                className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-lg transition-all whitespace-nowrap shrink-0 shadow-[0_0_18px_rgba(6,182,212,0.35)] flex items-center gap-1.5 hover:scale-[1.02]"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Sign Up</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
