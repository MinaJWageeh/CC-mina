export class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private motorOsc1: OscillatorNode | null = null;
  private motorOsc2: OscillatorNode | null = null;
  private motorGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  constructor() {
    // Lazy initialization on first user interaction
  }

  private initCtx(): boolean {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return false;
      this.ctx = new AudioCtxClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return true;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.8, this.ctx.currentTime);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Procedural Contactor Armature Mechanical Snap ("Clack")
   */
  public playContactorSnap(): void {
    if (this.isMuted || !this.initCtx() || !this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    // 1. Noise buffer for spring/metal impact
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.04); // 40ms burst
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    // Bandpass filter centered at 1.4 kHz (metallic snap)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.Q.setValueAtTime(4.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start(t);
    whiteNoise.stop(t + 0.04);

    // 2. Low-frequency solid solenoid thud (80Hz down to 30Hz)
    const thudOsc = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thudOsc.type = 'sine';
    thudOsc.frequency.setValueAtTime(120, t);
    thudOsc.frequency.exponentialRampToValueAtTime(30, t + 0.05);

    thudGain.gain.setValueAtTime(0.5, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    thudOsc.connect(thudGain);
    thudGain.connect(this.masterGain);

    thudOsc.start(t);
    thudOsc.stop(t + 0.05);
  }

  /**
   * Procedural Continuous Motor Hum tied to RPM
   */
  public updateMotorSound(rpm: number): void {
    if (this.isMuted || !this.initCtx() || !this.ctx || !this.masterGain) {
      this.stopMotorSound();
      return;
    }

    if (rpm <= 0) {
      this.stopMotorSound();
      return;
    }

    const t = this.ctx.currentTime;
    const baseFreq = Math.max(25, (rpm / 60) * 2); // 2-pole pair harmonic ~50Hz at 1500 RPM

    if (!this.motorOsc1) {
      this.motorOsc1 = this.ctx.createOscillator();
      this.motorOsc2 = this.ctx.createOscillator();
      this.motorGain = this.ctx.createGain();

      this.motorOsc1.type = 'sine';
      this.motorOsc2.type = 'triangle';

      this.motorOsc1.connect(this.motorGain);
      this.motorOsc2.connect(this.motorGain);
      this.motorGain.connect(this.masterGain);

      this.motorOsc1.start();
      this.motorOsc2.start();
    }

    if (this.motorGain) {
      const targetGain = Math.min(0.25, (rpm / 1500) * 0.25);
      this.motorGain.gain.setTargetAtTime(targetGain, t, 0.1);
    }
    if (this.motorOsc1 && this.motorOsc2) {
      this.motorOsc1.frequency.setTargetAtTime(baseFreq, t, 0.1);
      this.motorOsc2.frequency.setTargetAtTime(baseFreq * 2, t, 0.1);
    }
  }

  public stopMotorSound(): void {
    if (this.motorGain && this.ctx) {
      this.motorGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    }
  }

  /**
   * Procedural Alarm Siren / Buzzer
   */
  public playAlarmBeep(): void {
    if (this.isMuted || !this.initCtx() || !this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(2400, t);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.15);
  }
}

export const soundManager = new AudioEngine();
