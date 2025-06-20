export async function uploadAudio(
  botToken: string,
  user: { id: number; first_name: string; username?: string },
  file: File,
): Promise<void> {
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendAudio`;

  const formData = new FormData();
  formData.append("chat_id", user.id.toString());
  formData.append("audio", file);
  formData.append("title", `Soundbar track [${new Date().toISOString()}]`);
  formData.append("performer", user.username ?? user.first_name);

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
