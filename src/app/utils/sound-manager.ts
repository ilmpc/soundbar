type SoundDefinitions = {
  [id: string]: string;
};

export class SoundManager {
  private audioContext: AudioContext;
  private masterGainNode: GainNode;
  private sounds: Map<string, AudioBuffer> = new Map();
  private soundSources: Map<string, AudioBufferSourceNode> = new Map();
  private activeSounds: Set<string> = new Set();
  private soundDefinitions: SoundDefinitions;

  constructor(soundDefinitions: SoundDefinitions) {
    this.audioContext = new AudioContext();
    this.masterGainNode = new GainNode(this.audioContext);
    this.masterGainNode.connect(this.audioContext.destination);
    this.soundDefinitions = soundDefinitions;
  }

  async initialize() {
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
  }

  private async loadSound(id: string) {
    const soundUrl = this.soundDefinitions[id];
    if (!soundUrl) throw new Error(`Sound with ID ${id} not found`);

    if (this.sounds.has(id)) {
      return this.sounds.get(id);
    }

    try {
      const response = await fetch(soundUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.sounds.set(id, audioBuffer);
      return audioBuffer;
    } catch (error) {
      console.error(`Failed to load sound ${id}:`, error);
      throw error;
    }
  }

  private async startSound(id: string) {
    const audioBuffer = await this.loadSound(id);

    this.stopSound(id);

    const source = new AudioBufferSourceNode(this.audioContext, {
      buffer: audioBuffer,
      loop: true,
    });

    source.connect(this.masterGainNode);

    this.soundSources.set(id, source);

    source.start();
  }

  private stopSound(id: string): void {
    const source = this.soundSources.get(id);
    if (!source) return;

    try {
      source.stop();
    } catch (_error) {
      // Source might already be stopped
    }
    source.disconnect();
    this.soundSources.delete(id);
  }

  /**
   * Set which sounds should be playing
   * @param soundIds Set of sound IDs that should be active
   */
  public async setActiveSounds(soundIds: Set<string>) {
    await this.initialize();

    for (const activeId of this.activeSounds) {
      if (!soundIds.has(activeId)) {
        this.stopSound(activeId);
      }
    }

    for (const soundId of soundIds) {
      if (!this.activeSounds.has(soundId)) {
        this.startSound(soundId);
      }
    }

    this.activeSounds = new Set(soundIds);
  }

  setMasterVolume(volume: number): void {
    this.masterGainNode.gain.setValueAtTime(
      volume / 100,
      this.audioContext.currentTime,
    );
  }

  getAudioContext(): AudioContext {
    return this.audioContext;
  }

  getMasterGainNode(): GainNode {
    return this.masterGainNode;
  }
}
