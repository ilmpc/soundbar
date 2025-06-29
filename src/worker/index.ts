import { isValid, parse } from "@telegram-apps/init-data-node/web";
import { Hono } from "hono";
import { uploadAudio } from "./uploader";

// Secrets
declare global {
  interface Env {
    BOT_TOKEN: string;
  }
}

const app = new Hono<{ Bindings: Env }>().basePath("/api");

app.post("/webhook", async (c) => {
  try {
    const update = await c.req.json();

    if (update.message && update.message.text === "/start") {
      const chatId = update.message.chat.id;

      const response = {
        chat_id: chatId,
        method: "sendMessage",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Launch Soundbar",
                web_app: {
                  url: c.env.WORKER_URL,
                },
              },
            ],
          ],
        },
        text: "🚀 Welcome!\nClick the button below to launch the mini app:",
      };

      return c.json(response);
    }

    return c.json({ ok: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

app.post("/upload", async (c) => {
  const body = await c.req.formData();
  const file = body.get("file");
  const initDataRaw = body.get("initData");

  if (!initDataRaw || typeof initDataRaw !== "string") {
    return c.json({ error: "initData is missing or invalid" }, 400);
  }
  if (!file || !(file instanceof File)) {
    return c.json({ error: "File is missing or invalid" }, 400);
  }

  if (!(await isValid(initDataRaw, c.env.BOT_TOKEN))) {
    return c.json({ error: "Invalid data" }, 403);
  }

  const { user } = parse(initDataRaw);

  if (!user) {
    return c.json({ error: "Could not determine user ID" }, 400);
  }

  await uploadAudio(c.env.BOT_TOKEN, user, file);

  return c.status(200);
});

app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
