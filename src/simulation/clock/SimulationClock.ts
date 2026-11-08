export type TickCallback = (dt: number) => void;

export class SimulationClock {
  private isRunning: boolean = false;
  private speedMultiplier: number = 1.0;
  private animFrameId: number | null = null;
  private lastTimestamp: number = 0;
  private callbacks: Set<TickCallback> = new Set();

  public subscribe(cb: TickCallback): () => void {
    this.callbacks.add(cb);
    return () => this.callbacks.delete(cb);
  }

  public play(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.loop();
  }

  public pause(): void {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.pause();
    } else {
      this.play();
    }
    return this.isRunning;
  }

  public step(dt: number = 0.05): void {
    this.pause();
    this.emitTick(dt);
  }

  public setSpeed(multiplier: number): void {
    this.speedMultiplier = Math.max(0.1, Math.min(4.0, multiplier));
  }

  public getSpeed(): number {
    return this.speedMultiplier;
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  private loop = (): void => {
    if (!this.isRunning) return;

    const now = performance.now();
    const rawDt = (now - this.lastTimestamp) / 1000;
    this.lastTimestamp = now;

    // Clamp dt to avoid huge jumps if tab was backgrounded
    const dt = Math.min(0.1, rawDt) * this.speedMultiplier;
    this.emitTick(dt);

    this.animFrameId = requestAnimationFrame(this.loop);
  };

  private emitTick(dt: number): void {
    for (const cb of this.callbacks) {
      cb(dt);
    }
  }
}
