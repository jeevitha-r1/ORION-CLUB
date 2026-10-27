/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Procedural ambient cosmic sound generator using Web Audio API.
 * Produces a warm, light, soothing celestial drone and gentle pentatonic chimes.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;
  private chimeTimer: number | null = null;
  private padTimer: number | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private currentVolume: number = 0.3; // Gentle default

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public start(volume: number = 0.3): boolean {
    const ctx = this.initContext();
    if (!ctx) return false;

    if (this.isRunning) {
      this.setVolume(volume);
      return true;
    }

    this.currentVolume = volume;

    // Master Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    // Smooth fade in over 2 seconds
    this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume * 0.4), ctx.currentTime + 2.0);
    this.masterGain.connect(ctx.destination);

    // Warm Stereo Celestial Pad
    this.startAmbientPads(ctx, this.masterGain);

    // Gentle Stellar Chimes
    this.startStellarChimes(ctx, this.masterGain);

    this.isRunning = true;
    return true;
  }

  public stop(): void {
    if (!this.isRunning || !this.ctx || !this.masterGain) {
      this.cleanup();
      return;
    }

    try {
      const fadeTime = 0.8;
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + fadeTime);

      setTimeout(() => {
        this.cleanup();
      }, fadeTime * 1000);
    } catch {
      this.cleanup();
    }
  }

  private cleanup(): void {
    if (this.chimeTimer) {
      window.clearInterval(this.chimeTimer);
      this.chimeTimer = null;
    }
    if (this.padTimer) {
      window.clearInterval(this.padTimer);
      this.padTimer = null;
    }
    this.isRunning = false;
  }

  public setVolume(vol: number): void {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain && this.isRunning) {
      const now = this.ctx.currentTime;
      const target = Math.max(0.0001, this.currentVolume * 0.4);
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(Math.max(0.0001, this.masterGain.gain.value), now);
      this.masterGain.gain.linearRampToValueAtTime(target, now + 0.1);
    }
  }

  /**
   * Generates warm, airy harmonic chords (Fmaj9 / Cmaj7 celestial tuning)
   */
  private startAmbientPads(ctx: AudioContext, destination: GainNode): void {
    // Soft low pass filter to remove harshness
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(1.2, ctx.currentTime);
    filter.connect(destination);

    // LFO for gentle cosmic filter breathing
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // very slow 8-second cycle
    lfoGain.gain.setValueAtTime(120, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    // Harmonic chord frequencies (F3, C4, E4, G4, A4) - warm, dreamy, pleasant
    const chordPitches = [174.61, 261.63, 329.63, 392.00, 440.00, 523.25];

    chordPitches.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      // Slight cosmic detuning for lush stereo chorus effect
      const detuneCents = (idx - 2.5) * 6;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime(detuneCents, ctx.currentTime);

      const individualGain = 0.08 / (idx + 1);
      oscGain.gain.setValueAtTime(individualGain, ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
    });

    // Gentle filtered celestial pink noise for cosmic breath
    this.createCosmicAir(ctx, destination);
  }

  /**
   * Generates subtle cosmic air/wind texture
   */
  private createCosmicAir(ctx: AudioContext, destination: GainNode): void {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(320, ctx.currentTime);
    noiseFilter.Q.setValueAtTime(2.0, ctx.currentTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.02, ctx.currentTime);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(destination);

    noiseSource.start();
  }

  /**
   * Occasional celestial bell/chime notes in major pentatonic scale
   */
  private startStellarChimes(ctx: AudioContext, destination: GainNode): void {
    // Pentatonic scale frequencies in Hz (C5, D5, E5, G5, A5, C6)
    const chimes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66];

    const playRandomChime = () => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;

      try {
        const chimeFreq = chimes[Math.floor(Math.random() * chimes.length)];
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const chimeFilter = ctx.createBiquadFilter();

        chimeFilter.type = 'lowpass';
        chimeFilter.frequency.setValueAtTime(2400, ctx.currentTime);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(chimeFreq, ctx.currentTime);

        const now = ctx.currentTime;
        // Soft pluck envelope
        oscGain.gain.setValueAtTime(0.0001, now);
        oscGain.gain.linearRampToValueAtTime(0.045, now + 0.04);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(chimeFilter);
        chimeFilter.connect(oscGain);
        oscGain.connect(destination);

        osc.start(now);
        osc.stop(now + 2.9);
      } catch {
        // Ignore inactive context edges
      }
    };

    // Trigger gentle chime every 3 to 6 seconds
    const scheduleNext = () => {
      if (!this.isRunning) return;
      playRandomChime();
      const nextDelay = 3000 + Math.random() * 3500;
      this.chimeTimer = window.setTimeout(scheduleNext, nextDelay);
    };

    // First chime after 2 seconds
    this.chimeTimer = window.setTimeout(scheduleNext, 2000);
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const ambientSound = new AmbientSoundEngine();
