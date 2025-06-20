import { createHmac } from "node:crypto";

/**
 * Validates the data received from a Telegram Mini App.
 * @param initData - The value of window.Telegram.WebApp.initData.
 * @param botToken - Your bot's token.
 * @returns True if the data is valid, false otherwise.
 */
export function validateTelegramWebAppData(
  initData: string,
  botToken: string,
): boolean {
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    params.delete("hash");

    const dataCheckArr: string[] = [];
    params.sort(); // The keys must be sorted alphabetically
    params.forEach((value, key) => {
      dataCheckArr.push(`${key}=${value}`);
    });

    const dataCheckString = dataCheckArr.join("\n");

    const secretKey = createHmac("sha256", "WebAppData")
      .update(botToken)
      .digest();
    const calculatedHash = createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    return calculatedHash === hash;
  } catch (error) {
    console.error("Validation failed:", error);
    return false;
  }
}
