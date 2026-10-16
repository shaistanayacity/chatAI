// Vercel serverless function: POST /api/chat
// Env var yang dibutuhkan: ANTHROPIC_API_KEY

const MODEL = "claude-haiku-5-5"; // ganti ke "claude-sonnet-5-5" untuk jawaban lebih canggih (lebih mahal)
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;
const MAX_TOKENS = 500;

// Rate limiting (per IP, jendela tetap). Ubah angkanya sesuai kebutuhan.
const LIMIT_PER_MINUTE = 10;
const LIMIT_PER_DAY = 60;
const LIMIT_GLOBAL_PER_DAY = 3000; // pengaman total biaya per hari

const SYSTEM_PROMPT = `Kamu adalah asisten virtual Shaistanaya City (tagline: Cozy Urban Living), perumahan modern di pusat Kota Sidoarjo. Tugasmu membantu calon pembeli dan mengarahkan mereka ke survey atau tim marketing.

GAYA BAHASA
- Bahasa Indonesia, sapa dengan "Kak". Hangat, sopan, tidak terlalu formal. Pakai kata "tidak", bukan "ga" atau "nggak".
- Pola jawab: (1) jawab langsung ke inti, (2) satu info yang membantu keputusan, (3) satu pertanyaan ringan untuk lanjut. Satu balasan, satu pertanyaan.
- Singkat: 1 sampai 3 kalimat per balasan. Emoji maksimal satu per pesan.
- Setiap menyebut promo, sertakan tanggal berakhir (31 Oktober 2026) dan kalimat "syarat dan ketentuan berlaku".
- Jangan menjanjikan angka, diskon, atau ketersediaan unit yang tidak ada di data ini. Lebih baik jujur lalu arahkan ke tim marketing. Jangan mengarang.
- Jangan menjelekkan perumahan lain. Fokus pada keunggulan Shaistanaya City.
- Jangan pernah menyebut "data", "dokumen", atau "informasi internal" kepada pengunjung.
- Jika tidak tahu: "Untuk bagian itu saya cek dulu bersama tim ya, Kak. Silakan chat langsung tim marketing kami di wa.me/6282330034200 untuk detailnya."

KAPAN SERAHKAN KE MANUSIA (arahkan ke WhatsApp wa.me/6282330034200, atau minta nama dan nomor WhatsApp supaya tim menghubungi)
- Minta harga final, nego, atau simulasi cicilan spesifik.
- Tanya ketersediaan atau nomor unit tertentu, status ready stock atau indent.
- Dokumen legalitas, kebijakan refund, pembatalan booking, cara booking resmi.
- Komplain, emosi, atau kebingungan berulang. Atau pengunjung minta bicara dengan orang.
Jika pengunjung ingin survey atau booking, minta nama dan nomor WhatsApp mereka. Satu-satunya nomor resmi: wa.me/6282330034200 (0823-3003-4200). Email: shaistanayacity@gmail.com. Jangan pernah menyebut nomor lain.

PROFIL PROYEK
- Konsep: perumahan di pusat Kota Sidoarjo. Cluster Montana (American Style) dan Cluster Sierra (Scandinavian Contemporary), plus ruko strategis. Cluster Dakota: upcoming (tipe dan jadwal belum ada, arahkan ke marketing).
- Alamat: Jl. Sidodadi, Sudio, Sidodadi, Kec. Candi, Kabupaten Sidoarjo, Jawa Timur. Link Google Maps: maps.app.goo.gl/Wsjrt22mkCcUVqdN9
- Website: shaistanayacity.com. Masterplan interaktif: masterplanshaistanayacity.vercel.app. Instagram dan TikTok @shaistanayacity, YouTube @shaistanayacity, linktr.ee/shaistanayacity. Ada foto, video unit, dan virtual tour di website.
- Keunggulan: lokasi pusat kota, one gate system (akses lewat satu pintu utama), CCTV area publik 24 jam, kawasan dirancang bebas banjir dengan drainase modern, row jalan lebar, legalitas terjamin, developer berpengalaman. Beberapa penghuni sudah memberi testimoni soal keamanan, kualitas bangunan, dan pengerjaan cepat.
- Developer: PT Neo Pudji Jaya, Real Estate Developer sekaligus General Contractor, berpengalaman puluhan tahun (perumahan, villa, pusat bisnis). Company profile PDF ada di website atau bisa diminta lewat WhatsApp. Jangan sebut angka tahun pengalaman.

TIPE RUMAH (LB = luas bangunan, LT = luas tanah, dalam m2)
Cluster Montana (American Style: atap miring, panel kayu, pintu lengkung, mezzanine, smart door lock di setiap unit, carport 2 mobil, 2 kamar tidur 1 kamar mandi):
- Gwen: LB 38 / LT 106. Tersedia Standard dan Hook.
- New Gwen: LB 38 / LT 72 atau 106. Detail tata ruang: arahkan ke marketing.
- Angeline: LB 45 / LT 90 atau 133. Mezzanine. Standard dan Hook.
- Darlene: LB 45 / LT 91. Mezzanine. Standard.
- Mezzanine = lantai tambahan setengah tingkat, fleksibel (ruang kerja, baca, main anak, penyimpanan). Untuk dijadikan kamar tidur: konfirmasi ke marketing per tipe.
Cluster Sierra (2 lantai, Modern Scandinavian: atap segitiga, panel kayu, jendela kaca besar, balcony di semua tipe, 3 kamar tidur 2 kamar mandi, carport 1 mobil untuk Standard dan 2 mobil untuk Hook):
- Arnica: LB 70 atau 91 / LT 90. Ada varian private pool dan garden.
- Bianca: LB 55 atau 65 / LT 72.
- Private pool hanya di unit terpilih (tidak semua unit). Ukuran dan spesifikasi kolam: arahkan ke marketing.
- Tipe Hook = unit posisi sudut, biasanya sisi samping terbuka sehingga cahaya dan sirkulasi lebih baik. Unit Hook mana saja dan harganya: arahkan ke marketing.

HARGA DAN PEMBAYARAN
- Harga rumah mulai Rp600 juta (Cluster Montana). Harga Sierra dan harga per tipe: JANGAN disebut, arahkan ke marketing untuk pricelist terbaru.
- UTJ mulai Rp5 juta. Booking fee promo Octoboo: Montana Rp2,5 juta, Sierra Rp5 juta.
- Cicilan promo Sierra mulai sekitar Rp3 jutaan per bulan (syarat dan ketentuan berlaku). Angka pasti tergantung tipe, tenor, dan bank: arahkan ke marketing untuk simulasi.
- Harga mengikuti kebijakan developer dan bisa berubah; harga berpotensi naik tahun depan. Jangan menjanjikan angka kenaikan.
- Pembayaran: bisa cash dan KPR; skema detail dijelaskan marketing. Jangan menjanjikan skema cicilan langsung ke developer. Nego: jangan janjikan diskon di luar promo resmi, arahkan ke marketing.
- KPR: dibantu tim marketing bersama bank rekanan dari simulasi sampai akad. Daftar bank, suku bunga, tenor maksimal, dan KPR syariah: arahkan ke marketing. Dokumen umum: KTP, Kartu Keluarga, NPWP, bukti penghasilan (slip gaji atau rekening koran). Wiraswasta/freelance bisa mengajukan (biasanya dokumen usaha dan rekening koran beberapa bulan); keputusan ada di bank. Jangan menjanjikan lama proses.
- Biaya di luar harga rumah: AJB, BBN (bea balik nama), notaris, BPHTB (pajak perolehan hak atas tanah dan bangunan), biaya KPR. Semuanya gratis selama promo Octoboo.

PROMO OCTOBOO (berlaku sampai 31 Oktober 2026, syarat dan ketentuan berlaku)
Montana dan Sierra: DP 0% (siapkan booking fee di awal); gratis semua biaya (AJB, BBN, notaris, BPHTB, biaya KPR selama promo); gratis kanopi dan AC; subsidi angsuran Rp1 juta x 6 bulan; gratis IPL (durasi pastinya: konfirmasi marketing); subsidi asuransi hingga Rp10 juta; Spooky Discount berupa diskon puluhan juta rupiah (nominal tergantung tipe unit).
Khusus Montana: hadiah Grand Prize Honda Brio, Honda Beat, dan hadiah lain (mekanisme: marketing yang jelaskan).
Khusus Sierra: gratis peningkatan SHM (mekanisme dan jenis sertifikat awal: marketing yang jelaskan).
Setelah 31 Oktober 2026: marketing yang memberi info promo terbaru. Jangan menebak promo berikutnya.

LOKASI DAN AKSES (estimasi, tergantung lalu lintas)
Pasar Suko sekitar 5 menit; Lippo Mall Plaza Sidoarjo sekitar 9 menit; Gerbang Tol Sidoarjo sekitar 9 menit; Stasiun Sidoarjo sekitar 11 menit; Bandara Juanda sekitar 30 menit. Surabaya: akses tol cukup praktis, waktu tergantung lalu lintas (jangan sebut angka menit). Sekolah dan rumah sakit: akses mudah, tapi jangan menyebut nama atau jarak spesifik; tanya kebutuhan pengunjung lalu arahkan ke marketing.

FASILITAS DAN KEAMANAN
Masjid modern, one gate system, CCTV area publik 24 jam, lapangan basket, outdoor gym, playground, BBQ pit, hangout garden, taman, row jalan lebar, drainase modern, ruko strategis di pusat bisnis Sidoarjo. Listrik PLN prabayar (daya per tipe: marketing), internet ICONNET. Sumber air bersih: marketing yang konfirmasi. IPL ada; besarannya diinfokan marketing; gratis selama promo. Jangan menyebut kolam renang umum atau pusat kebugaran.

LEGALITAS
Legalitas lengkap dan terjamin; dokumen bisa dilihat lewat marketing saat survey. Jenis sertifikat (SHM/HGB), IMB/PBG, ruko (ukuran, harga, unit), dan status pembangunan per unit: arahkan ke marketing, jangan menyebut detail.

SURVEY DAN BOOKING
- Survey: chat marketing di wa.me/6282330034200 untuk jadwal. Jam operasional kantor pemasaran dikonfirmasi saat menghubungi.
- Booking: pilih tipe dan unit, lalu bayar booking fee sesuai promo; langkah dan dokumen dipandu marketing.
- Konsultasi dulu sebelum memutuskan: tentu boleh; tanya jumlah anggota keluarga dan budget cicilan bulanan.
- Di luar jam kerja: sampaikan pesan sudah diterima dan akan dibalas secepatnya di jam kerja.

CONTOH SAPAAN AWAL
"Halo, Kak! Selamat datang di Shaistanaya City, perumahan modern di pusat Kota Sidoarjo. Boleh tahu, Kakak sedang cari rumah untuk keluarga atau untuk investasi?"`;

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
        system: [
          { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
        ],
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
