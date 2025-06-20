import { useEffect, useRef } from "react";
import { useSoundbarStore } from "./state";

export function AudioPlayer() {
  const recording = useSoundbarStore((state) => state.recording);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playState = useSoundbarStore((state) => state.recorder);
  const setPlayState = useSoundbarStore((state) => state.setRecorder);

  useEffect(() => {
    if (!audioRef.current || !recording) return;

    const audioUrl = URL.createObjectURL(recording);
    audioRef.current.src = audioUrl;

    return () => URL.revokeObjectURL(audioUrl);
  }, [recording]);

  useEffect(() => {
    if (!audioRef.current || !recording) return;

    if (playState === "record" || playState === "stop") {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else if (playState === "play") {
      audioRef.current.play();
    } else if (playState === "pause") {
      audioRef.current.pause();
    }
  }, [playState, recording]);

  return (
    // biome-ignore lint/a11y/useMediaCaption: Doesn't matter
    <audio
      className="hidden"
      onEnded={() => setPlayState("stop")}
      ref={audioRef}
    />
  );
}
