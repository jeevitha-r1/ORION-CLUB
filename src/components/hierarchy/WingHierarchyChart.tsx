/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WingId } from '../../types';
import { WING_HIERARCHIES, APEX_EXECUTIVES, TeamMember } from '../../data/teamHierarchyData';
import {
  Shield,
  Crown,
  FileText,
  Sparkles,
  Mail,
  ChevronDown,
  Layers,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Grid,
} from 'lucide-react';

interface WingHierarchyChartProps {
  wingId: WingId;
}

export const WingHierarchyChart: React.FC<WingHierarchyChartProps> = ({ wingId }) => {
  const hierarchy = WING_HIERARCHIES[wingId] || WING_HIERARCHIES.technical;
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showApexCouncil, setShowApexCouncil] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'tree' | 'grid'>('tree');

  return (
    <div className="w-full my-8 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-25"
        style={{ backgroundColor: hierarchy.accentColor }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
        style={{ backgroundColor: hierarchy.accentColor }}
      />

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800/80 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: hierarchy.accentColor }}
            />
            <span>Institutional Governance</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: hierarchy.accentColor }}>{hierarchy.wingName}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white flex items-center gap-3">
            <span>Wing Leadership Hierarchy</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-normal">
              {1 + 1 + 1 + 1 + hierarchy.coordinators.length} Officers
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            The constitutional chain of command for {hierarchy.wingName}. Direction flows from the Faculty Director
            and Secretariat down to field Leads and track Coordinators.
          </p>
        </div>

        {/* View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowApexCouncil(!showApexCouncil)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 border ${
              showApexCouncil
                ? 'bg-amber-950/40 border-amber-500/60 text-amber-300'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{showApexCouncil ? 'Hide Apex Council' : 'Show Apex Council'}</span>
          </button>

          <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-0.5">
            <button
              onClick={() => setViewMode('tree')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                viewMode === 'tree'
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Org Tree</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Roster Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: VISUAL TREE DIAGRAM (Matches Technical Wing attached hierarchy architecture) */}
      {viewMode === 'tree' ? (
        <div className="relative z-10 space-y-6">
          {/* LEVEL 0: APEX COUNCIL (Optional Toggle) */}
          {showApexCouncil && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 mb-8 animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                    ORION Executive Apex Council
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Constitutional Tier 0
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {APEX_EXECUTIVES.map((exec) => (
                  <div
                    key={exec.id}
                    onClick={() => setSelectedMember(exec)}
                    className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer flex items-center gap-3.5 group"
                  >
                    <img
                      src={exec.avatar}
                      alt={exec.name}
                      className="w-12 h-12 rounded-xl object-cover border border-amber-500/40 group-hover:scale-105 transition-transform shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                          {exec.role}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{exec.revaId}</span>
                      </div>
                      <h4 className="text-sm font-display font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                        {exec.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{exec.focusArea}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Connecting Tree Line Down to Wing Director */}
              <div className="flex flex-col items-center mt-4">
                <div className="w-px h-6 bg-gradient-to-b from-amber-500/60 to-cyan-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </div>
            </div>
          )}

          {/* LEVEL 1: WING FACULTY DIRECTOR */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <div
                onClick={() => setSelectedMember(hierarchy.director)}
                className="p-4 rounded-2xl bg-slate-950 border transition-all cursor-pointer shadow-lg group hover:scale-[1.01]"
                style={{
                  borderColor: `${hierarchy.accentColor}70`,
                  boxShadow: `0 0 25px ${hierarchy.accentColor}18`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${hierarchy.accentColor}25`,
                      color: hierarchy.accentColor,
                      border: `1px solid ${hierarchy.accentColor}50`,
                    }}
                  >
                    Tier 1 · Wing Director
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{hierarchy.director.email}</span>
                </div>

                <div className="flex items-center gap-3.5">
                  <img
                    src={hierarchy.director.avatar}
                    alt={hierarchy.director.name}
                    className="w-14 h-14 rounded-xl object-cover border shrink-0"
                    style={{ borderColor: hierarchy.accentColor }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {hierarchy.director.name}
                    </h3>
                    <p className="text-xs font-mono font-medium text-slate-300 mt-0.5" style={{ color: hierarchy.accentColor }}>
                      {hierarchy.director.role}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate mt-1">{hierarchy.director.focusArea}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tree Branch Filament: Director -> Secretary */}
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-slate-700" />
              <div className="w-2 h-2 rounded-full bg-slate-600" />
            </div>
          </div>

          {/* LEVEL 2: WING SECRETARY */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <div
                onClick={() => setSelectedMember(hierarchy.secretary)}
                className="p-4 rounded-2xl bg-slate-950/90 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer shadow-md group hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold uppercase tracking-wider border border-slate-700">
                    Tier 2 · Wing Secretary
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{hierarchy.secretary.email}</span>
                </div>

                <div className="flex items-center gap-3.5">
                  <img
                    src={hierarchy.secretary.avatar}
                    alt={hierarchy.secretary.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-display font-bold text-white group-hover:text-white transition-colors truncate">
                      {hierarchy.secretary.name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-300 mt-0.5">{hierarchy.secretary.role}</p>
                    <p className="text-[11px] text-slate-400 truncate mt-1">{hierarchy.secretary.focusArea}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tree Branch Filament: Secretary -> Lead & Co-Lead */}
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-slate-700" />
              <div className="w-2 h-2 rounded-full bg-slate-600" />
            </div>
          </div>

          {/* LEVEL 3: LEAD & CO-LEAD (Dual Command Node) */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Lead Card */}
                <div
                  onClick={() => setSelectedMember(hierarchy.lead)}
                  className="p-4 rounded-2xl bg-slate-950/90 border transition-all cursor-pointer group hover:scale-[1.01]"
                  style={{ borderColor: `${hierarchy.accentColor}50` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${hierarchy.accentColor}20`,
                        color: hierarchy.accentColor,
                      }}
                    >
                      Tier 3 · Wing Lead
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 truncate max-w-[130px]">
                      {hierarchy.lead.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={hierarchy.lead.avatar}
                      alt={hierarchy.lead.name}
                      className="w-12 h-12 rounded-xl object-cover border shrink-0"
                      style={{ borderColor: hierarchy.accentColor }}
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-display font-bold text-white truncate">{hierarchy.lead.name}</h4>
                      <p className="text-[11px] font-mono text-slate-300 mt-0.5 truncate">{hierarchy.lead.role}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{hierarchy.lead.focusArea}</p>
                    </div>
                  </div>
                </div>

                {/* Co-Lead Card */}
                <div
                  onClick={() => setSelectedMember(hierarchy.coLead)}
                  className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold uppercase tracking-wider border border-slate-700">
                      Tier 3 · Wing Co-Lead
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 truncate max-w-[130px]">
                      {hierarchy.coLead.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={hierarchy.coLead.avatar}
                      alt={hierarchy.coLead.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-display font-bold text-white truncate">{hierarchy.coLead.name}</h4>
                      <p className="text-[11px] font-mono text-slate-300 mt-0.5 truncate">{hierarchy.coLead.role}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{hierarchy.coLead.focusArea}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tree Branch Filament: Leads -> Coordinators */}
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-slate-700" />
              <div className="w-2 h-2 rounded-full bg-slate-600" />
            </div>
          </div>

          {/* LEVEL 4: RESPECTIVE TRACK COORDINATORS (Branching Grid) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  Tier 4 · Respective Track Coordinators
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {hierarchy.coordinators.length} Tracks
                </span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Click any coordinator for portfolio & contact details
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {hierarchy.coordinators.map((coord) => (
                <div
                  key={coord.id}
                  onClick={() => setSelectedMember(coord)}
                  className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/60 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <img
                        src={coord.avatar}
                        alt={coord.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-800 group-hover:border-cyan-400/80 transition-colors shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="text-xs font-display font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {coord.name}
                        </h5>
                        <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">{coord.role}</p>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {coord.bio}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="truncate max-w-[150px]">{coord.email}</span>
                    <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">Details →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: ROSTER GRID */
        <div className="relative z-10 space-y-8">
          {/* Executive & Directors */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Wing Directorate & Executive Oversight</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                onClick={() => setSelectedMember(hierarchy.director)}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img src={hierarchy.director.avatar} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Director</span>
                    <h5 className="text-sm font-bold text-white">{hierarchy.director.name}</h5>
                    <p className="text-xs text-slate-400">{hierarchy.director.email}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">{hierarchy.director.bio}</p>
              </div>

              <div
                onClick={() => setSelectedMember(hierarchy.secretary)}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img src={hierarchy.secretary.avatar} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Secretary</span>
                    <h5 className="text-sm font-bold text-white">{hierarchy.secretary.name}</h5>
                    <p className="text-xs text-slate-400">{hierarchy.secretary.email}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">{hierarchy.secretary.bio}</p>
              </div>

              <div
                onClick={() => setSelectedMember(hierarchy.lead)}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img src={hierarchy.lead.avatar} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Wing Lead</span>
                    <h5 className="text-sm font-bold text-white">{hierarchy.lead.name}</h5>
                    <p className="text-xs text-slate-400">{hierarchy.lead.email}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">{hierarchy.lead.bio}</p>
              </div>
            </div>
          </div>

          {/* Coordinators Grid */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Co-Lead & Track Coordinators</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div
                onClick={() => setSelectedMember(hierarchy.coLead)}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer"
              >
                <img src={hierarchy.coLead.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-700 mb-2" />
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Co-Lead</span>
                <h5 className="text-xs font-bold text-white truncate">{hierarchy.coLead.name}</h5>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{hierarchy.coLead.bio}</p>
              </div>

              {hierarchy.coordinators.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedMember(c)}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer"
                >
                  <img src={c.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-700 mb-2" />
                  <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold">Coordinator</span>
                  <h5 className="text-xs font-bold text-white truncate">{c.name}</h5>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{c.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MEMBER DETAIL MODAL / DRAWER */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-5">
              <img
                src={selectedMember.avatar}
                alt={selectedMember.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 shadow-lg"
                style={{ borderColor: hierarchy.accentColor }}
              />
              <div>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${hierarchy.accentColor}25`,
                    color: hierarchy.accentColor,
                  }}
                >
                  {selectedMember.tier.replace('_', ' ').toUpperCase()}
                </span>
                <h3 className="text-xl font-display font-bold text-white mt-1">{selectedMember.name}</h3>
                <p className="text-xs font-mono text-slate-300">{selectedMember.role}</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Portfolio & Focus Area</span>
                <p className="text-slate-200 font-medium">{selectedMember.focusArea}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Executive Summary</span>
                <p className="text-slate-300 leading-relaxed">{selectedMember.bio}</p>
              </div>

              {selectedMember.skills && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1.5">Specialized Competencies</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMember.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{selectedMember.email}</span>
                </a>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
