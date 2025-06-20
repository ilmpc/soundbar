import { Slider } from "~/ui/slider";
import { BlueToggle, RedToggle, Toggle } from "~/ui/toggle";
import { PlayToggle, PlayToggleGroup } from "~/ui/toggle-group";
import BassIcon from "./assets/bass.svg?react";
import DrumsIcon from "./assets/drums.svg?react";
import MelodyIcon from "./assets/melody.svg?react";
import NoteIcon from "./assets/note.svg?react";
import Pause from "./assets/pause.svg?react";
import Play from "./assets/play.svg?react";
import Stop from "./assets/stop.svg?react";
import VolumeIcon from "./assets/volume.svg?react";
import WandIcon from "./assets/wand.svg?react";
import { useSoundbarStore } from "./state";

const SoundToggle = ({
  variant = "default",
  name,
  icon,
}: {
  variant?: "default" | "blue";
  name: string;
  icon: React.ReactNode;
}) => {
  const toggleSoundbar = useSoundbarStore((state) => state.toggleSoundbar);
  const pressed = useSoundbarStore((state) => state.isEnabledSound(name));
  const Comp = variant === "blue" ? BlueToggle : Toggle;

  return (
    <Comp onPressedChange={() => toggleSoundbar(name)} pressed={pressed}>
      {icon}
    </Comp>
  );
};

export const SoundControls = () => {
  return (
    <div className="rouneded-md -mx-1 -mt-1 flex flex-col gap-4 border-4 bg-neutral-450 p-4">
      <div className="grid grid-flow-col items-center">
        {Array.from([1, 2, 3], (e) => (
          <SoundToggle
            icon={
              <>
                <NoteIcon /> Мелодия
              </>
            }
            key={e}
            name={`melody${e}`}
            variant="blue"
          />
        ))}
      </div>
      <div className="grid grid-flow-col items-center">
        <SoundToggle icon={<MelodyIcon />} name="clap1" />
        <SoundToggle icon={<MelodyIcon />} name="clap2" />
        <SoundToggle icon={<MelodyIcon />} name="clap3" />
      </div>
      <div className="grid grid-flow-col items-center">
        <SoundToggle icon={<WandIcon />} name="effect1" />
        <SoundToggle icon={<WandIcon />} name="effect2" />
        <SoundToggle icon={<WandIcon />} name="effect3" />
      </div>
      <div className="grid grid-flow-col items-center">
        <SoundToggle icon={<DrumsIcon />} name="kick1" />
        <SoundToggle icon={<DrumsIcon />} name="kick2" />
        <SoundToggle icon={<DrumsIcon />} name="kick3" />
      </div>
      <div className="grid grid-flow-col items-center">
        <SoundToggle icon={<BassIcon />} name="bass1" />
        <SoundToggle icon={<BassIcon />} name="bass2" />
        <SoundToggle icon={<BassIcon />} name="bass3" />
      </div>
    </div>
  );
};

export const RecordControl = () => {
  const isRecording = useSoundbarStore((state) => state.recorder === "record");
  const setRecorder = useSoundbarStore((state) => state.setRecorder);

  return (
    <RedToggle
      onPressedChange={(record) => setRecorder(record ? "record" : "stop")}
      pressed={isRecording}
    >
      Запись
    </RedToggle>
  );
};

export const VolumeControl = () => {
  const volume = useSoundbarStore((state) => state.volume);
  const setVolume = useSoundbarStore((state) => state.setVolume);
  return (
    <div className="flex items-center justify-center gap-4 px-7">
      <Slider
        max={100}
        min={0}
        onValueChange={([value]) => setVolume(value)}
        value={[volume]}
      />
      <VolumeIcon className="size-7" />
    </div>
  );
};

export const PlayControls = () => {
  const playState = useSoundbarStore((state) => state.recorder);
  const setPlayState = useSoundbarStore((state) => state.setRecorder);
  const recorderEmpty = useSoundbarStore((state) => state.recording == null);

  return (
    <PlayToggleGroup
      className="grid grid-flow-col overflow-hidden rounded-sm border-2"
      onValueChange={(value) => {
        if (value) {
          setPlayState(value as "play" | "pause" | "stop");
        }
      }}
      type="single"
      value={playState}
    >
      <PlayToggle
        className="bg-green-500"
        disabled={recorderEmpty}
        value="play"
      >
        <Play />
      </PlayToggle>

      <PlayToggle
        className="bg-yellow-500"
        disabled={recorderEmpty}
        value="pause"
      >
        <Pause />
      </PlayToggle>

      <PlayToggle className="bg-red-500" value="stop">
        <Stop />
      </PlayToggle>
    </PlayToggleGroup>
  );
};
