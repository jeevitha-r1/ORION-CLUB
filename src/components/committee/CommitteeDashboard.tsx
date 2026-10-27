/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, ShieldAlert, ArrowLeft, LogOut, ExternalLink } from 'lucide-react';
import { TechAdminConsole } from './technical/TechAdminConsole';
import { VenueManagementModule } from './venues/VenueManagementModule';
import { CulturalEventsModule } from './cultural/CulturalEventsModule';
import { MediaManagementModule } from './media/MediaManagementModule';

export const CommitteeDashboard: React.FC = () => {
  const { session, logout, navigateTo, switchRoleQuickly } = useApp();

  // If not logged in as committee
  if (!session.isAuthenticated || session.role === 'visitor' || session.role === 'member') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 relative z-10">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-2xl font-display font-bold text-white">Authentication Required</h2>
          <p className="text-xs text-slate-400">
            You must authenticate using Core Committee credentials to view executive operations.
          </p>
          <button
            onClick={() => navigateTo('committee/login')}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Go to Committee Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-8">
      {/* Executive Session Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-4">
          <img
            src={session.avatar}
            alt={session.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/60 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>{session.roleTitle || 'Executive Officer'}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="capitalize">{session.wing?.replace('_', ' ')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mt-0.5">
              {session.name}
            </h1>
            <p className="text-xs font-mono text-slate-400">{session.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {session.role === 'discipline_officer' && (
            <button
              onClick={() => navigateTo('discipline')}
              className="px-4 py-2 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-semibold hover:bg-red-900/60 transition-colors flex items-center gap-2"
            >
              <span>Discipline Command</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={logout}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Dynamic Role-Based View Rendering */}
      <div>
        {session.role === 'tech_admin' && <TechAdminConsole />}
        {session.role === 'ie_lead' && <VenueManagementModule />}
        {session.role === 'cultural_lead' && <CulturalEventsModule />}
        {session.role === 'media_lead' && <MediaManagementModule />}
        {session.role === 'discipline_officer' && (
          <div className="p-8 rounded-3xl bg-slate-900/70 border border-red-800/40 text-center space-y-4">
            <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
            <h3 className="text-2xl font-display font-bold text-white">Discipline Wing Operations</h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              The Discipline Wing maintains an independent, specialized command platform for constitutional hearings,
              demerit tracking, and duty rosters.
            </p>
            <button
              onClick={() => navigateTo('discipline')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <span>Open Dedicated Discipline Platform</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
