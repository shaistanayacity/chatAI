# chatAI

Chatbot untuk website bisnis, memakai Vercel (serverless function) dan API Claude.

## Struktur
- `api/chat.js`: backend yang memanggil API Claude
- `index.html`: widget chat di pojok kanan bawah

## Cara pakai
1. Isi bagian `[ISI DI SINI]` di `SYSTEM_PROMPT` dalam `api/chat.js` (produk, harga, jam operasional, FAQ, nomor WhatsApp).
2. Deploy ke Vercel.
3. Tambahkan environment variable `ANTHROPIC_API_KEY` di pengaturan proyek Vercel. API key dibuat di console.anthropic.com.
4. Buka URL hasil deploy dan coba chat-nya.

## Catatan
- Model default `claude-sonnet-5-5`. Ganti ke `claude-haiku-5-5` di `api/chat.js` untuk biaya lebih murah.
- Sebelum dipakai publik, tambahkan rate limiting.
