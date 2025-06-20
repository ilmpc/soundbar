export async function uploadAudio(
  botToken: string,
  userId: string | number,
  file: File,
): Promise<void> {
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendAudio`;

  const formData = new FormData();
  formData.append("chat_id", userId.toString());
  formData.append("audio", file);

  // Optional: Add a caption
  formData.append(
    "caption",
    `🎵 Recording from Soundbar ${new Date().toISOString()}`,
  );

  try {
    const response = await fetch(telegramApiUrl, {
      body: formData,
      method: "POST",
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as {
        ok: boolean;
        description?: string;
      };
      throw new Error(
        `Telegram API error: ${response.status} ${response.statusText}. ${
          errorData.description || ""
        }`,
      );
    }

    const result = (await response.json()) as {
      ok: boolean;
      description?: string;
    };

    if (!result.ok) {
      throw new Error(`Telegram API returned error: ${result.description}`);
    }
  } catch (error) {
    console.error("Failed to upload audio to Telegram:", error);
    throw error;
  }
}
