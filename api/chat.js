// Vercel serverless function: POST /api/chat
// Env var yang dibutuhkan: ANTHROPIC_API_KEY

const MODEL = "claude-sonnet-5-5"; // ganti ke "claude-haiku-5-5" untuk biaya jauh lebih murah
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;
const MAX_TOKENS = 500;

const SYSTEM_PROMPT = `Kamu adalah asisten virtual untuk [NAMA BISNIS]. Jawab dalam Bahasa Indonesia yang ramah, singkat, dan jelas.

INFO BISNIS:
- Produk/layanan: [ISI DI SINI]
- Harga: [ISI DI SINI]
- Jam operasional: [ISI DI SINI]
- Alamat: [ISI DI SINI]
- WhatsApp: [ISI DI SINI]

FAQ:
[ISI DI SINI]

ATURAN:
- Hanya jawab berdasarkan info di atas. Jangan mengarang harga, promo, stok, atau kebijakan.
- Jika tidak tahu jawabannya, arahkan pengunjung menghubungi tim lewat WhatsApp.
- Jawab maksimal 3-4 kalimat.
- Jika pengunjung ingin memesan atau berkonsultasi, minta nama dan nomor WhatsApp mereka.`;

function sanitize(messages) {
  if (!Array.isArray(messages)) return [];
  const clean = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  // API mensyaratkan pesan pertama berperan "user"
  while (clean.length && clean[0].role !== "user") clean.shift();
  return clean;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "Server belum dikonfigurasi." });
  }

  const messages = sanitize(req.body && req.body.messages);
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Pesan tidak valid." });
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!r.ok) {
      console.error("Anthropic API error", r.status, await r.text());
      return res
        .status(502)
        .json({ error: "Maaf, layanan sedang sibuk. Coba lagi sebentar." });
    }

    const data = await r.json();
    const reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return res.status(200).json({ reply: reply || "Maaf, tidak ada jawaban." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan. Coba lagi sebentar." });
  }
}
