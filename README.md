# chatAI

Chatbot Shaistanaya City (Vercel serverless + API Claude + knowledge base di Supabase).

## Struktur
- `api/chat.js`: backend. Mengambil entri knowledge base yang relevan dari Supabase, lalu memanggil API Claude.
- `widget.js`: widget chat yang mandiri (Shadow DOM), dipasang di website lewat satu baris skrip.
- `index.html`: halaman contoh yang memuat `widget.js`.
- `ajeng.jpg`: foto profil di header widget.
- `supabase/001_chatbot_kb.sql`: skema tabel `chatbot_kb` dan fungsi pencarian.
- `supabase/seed_kb.sql`: isi awal knowledge base (dari PDF 100 FAQ).

## Environment variable (Vercel → Settings → Environment Variables)
| Nama | Isi |
| --- | --- |
| `ANTHROPIC_API_KEY` | API key dari console.anthropic.com |
| `SUPABASE_URL` | `https://onulndjicgdopsmtdoei.supabase.co` |
| `SUPABASE_ANON_KEY` | Kunci **publishable/anon** project Supabase (Settings → API Keys). Jangan pakai service role. |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | (opsional) Upstash Redis untuk rate limiting yang akurat |

Centang Production dan Preview, lalu Redeploy.

## Memasang di website
Tempel satu baris ini sebelum `</body>` di website (atau di kolom "custom code / footer script" pada pembuat website):

```html
<script src="https://chatai-two-gules.vercel.app/widget.js" defer></script>
```

- Ganti `chatai-two-gules.vercel.app` dengan domain chatbot di Vercel (misalnya domain khusus seperti `chat.shaistanayacity.com`).
- Domain website yang diizinkan memanggil API ada di env var `ALLOWED_ORIGINS` (dipisah koma, bawaan `https://shaistanayacity.com,https://www.shaistanayacity.com`). Tambahkan domain lain, misalnya domain staging, lalu Redeploy.
- Sekitar 2,5 detik setelah halaman terbuka muncul gelembung sapaan kecil dari Ajeng di atas tombol chat ("Halo, saya Ajeng 👋 Ada yang bisa dibantu?"). Gelembung hilang saat diklik, ditutup (✕), atau chat dibuka, dan tidak muncul lagi selama sesi browser yang sama. Teksnya ada di `widget.js` (cari `chat-teaser`).
- Tampilan widget diisolasi dengan Shadow DOM sehingga tidak bentrok dengan CSS website.
- Jika website memakai Content-Security-Policy, izinkan domain chatbot di `script-src`, `connect-src`, dan `img-src`.

## Melatih bot
1. **Fakta dan jawaban**: buka Supabase → Table Editor → `chatbot_kb`. Ubah isi `content`, tambah baris baru, atau set `active = false` untuk menyembunyikan. Perubahan langsung berlaku tanpa deploy.
   - `title` dan `tags` paling berpengaruh pada pencarian; masukkan kata yang biasa diketik pengunjung (sinonim, istilah sehari-hari).
   - `priority` (angka lebih besar = lebih diutamakan saat skor seri).
2. **Gaya bicara dan aturan**: ubah `SYSTEM_PROMPT` di `api/chat.js` (bagian GAYA BAHASA, KAPAN SERAHKAN KE MANUSIA, FAKTA INTI).

Jika Supabase tidak terjangkau, bot tetap menjawab memakai FAKTA INTI di prompt dan mengarahkan sisanya ke WhatsApp.

## Riset web
Bot punya alat pencarian web dan pembaca halaman `shaistanayacity.com` (Claude API server tools), dipakai hanya bila jawaban tidak ada di knowledge base: maksimal 2 pencarian dan 2 pembacaan per pesan. Aturan pemakaiannya ada di bagian RISET WEB pada `SYSTEM_PROMPT` (tidak untuk harga, promo, ketersediaan, legalitas, atau aturan kawasan). Setiap pencarian ditagih (sekitar Rp180), jadi ada batas harian: 5 pencarian per pengunjung dan 10 per hari total (ubah lewat env `WEB_LIMIT_PER_IP_DAY` dan `WEB_LIMIT_GLOBAL_DAY`). Lewat batas, bot tetap menjawab tetapi tanpa web (header `X-Web-Status: limit`). Matikan seluruhnya dengan env var `WEB_RESEARCH=off`. Jika API menolak alat web, bot otomatis lanjut tanpa web (lihat log Vercel: "Web research ditolak").

## Catatan
- Tabel `chatbot_kb` di Supabase adalah sumber kebenaran. File `supabase/seed_*.sql` hanya isi awal; pembaruan setelahnya (USP, bank rekanan, entri pengetahuan umum, dan sebagainya) dilakukan langsung di database.
- Promo Octoboo berakhir 31 Oktober 2026: perbarui baris kategori `promo` dan FAKTA INTI.
- Model: `claude-haiku-5-5` (ubah konstanta `MODEL` untuk Sonnet).

## Template pesan WhatsApp per topik

Bot menutup jawaban berbobot dengan penanda `[[WA:topik]]` (atau `[[WA:topik:Tipe]]`, misalnya `[[WA:survey:Montana]]`). Widget mengubahnya jadi tombol WhatsApp dengan pesan yang sudah terisi dan diawali `[Website Shaistanaya]`, supaya admin tahu asalnya dan langsung tahu harus apa.

Topik: `survey`, `harga`, `kpr`, `booking`, `unit`, `promo`, `legalitas`, `orang`, dan `umum` (bawaan). Template dan label tombol ada di `WA_TOPICS` di `widget.js`; kapan bot memilih topik diatur di bagian TOMBOL WHATSAPP pada `api/chat.js`.
