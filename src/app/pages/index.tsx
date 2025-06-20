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
        downloadFile: (
          params: { url: string; file_name?: string },
          callback?: (accepted: boolean) => void,
        ) => void;
      };
    };
  }
}

export default function App({ className }: { className?: string }) {
  const isRecording = useSoundbarStore((state) => state.recorder === "record");
  const isEmptyRecording = useSoundbarStore((state) => state.recording == null);

  return (
    <main className={cn("grid gap-7 p-2.5", className)}>
      <CassettePlayerSection
        disabled={isEmptyRecording}
        isRecording={isRecording}
        onClick={() => {
          const { recording } = useSoundbarStore.getState();
          const url = URL.createObjectURL(recording!);
          window.Telegram.WebApp.downloadFile(
            {
              file_name: `soundbar_${new Date().toISOString()}.webm`,
              url,
            },
            () => URL.revokeObjectURL(url),
          );
        }}
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
