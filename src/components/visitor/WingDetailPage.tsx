/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { WINGS_DATA } from '../../data/mockData';
import { WingId } from '../../types';
import {
  ArrowLeft,
  Mail,
  User,
  Shield,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ExternalLink,
  GitBranch,
} from 'lucide-react';
import { WingHierarchyChart } from '../hierarchy/WingHierarchyChart';

export const WingDetailPage: React.FC<{ wingId: WingId }> = ({ wingId }) => {
  const { navigateTo, events } = useApp();
  const wing = WINGS_DATA.find((w) => w.id === wingId) || WINGS_DATA[0];

  // Next wing for smooth carousel
  const currentIndex = WINGS_DATA.findIndex((w) => w.id === wing.id);
  const nextWing = WINGS_DATA[(currentIndex + 1) % WINGS_DATA.length];

  // Wing related events
  const wingEvents = events.filter((e) => e.wing === wing.id);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <button
          onClick={() => navigateTo('visitor/wings')}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Five Constellations</span>
        </button>

        <button
          onClick={() => {
            if (nextWing.id === 'discipline') {
              navigateTo('discipline');
            } else {
              navigateTo(`visitor/wings/${nextWing.id}`);
            }
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <span>Next: {nextWing.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Header with Constellation Star Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400">
            <span style={{ color: wing.accentColor }}>Wing Protocol 0{currentIndex + 1}</span>
            <span aria-hidden="true">·</span>
            <span>{wing.starCount} Stellar Nodes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            {wing.name}
          </h1>

          <p className="text-base font-medium text-slate-300 font-mono" style={{ color: wing.accentColor }}>
            "{wing.tagline}"
          </p>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
            {wing.description}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('hierarchy-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center gap-2 hover:scale-[1.02]"
              style={{
                backgroundColor: wing.accentColor,
                color: '#070a14',
                boxShadow: `0 0 20px ${wing.accentColor}40`,
              }}
            >
              <GitBranch className="w-4 h-4" />
              <span>Wing Hierarchy Chart</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('responsibilities');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold tracking-wider uppercase hover:text-white transition-colors"
            >
              Operational Scope
            </button>

            {wing.id === 'discipline' ? (
              <button
                onClick={() => navigateTo('discipline')}
                className="px-5 py-2.5 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs font-semibold tracking-wider uppercase hover:bg-red-900/50 transition-colors flex items-center gap-2"
              >
                <span>Launch Discipline Command</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => navigateTo('visitor')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 text-xs font-semibold tracking-wider uppercase hover:text-white transition-colors"
              >
                Campus Home
              </button>
            )}
          </div>
        </div>

        {/* Detailed Constellation Canvas Node Map */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col items-center justify-center shadow-2xl backdrop-blur-xl">
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
              {/* Radial guides */}
              <circle cx="50" cy="50" r="42" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 3" />

              {/* Connecting filaments */}
              {wing.connections.map(([fromIdx, toIdx], lineIdx) => {
                const starA = wing.stars[fromIdx];
                const starB = wing.stars[toIdx];
                if (!starA || !starB) return null;
                return (
                  <line
                    key={lineIdx}
                    x1={starA.x}
                    y1={starA.y}
                    x2={starB.x}
                    y2={starB.y}
                    stroke={wing.accentColor}
                    strokeWidth="1.2"
                    strokeOpacity="0.85"
                  />
                );
              })}

              {/* Stars with labels */}
              {wing.stars.map((star, idx) => (
                <g key={idx}>
                  <circle cx={star.x} cy={star.y} r="5" fill={wing.accentColor} fillOpacity="0.25" />
                  <circle cx={star.x} cy={star.y} r="2.5" fill="#ffffff" />
                  {star.label && (
                    <text
                      x={star.x}
                      y={star.y - 4}
                      fill="#94a3b8"
                      fontSize="3.2"
                      textAnchor="middle"
                      className="font-mono select-none"
                    >
                      {star.label}
                    </text>
                  )}
                </g>
              ))}
            </svg>

            <div className="mt-3 text-center">
              <span className="text-[11px] font-mono text-slate-400">STAR CHART: {wing.name.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CORE FEATURE: WING LEADERSHIP HIERARCHY CHART (DIRECTOR -> SECRETARY -> LEAD -> CO-LEAD -> COORDINATORS) */}
      <div id="hierarchy-section" className="scroll-mt-20">
        <WingHierarchyChart wingId={wing.id} />
      </div>

      {/* Operational Responsibilities Section */}
      <section id="responsibilities" className="py-12 border-t border-slate-800">
        <h3 className="text-xl font-display font-bold text-white mb-6">Key Directives & Operational Scope</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wing.responsibilities.map((resp, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${wing.accentColor}20`, color: wing.accentColor }}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Directive 0{i + 1}</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">{resp}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Associated Wing Initiatives & Events */}
      {wingEvents.length > 0 && (
        <section className="py-12 border-t border-slate-800">
          <h3 className="text-xl font-display font-bold text-white mb-6">Associated Wing Initiatives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wingEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase text-cyan-400">{evt.category}</span>
                    <span className="text-xs font-mono text-slate-400">{evt.date}</span>
                  </div>
                  <h4 className="text-lg font-display font-bold text-white">{evt.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2">{evt.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Venue: {evt.venue}</span>
                  <button
                    onClick={() => navigateTo('visitor/events')}
                    className="text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    Event Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
