/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { Volume2, VolumeX, Volume1, Music, Settings2 } from 'lucide-react';

interface AudioControllerProps {
  compact?: boolean;
}

export const AudioController: React.FC<AudioControllerProps> = ({ compact = false }) => {
  const { isPlaying, isMuted, volume, toggleAudio, setVolume, openPromptModal } = useAudio();
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSlider(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAudioActive = isPlaying && !isMuted;

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      {/* Main Pill Button */}
      <button
        onClick={toggleAudio}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowSlider((prev) => !prev);
        }}
        title={isAudioActive ? 'Click to Mute Music (Right-click or hover for volume)' : 'Click to Play Ambient Music'}
        className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all select-none cursor-pointer ${
          isAudioActive
            ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
        }`}
      >
        {/* Dynamic Icon */}
        {isAudioActive ? (
          volume > 0.5 ? (
            <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          ) : (
            <Volume1 className="w-3.5 h-3.5 text-cyan-400" />
          )
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
        )}

        {/* Animated Equalizer Waves when active */}
        {isAudioActive ? (
          <div className="flex items-end gap-0.5 h-3 px-0.5">
            <span className="w-0.5 bg-cyan-400 rounded-full animate-[bounce_1.2s_infinite] h-2" />
            <span className="w-0.5 bg-cyan-300 rounded-full animate-[bounce_0.8s_infinite_200ms] h-3" />
            <span className="w-0.5 bg-sky-400 rounded-full animate-[bounce_1s_infinite_400ms] h-2.5" />
            <span className="w-0.5 bg-cyan-400 rounded-full animate-[bounce_1.4s_infinite_100ms] h-1.5" />
          </div>
        ) : (
          <span className="hidden sm:inline text-[11px] text-slate-500">Muted</span>
        )}

        {/* Volume popover trigger button */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowSlider((prev) => !prev);
          }}
          className="hover:text-white pl-0.5 text-slate-500"
          title="Adjust volume"
        >
          <Settings2 className="w-3 h-3 hover:text-cyan-400 transition-colors" />
        </span>
      </button>

      {/* Popover Slider & Controls */}
      {showSlider && (
        <div className="absolute right-0 top-full mt-2 w-56 p-3 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Music className="w-3 h-3 text-cyan-400" />
              <span>Cosmic Music</span>
            </span>
            <span className="text-cyan-400 font-bold">{Math.round(volume * 100)}%</span>
          </div>

          {/* Volume Range Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setVolume(val);
            }}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500">
            <button
              onClick={() => {
                setShowSlider(false);
                openPromptModal();
              }}
              className="text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              Sound Prompt
            </button>
            <button
              onClick={() => {
                toggleAudio();
              }}
              className="text-slate-400 hover:text-white"
            >
              {isAudioActive ? 'Mute' : 'Play'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
