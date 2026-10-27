/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  APEX_EXECUTIVES,
  WING_HIERARCHIES,
  ALL_TEAM_MEMBERS,
  TeamMember,
} from '../../data/teamHierarchyData';
import { WingId } from '../../types';
import {
  Crown,
  Shield,
  Users,
  Mail,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MeetTheTeamSection: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'apex' | 'directors' | 'secretaries' | 'leads' | 'coordinators'>('all');
  const [wingFilter, setWingFilter] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Filter members based on category and wing
  const filteredMembers = ALL_TEAM_MEMBERS.filter((m) => {
    // Category filter
    let matchCategory = true;
    if (activeFilter === 'apex') matchCategory = m.tier === 'executive';
    else if (activeFilter === 'directors') matchCategory = m.tier === 'director';
    else if (activeFilter === 'secretaries') matchCategory = m.tier === 'secretary';
    else if (activeFilter === 'leads') matchCategory = m.tier === 'lead' || m.tier === 'co_lead';
    else if (activeFilter === 'coordinators') matchCategory = m.tier === 'coordinator';

    // Wing filter
    let matchWing = true;
    if (wingFilter !== 'all') {
      matchWing = m.wingId === wingFilter;
    }

    return matchCategory && matchWing;
  });

  // Color mapper helper
  const getWingColor = (wingId: WingId | 'apex') => {
    switch (wingId) {
      case 'technical':
        return '#22d3ee';
      case 'internal_external':
        return '#38bdf8';
      case 'cultural':
        return '#c084fc';
      case 'media_marketing':
        return '#fbbf24';
      case 'discipline':
        return '#ef4444';
      default:
        return '#f59e0b'; // Apex Gold
    }
  };

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80 relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-cyan-300 font-mono mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>ORION COMMAND & WING GOVERNANCE</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Meet the Team
        </h2>

        <p className="text-base sm:text-lg text-slate-300 mt-3 font-medium">
          Crisp governance details of the President, Chief Secretary, 5 Wing Directors, Secretaries, Leads, Co-Leads, and Coordinators.
        </p>

        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
          Every appointment within ORION is earned strictly through verified impact and craftsmanship. Explore the
          complete leadership structure across all five specialized operational wings.
        </p>
      </div>

      {/* 1. APEX EXECUTIVE SHOWCASE: President & Chief Secretary */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-600/80 flex items-center justify-center text-amber-400">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-white">ORION Apex Executive Council</h3>
              <p className="text-xs text-slate-400 font-mono">Constitutional Leadership & Cross-Campus Governance</p>
            </div>
          </div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest hidden sm:inline">
            Constitutional Tier 0
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {APEX_EXECUTIVES.map((exec) => (
            <div
              key={exec.id}
              className="rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-amber-950/20 border border-amber-500/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(245,158,11,0.12)] hover:border-amber-500/70 transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={exec.avatar}
                      alt={exec.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/60 shadow-lg group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/70 text-amber-300 font-bold uppercase tracking-wider inline-block">
                        {exec.role}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-display font-bold text-white mt-1 group-hover:text-amber-200 transition-colors">
                        {exec.name}
                      </h4>
                      <p className="text-xs font-mono text-cyan-400">{exec.revaId}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4 text-xs sm:text-sm">
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {exec.bio}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
                    <span className="font-mono text-slate-500 uppercase text-[10px] block mb-0.5">Primary Directive:</span>
                    {exec.focusArea}
                  </div>
                </div>

                {exec.skills && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {exec.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <a
                  href={`mailto:${exec.email}`}
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{exec.email}</span>
                </a>
                <span className="text-slate-500">Official Executive Seal</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. FIVE WINGS' DIRECTORS HIGHLIGHT */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-600/80 flex items-center justify-center text-cyan-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-white">The Five Wing Faculty Directors</h3>
              <p className="text-xs text-slate-400 font-mono">Institutional Faculty Deans & Specialized Wing Mentors</p>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest hidden sm:inline">
            Tier 1 Directorate
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.values(WING_HIERARCHIES).map((wing) => {
            const dir = wing.director;
            return (
              <div
                key={dir.id}
                onClick={() => setSelectedMember(dir)}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 hover:border-cyan-400/70 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${wing.accentColor}20`,
                        color: wing.accentColor,
                        border: `1px solid ${wing.accentColor}40`,
                      }}
                    >
                      {wing.wingName}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo(`visitor/wings/${wing.wingId}`);
                      }}
                      className="text-[10px] font-mono text-slate-500 hover:text-white flex items-center gap-0.5"
                    >
                      <span>Wing Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3.5 mb-3">
                    <img
                      src={dir.avatar}
                      alt={dir.name}
                      className="w-14 h-14 rounded-xl object-cover border-2 shrink-0 group-hover:scale-105 transition-transform"
                      style={{ borderColor: wing.accentColor }}
                    />
                    <div className="min-w-0">
                      <h4 className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {dir.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-300 mt-0.5">{dir.role}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {dir.bio}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500 truncate max-w-[160px]">{dir.email}</span>
                  <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                    Bio →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. INTERACTIVE ROSTER EXPLORER (Secretaries, Leads, Co-Leads, Coordinators) */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
          <div>
            <h3 className="text-lg font-display font-bold text-white">Full Governance Roster Explorer</h3>
            <p className="text-xs text-slate-400 font-mono">
              Browse all 32 leaders: Secretaries, Leads, Co-Leads, and Track Coordinators
            </p>
          </div>

          {/* Tier Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All (32)' },
              { id: 'directors', label: 'Directors (5)' },
              { id: 'secretaries', label: 'Secretaries (5)' },
              { id: 'leads', label: 'Leads & Co-Leads (10)' },
              { id: 'coordinators', label: 'Coordinators (21)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-semibold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wing Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by Wing:</span>
          </span>
          {[
            { id: 'all', label: 'All Wings' },
            { id: 'technical', label: 'Technical' },
            { id: 'internal_external', label: 'I&E Affairs' },
            { id: 'cultural', label: 'Cultural' },
            { id: 'media_marketing', label: 'Media & Marketing' },
            { id: 'discipline', label: 'Discipline' },
          ].map((w) => (
            <button
              key={w.id}
              onClick={() => setWingFilter(w.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                wingFilter === w.id
                  ? 'bg-slate-800 text-white border border-slate-600 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMembers.map((member) => {
            const color = getWingColor(member.wingId);
            return (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-4 hover:border-slate-700 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className="text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${color}18`,
                        color,
                      }}
                    >
                      {member.tier.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 truncate max-w-[110px]">
                      {member.wingName.replace(' Wing', '')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-800 group-hover:border-slate-600 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-display font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {member.name}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">{member.role}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="truncate max-w-[140px]">{member.email}</span>
                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">Bio →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Member Details Modal */}
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
                style={{ borderColor: getWingColor(selectedMember.wingId) }}
              />
              <div>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${getWingColor(selectedMember.wingId)}20`,
                    color: getWingColor(selectedMember.wingId),
                  }}
                >
                  {selectedMember.tier.replace('_', ' ').toUpperCase()} · {selectedMember.wingName}
                </span>
                <h3 className="text-xl font-display font-bold text-white mt-1">{selectedMember.name}</h3>
                <p className="text-xs font-mono text-slate-300">{selectedMember.role}</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Portfolio & Directives</span>
                <p className="text-slate-200 font-medium">{selectedMember.focusArea}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Crisp Detail & Background</span>
                <p className="text-slate-300 leading-relaxed">{selectedMember.bio}</p>
              </div>

              {selectedMember.skills && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1.5">Key Core Competencies</span>
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
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
