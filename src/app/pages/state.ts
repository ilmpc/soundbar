import { create } from "zustand";
import { RecordManager } from "./record-manager";
import { SoundManager } from "./sound-manager";
import { sounds } from "./sounds";

export type RecorderState = "record" | "play" | "pause" | "stop";
type SoundbarState = {
  recorder: RecorderState;
  volume: number;
  setRecorder: (state: RecorderState) => void;
  setVolume: (volume: number) => void;
  recording?: Blob | null;
  saveRecord: (recording: Blob) => void;

  soundbar: Set<string>;
  toggleSoundbar: (sound: string) => void;
  isEnabledSound: (sound: string) => boolean;
  clearSoundbar: () => void;
  recordManager?: RecordManager | null;
  setRecordManager: (recordManager?: RecordManager) => void;
  soundManager: SoundManager;
};

export const useSoundbarStore = create<SoundbarState>((set, get) => ({
  clearSoundbar: () => set({ soundbar: new Set<string>() }),
  isEnabledSound: (sound: string) => get().soundbar.has(sound),
  recorder: "stop",
  saveRecord: (recording: Blob) => set({ recording }),
  setRecorder: (recorder) => set({ recorder }),
  setRecordManager: (recordManager) =>
    set({ recordManager: recordManager ?? null }),
  setVolume: (volume) => set({ volume }),
  soundbar: new Set<string>(),
  soundManager: new SoundManager(sounds),
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

useSoundbarStore.subscribe((state, prevState) => {
  if (state.volume === prevState.volume) return;
  state.soundManager.setMasterVolume(state.volume);
});
useSoundbarStore.subscribe((state, prevState) => {
  if (state.soundbar === prevState.soundbar) return;
  state.soundManager.setActiveSounds(state.soundbar);
});

useSoundbarStore.subscribe((state, prevState) => {
  if (state.recorder === prevState.recorder) return;
  if (state.recorder !== "record") return;

  const { soundManager, setRecordManager } = state;
  const recordManager = RecordManager.createRecording(
    soundManager.getAudioContext(),
    soundManager.getMasterGainNode(),
  );
  setRecordManager(recordManager);
});

useSoundbarStore.subscribe(async (state, prevState) => {
  if (state.recorder === prevState.recorder) return;
  if (state.recorder !== "stop") return;

  const { recordManager, saveRecord, setRecordManager } = state;
  if (recordManager) {
    saveRecord(await recordManager.stopRecording());
    setRecordManager();
  }
});

useSoundbarStore.subscribe(async (state, prevState) => {
  if (state.recorder === prevState.recorder) return;
  if (state.recorder !== "play") return;

  const { clearSoundbar } = state;
  clearSoundbar();
});
