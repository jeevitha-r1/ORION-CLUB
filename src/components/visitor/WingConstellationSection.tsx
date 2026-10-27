/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WINGS_DATA } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { WingInfo } from '../../types';
import {
  ArrowRight,
  Compass,
  Sparkles,
  Building2,
  Palette,
  Cpu,
  Film,
  ShieldAlert,
  Orbit,
  Radio,
  Eye,
  Layers,
  Zap,
} from 'lucide-react';

const WING_ICONS: Record<string, React.ElementType> = {
  internal_external: Building2,
  cultural: Palette,
  technical: Cpu,
  media_marketing: Film,
  discipline: ShieldAlert,
};

// Celestial coordinates for Igloo-grade technical realism
const CELESTIAL_COORDINATES: Record<string, { ra: string; dec: string; spectral: string; distance: string }> = {
  internal_external: { ra: '05h 32m 00s', dec: '+00° 17′ 56″', spectral: 'Class A2V (White)', distance: '860 ly' },
  cultural: { ra: '05h 14m 32s', dec: '-08° 12′ 06″', spectral: 'Class B8Ia (Blue Supergiant)', distance: '1,340 ly' },
  technical: { ra: '05h 55m 10s', dec: '+07° 24′ 25″', spectral: 'Class M2Iab (Red Supergiant)', distance: '642 ly' },
  media_marketing: { ra: '05h 25m 07s', dec: '+06° 20′ 59″', spectral: 'Class B2III (Giant Blue)', distance: '1,120 ly' },
  discipline: { ra: '05h 40m 45s', dec: '-01° 56′ 34″', spectral: 'Class O9.5Ib (Supergiant)', distance: '1,200 ly' },
};

