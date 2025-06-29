export class RecordManager {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  private constructor() {}

  private startRecording(audioContext: AudioContext, masterGainNode: GainNode) {
    try {
      const destination = new MediaStreamAudioDestinationNode(audioContext);
      masterGainNode.connect(destination);
      this.mediaRecorder = new MediaRecorder(destination.stream, {
        mimeType: "audio/mp4",
      });

      this.recordedChunks = [];

      this.mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error("Failed to start recording:", error);
      throw error;
    }
  }

  static createRecording(audioContext: AudioContext, masterGainNode: GainNode) {
    const instance = new RecordManager();
    instance.startRecording(audioContext, masterGainNode);
    return instance;
  }

  /**
   * Stop recording and return the recorded audio as a Blob
   */
  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (this.mediaRecorder?.state !== "recording") {
        return reject(new Error("No recording in progress"));
      }

      this.mediaRecorder.onstop = async () => {
        const recordedBlob = new Blob(this.recordedChunks, {
          type: "audio/webm",
        });
        resolve(recordedBlob);
      };

      this.mediaRecorder.onerror = (event) => {
        console.error("Recording error:", event);
        reject(new Error("Recording failed"));
      };

      this.mediaRecorder.stop();
    });
  }
}
