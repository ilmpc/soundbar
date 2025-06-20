/**
 * Validates the data received from a Telegram Mini App.
 * @param initData - The value of window.Telegram.WebApp.initData.
 * @param botToken - Your bot's token.
 * @returns Promise that resolves to true if the data is valid, false otherwise.
 */
export async function validateTelegramWebAppData(
  initData: string,
  botToken: string,
): Promise<boolean> {
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

    // Create secret key using Web Crypto API
    const encoder = new TextEncoder();
    const webAppDataKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode("WebAppData"),
      { hash: "SHA-256", name: "HMAC" },
      false,
      ["sign"],
    );

    const secretKeyBuffer = await crypto.subtle.sign(
      "HMAC",
      webAppDataKey,
      encoder.encode(botToken),
    );

    const secretKey = await crypto.subtle.importKey(
      "raw",
      secretKeyBuffer,
      { hash: "SHA-256", name: "HMAC" },
      false,
      ["sign"],
    );

    // Calculate hash using Web Crypto API
    const hashBuffer = await crypto.subtle.sign(
      "HMAC",
      secretKey,
      encoder.encode(dataCheckString),
    );

    const calculatedHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return calculatedHash === hash;
  } catch (error) {
    console.error("Validation failed:", error);
    return false;
  }
}
