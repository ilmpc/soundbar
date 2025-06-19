import { cn } from "~/utils";
import { CassettePlayerSection } from "./cassette";
import {
  PlayControls,
  RecordControl,
  SoundControls,
  VolumeControl,
} from "./controls";

import { useSoundbarStore } from "./state";

export default function App({ className }: { className?: string }) {
  const isRecording = useSoundbarStore((state) => state.recorder === "record");

  return (
    <main className={cn("grid gap-7 p-2.5", className)}>
      <CassettePlayerSection record={isRecording} />

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
