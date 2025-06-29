import { Mp3Encoder } from "@breezystack/lamejs";

async function convertToMp3(webmBlob: Blob) {
  const audioContext = new AudioContext();
  const arrayBuffer = await webmBlob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const samples = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;

  // Convert float32 to int16
  const int16Samples = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    int16Samples[i] = Math.max(-32768, Math.min(32767, samples[i] * 32768));
  }

  const mp3encoder = new Mp3Encoder(1, sampleRate, 128); // mono, sampleRate, bitrate
  const mp3Data = [];

  const blockSize = 1152;
  for (let i = 0; i < int16Samples.length; i += blockSize) {
    const chunk = int16Samples.subarray(i, i + blockSize);
    const mp3buf = mp3encoder.encodeBuffer(chunk);
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }
  }

  const mp3buf = mp3encoder.flush();
  if (mp3buf.length > 0) {
    mp3Data.push(mp3buf);
  }

  return new Blob(mp3Data, { type: "audio/mp3" });
}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
      };
    };
  }
}

export const uploadAudio = async (recording: Blob) => {
  const mp3Blob = await convertToMp3(recording);
  const formData = new FormData();
  formData.append("file", mp3Blob);
  formData.append("initData", window.Telegram.WebApp.initData);
  await fetch("/api/upload", {
    body: formData,
    method: "POST",
  });
};
