/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ambientSound } from '../audio/ambientSynth';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  showPromptModal: boolean;
  enableAudio: () => void;
  muteAudio: () => void;
  toggleAudio: () => void;
  setVolume: (val: number) => void;
  openPromptModal: () => void;
  closePromptModal: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

const STORAGE_KEY = 'orion_audio_consent_v1';

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolumeState] = useState<number>(0.35);
  const [showPromptModal, setShowPromptModal] = useState<boolean>(false);

  // Check saved preference on mount
  useEffect(() => {
    try {
      const savedChoice = localStorage.getItem(STORAGE_KEY);
      if (!savedChoice) {
        // User hasn't chosen yet - show prompt modal before website experience starts
        setShowPromptModal(true);
      } else if (savedChoice === 'enabled') {
        // User previously chose to enable music.
        // Modern browsers require a gesture before playing audio, so show prompt or wait for gesture.
        // We can show prompt or allow unmuted state on first user click.
        setIsMuted(false);
        // Note: Browsers will still suspend until first interaction
        const startOnFirstClick = () => {
          ambientSound.start(volume);
          setIsPlaying(true);
          window.removeEventListener('pointerdown', startOnFirstClick);
          window.removeEventListener('keydown', startOnFirstClick);
        };
        window.addEventListener('pointerdown', startOnFirstClick, { once: true });
        window.addEventListener('keydown', startOnFirstClick, { once: true });
      } else {
        // Explicitly muted
        setIsMuted(true);
        setIsPlaying(false);
      }
    } catch {
      setShowPromptModal(true);
    }
  }, [volume]);

  const enableAudio = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'enabled');
    } catch {
      // storage unavailable
    }
    setIsMuted(false);
    const success = ambientSound.start(volume);
    if (success) {
      setIsPlaying(true);
    }
    setShowPromptModal(false);
  }, [volume]);

  const muteAudio = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'muted');
    } catch {
      // storage unavailable
    }
    setIsMuted(true);
    setIsPlaying(false);
    ambientSound.stop();
    setShowPromptModal(false);
  }, []);

  const toggleAudio = useCallback(() => {
    if (isPlaying && !isMuted) {
      muteAudio();
    } else {
      enableAudio();
    }
  }, [isPlaying, isMuted, muteAudio, enableAudio]);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    ambientSound.setVolume(clamped);
    if (clamped === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const openPromptModal = useCallback(() => {
    setShowPromptModal(true);
  }, []);

  const closePromptModal = useCallback(() => {
    setShowPromptModal(false);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        showPromptModal,
        enableAudio,
        muteAudio,
        toggleAudio,
        setVolume,
        openPromptModal,
        closePromptModal,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
