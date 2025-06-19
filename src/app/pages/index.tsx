import { useState } from "react";
import { Slider } from "~/ui/slider";
import { RecordToggle, Toggle } from "~/ui/toggle";
import { PlayToggle, PlayToggleGroup } from "~/ui/toggle-group";
import { cn } from "~/utils";
import BassIcon from "./assets/bass.svg?react";
import Cassette from "./assets/cassette";
import DrumsIcon from "./assets/drums.svg?react";
import MelodyIcon from "./assets/melody.svg?react";
import NoteIcon from "./assets/note.svg?react";
import Pause from "./assets/pause.svg?react";
import Play from "./assets/play.svg?react";
import Stop from "./assets/stop.svg?react";
import VolumeIcon from "./assets/volume.svg?react";
import WandIcon from "./assets/wand.svg?react";

const CassettePlayerSection = ({ record }: { record: boolean }) => (
  <div className="rounded-md border-4 bg-neutral-450 pb-2 shadow-[0_12px_3px_0_rgba(0,0,0,0.2)]">
    <div className="-mx-1 -mt-1 rounded-md border-4 bg-neutral-300 p-5 pb-3">
      <Cassette className="w-full" isPlaying={record} />
    </div>
  </div>
);

const BlueToggle = () => (
  <Toggle
    className="flex items-center justify-center gap-1 p-1 text-white *:size-4 data-[state=on]:translate-y-1 data-[state=off]:bg-blue-500 data-[state=on]:bg-blue-500/70 data-[state=off]:text-blue-800 data-[state=off]:shadow-[0_1px_2px_0_white_inset]"
    containerClassName="bg-blue-600 pb-0.5"
  >
    <NoteIcon />
    Мелодия
  </Toggle>
);

export default function IndexPage({ className }: { className?: string }) {
  const [record, setRecord] = useState(false);
  const [playState, setPlayState] = useState("stop");

  return (
    <main className={cn("grid gap-7 p-2.5", className)}>
      <CassettePlayerSection record={record} />
      <div className="rounded-md border-4 bg-neutral-300">
        <div className="rouneded-md -mx-1 -mt-1 flex flex-col gap-4 border-4 bg-neutral-450 p-4">
          <div className="grid grid-flow-col items-center">
            <BlueToggle />
            <BlueToggle />
            <BlueToggle />
          </div>
          <div className="grid grid-flow-col items-center">
            <Toggle>
              <MelodyIcon />
            </Toggle>
            <Toggle>
              <MelodyIcon />
            </Toggle>
            <Toggle>
              <MelodyIcon />
            </Toggle>
          </div>
          <div className="grid grid-flow-col items-center">
            <Toggle>
              <WandIcon />
            </Toggle>
            <Toggle>
              <WandIcon />
            </Toggle>
            <Toggle>
              <WandIcon />
            </Toggle>
          </div>
          <div className="grid grid-flow-col items-center">
            <Toggle>
              <DrumsIcon />
            </Toggle>
            <Toggle>
              <DrumsIcon />
            </Toggle>
            <Toggle>
              <DrumsIcon />
            </Toggle>
          </div>
          <div className="grid grid-flow-col items-center">
            <Toggle>
              <BassIcon />
            </Toggle>
            <Toggle>
              <BassIcon />
            </Toggle>
            <Toggle>
              <BassIcon />
            </Toggle>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-4">
          <RecordToggle onPressedChange={setRecord} pressed={record}>
            Запись
          </RecordToggle>

          <div className="flex items-center justify-center gap-4 px-7">
            <Slider max={100} min={0} />
            <VolumeIcon className="size-7" />
          </div>

          <PlayToggleGroup
            className="grid grid-flow-col overflow-hidden rounded-sm border-2"
            onValueChange={(value) => {
              if (value) {
                setPlayState(value);
              }
            }}
            type="single"
            value={playState}
          >
            <PlayToggle className="bg-green-500" value="play">
              <Play />
            </PlayToggle>

            <PlayToggle className="bg-yellow-500" value="pause">
              <Pause />
            </PlayToggle>
            <PlayToggle className="bg-red-500" value="stop">
              <Stop />
            </PlayToggle>
          </PlayToggleGroup>
        </div>
      </div>
    </main>
  );
}
