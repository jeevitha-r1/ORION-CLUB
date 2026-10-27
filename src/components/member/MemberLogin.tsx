/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle, Users } from 'lucide-react';

export const MemberLogin: React.FC = () => {
  const { loginMember, loginWithRevaSSO, navigateTo } = useApp();
  const [authMethod, setAuthMethod] = useState<'reva_sso' | 'credentials'>('reva_sso');
  const [revaId, setRevaId] = useState('R23CS108@reva.edu.in');
  const [email, setEmail] = useState('alex.chen@orion.club');
  const [password, setPassword] = useState('••••••••••');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = loginMember(email);
    if (!success) {
      setError('Member authentication failed. Please check your credentials or pick a demo identity.');
    }
  };

  const handleRevaSSOSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!revaId.trim()) {
      setError('Please enter your REVA ID (e.g. R23CS108@reva.edu.in).');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const success = loginWithRevaSSO(revaId, 'member');
      if (!success) {
        setError('REVA Microsoft SSO verification failed.');
      }
    }, 500);
  };

  const handleQuickDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    loginMember(demoEmail);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-violet-950/70 border border-violet-800/60 p-2.5 mx-auto mb-4 flex items-center justify-center">
            <img
              src="/assets/aistudio/image_13ebcba2.png"
              alt="ORION"
              className="w-full h-full object-contain filter invert contrast-125"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Sign In for the Member</h1>
          <p className="text-xs text-slate-400 mt-1">Authenticate to access your member dashboard, points, and exclusive activities.</p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
          {/* Method Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-6 text-xs font-mono font-medium">
            <button
              type="button"
              onClick={() => setAuthMethod('reva_sso')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                authMethod === 'reva_sso'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>REVA Microsoft SSO</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('credentials')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                authMethod === 'credentials'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Club Email</span>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {authMethod === 'reva_sso' ? (
            <form onSubmit={handleRevaSSOSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  REVA University ID / Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={revaId}
                    onChange={(e) => setRevaId(e.target.value)}
                    placeholder="R23CS108@reva.edu.in or R23CS108"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-violet-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying with REVA SSO...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Sign In with REVA Microsoft SSO</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Club Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="member@orion.club"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Club Passcode</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                <span>Authenticate & Enter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Instant 1-Click Demo Profiles */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3 text-center">
              Quick Test Identities (1-Click Demo)
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('alex.chen@orion.club')}
                className="w-full p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-violet-500/50 text-left flex items-center justify-between text-xs text-slate-300 transition-colors"
              >
                <div>
                  <span className="font-semibold text-white block">Alex Chen (Rank #1)</span>
                  <span className="text-[11px] text-slate-500">R23CS108@reva.edu.in · Technical Wing</span>
                </div>
                <span className="text-[10px] font-mono text-violet-400">Sign In →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('zara.thorne@orion.club')}
                className="w-full p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-violet-500/50 text-left flex items-center justify-between text-xs text-slate-300 transition-colors"
              >
                <div>
                  <span className="font-semibold text-white block">Zara Thorne (Rank #2)</span>
                  <span className="text-[11px] text-slate-500">R22CU044@reva.edu.in · Cultural Wing</span>
                </div>
                <span className="text-[10px] font-mono text-violet-400">Sign In →</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigateTo('visitor')}
            className="text-xs font-mono text-slate-500 hover:text-slate-400"
          >
            ← Return to Campus Home
          </button>
        </div>
      </div>
    </div>
  );
};
