export class RecordManager {
  private audioContext: AudioContext;
  private masterGainNode: GainNode;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private isRecording: boolean = false;
  private lastRecordedBlob: Blob | null = null;

  constructor(audioContext: AudioContext, masterGainNode: GainNode) {
    this.audioContext = audioContext;
    this.masterGainNode = masterGainNode;
  }

  /**
   * Start recording the currently playing sounds
   */
  startRecording() {
    if (this.isRecording) {
      console.warn("Recording is already in progress");
      return;
    }

    try {
      const destination = this.audioContext.createMediaStreamDestination();

      this.masterGainNode.connect(destination);

      this.mediaRecorder = new MediaRecorder(destination.stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      this.recordedChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
      this.isRecording = true;

      console.log("Recording started");
    } catch (error) {
      console.error("Failed to start recording:", error);
      throw error;
    }
  }

  /**
   * Stop recording and return the recorded audio as a Blob
   */
  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.isRecording || !this.mediaRecorder) {
        reject(new Error("No recording in progress"));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(this.recordedChunks, {
          type: "audio/webm;codecs=opus",
        });

        this.lastRecordedBlob = recordedBlob;

        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];

        console.log("Recording stopped");
        resolve(recordedBlob);
      };

      this.mediaRecorder.onerror = (event) => {
        console.error("Recording error:", event);
        this.isRecording = false;
        this.mediaRecorder = null;
        reject(new Error("Recording failed"));
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Get the last recorded audio blob
   */
  getLastRecording(): Blob | null {
    return this.lastRecordedBlob;
  }

  /**
   * Check if any recording is available
   */
  hasRecording(): boolean {
    return this.lastRecordedBlob !== null;
  }

  /**
   * Download the recorded audio as a file
   */
  async downloadRecording(): Promise<void> {
    if (this.isRecording) {
      throw new Error(
        "Cannot download while recording is in progress. Stop recording first.",
      );
    }

    if (!this.lastRecordedBlob) {
      throw new Error("No recording available to download");
    }

    const url = URL.createObjectURL(this.lastRecordedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `soundbar-recording-${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:.]/g, "-")}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
