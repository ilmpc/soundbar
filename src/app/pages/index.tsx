import { cn } from "~/utils";
import { CassettePlayerSection } from "./cassette";
import {
  PlayControls,
  RecordControl,
  SoundControls,
  VolumeControl,
} from "./controls";

import { useSoundbarStore } from "./state";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
      };
    };
  }
}

const uploadRecording = async () => {
  const { recording } = useSoundbarStore.getState();
  if (!recording) {
    console.warn("No recording available to upload.");
    return;
  }
  useSoundbarStore.setState({ recording: null });

  const formData = new FormData();
  formData.append("file", recording);
  formData.append("initData", window.Telegram.WebApp.initData);
  await fetch("/api/upload", {
    body: formData,
    method: "POST",
  });
};

export default function App({ className }: { className?: string }) {
  const isRecording = useSoundbarStore((state) => state.recorder === "record");
  const isEmptyRecording = useSoundbarStore((state) => state.recording == null);

  return (
    <main className={cn("grid gap-7 p-2.5", className)}>
      <CassettePlayerSection
        disabled={isEmptyRecording}
        isRecording={isRecording}
        onClick={uploadRecording}
      />

      <div className="rounded-md border-4 bg-neutral-300">
        <SoundControls />

        <div className="flex flex-col gap-5 p-4">
          <RecordControl />

          <VolumeControl />

          <PlayControls />
        </div>
      </div>
    </main>
  );
}
