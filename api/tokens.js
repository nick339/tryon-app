// Vercel serverless function: POST /api/tokens
// Mints a short-lived (10 min) Decart client token using your secret
// DECART_API_KEY (set as an environment variable in the Vercel project —
// never put the real key in this file or in frontend code).

import { createDecartClient } from "@decartai/sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const secretKey = process.env.DECART_API_KEY;
  if (!secretKey) {
    res.status(500).json({ error: "DECART_API_KEY is not set on the server" });
    return;
  }

  try {
    const client = createDecartClient({ apiKey: secretKey });
    const token = await client.tokens.create();
    res.status(200).json(token); // { apiKey: "<short-lived token>" }
  } catch (err) {
    console.error("Failed to mint Decart token:", err);
    res.status(500).json({ error: "Could not create token" });
  }
}
