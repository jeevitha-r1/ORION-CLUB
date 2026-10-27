/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Users, ShieldCheck, ArrowRight, Sparkles, LockKeyhole } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OpeningPortalScreen: React.FC = () => {
  const { navigateTo, session } = useApp();
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);

  const handlePortalSelect = (portalId: string, destination: string) => {
    setSelectedPortal(portalId);
    setTimeout(() => {
      navigateTo(destination);
    }, 450);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 py-8 md:py-12 z-10 overflow-hidden select-none">
      {/* Top subtle badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 text-xs font-mono text-slate-400 tracking-widest uppercase"
      >
        <span>A Multidisciplinary Club</span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span>Gateway System</span>
      </motion.div>

      {/* Hero Central Identity */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto my-auto pt-6 pb-10">
        {/* Official ORION Logo Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 p-3 rounded-2xl bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-md flex items-center justify-center">
            {/* The user-provided ORION logo */}
            <img
              src="/assets/aistudio/image_13ebcba2.png"
              alt="ORION Official Logo"
              className="w-full h-full object-contain filter invert contrast-125 brightness-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.35)]"
            />
          </div>
        </motion.div>

        {/* ORION Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight text-white mb-3"
        >
          ORION
        </motion.h1>

        {/* Official Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-2xl md:text-3xl font-medium tracking-wide text-cyan-300 font-display mb-4"
        >
          Earned, Not Favored!
        </motion.div>

        {/* Introductory Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed"
        >
          Every journey begins with a choice. Choose your path into ORION.
        </motion.p>
      </div>

      {/* The Three Access Portals */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-4"
      >
        {/* Portal 1: VISITOR */}
        <div
          onClick={() => handlePortalSelect('visitor', 'visitor')}
          className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-md cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 ${
            selectedPortal === 'visitor' ? 'border-cyan-400 scale-[0.98] ring-2 ring-cyan-500/30' : ''
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono tracking-wider text-slate-500 uppercase">Public Access</span>
            </div>

            <h2 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-2">
              VISITOR
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Explore ORION, discover its wings, understand our initiatives and experience our public activities.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold tracking-wider text-cyan-400 group-hover:text-cyan-300">
            <span>ENTER AS VISITOR</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Portal 2: MEMBER */}
        <div
          onClick={() =>
            handlePortalSelect(
              'member',
              session.isAuthenticated && session.role === 'member' ? 'member/dashboard' : 'member/login'
            )
          }
          className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/50 backdrop-blur-md cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.18)] hover:-translate-y-1 ${
            selectedPortal === 'member' ? 'border-violet-400 scale-[0.98] ring-2 ring-violet-500/30' : ''
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-violet-500/10 transition-colors" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-violet-950/60 border border-violet-800/50 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono tracking-wider text-violet-400/80 uppercase">
                {session.isAuthenticated && session.role === 'member' ? 'Session Active' : 'Authenticated'}
              </span>
            </div>

            <h2 className="text-xl font-bold font-display text-white group-hover:text-violet-300 transition-colors mb-2">
              MEMBER
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Step inside the community. Explore your achievements, activities, performance and member-exclusive opportunities.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold tracking-wider text-violet-400 group-hover:text-violet-300">
            <span>ENTER AS MEMBER</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Portal 3: CORE COMMITTEE */}
        <div
          onClick={() =>
            handlePortalSelect(
              'committee',
              session.isAuthenticated && session.role !== 'visitor' && session.role !== 'member'
                ? session.role === 'discipline_officer'
                  ? 'discipline'
                  : 'committee/dashboard'
                : 'committee/login'
            )
          }
          className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 backdrop-blur-md cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:-translate-y-1 ${
            selectedPortal === 'committee' ? 'border-amber-400 scale-[0.98] ring-2 ring-amber-500/30' : ''
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono tracking-wider text-amber-400/80 uppercase">
                {session.isAuthenticated && session.role !== 'visitor' && session.role !== 'member'
                  ? 'Authorized'
                  : 'Restricted'}
              </span>
            </div>

            <h2 className="text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors mb-2">
              CORE COMMITTEE
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Manage responsibilities, coordinate activities and contribute to the operations that keep ORION moving.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold tracking-wider text-amber-400 group-hover:text-amber-300">
            <span>ENTER AS CORE COMMITTEE</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </motion.div>

      {/* Bottom Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-xs text-slate-500 flex flex-wrap items-center justify-center gap-3 text-center"
      >
        <span>ORION Autonomous Platform</span>
        <span aria-hidden="true">·</span>
        <span>Role-Based Access Control</span>
        <span aria-hidden="true">·</span>
        <span>Five Constellations</span>
      </motion.div>
    </div>
  );
};
