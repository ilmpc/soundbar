export interface SoundDefinition {
  id: string;
  url: string;
}

export class SoundManager {
  private audioContext: AudioContext;
  private masterGainNode: GainNode;
  private sounds: Map<string, AudioBuffer> = new Map();
  private soundSources: Map<string, AudioBufferSourceNode> = new Map();
  private activeSounds: Set<string> = new Set();
  private isInitialized: boolean = false;
  private soundDefinitions: SoundDefinition[];

  constructor(soundDefinitions: SoundDefinition[]) {
    this.audioContext = new AudioContext();
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.connect(this.audioContext.destination);
    this.soundDefinitions = soundDefinitions;
  }

  /**
   * Initialize the audio context and load all sounds
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    await this.loadAllSounds();
    this.isInitialized = true;
  }

  /**
   * Load all sounds defined in constructor
   */
  private async loadAllSounds(): Promise<void> {
    const loadPromises = this.soundDefinitions.map((sound) =>
      this.loadSound(sound.id, sound.url),
    );
    await Promise.all(loadPromises);
  }

  /**
   * Load a sound from URL and store it in the manager
   */
  private async loadSound(id: string, url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.sounds.set(id, audioBuffer);
    } catch (error) {
      console.error(`Failed to load sound ${id}:`, error);
      throw error;
    }
  }

  /**
   * Start playing a sound with looping
   */
  private startSound(id: string): void {
    const audioBuffer = this.sounds.get(id);
    if (!audioBuffer) {
      console.warn(`Sound ${id} not found`);
      return;
    }

    this.stopSound(id);

    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true;

    source.connect(this.masterGainNode);

    this.soundSources.set(id, source);

    source.start();
  }

  /**
   * Stop playing a sound
   */
  private stopSound(id: string): void {
    const source = this.soundSources.get(id);
    if (source) {
      try {
        source.stop();
      } catch (_error) {
        // Source might already be stopped
      }
      source.disconnect();
      this.soundSources.delete(id);
    }
  }

  /**
   * Set which sounds should be playing
   * @param soundIds Set of sound IDs that should be active
   */
  setActiveSounds(soundIds: Set<string>): void {
    if (!this.isInitialized) {
      console.warn("SoundManager not initialized. Call initialize() first.");
      return;
    }

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
