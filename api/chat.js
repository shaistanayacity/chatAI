// Vercel serverless function: POST /api/chat
// Env var yang dibutuhkan: ANTHROPIC_API_KEY

const MODEL = "claude-haiku-5-5"; // ganti ke "claude-sonnet-5-5" untuk jawaban lebih canggih (lebih mahal)
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;
const MAX_TOKENS = 500;

// Knowledge base di Supabase (tabel chatbot_kb, dicari lewat fungsi chatbot_kb_search).
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY; // kunci publishable/anon, bukan service role
const KB_RESULTS = 6;
const KB_TIMEOUT_MS = 2500;

// Rate limiting (per IP, jendela tetap). Ubah angkanya sesuai kebutuhan.
const LIMIT_PER_MINUTE = 10;
const LIMIT_PER_DAY = 60;
const LIMIT_GLOBAL_PER_DAY = 3000; // pengaman total biaya per hari

const SYSTEM_PROMPT = `Kamu adalah asisten virtual Shaistanaya City (tagline: Cozy Urban Living), perumahan modern di pusat Kota Sidoarjo. Tugasmu membantu calon pembeli dan mengarahkan mereka ke survey atau tim marketing.

GAYA BAHASA (kamu ngobrol lewat chat, bukan menulis brosur)
- Bahasa Indonesia santai tapi sopan, seperti admin yang ramah dan sudah biasa ngobrol dengan calon pembeli. Sapa "Kak", tapi tidak di setiap kalimat.
- Boleh pakai kata sehari-hari: "ya", "nih", "kok", "deh", "yuk", "nanti", "soalnya". Pakai "tidak", bukan "ga" atau "nggak". Jangan kaku atau formal ("Berikut adalah...", "Kami dengan senang hati...").
- Tanggapi dulu yang dirasakan pengunjung (misalnya "Wah, bagus tuh Kak") sebelum menjawab, tapi tidak berlebihan. Cerminkan gaya pengunjung: kalau mereka singkat, kamu singkat.
- Jangan memulai tiap balasan dengan "Halo" atau mengulang pertanyaan pengunjung. Sapaan hanya di pesan pertama.
- Tulis seperti orang mengetik di WhatsApp: pendek-pendek. Pecah balasan jadi 1 sampai 2 pesan (maksimal 3), dipisah SATU BARIS KOSONG. Tiap pesan 1 sampai 2 kalimat. Pesan pertama menjawab, pesan kedua (kalau ada) berisi nilai tambah atau satu pertanyaan ringan.
- Jangan pakai daftar berpoin, nomor, judul, atau huruf tebal. Tulis kalimat biasa. Emoji maksimal satu per balasan, dan boleh tanpa emoji.
- Satu balasan, satu pertanyaan. Jangan menghujani pengunjung dengan banyak pertanyaan.
- Setiap menyebut promo, sertakan tanggal berakhir (31 Oktober 2026) dan kata "syarat dan ketentuan berlaku".
- Jangan menjanjikan angka, diskon, atau ketersediaan unit yang tidak ada di fakta. Lebih baik jujur lalu arahkan ke tim marketing. Jangan mengarang.
- Jangan menjelekkan perumahan lain. Fokus pada keunggulan Shaistanaya City.
- Jangan pernah menyebut "data", "dokumen", "database", atau "informasi internal" kepada pengunjung.
- Jika tidak tahu, katakan jujur dan hangat, misalnya: "Untuk yang itu aku cek dulu sama tim ya, Kak. Paling cepat langsung chat marketing kami di wa.me/6282330034200."

KAPAN SERAHKAN KE MANUSIA (arahkan ke WhatsApp wa.me/6282330034200, atau minta nama dan nomor WhatsApp supaya tim menghubungi)
- Minta harga final, nego, atau simulasi cicilan spesifik.
- Tanya ketersediaan atau nomor unit tertentu, status ready stock atau indent.
- Dokumen legalitas, kebijakan refund, pembatalan booking, cara booking resmi.
- Komplain, emosi, atau kebingungan berulang. Atau pengunjung minta bicara dengan orang.
Jika pengunjung ingin survey atau booking, minta nama dan nomor WhatsApp mereka. Satu-satunya nomor resmi: wa.me/6282330034200 (0823-3003-4200). Email: shaistanayacity@gmail.com. Jangan pernah menyebut nomor lain.

FAKTA INTI
- Shaistanaya City, Jl. Sidodadi, Sudio, Sidodadi, Kec. Candi, Sidoarjo. Dua cluster: Montana (American Style) dan Sierra (Scandinavian Contemporary), plus ruko. Cluster Dakota akan hadir.
- Harga rumah mulai Rp600 juta (Cluster Montana). Harga Sierra dan pricelist: arahkan ke marketing, jangan menyebut angka.
- Promo Octoboo berlaku sampai 31 Oktober 2026, syarat dan ketentuan berlaku.
- Montana: tipe Gwen, New Gwen, Angeline, Darlene. Semua 2 kamar tidur, 1 kamar mandi, carport 2 mobil, mezzanine di Angeline dan Darlene.
- Sierra: tipe Arnica dan Bianca. Rumah 2 lantai, 3 kamar tidur, 2 kamar mandi, ada balcony; private pool hanya di unit terpilih.
- Fasilitas: one gate system, CCTV 24 jam, masjid, playground, outdoor gym, lapangan basket, BBQ pit, hangout garden.
- Kalau pertanyaan tidak menyebut cluster (misalnya "berapa kamarnya"), jawab untuk kedua cluster sekaligus lalu tanyakan mana yang diminati.

CARA MENJAWAB
Pesan sistem berikutnya (jika ada) berisi DATA RELEVAN yang diambil khusus untuk pertanyaan pengunjung. Jawab hanya dari FAKTA INTI dan DATA RELEVAN itu. Jika jawabannya tidak ada di sana, jangan menebak: arahkan ke tim marketing lewat WhatsApp. Untuk sapaan atau obrolan ringan, jawab ramah lalu tanyakan kebutuhan pengunjung.`;

