import { create } from "zustand";
import { RecordManager } from "./record-manager";
import { SoundManager } from "./sound-manager";
import { sounds } from "./sounds";

const soundManager = new SoundManager(
  Object.entries(sounds).map(([id, url]) => ({
    id,
    url,
  })),
);

type RecorderState = "record" | "play" | "pause" | "stop";
type SoundbarState = {
  recorder: RecorderState;
  volume: number;
  setRecorder: (state: RecorderState) => void;
  setVolume: (volume: number) => void;

  soundbar: Set<string>;
  toggleSoundbar: (sound: string) => void;
  isEnabledSound: (sound: string) => boolean;
  clearSoundbar: () => void;
  recordManager?: RecordManager;
};

export const useSoundbarStore = create<SoundbarState>((set, get) => ({
  clearSoundbar: () => set({ soundbar: new Set<string>() }),
  isEnabledSound: (sound: string) => get().soundbar.has(sound),
  recorder: "stop",
  setRecorder: (recorder) => set({ recorder }),
  setVolume: (volume) => set({ volume }),
  soundbar: new Set<string>(),
  toggleSoundbar: (sound: string) =>
    set((state) => {
      const newSoundbar = new Set(state.soundbar);
      if (newSoundbar.has(sound)) {
        newSoundbar.delete(sound);
      } else {
        newSoundbar.add(sound);
      }
      return { soundbar: newSoundbar };
    }),
  volume: 50,
}));

useSoundbarStore.subscribe(async (state) => {
  await soundManager.initialize();
  soundManager.setMasterVolume(state.volume);
});
useSoundbarStore.subscribe(async (state) => {
  await soundManager.initialize();
  soundManager.setActiveSounds(state.soundbar);
});
useSoundbarStore.subscribe(async (state) => {
  if (state.recorder !== "record") return;
  await soundManager.initialize();
  const recordManager = new RecordManager(
    soundManager.getAudioContext(),
    soundManager.getMasterGainNode(),
  );
  recordManager.startRecording();
  useSoundbarStore.setState({ recordManager });
});
useSoundbarStore.subscribe(async (state) => {
  if (state.recorder !== "stop") return;
  if (!state.recordManager) return;
  state.recordManager.stopRecording();
});
