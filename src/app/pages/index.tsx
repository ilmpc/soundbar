import { toast } from "sonner";
import { cn, uploadAudio } from "~/utils";
import { AudioPlayer } from "./audio-player";
import { CassettePlayerButton } from "./cassette";
import {
  PlayControls,
  RecordControl,
  SoundControls,
  VolumeControl,
} from "./controls";
import { useSoundbarStore } from "./state";

const uploadRecording = () => {
  const { recording } = useSoundbarStore.getState();
  if (!recording) {
    console.warn("No recording available to upload.");
    return;
  }
  useSoundbarStore.setState({ recording: null });
  toast.promise(uploadAudio(recording), {
    loading: "Сохраняем запись...",
    success: "Запись отправлена в чат!",
  });
};

export default function App({ className }: { className?: string }) {
  const isRecording = useSoundbarStore((state) => state.recorder === "record");
  const isEmptyRecording = useSoundbarStore((state) => state.recording == null);

  return (
    <main className={cn("flex flex-col gap-5 p-2.5", className)}>
      <CassettePlayerButton
        disabled={isEmptyRecording}
        isRecording={isRecording}
        onClick={uploadRecording}
      />

      <div className="rounded-md border-4 bg-neutral-300">
        <SoundControls />

        <div className="flex flex-col gap-5 p-4">
          <RecordControl />
          <VolumeControl />
          <AudioPlayer />
          <PlayControls />
        </div>
      </div>
    </main>
  );
}
