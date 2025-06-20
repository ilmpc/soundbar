import { isValid } from "@telegram-apps/init-data-node/web";
import { Hono } from "hono";
import { uploadAudio } from "./uploader";

const app = new Hono<{ Bindings: Env }>().basePath("/api");

const URL = "https://soundbar.ilmpc.workers.dev/";

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
                  url: URL,
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
  const initData = body.get("initData");

  if (!initData || typeof initData !== "string") {
    return c.json({ error: "initData is missing or invalid" }, 400);
  }
  if (!file || !(file instanceof File)) {
    return c.json({ error: "File is missing or invalid" }, 400);
  }

  if (!(await isValid(initData, c.env.BOT_TOKEN))) {
    return c.json({ error: "Invalid data" }, 403);
  }

  const params = new URLSearchParams(initData);
  const user = JSON.parse(params.get("user") || "{}");
  const userId = user.id;

  if (!userId) {
    return c.json({ error: "Could not determine user ID" }, 400);
  }

  await uploadAudio(c.env.BOT_TOKEN, userId, file);

  return c.status(200);
});

app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
