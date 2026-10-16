# chatAI

Chatbot Shaistanaya City (Vercel serverless + API Claude + knowledge base di Supabase).

## Struktur
- `api/chat.js`: backend. Mengambil entri knowledge base yang relevan dari Supabase, lalu memanggil API Claude.
- `index.html`: widget chat.
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

## Melatih bot
1. **Fakta dan jawaban**: buka Supabase → Table Editor → `chatbot_kb`. Ubah isi `content`, tambah baris baru, atau set `active = false` untuk menyembunyikan. Perubahan langsung berlaku tanpa deploy.
   - `title` dan `tags` paling berpengaruh pada pencarian; masukkan kata yang biasa diketik pengunjung (sinonim, istilah sehari-hari).
   - `priority` (angka lebih besar = lebih diutamakan saat skor seri).
2. **Gaya bicara dan aturan**: ubah `SYSTEM_PROMPT` di `api/chat.js` (bagian GAYA BAHASA, KAPAN SERAHKAN KE MANUSIA, FAKTA INTI).

Jika Supabase tidak terjangkau, bot tetap menjawab memakai FAKTA INTI di prompt dan mengarahkan sisanya ke WhatsApp.

## Catatan
- Tabel `chatbot_kb` di Supabase adalah sumber kebenaran. File `supabase/seed_*.sql` hanya isi awal; pembaruan setelahnya (USP, bank rekanan, entri pengetahuan umum, dan sebagainya) dilakukan langsung di database.
- Promo Octoboo berakhir 31 Oktober 2026: perbarui baris kategori `promo` dan FAKTA INTI.
- Model: `claude-haiku-5-5` (ubah konstanta `MODEL` untuk Sonnet).
