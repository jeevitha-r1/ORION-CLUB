/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export const AudioPromptModal: React.FC = () => {
  const { showPromptModal, enableAudio, muteAudio } = useAudio();

  if (!showPromptModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      {/* Outer ambient glow */}
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.18)] p-6 sm:p-8 text-white overflow-hidden">
        {/* Decorative background grid and nebula */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Emblem Icon with animated pulse */}
          <div className="relative mb-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_24px_rgba(6,182,212,0.25)]">
              <Music className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div className="absolute -top-1.5 -right-1.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ORION Soundscape Experience</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white mb-3">
            Enable Ambient Cosmic Music?
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed max-w-md mb-8">
            ORION features an immersive, relaxing ambient soundscape composed of gentle harmonic chords and celestial chimes designed for browsing. Would you like to enable it now?
          </p>

          {/* Action Choice Buttons */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
            {/* Enable Music Button */}
            <button
              onClick={enableAudio}
              className="group relative flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-semibold text-sm transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:scale-[1.02] cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-slate-950" />
              <span>Enable Music</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/30 text-slate-900 font-bold ml-1">
                Audio On
              </span>
            </button>

            {/* Mute Button */}
            <button
              onClick={muteAudio}
              className="group flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-300 hover:text-white font-medium text-sm transition-all cursor-pointer"
            >
              <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
              <span>Explore in Mute</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 ml-1">
                Silent
              </span>
            </button>
          </div>

          {/* User hint */}
          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <span>💡 You can toggle sound and adjust volume anytime using the controller in the top bar.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
