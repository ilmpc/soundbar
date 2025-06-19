import { Hono } from "hono";

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

app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