export const WingConstellationSection: React.FC = () => {
  const { navigateTo } = useApp();
  const [hoveredWing, setHoveredWing] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'corridor' | 'orbital_map'>('corridor');

  // Pulse animation phase for traveling photons
  const [pulseTime, setPulseTime] = useState(0);

  useEffect(() => {
    let animId: number;
    const updatePulses = () => {
      setPulseTime((prev) => (prev + 0.018) % 1);
      animId = requestAnimationFrame(updatePulses);
    };
    animId = requestAnimationFrame(updatePulses);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleWingClick = (wing: WingInfo) => {
    if (wing.id === 'discipline') {
      navigateTo('discipline');
    } else {
      navigateTo(`visitor/wings/${wing.id}`);
    }
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Orbit className="w-4 h-4 animate-spin text-cyan-400" style={{ animationDuration: '14s' }} />
          <span>Milky Way Spiral Sector 07</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Living Constellations</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight mb-4">
          EXPLORE THE FIVE WINGS OF ORION
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Traverse the five foundational constellations anchored within the spiral arms of ORION.
          Each stellar formation is a living nexus of energy, talent, and disciplined execution.
        </p>

        {/* Viewport Mode Switcher (Igloo.inc inspired spatial toggle) */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-xl">
          <button
            onClick={() => setViewMode('corridor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
              viewMode === 'corridor'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Spiral Expedition View</span>
          </button>
          <button
            onClick={() => setViewMode('orbital_map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
              viewMode === 'orbital_map'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>Galactic Orbital Map</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: THE SIGNATURE VERTICAL SPIRAL EXPEDITION */}
      {viewMode === 'corridor' && (
        <div className="relative">
          {/* Central Luminous Galactic Beam connecting all 5 formations */}
          <div
            className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 pointer-events-none hidden lg:block"
            aria-hidden="true"
          >
            <div className="w-full h-full bg-gradient-to-b from-cyan-400/50 via-purple-500/40 to-red-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          </div>

          <div className="space-y-20 lg:space-y-28">
            {WINGS_DATA.map((wing, index) => {
              const Icon = WING_ICONS[wing.id] || Compass;
              const isHovered = hoveredWing === wing.id;
              const isEven = index % 2 === 0;
              const astro = CELESTIAL_COORDINATES[wing.id] || {
                ra: '05h 30m',
                dec: '+00° 00′',
                spectral: 'Class B',
                distance: '1,000 ly',
              };

              return (
                <motion.div
                  key={wing.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredWing(wing.id)}
                  onMouseLeave={() => setHoveredWing(null)}
                  onClick={() => handleWingClick(wing)}
                  className={`relative group rounded-3xl p-6 sm:p-8 lg:p-12 bg-slate-950/75 border border-slate-800 hover:border-slate-700 backdrop-blur-2xl transition-all duration-500 cursor-pointer overflow-hidden ${
                    isHovered ? 'shadow-[0_0_50px_rgba(14,165,233,0.22)]' : ''
                  }`}
                >
                  {/* Aurora Borealis Ambient Flare on Hover */}
                  <div
                    className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none blur-2xl"
                    style={{
                      background: `radial-gradient(ellipse at ${isEven ? '80%' : '20%'} 50%, ${wing.accentColor}, transparent 65%)`,
                    }}
                  />

                  {/* Corner Celestial HUD Readout */}
                  <div className="absolute top-4 right-6 hidden sm:flex items-center gap-3 text-[11px] font-mono text-slate-500 pointer-events-none">
                    <span>RA: {astro.ra}</span>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span>DIST: {astro.distance}</span>
                  </div>

                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                      isEven ? '' : 'lg:grid-flow-dense'
                    }`}
                  >
                    {/* Text Details (6 cols) */}
                    <div
                      className={`lg:col-span-6 flex flex-col justify-center ${
                        isEven ? 'lg:order-1' : 'lg:col-start-7 lg:order-2'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                          style={{
                            backgroundColor: `${wing.accentColor}20`,
                            color: wing.accentColor,
                            border: `1px solid ${wing.accentColor}50`,
                          }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                            <span className="font-bold uppercase tracking-wider text-white">Sector 0{index + 1}</span>
                            <span aria-hidden="true">·</span>
                            <span style={{ color: wing.accentColor }}>{wing.starCount} Anchored Stars</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">{astro.spectral}</span>
                        </div>
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-2">
                        {wing.name}
                      </h3>

                      <p className="text-xs font-mono tracking-wider uppercase text-slate-400 mb-4" style={{ color: wing.accentColor }}>
                        "{wing.tagline}"
                      </p>

                      <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        {wing.description}
                      </p>

                      {/* Directives checklist */}
                      <div className="space-y-2 mb-8">
                        {wing.responsibilities.slice(0, 3).map((resp, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-400">
                            <Zap
                              className="w-3.5 h-3.5 mt-0.5 shrink-0"
                              style={{ color: wing.accentColor }}
                            />
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Prompt */}
                      <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                        <span
                          className="text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5"
                          style={{ color: wing.accentColor }}
                        >
                          {wing.id === 'discipline' ? 'ENTER DISCIPLINE COMMAND · AUTH REQUIRED 🔒' : `ENGAGE ${wing.shortName.toUpperCase()} PROTOCOL`}
                        </span>
                        <ArrowRight
                          className="w-4 h-4 transform group-hover:translate-x-2 transition-transform"
                          style={{ color: wing.accentColor }}
                        />
                      </div>
                    </div>

                    {/* Living Animated Galaxy Chamber (6 cols) */}
                    <div
                      className={`lg:col-span-6 flex items-center justify-center ${
                        isEven ? 'lg:order-2' : 'lg:col-start-1 lg:order-1'
                      }`}
                    >
                      <div className="relative w-full max-w-[440px] aspect-square rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-xl group-hover:border-slate-700 transition-colors">
                        {/* Background Galaxy Dust & Radial Coordinates */}
                        <div
                          className="absolute inset-0 opacity-25 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at 50% 50%, ${wing.accentColor}30, transparent 70%)`,
                          }}
                        />

                        {/* Rotating Orbital Reticle Rings */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 400">
                          <circle
                            cx="200"
                            cy="200"
                            r="80"
                            fill="none"
                            stroke={wing.accentColor}
                            strokeWidth="0.8"
                            strokeDasharray="4 8"
                            className="animate-spin"
                            style={{ animationDuration: '35s' }}
                          />
                          <circle
                            cx="200"
                            cy="200"
                            r="140"
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="0.5"
                            strokeDasharray="6 12"
                            className="animate-spin"
                            style={{ animationDuration: '60s', animationDirection: 'reverse' }}
                          />
                          <circle
                            cx="200"
                            cy="200"
                            r="185"
                            fill="none"
                            stroke="#64748b"
                            strokeWidth="0.5"
                            strokeDasharray="2 6"
                          />
                          {/* Crosshair telemetry lines */}
                          <line x1="200" y1="10" x2="200" y2="390" stroke="#475569" strokeWidth="0.4" strokeDasharray="3 6" />
                          <line x1="10" y1="200" x2="390" y2="200" stroke="#475569" strokeWidth="0.4" strokeDasharray="3 6" />
                        </svg>

                        {/* Interactive Constellation SVG with Travelling Photons */}
                        <svg
                          viewBox="0 0 100 100"
                          className="relative w-full h-full filter drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]"
                        >
                          <defs>
                            <radialGradient id={`glow-${wing.id}`} cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                              <stop offset="40%" stopColor={wing.accentColor} stopOpacity="0.8" />
                              <stop offset="100%" stopColor={wing.accentColor} stopOpacity="0" />
                            </radialGradient>
                          </defs>

                          {/* Base Connecting Filaments */}
                          {wing.connections.map(([fromIdx, toIdx], lineIdx) => {
                            const starA = wing.stars[fromIdx];
                            const starB = wing.stars[toIdx];
                            if (!starA || !starB) return null;

                            return (
                              <g key={`filament-${lineIdx}`}>
                                {/* Dim underlying line */}
                                <line
                                  x1={starA.x}
                                  y1={starA.y}
                                  x2={starB.x}
                                  y2={starB.y}
                                  stroke={isHovered ? wing.accentColor : '#475569'}
                                  strokeWidth={isHovered ? 1.2 : 0.8}
                                  strokeOpacity={isHovered ? 0.85 : 0.4}
                                  className="transition-all duration-300"
                                />

                                {/* Travelling Photon / Energy Impulse along this line */}
                                {(() => {
                                  // Linear interpolation for travelling energy packet
                                  const t = (pulseTime + (lineIdx * 0.17)) % 1;
                                  const px = starA.x + (starB.x - starA.x) * t;
                                  const py = starA.y + (starB.y - starA.y) * t;

                                  return (
                                    <circle
                                      cx={px}
                                      cy={py}
                                      r={isHovered ? 1.8 : 1.2}
                                      fill="#ffffff"
                                      className="filter drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                                    />
                                  );
                                })()}
                              </g>
                            );
                          })}

                          {/* Pulsing Star Nodes */}
                          {wing.stars.map((star, starIdx) => {
                            const nodeBaseSize = (star.size || 4.5) * 0.45;
                            const isNodeHovered = isHovered;

                            return (
                              <g key={`star-${starIdx}`}>
                                {/* Rotating target ring */}
                                <circle
                                  cx={star.x}
                                  cy={star.y}
                                  r={nodeBaseSize * 3}
                                  fill="none"
                                  stroke={wing.accentColor}
                                  strokeWidth="0.4"
                                  strokeDasharray="2 3"
                                  strokeOpacity={isNodeHovered ? 0.9 : 0.35}
                                  className="animate-spin"
                                  style={{ animationDuration: `${12 + starIdx * 2}s` }}
                                />

                                {/* Outer luminous aura */}
                                <circle
                                  cx={star.x}
                                  cy={star.y}
                                  r={isNodeHovered ? nodeBaseSize * 3.5 : nodeBaseSize * 2.2}
                                  fill={`url(#glow-${wing.id})`}
                                  fillOpacity={isNodeHovered ? 0.8 : 0.4}
                                  className="transition-all duration-300"
                                />

                                {/* Star Core Point */}
                                <circle
                                  cx={star.x}
                                  cy={star.y}
                                  r={isNodeHovered ? nodeBaseSize * 1.3 : nodeBaseSize}
                                  fill="#ffffff"
                                  className="transition-all duration-300"
                                />

                                {/* Node Label on hover */}
                                {star.label && (
                                  <text
                                    x={star.x}
                                    y={star.y - 4}
                                    fill={isNodeHovered ? '#ffffff' : '#94a3b8'}
                                    fontSize="2.8"
                                    textAnchor="middle"
                                    className="font-mono select-none transition-colors"
                                  >
                                    {star.label}
                                  </text>
                                )}
                              </g>
                            );
                          })}
                        </svg>

                        {/* Technical Coordinates Monogram in bottom corner */}
                        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: wing.accentColor }} />
                          <span className="tracking-wider">{wing.name.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: THE GALACTIC ORBITAL MAP (PANORAMIC MILKY WAY ALIGNMENT) */}
      {viewMode === 'orbital_map' && (
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950/85 border border-slate-800 backdrop-blur-2xl text-center relative overflow-hidden animate-in fade-in duration-300">
          <div className="max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              Galactic Cartography System
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              ORION Galactic Core & Orbital Stations
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              All five wings mapped in synchronous orbit around the central constitutional singularity. Click any node to teleport into that wing's operational dossier.
            </p>
          </div>

          {/* Interactive Circular Orbital Stage */}
          <div className="relative w-full max-w-2xl mx-auto aspect-square flex items-center justify-center">
            {/* Concentric Orbital Rings */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
              <circle cx="300" cy="300" r="70" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 5" />
              <circle cx="300" cy="300" r="140" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="300" cy="300" r="210" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 5" />
              <circle cx="300" cy="300" r="280" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 6" />
              <line x1="300" y1="20" x2="300" y2="580" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3 5" />
              <line x1="20" y1="300" x2="580" y2="300" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3 5" />
            </svg>

            {/* Central Supermassive Core: ORION */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.6)] flex flex-col items-center justify-center">
              <img
                src="/assets/aistudio/image_13ebcba2.png"
                alt="ORION Core"
                className="w-10 h-10 object-contain filter invert contrast-125"
              />
              <span className="text-[9px] font-mono font-bold text-cyan-300 mt-0.5">CORE</span>
            </div>

            {/* 5 Orbiting Wing Stations */}
            {WINGS_DATA.map((wing, i) => {
              const angle = (i * (Math.PI * 2)) / 5 - Math.PI / 2;
              const radius = 190;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const Icon = WING_ICONS[wing.id] || Compass;

              return (
                <div
                  key={wing.id}
                  onClick={() => handleWingClick(wing)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  className="absolute z-20 group cursor-pointer flex flex-col items-center"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-125 shadow-xl"
                    style={{
                      backgroundColor: `${wing.accentColor}25`,
                      border: `2px solid ${wing.accentColor}`,
                      color: wing.accentColor,
                      boxShadow: `0 0 25px ${wing.accentColor}40`,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="mt-2 text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                    {wing.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Teleport →</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
