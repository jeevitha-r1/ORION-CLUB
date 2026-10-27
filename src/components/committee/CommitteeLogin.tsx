/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMMITTEE_ACCOUNTS } from '../../data/mockData';
import { ShieldCheck, Lock, Mail, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export const CommitteeLogin: React.FC = () => {
  const { loginCommittee, loginWithRevaSSO, navigateTo } = useApp();
  const [authMethod, setAuthMethod] = useState<'reva_sso' | 'credentials'>('reva_sso');
  const [revaId, setRevaId] = useState('proctor.discipline@reva.edu.in');
  const [email, setEmail] = useState('maya.patel@orion.club');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = loginCommittee(email);
    if (!ok) {
      setError('Unauthorized credentials. Only designated core committee members may enter.');
    }
  };

  const handleRevaSSOSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!revaId.trim()) {
      setError('Please enter your REVA Committee / Proctor ID.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ok = loginWithRevaSSO(revaId, 'committee');
      if (!ok) {
        setError('REVA Microsoft SSO authorization failed.');
      }
    }, 500);
  };

  const handleSelectRole = (accountEmail: string) => {
    setEmail(accountEmail);
    loginCommittee(accountEmail);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-950/70 border border-amber-800/60 p-2.5 mx-auto mb-4 flex items-center justify-center">
            <img
              src="/assets/aistudio/image_13ebcba2.png"
              alt="ORION"
              className="w-full h-full object-contain filter invert contrast-125"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Sign In for the Core Committee</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Restricted operational gateway. Authenticate using your REVA ID (Microsoft SSO) or executive credentials to load your assigned wing dashboard.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
          {/* Method Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-6 text-xs font-mono font-medium">
            <button
              type="button"
              onClick={() => setAuthMethod('reva_sso')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                authMethod === 'reva_sso'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
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
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Executive Key</span>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {authMethod === 'reva_sso' ? (
            <form onSubmit={handleRevaSSOSubmit} className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  REVA Official Committee / Proctor Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={revaId}
                    onChange={(e) => setRevaId(e.target.value)}
                    placeholder="proctor.discipline@reva.edu.in"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying REVA Committee Clearance...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Authenticate via REVA Microsoft SSO</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Executive Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@orion.club"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Cryptographic Key / Passphrase</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                <span>Authenticate & Load Wing Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick 1-Click Role Access for Reviewers */}
          <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                1-Click Executive Identities
              </span>
              <span className="text-[10px] font-mono text-amber-400">Demo Mode Active</span>
            </div>

            <div className="space-y-2">
              {COMMITTEE_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectRole(acc.email)}
                  className="w-full p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 flex items-center justify-between transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-7 h-7 rounded-lg object-cover border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white group-hover:text-amber-300">
                          {acc.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-slate-400">
                          {acc.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 block">{acc.roleTitle}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-amber-400 group-hover:translate-x-1 transition-transform">
                    Enter →
                  </span>
                </button>
              ))}
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
