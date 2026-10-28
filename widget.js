/*
 * Widget chat Shaistanaya City (Naya).
 * Pasang di website dengan satu baris, sebelum </body>:
 *   <script src="https://DOMAIN-CHATBOT/widget.js" defer></script>
 * Opsional: data-api="https://DOMAIN-CHATBOT/api/chat" untuk alamat API khusus.
 * Tampilan diisolasi dengan Shadow DOM, jadi tidak bentrok dengan CSS website.
 */
(function () {
  if (window.__shaistanayaChat) return;
  window.__shaistanayaChat = true;

  var SCRIPT = document.currentScript || document.querySelector('script[src*="widget.js"]');
  var ORIGIN = SCRIPT && SCRIPT.src ? new URL(SCRIPT.src).origin : location.origin;

  var CSS = `
  :host { all: initial !important; --ink:#16264a; --muted:#7a7f90; --accent:#16264a; --gold:#c9a24b; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important; color: #16264a !important; }
  *, *::before, *::after { box-sizing: border-box; }
  button, input { font-family: inherit; }

  #chat-toggle {
    position: fixed; right: 20px; bottom: 20px; width: 60px; height: 60px; border: 0; border-radius: 50%;
    background: #fff; cursor: pointer; font-size: 26px; z-index: 2147483000;
    box-shadow: 0 8px 24px rgba(60,60,120,.25);
    background: linear-gradient(135deg, #263f78, #16264a); color: var(--gold); box-shadow: 0 8px 24px rgba(22,38,74,.4);
  }

  #chat-badge {
    position: absolute; top: -3px; right: -3px; min-width: 22px; height: 22px; padding: 0 6px; border-radius: 11px;
    background: #e53935; color: #fff; font-size: 12px; font-weight: 700; line-height: 22px; text-align: center;
    border: 2px solid #fff; display: none; pointer-events: none;
  }
  #chat-badge.show { display: block; animation: badgePop .4s cubic-bezier(.3,1.6,.5,1) both; }
  @keyframes badgePop { from { transform: scale(0); } to { transform: scale(1); } }

  #chat-box {
    position: fixed; right: 20px; bottom: 92px; z-index: 2147483000;
    width: 360px; max-width: calc(100vw - 32px); height: 560px; max-height: calc(100vh - 116px);
    display: none; flex-direction: column; overflow: hidden; isolation: isolate;
    background: #fff; border-radius: 36px;
    box-shadow: 0 24px 60px rgba(22,38,74,.3), 0 0 0 1px rgba(0,0,0,.04);
  }
  #chat-box.open { display: flex; }

  /* glow pastel di bagian bawah */
  #chat-box::before {
    content: ""; position: absolute; inset: 26% -15% -20% -15%; z-index: -1; filter: blur(34px); opacity: 1;
    background:
      radial-gradient(45% 40% at 20% 42%, #f6e3a6 0, transparent 70%),
      radial-gradient(45% 40% at 82% 36%, #ecd083 0, transparent 70%),
      radial-gradient(40% 35% at 50% 62%, #f2d98f 0, transparent 70%),
      radial-gradient(60% 42% at 14% 90%, #16264a 0, transparent 75%),
      radial-gradient(60% 42% at 88% 88%, #2a4580 0, transparent 75%),
      radial-gradient(45% 30% at 52% 96%, #1a2d58 0, transparent 72%);
  }

  #chat-head { display: flex; align-items: center; gap: 12px; padding: 20px 20px 10px 22px; }
  #avatar { position: relative; flex: none; width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; color: #fff; font-weight: 600; font-size: 18px; background: linear-gradient(135deg, #c9a24b, #16264a); box-shadow: 0 2px 8px rgba(22,38,74,.3); }
  #avatar img { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 50%; object-fit: cover; z-index: 1; }
  #avatar::after { z-index: 2; content: ""; position: absolute; right: 0; bottom: 0; width: 11px; height: 11px; border-radius: 50%; background: #2fc86b; border: 2px solid #fff; }
  #who { flex: 1; min-width: 0; }
  #who b { display: block; font-size: 15px; font-weight: 600; line-height: 1.2; }
  #who span { display: block; font-size: 12.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .hbtn { border: 0; cursor: pointer; font: inherit; font-size: 12.5px; color: #44444f; background: rgba(0,0,0,.05); border-radius: 999px; height: 32px; padding: 0 12px; }
  .hbtn:hover { background: rgba(0,0,0,.09); }
  #chat-close { width: 32px; padding: 0; font-size: 14px; color: var(--muted); }

  #chat-body { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 0 22px; }
  #hello { padding: 0 2px 12px; }
  #hello h3 { font-family: Georgia, "Times New Roman", serif; font-weight: 500; font-size: 28px; line-height: 1.15; margin: 0 0 16px; letter-spacing: -.5px; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { border: 0; cursor: pointer; font: inherit; font-size: 13px; color: #44444f; padding: 9px 15px; border-radius: 999px; background: rgba(255,255,255,.65); backdrop-filter: blur(6px); box-shadow: 0 1px 2px rgba(0,0,0,.06); }
  .chip:hover { background: #fff; }

  #chat-messages { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding: 10px 2px 12px; scrollbar-width: thin; }
  #chat-box.started #hello { display: none; }
  .msg { max-width: 86%; padding: 10px 14px; border-radius: 20px; font-size: 14px; line-height: 1.45; white-space: pre-wrap; overflow-wrap: anywhere; }
  .msg.user { align-self: flex-end; background: linear-gradient(135deg, #263f78, #16264a); color: #fff; border-bottom-right-radius: 6px; }
  .msg.bot { align-self: flex-start; background: rgba(255,255,255,.85); box-shadow: 0 1px 3px rgba(0,0,0,.08); border-bottom-left-radius: 6px; }

  #chat-form { display: flex; gap: 10px; align-items: center; padding: 8px 22px 22px; }
  #chat-input { flex: 1; min-width: 0; border: 0; outline: none; font: inherit; font-size: 15px; padding: 0 22px; height: 56px; border-radius: 999px; background: rgba(255,255,255,.9); box-shadow: 0 2px 10px rgba(22,38,74,.15); color: var(--ink); }
  #chat-input::placeholder { color: #9a9aa6; }
  #chat-btn { flex: none; width: 56px; height: 56px; border: 0; border-radius: 50%; cursor: pointer; background: rgba(255,255,255,.9); box-shadow: 0 2px 10px rgba(22,38,74,.15); color: var(--accent); display: grid; place-items: center; }
  #chat-btn.rec { background: #ff5a6a; color: #fff; }
  #chat-btn:disabled { opacity: .5; cursor: default; }
  #chat-btn svg { width: 22px; height: 22px; fill: currentColor; }
  .wa-btn { align-self: flex-start; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; font-size: 14px; font-weight: 600; color: #fff; background: #25d366; padding: 11px 18px; border-radius: 999px; box-shadow: 0 4px 12px rgba(37,211,102,.35); }
  .wa-btn:hover { background: #1fbd5a; }
  .wa-btn svg { width: 18px; height: 18px; fill: currentColor; }
  .dots span { display:inline-block; width:6px; height:6px; margin:0 2px; border-radius:50%; background:#9a9aa6; animation: b 1s infinite; }
  .dots span:nth-child(2){animation-delay:.15s} .dots span:nth-child(3){animation-delay:.3s}
  @keyframes b { 0%,80%,100%{opacity:.3} 40%{opacity:1} }

  /* Gelembung sapaan di samping kiri tombol chat (navy, selaras dengan tombol) */
  #chat-teaser {
    position: fixed; right: 92px; bottom: 22px; z-index: 2147483000; max-width: 260px;
    display: none; align-items: center; padding: 12px 34px 12px 16px; cursor: pointer;
    background: linear-gradient(135deg, #263f78, #16264a); color: #fff; border-radius: 20px 20px 6px 20px;
    box-shadow: 0 8px 28px rgba(22,38,74,.38);
    font-size: 14px; line-height: 1.35;
  }
  #chat-teaser.show { display: flex; animation: teaserIn .35s ease-out both; }
  #chat-box.open ~ #chat-teaser { display: none !important; }
  #chat-teaser b { display: block; font-weight: 600; color: #fff; }
  #chat-teaser span { color: rgba(255,255,255,.85); }
  #teaser-close { position: absolute; top: 6px; right: 6px; width: 22px; height: 22px; border: 0; border-radius: 50%; background: transparent; color: rgba(255,255,255,.7); font-size: 11px; cursor: pointer; }
  #teaser-close:hover { background: rgba(255,255,255,.14); }
  @keyframes teaserIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: none; } }

  /* Layar kecil (HP): kartu lebih ringkas dan tidak menutupi seluruh halaman */
  @media (max-width: 520px) {
    #chat-toggle { right: 14px; bottom: 14px; width: 52px; height: 52px; font-size: 22px; }
    #chat-teaser { right: 76px; bottom: 14px; max-width: 220px; font-size: 13px; padding: 10px 30px 10px 14px; }
    #chat-box {
      right: 12px; bottom: 76px;
      width: min(330px, calc(100vw - 24px));
      height: min(470px, calc(100vh - 150px)); height: min(470px, calc(100dvh - 150px));
      max-height: none; border-radius: 28px;
    }
    #chat-head { padding: 14px 14px 6px 16px; gap: 10px; }
    #avatar { width: 38px; height: 38px; font-size: 16px; }
    #avatar::after { width: 10px; height: 10px; }
    #who b { font-size: 14px; }
    #who span { font-size: 11.5px; }
    .hbtn { height: 28px; font-size: 12px; padding: 0 10px; }
    #chat-close { width: 28px; padding: 0; }
    #chat-body { padding: 0 14px; }
    .msg { font-size: 13px; line-height: 1.4; padding: 8px 12px; border-radius: 18px; }
    .chip { font-size: 12px; padding: 7px 12px; }
    .wa-btn { font-size: 13px; padding: 9px 15px; }
    #hello { padding-bottom: 8px; }
    #chat-form { gap: 8px; padding: 6px 14px 14px; }
    /* 16px mencegah Safari iPhone memperbesar halaman saat kolom diketik */
    #chat-input { height: 44px; font-size: 16px; padding: 0 16px; }
    #chat-btn { width: 44px; height: 44px; }
    #chat-btn svg { width: 20px; height: 20px; }
  }
`;

  var HTML = `<button id="chat-toggle" aria-label="Buka chat">💬<span id="chat-badge" aria-hidden="true">1</span></button>
<div id="chat-box" role="dialog" aria-label="Chat Shaistanaya City">
  <div id="chat-head">
    <div id="avatar"><img src="${ORIGIN}/naya.png" alt="Naya" width="44" height="44" onerror="this.remove()"><span aria-hidden="true">N</span></div>
    <div id="who"><b>Naya</b><span>Online</span></div>
    <button id="chat-new" class="hbtn" type="button">Sesi baru</button>
    <button id="chat-close" class="hbtn" type="button" aria-label="Tutup chat">✕</button>
  </div>
  <div id="chat-body">
    <div id="chat-messages"></div>
    <div id="hello">
      <div class="chips">
        <button class="chip" type="button">Tipe rumah</button>
        <button class="chip" type="button">${Date.now() >= Date.UTC(2026, 9, 31, 17, 0, 0) ? "Promo November" : "Promo Octoboo"}</button>
        <button class="chip" type="button">Lokasi &amp; akses</button>
        <button class="chip" type="button">Bisa KPR?</button>
        <button class="chip" type="button">Jadwalkan survey</button>
      </div>
    </div>
  </div>
  <form id="chat-form">
    <input id="chat-input" type="text" maxlength="2000" placeholder="Tanya sesuatu..." autocomplete="off">
    <button id="chat-btn" type="button" aria-label="Bicara"></button>
  </form>
</div>
<div id="chat-teaser" role="button" tabindex="0" aria-label="Buka chat dengan Naya">
  <div><b>Halo, saya Naya 👋</b><span>Ada yang bisa dibantu?</span></div>
  <button id="teaser-close" type="button" aria-label="Tutup sapaan">✕</button>
</div>`;

  function mount() {
    var host = document.createElement("div");
    host.id = "shaistanaya-chat-widget";
    var root = host.attachShadow({ mode: "open" });
    root.innerHTML = "<style>" + CSS + "</style>" + HTML;
    document.body.appendChild(host);
    var $ = function (id) { return root.getElementById(id); };

      const API_URL = (SCRIPT && SCRIPT.dataset.api) || ORIGIN + "/api/chat";
      // Template pesan WhatsApp per topik, diawali "[Website]" supaya admin tahu asalnya dan langsung eksekusi.
      const WA_PHONE = "6282330034200";
      const WA_TOPICS = {
        umum:     ["Chat WhatsApp",        "Halo kak, saya tertarik dengan properti yang ditawarkan melalui website Shaistanaya. Boleh minta info lebih lanjut?"],
        survey:   ["Jadwalkan survey",     "Halo kak, saya mau jadwalkan survey ke Shaistanaya City{TIPE}. Boleh dibantu atur harinya?"],
        harga:    ["Tanya harga",          "Halo kak, saya mau tanya harga dan pricelist terbaru{TIPE}. Boleh dikirimkan?"],
        kpr:      ["Tanya KPR & cicilan",  "Halo kak, saya mau tanya simulasi KPR dan cicilan{TIPE}. Boleh dibantu hitung?"],
        booking:  ["Booking unit",         "Halo kak, saya mau booking unit{TIPE}. Boleh dijelaskan alur dan unit yang tersedia?"],
        unit:     ["Cek ketersediaan unit","Halo kak, saya mau cek ketersediaan unit{TIPE}. Unit apa yang masih ready?"],
        promo:    ["Tanya promo",          "Halo kak, saya mau tanya promo yang sedang berjalan{TIPE}. Boleh dijelaskan?"],
        legalitas:["Tanya legalitas",      "Halo kak, saya mau tanya soal legalitas dan sertifikat{TIPE}. Boleh dijelaskan?"],
        orang:    ["Bicara dengan tim",    "Halo kak, saya ingin bicara langsung dengan tim Shaistanaya City{TIPE}. Boleh dihubungi?"]
      };
      function waLink(topic, tipe) {
        const t = WA_TOPICS[topic] ? topic : "umum";
        const label = tipe ? " (tipe " + tipe + ")" : "";
        const text = "[Website Shaistanaya] " + WA_TOPICS[t][1].replace("{TIPE}", label);
        return { href: "https://api.whatsapp.com/send/?phone=" + WA_PHONE + "&text=" + encodeURIComponent(text) + "&app_absent=0", label: WA_TOPICS[t][0] };
      }
      const ICON_WA = '<svg viewBox="0 0 24 24"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2zm5.8 14.05c-.25.7-1.45 1.33-2 1.4-.52.07-1.17.1-1.9-.12a17 17 0 0 1-1.7-.63c-3-1.3-4.94-4.33-5.1-4.53-.14-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.17 1.03-2.46.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.52.25.6.85 2.06.93 2.2.07.15.12.33.02.52-.1.2-.15.32-.3.5l-.45.52c-.15.15-.3.3-.13.6.17.3.77 1.27 1.65 2.05 1.13 1 2.1 1.32 2.4 1.46.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.8 2.02.96.3.15.5.22.57.35.07.12.07.72-.18 1.42z"/></svg>';
      const box = $("chat-box");
      const list = $("chat-messages");
      const form = $("chat-form");
      const input = $("chat-input");
      const btn = $("chat-btn");
      const history = [];
      let busy = false;

      const ICON_MIC = '<svg viewBox="0 0 24 24"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2z"/></svg>';
      const ICON_SEND = '<svg viewBox="0 0 24 24"><path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12 2-12 2z"/></svg>';

      // Sapaan pembuka dari Naya (hanya tampil di widget, tidak dikirim ke server sebagai riwayat).
      const GREETING = "Halo kak, saya Naya, ada yang bisa dibantu ya?";
      let greeted = false;
      async function greet() {
        if (greeted) return;
        greeted = true;
        busy = true; // tahan input sampai sapaan selesai agar urutan bubble rapi
        const bubble = typingBubble();
        await sleep(1400);
        setText(bubble, GREETING);
        list.scrollTop = list.scrollHeight;
        busy = false;
      }

      // Gelembung sapaan: muncul sebentar setelah halaman dibuka, hilang bila ditutup atau chat dibuka.
      const teaser = $("chat-teaser");
      const TEASER_KEY = "shaistanaya-teaser-dismissed";
      let teaserDismissed = false;
      try { teaserDismissed = sessionStorage.getItem(TEASER_KEY) === "1"; } catch (e) {}
      function hideTeaser() {
        teaser.classList.remove("show");
        try { sessionStorage.setItem(TEASER_KEY, "1"); } catch (e) {}
      }
      // Titik merah "1" seperti notifikasi belum terbaca; hilang setelah chat dibuka.
      const badge = $("chat-badge");
      const BADGE_KEY = "shaistanaya-badge-seen";
      let badgeSeen = false;
      try { badgeSeen = sessionStorage.getItem(BADGE_KEY) === "1"; } catch (e) {}
      function clearBadge() {
        badge.classList.remove("show");
        try { sessionStorage.setItem(BADGE_KEY, "1"); } catch (e) {}
      }
      setTimeout(() => {
        if (box.classList.contains("open")) return;
        if (!badgeSeen) badge.classList.add("show");
        if (!teaserDismissed) teaser.classList.add("show");
      }, 2500);

      const toggle = () => {
        box.classList.toggle("open");
        if (box.classList.contains("open")) { hideTeaser(); clearBadge(); input.focus(); greet(); }
      };
      teaser.addEventListener("click", (e) => {
        if (e.target.closest("#teaser-close")) { hideTeaser(); return; }
        hideTeaser();
        if (!box.classList.contains("open")) toggle();
      });
      teaser.addEventListener("keydown", (e) => { if (e.key === "Enter") teaser.click(); });
      $("chat-toggle").onclick = toggle;
      $("chat-close").onclick = toggle;
      $("chat-new").onclick = () => {
        if (busy) return;
        history.length = 0;
        list.textContent = "";
        box.classList.remove("started");
        greeted = false;
        greet();
        input.focus();
      };

      function add(role, text) {
        const el = document.createElement("div");
        el.className = "msg " + role;
        el.textContent = text; // textContent: aman dari XSS
        list.appendChild(el);
        list.scrollTop = list.scrollHeight;
        return el;
      }

      // Penanda [[WA]] atau [[WA:topik]] atau [[WA:topik:tipe]] (atau link wa.me) = tombol WhatsApp; teks dibersihkan.
      function parseReply(text) {
        const m = text.match(/\[\[WA(?::([a-z]+))?(?::([A-Za-z ]+))?\]\]/);
        const wa = m ? { topic: (m[1] || "umum").toLowerCase(), tipe: m[2] ? m[2].trim() : "" } : (/wa\.me\/6282330034200/.test(text) ? { topic: "umum", tipe: "" } : null);
        const clean = text
          .replace(/\[\[WA[^\]]*\]\]/g, "")
          .replace(/\s*(\(?\s*(di|ke|lewat)\s+)?(https?:\/\/)?wa\.me\/6282330034200\)?/gi, "")
          .replace(/[ \t]+\n/g, "\n")
          .trim();
        return { clean, wa };
      }
      function addWaButton(wa) {
        const link = waLink(wa.topic, wa.tipe);
        const a = document.createElement("a");
        a.className = "wa-btn";
        a.href = link.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.innerHTML = ICON_WA;
        const span = document.createElement("span");
        span.textContent = link.label;
        a.appendChild(span);
        list.appendChild(a);
        list.scrollTop = list.scrollHeight;
      }

      // Tampilkan **teks** sebagai tebal, tanpa innerHTML (aman dari XSS)
      function setText(el, text) {
        el.textContent = "";
        text.split(/\*\*(.+?)\*\*/gs).forEach((part, i) => {
          if (!part) return;
          if (i % 2) {
            const b = document.createElement("strong");
            b.textContent = part;
            el.appendChild(b);
          } else {
            el.appendChild(document.createTextNode(part.replace(/\*\*/g, "")));
          }
        });
      }

      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      // Jeda "mengetik" agar terasa seperti manusia. Ubah angka ini untuk lebih cepat/lambat.
      const TYPE_BASE_MS = 1200;     // jeda minimum sebelum bubble muncul
      const TYPE_PER_CHAR_MS = 45;   // tambahan per karakter
      const TYPE_MAX_MS = 4500;      // batas jeda per bubble
      const GAP_BETWEEN_MS = 500;    // napas antar bubble
      const typeDelay = (t) => Math.min(TYPE_MAX_MS, TYPE_BASE_MS + t.length * TYPE_PER_CHAR_MS);
      function typingBubble() {
        const el = add("bot", "");
        el.innerHTML = '<span class="dots"><span></span><span></span><span></span></span>';
        return el;
      }
      // Balasan dipecah per paragraf jadi beberapa bubble, masing-masing dengan jeda mengetik.
      function splitReply(text) {
        const parts = text.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean);
        if (parts.length <= 3) return parts;
        return [parts[0], parts[1], parts.slice(2).join("\n\n")];
      }

      async function ask(text) {
        if (busy || !text) return;
        busy = true;
        box.classList.add("started");
        add("user", text);
        history.push({ role: "user", content: text });
        let typing = typingBubble();
        const startedAt = Date.now();
        try {
          const r = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: history }),
          });
          const data = await r.json();
          if (!r.ok) throw new Error(data.error || "Error");
          const { clean, wa } = parseReply(data.reply);
          const parts = splitReply(clean);
          for (let i = 0; i < parts.length; i++) {
            if (i > 0) {
              await sleep(GAP_BETWEEN_MS);
              typing = typingBubble();
              await sleep(typeDelay(parts[i]));
            } else {
              // waktu menunggu server dihitung sebagai bagian dari jeda mengetik
              await sleep(Math.max(0, typeDelay(parts[i]) - (Date.now() - startedAt)));
            }
            setText(typing, parts[i]);
            list.scrollTop = list.scrollHeight;
          }
          if (wa) addWaButton(wa);
          history.push({ role: "assistant", content: data.reply });
        } catch (err) {
          const { clean, wa } = parseReply(err.message || "Maaf, terjadi kesalahan.");
          setText(typing, clean);
          if (wa) addWaButton(wa);
          history.pop(); // buang pesan user yang gagal agar riwayat tetap valid
        } finally {
          busy = false;
          list.scrollTop = list.scrollHeight;
        }
      }

      root.querySelectorAll(".chip").forEach((c) => (c.onclick = () => ask(c.textContent)));

      // Tombol bulat: mikrofon saat kosong, kirim saat ada teks
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      let rec = null;
      function syncBtn() {
        const hasText = input.value.trim().length > 0;
        btn.innerHTML = hasText || !SR ? ICON_SEND : ICON_MIC;
        btn.setAttribute("aria-label", hasText || !SR ? "Kirim" : "Bicara");
      }
      input.addEventListener("input", syncBtn);
      syncBtn();

      function submit() {
        const text = input.value.trim();
        input.value = "";
        syncBtn();
        ask(text);
      }
      form.addEventListener("submit", (e) => { e.preventDefault(); submit(); });

      btn.onclick = () => {
        if (input.value.trim() || !SR) return submit();
        if (rec) { rec.stop(); return; }
        rec = new SR();
        rec.lang = "id-ID";
        rec.interimResults = false;
        rec.onstart = () => btn.classList.add("rec");
        rec.onresult = (e) => { input.value = e.results[0][0].transcript; syncBtn(); submit(); };
        rec.onend = () => { btn.classList.remove("rec"); rec = null; };
        rec.onerror = () => {};
        rec.start();
      };
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
