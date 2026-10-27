/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Sparkles, Target, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const PublicAboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 mb-4">
          <span>ORION — A Multidisciplinary Club</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight mb-3">
          ABOUT ORION
        </h1>

        <p className="text-2xl font-display font-semibold text-cyan-400 mb-6">
          Earned, Not Favored!
        </p>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          ORION was founded to challenge the status quo of university organizations. We reject honorary nepotism,
          empty committee rosters, and decorative titles. Every position, project lead, and stage credit inside ORION is
          proven through measurable impact.
        </p>
      </div>

      {/* The Insignia Anatomy */}
      <section className="mb-20 p-8 sm:p-12 rounded-3xl bg-slate-900/70 border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-8 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img
                src="/assets/aistudio/image_13ebcba2.png"
                alt="ORION Official Crest"
                className="w-48 h-48 object-contain filter invert contrast-125 drop-shadow-[0_0_25px_rgba(6,182,212,0.5)]"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Insignia Architecture</div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">The Anatomy of the Crest</h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <p>
                  <strong className="text-white">Twin Ascending Chevrons:</strong> Symbolize dual vectors of velocity—technological rigor and creative expression—climbing together into the future.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <p>
                  <strong className="text-white">Central Sovereign Void:</strong> Represents transparency and absolute accountability. Nothing is hidden; merit is audible and visible.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <p>
                  <strong className="text-white">Tri-Pointed Star Base:</strong> Grounded in the triad of Discipline, Execution, and Community stewardship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of Distinction */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-display font-bold text-white">What Sets ORION Apart</h2>
          <p className="text-slate-400 text-sm mt-2">
            Why engineers, artists, and leaders choose our constellation over standard clubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-white">100% Meritocracy</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Seniority does not grant authority. Freshmen and seniors compete equally on technical code challenges,
              stage rehearsals, and logistics execution.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-white">Inter-Disciplinary Synergy</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Software engineers collaborate with orchestral composers and stage lighting architects to create sensory
              experiences that transcend standard code demos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-white">Constitutional Governance</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Our independent Discipline Wing enforces strict duty rosters, attendance integrity, and conflict
              resolution protocols without executive bias.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Ready to Shape the Future?</h3>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Explore the five constellations or step inside through the authenticated portal.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => navigateTo('visitor/wings')}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            Explore the Five Wings
          </button>
          <button
            onClick={() => navigateTo('portal_select')}
            className="px-6 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-semibold text-xs tracking-wider uppercase hover:text-white transition-colors"
          >
            Choose Access Portal
          </button>
        </div>
      </div>
    </div>
  );
};