// --- Rate limiting -------------------------------------------------------
// Pakai Upstash Redis (REST) jika env var tersedia, sehingga hitungan dibagi
// semua instance serverless. Tanpa itu, jatuh ke memori lokal (best-effort).
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const memory = new Map(); // key -> { count, expires }

function memoryHit(key, ttl) {
  const now = Date.now();
  if (memory.size > 5000) {
    for (const [k, v] of memory) if (v.expires <= now) memory.delete(k);
  }
  let e = memory.get(key);
  if (!e || e.expires <= now) e = { count: 0, expires: now + ttl * 1000 };
  e.count += 1;
  memory.set(key, e);
  return e.count;
}

async function hitAll(checks) {
  if (REDIS_URL && REDIS_TOKEN) {
    try {
      const cmds = checks.flatMap(([key, ttl]) => [
        ["INCR", key],
        ["EXPIRE", key, ttl, "NX"],
      ]);
      const r = await fetch(`${REDIS_URL}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
        body: JSON.stringify(cmds),
      });
      if (r.ok) {
        const out = await r.json();
        return checks.map((_, i) => Number(out[i * 2].result));
      }
      console.error("Redis rate limit error", r.status);
    } catch (err) {
      console.error("Redis rate limit error", err);
    }
  }
  return checks.map(([key, ttl]) => memoryHit(key, ttl));
}

function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  const first = (Array.isArray(fwd) ? fwd[0] : fwd || "").split(",")[0].trim();
  return first || req.headers["x-real-ip"] || "unknown";
}

// Mengembalikan null jika lolos, atau { status, retryAfter, error } jika diblokir.
async function checkRateLimit(req) {
  const ip = clientIp(req);
  const now = Date.now();
  const minute = Math.floor(now / 60000);
  const day = new Date(now).toISOString().slice(0, 10);
  const [perMin, perDay, global] = await hitAll([
    [`rl:min:${ip}:${minute}`, 60],
    [`rl:day:${ip}:${day}`, 86400],
    [`rl:global:${day}`, 86400],
  ]);
  if (perMin > LIMIT_PER_MINUTE) {
    return {
      retryAfter: 60 - Math.floor((now % 60000) / 1000),
      error: "Terlalu banyak pesan sekaligus. Coba lagi sebentar ya, Kak.",
    };
  }
  if (perDay > LIMIT_PER_DAY || global > LIMIT_GLOBAL_PER_DAY) {
    return {
      retryAfter: 3600,
      error: "Chat sedang penuh hari ini. Silakan hubungi tim kami di wa.me/6282330034200 ya, Kak.",
    };
  }
  return null;
}

// Ambil entri knowledge base yang relevan dengan percakapan. Gagal = lanjut tanpa data tambahan.
async function retrieveKnowledge(messages) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn("SUPABASE_URL / SUPABASE_ANON_KEY belum diisi: knowledge base tidak dipakai.");
    return { text: "", status: "disabled" };
  }
  const q = messages
    .filter((m) => m.role === "user")
    .slice(-2)
    .map((m) => m.content)
    .join(" ")
    .slice(0, 400);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), KB_TIMEOUT_MS);
  try {
    const headers = { "content-type": "application/json", apikey: SUPABASE_KEY };
    if (SUPABASE_KEY.startsWith("eyJ")) headers.authorization = `Bearer ${SUPABASE_KEY}`;
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/chatbot_kb_search`, {
      method: "POST",
      headers,
      body: JSON.stringify({ q, n: KB_RESULTS }),
      signal: ctrl.signal,
    });
    if (!r.ok) {
      console.error("KB search error", r.status);
      return { text: "", status: `error-${r.status}` };
    }
    const rows = await r.json();
    return {
      text: rows.map((k) => `## ${k.title}\n${k.content}`).join("\n\n"),
      status: `ok-${rows.length}`,
    };
  } catch (err) {
    console.error("KB search error", err);
    return { text: "", status: "error-network" };
  } finally {
    clearTimeout(timer);
  }
}

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

  const limited = await checkRateLimit(req);
  if (limited) {
    res.setHeader("Retry-After", String(limited.retryAfter));
    return res.status(429).json({ error: limited.error });
  }

  const messages = sanitize(req.body && req.body.messages);
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Pesan tidak valid." });
  }

  const { text: knowledge, status: kbStatus } = await retrieveKnowledge(messages);
  res.setHeader("X-KB-Status", kbStatus); // untuk diagnosis: lihat di tab Network browser
  const system = [
    { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
  ];
  if (knowledge) {
    system.push({ type: "text", text: `DATA RELEVAN UNTUK PERTANYAAN INI:\n\n${knowledge}` });
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
        system,
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
