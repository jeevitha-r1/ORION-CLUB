/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  CheckCircle2,
  AlertCircle,
  Building2,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';

interface TwoColumnAuthViewProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const TwoColumnAuthView: React.FC<TwoColumnAuthViewProps> = ({ isModal = false, onClose }) => {
  const { loginWithRevaSSO, navigateTo } = useApp();

  // Column 1: Member state
  const [memberInput, setMemberInput] = useState('R23CS108@reva.edu.in');
  const [isMemberLoading, setIsMemberLoading] = useState(false);
  const [memberError, setMemberError] = useState('');

  // Column 2: Core Committee state
  const [committeeInput, setCommitteeInput] = useState('proctor.discipline@reva.edu.in');
  const [isCommitteeLoading, setIsCommitteeLoading] = useState(false);
  const [committeeError, setCommitteeError] = useState('');

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMemberError('');
    if (!memberInput.trim()) {
      setMemberError('Please enter your REVA Student ID or Email (e.g. R23CS108@reva.edu.in).');
      return;
    }

    setIsMemberLoading(true);
    setTimeout(() => {
      setIsMemberLoading(false);
      const ok = loginWithRevaSSO(memberInput.trim(), 'member');
      if (ok) {
        if (onClose) onClose();
      } else {
        setMemberError('REVA Microsoft SSO authentication failed. Please check your Student ID.');
      }
    }, 600);
  };

  const handleCommitteeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCommitteeError('');
    if (!committeeInput.trim()) {
      setCommitteeError('Please enter your REVA Core Committee or Proctor Email.');
      return;
    }

    setIsCommitteeLoading(true);
    setTimeout(() => {
      setIsCommitteeLoading(false);
      const ok = loginWithRevaSSO(committeeInput.trim(), 'committee');
      if (ok) {
        if (onClose) onClose();
      } else {
        setCommitteeError('REVA Committee credentials could not be verified.');
      }
    }, 600);
  };

  const handleQuickMember = (id: string) => {
    setMemberInput(id);
    setMemberError('');
    setIsMemberLoading(true);
    setTimeout(() => {
      setIsMemberLoading(false);
      loginWithRevaSSO(id, 'member');
      if (onClose) onClose();
    }, 400);
  };

  const handleQuickCommittee = (id: string) => {
    setCommitteeInput(id);
    setCommitteeError('');
    setIsCommitteeLoading(true);
    setTimeout(() => {
      setIsCommitteeLoading(false);
      loginWithRevaSSO(id, 'committee');
      if (onClose) onClose();
    }, 400);
  };

  return (
    <div className={`w-full ${isModal ? 'p-2 sm:p-4' : 'max-w-6xl mx-auto px-4 py-10 sm:py-16'}`}>
      {/* Central Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REVA UNIVERSITY MICROSOFT SSO GATEWAY</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Sign In / Sign Up
        </h1>
        <p className="text-sm font-mono text-cyan-400 mt-2 uppercase tracking-widest font-semibold">
          ORION — Earned, Not Favored!
        </p>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Please select your role and enter your official REVA credentials. You will be authenticated via
          Microsoft SSO and directed to your dedicated portal.
        </p>
      </div>

      {/* Two Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* ======================================================== */}
        {/* COLUMN 1: MEMBER PORTAL                                  */}
        {/* ======================================================== */}
        <div className="flex flex-col justify-between rounded-3xl bg-slate-900/90 border border-violet-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(139,92,246,0.18)] hover:border-violet-500/70 transition-all backdrop-blur-md relative overflow-hidden group">
          {/* Subtle cosmic accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-cyan-500 to-indigo-600" />

          <div>
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-950/80 border border-violet-700/80 flex items-center justify-center text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-violet-950/90 border border-violet-600/70 text-violet-300 font-bold uppercase tracking-wider">
                Member Portal
              </span>
            </div>

            <h2 className="text-2xl font-display font-bold text-white group-hover:text-violet-300 transition-colors">
              Sign In for the Member
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              For active and new ORION student members across Technical, I&E, Cultural, Media, and Discipline wings.
              Track merit points, access hackathons, view club leaderboards, and showcase projects.
            </p>

            {/* SSO Notice */}
            <div className="mt-4 p-3 rounded-xl bg-violet-950/30 border border-violet-900/50 flex items-center gap-2.5 text-xs text-violet-200">
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5 shrink-0">
                <div className="bg-[#f25022] rounded-xs" />
                <div className="bg-[#7fba00] rounded-xs" />
                <div className="bg-[#00a4ef] rounded-xs" />
                <div className="bg-[#ffb900] rounded-xs" />
              </div>
              <span>REVA Microsoft 365 SSO Federation</span>
            </div>

            {/* Error banner */}
            {memberError && (
              <div className="mt-4 p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{memberError}</span>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleMemberSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 font-medium block mb-1.5">
                  REVA Student Mail ID / SRN
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={memberInput}
                    onChange={(e) => setMemberInput(e.target.value)}
                    placeholder="e.g. R23CS108@reva.edu.in or R23CS108"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-400 font-mono transition-colors shadow-inner"
                  />
                  <div className="absolute right-3 top-3 text-[10px] font-mono text-violet-400/80 bg-violet-950/80 px-2 py-0.5 rounded border border-violet-800/60 pointer-events-none">
                    @reva.edu.in
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Enter your university SRN or REVA Microsoft mail ID to sign in or register automatically.
                </p>
              </div>

              <button
                type="submit"
                disabled={isMemberLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:scale-[1.01]"
              >
                {isMemberLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating Member SSO...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Authenticate & Enter Member Dashboard →</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Member Accounts */}
          <div className="mt-8 pt-4 border-t border-slate-800">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
              Instant 1-Click Member SSO Simulation:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickMember('R23CS108@reva.edu.in')}
                className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-violet-500/60 text-left transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-300">
                  <Users className="w-3.5 h-3.5 text-violet-400" />
                  <span>Alex Chen (Tech Wing)</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  R23CS108@reva.edu.in · 480 Pts
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickMember('R22EC042@reva.edu.in')}
                className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-violet-500/60 text-left transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sara Khan (Cultural Wing)</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  R22EC042@reva.edu.in · 320 Pts
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* COLUMN 2: CORE COMMITTEE PORTAL                          */}
        {/* ======================================================== */}
        <div className="flex flex-col justify-between rounded-3xl bg-slate-900/90 border border-amber-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.18)] hover:border-amber-500/70 transition-all backdrop-blur-md relative overflow-hidden group">
          {/* Subtle cosmic accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-red-500 to-amber-600" />

          <div>
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-700/80 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-950/90 border border-amber-600/70 text-amber-300 font-bold uppercase tracking-wider">
                Core Committee & Proctors
              </span>
            </div>

            <h2 className="text-2xl font-display font-bold text-white group-hover:text-amber-300 transition-colors">
              Sign In for the Core Committee
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Restricted operational console for Technical Leads, I&E Logistics, Cultural, Media, and Discipline Proctors.
              Directs to Committee management console or Proctor clearance.
            </p>

            {/* Security clearance notice */}
            <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-900/50 flex items-center gap-2.5 text-xs text-amber-200">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Zero-Leakage Institutional Security Clearance</span>
            </div>

            {/* Error banner */}
            {committeeError && (
              <div className="mt-4 p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{committeeError}</span>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleCommitteeSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 font-medium block mb-1.5">
                  REVA Committee / Proctor Mail ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={committeeInput}
                    onChange={(e) => setCommitteeInput(e.target.value)}
                    placeholder="e.g. proctor.discipline@reva.edu.in or maya.patel@reva.edu.in"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono transition-colors shadow-inner"
                  />
                  <div className="absolute right-3 top-3 text-[10px] font-mono text-amber-400/80 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60 pointer-events-none">
                    Verified Lead
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Proctors (e.g. proctor.discipline@reva) route to Discipline Console; leads route to Committee Dashboard.
                </p>
              </div>

              <button
                type="submit"
                disabled={isCommitteeLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-[1.01]"
              >
                {isCommitteeLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Committee Clearance...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 text-slate-950" />
                    <span>Authenticate & Enter Committee Console →</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Committee Accounts */}
          <div className="mt-8 pt-4 border-t border-slate-800">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
              Instant 1-Click Committee SSO Simulation:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickCommittee('proctor.discipline@reva.edu.in')}
                className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-red-500/60 text-left transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-red-300">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  <span>Marcus Vance (Chief Proctor)</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  proctor.discipline@reva.edu.in
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickCommittee('maya.patel@reva.edu.in')}
                className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/60 text-left transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Maya Patel (Tech Admin)</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  maya.patel@reva.edu.in
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer reassurance */}
      <div className="mt-8 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-3">
        <span>Microsoft Azure AD / Office 365 Protected</span>
        <span>·</span>
        <span>REVA Campus Identity Federation</span>
        <span>·</span>
        <button
          onClick={() => navigateTo('visitor')}
          className="text-cyan-400 hover:underline cursor-pointer"
        >
          Return to Campus Home
        </button>
      </div>
    </div>
  );
};
