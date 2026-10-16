-- Pembaruan knowledge base: USP, spesifikasi bangunan, bank rekanan, lokasi, varian unit (16 Okt 2026).
-- Menggantikan entri lama dengan judul yang sama, lalu menambah entri baru.
-- Catatan: di project produksi entri lama dinonaktifkan (active = false), bukan dihapus; hasilnya sama bagi bot.
begin;

delete from public.chatbot_kb where title in (
  'Tipe Gwen','Tipe New Gwen','Mezzanine','Smart door lock','Tipe Arnica','Tipe Bianca','Harga mulai',
  'Pembayaran cash, bertahap, dan nego','Promo Octoboo: ringkasan','DP 0% dan gratis biaya','KPR dan bank rekanan',
  'Keamanan dan one gate system','Listrik, internet, dan air','Akses: tol, stasiun, bandara, mal, pasar',
  'Sekolah dan rumah sakit','Bebas banjir dan jalan lebar','Perbedaan Montana dan Sierra','Tipe Standard dan Hook',
  'Tipe Darlene','Keunggulan Shaistanaya City','Cluster Montana: konsep dan desain','Cluster Sierra: konsep dan desain',
  'Developer PT Neo Pudji Jaya','Private pool Sierra','Tipe Angeline'
);

insert into public.chatbot_kb (category, title, tags, priority, content) values

-- USP & PROFIL -----------------------------------------------------------
('profil', 'Keunggulan Shaistanaya City (USP)', array['keunggulan','kelebihan','usp','dibanding','perumahan lain','beda','alasan','pembeda','kenapa'], 4,
$kb$Keunggulan utama: (1) lokasi di Sidoarjo Kota, bukan di pinggiran; (2) kawasan bebas banjir, pembeda tajam dengan kawasan lain di Sidoarjo yang rawan banjir; (3) one gate system, CCTV area publik, dan security 24 jam; (4) row jalan lebar; (5) dua tema desain dalam satu kawasan, American Style (Montana) dan Scandinavian Contemporary (Sierra); (6) smartdoor lock standar di semua unit; (7) spesifikasi bangunan kuat (hebel, baja ringan, plafon hollow galvalum, engineer door); (8) dibangun langsung oleh PT Neo Pudji Jaya sebagai developer sekaligus general contractor; (9) entry price kompetitif dan pembayaran fleksibel. Jangan menjelekkan perumahan lain; tanyakan prioritas pengunjung lalu tonjolkan keunggulan yang paling cocok, dan ajak survey agar bisa dibuktikan langsung.$kb$),

('lokasi', 'Lokasi strategis di Sidoarjo Kota', array['lokasi','strategis','sidoarjo kota','pusat kota','jauh','pinggiran','akses','dekat'], 3,
$kb$Lokasinya di Sidoarjo Kota, bukan di pinggiran, jadi di tengah akses kota: 1 menit ke Puskesmas Sidodadi, 8 menit ke RS Delta Surya Sidoarjo, 9 menit ke Gate Tol Sidoarjo (ruas Surabaya-Porong), 8 menit ke Lippo Plaza, 10 menit ke Suncity Mall, 5 menit ke Pasar Suko, dan dekat juga ke Pasar Modern Sidodadi. Kalau pengunjung merasa lokasinya jauh, tanyakan domisili atau tempat kerjanya dulu, lalu tunjukkan waktu tempuh nyata dan ajak survey. Jangan membantah penilaian mereka.$kb$),

('lokasi', 'Akses: tol, stasiun, bandara, mal, pasar, kesehatan', array['tol','gerbang tol','gate tol','stasiun','bandara','juanda','mall','mal','lippo','lippo plaza','suncity','pasar suko','pasar modern','puskesmas','rumah sakit','delta surya','menit','jarak','dekat','akses','surabaya','porong','komuter'], 4,
$kb$Estimasi waktu tempuh (tergantung lalu lintas): Puskesmas Sidodadi 1 menit; Pasar Suko 5 menit (Pasar Modern Sidodadi juga dekat); RS Delta Surya Sidoarjo 8 menit; Lippo Plaza 8 menit; Suncity Mall 10 menit; Gate Tol Sidoarjo 9 menit (ruas Surabaya-Porong, cocok untuk yang komuter ke Surabaya); Stasiun Sidoarjo sekitar 11 menit; Bandara Juanda sekitar 30 menit. Jarak ke Surabaya: akses tol cukup praktis, waktunya tergantung jam dan lalu lintas (jangan menyebut angka menit).$kb$),

('lokasi', 'Sekolah, rumah sakit, dan kesehatan terdekat', array['sekolah','rumah sakit','rs','puskesmas','kampus','paud','kesehatan','darurat','delta surya'], 3,
$kb$Akses kesehatan sangat dekat: Puskesmas Sidodadi sekitar 1 menit dan RS Delta Surya Sidoarjo sekitar 8 menit. Nama dan jarak sekolah tertentu tidak ada di data: jangan menyebut. Tanyakan kebutuhan pengunjung (misalnya sekolah anak), lalu arahkan ke tim marketing untuk info jaraknya.$kb$),

-- KEAMANAN & INFRASTRUKTUR ----------------------------------------------
('fasilitas', 'Keamanan: one gate, CCTV, security 24 jam', array['keamanan','aman','one gate','cctv','satu pintu','security','satpam','portal','24 jam'], 4,
$kb$Keamanan kawasan berlapis: one gate system (akses keluar-masuk lewat satu pintu utama dan terkontrol), CCTV di area publik kawasan, dan security 24 jam. Beberapa penghuni menyebut keamanan sebagai nilai plus.$kb$),

('fasilitas', 'Bebas banjir dan row jalan lebar', array['banjir','bebas banjir','drainase','jalan','row jalan','lebar','berpapasan','mobil'], 4,
$kb$Kawasan bebas banjir, klaim yang jadi pembeda dengan kawasan lain di Sidoarjo yang rawan banjir; dirancang dengan drainase modern, dan calon pembeli bisa melihat kondisi lingkungan langsung saat survey. Row jalan di dalam kawasan lebar, jadi mobil berpapasan tidak sempit. Ukuran row jalan dalam meter tidak ada di data.$kb$),

('fasilitas', 'Listrik, air PDAM, internet, dan TV kabel', array['listrik','pln','internet','iconnet','air','pdam','air bersih','daya','tv kabel','sambungan','serah terima','kabel'], 3,
$kb$Instalasi PDAM, listrik PLN, internet, dan TV kabel sudah lengkap per unit saat serah terima, jadi pembeli tidak perlu mengurus sambungan sendiri. Cakupan internet kabel sudah tersedia di kawasan (ICONNET). Listrik PLN prabayar; daya per tipe dikonfirmasi tim marketing.$kb$),

-- DESAIN & FITUR --------------------------------------------------------
('montana', 'Cluster Montana: konsep dan desain', array['montana','american style','desain','atap','mezzanine','pintu lengkung','tema'], 3,
$kb$Montana bergaya American Style yang modern dan timeless: atap miring bersih, panel kayu, pintu utama berbentuk lengkung, lampu dinding hangat di setiap muka rumah. Smartdoor lock standar di setiap unit. Mezzanine ada di sejumlah tipe (New Gwen, Angeline, Darlene). Tipe: Gwen, New Gwen, Angeline, Darlene, masing-masing 2 kamar tidur, 1 kamar mandi, carport untuk 2 mobil. Ada versi Standard dan Hook.$kb$),

('sierra', 'Cluster Sierra: konsep dan desain', array['sierra','scandinavian','modern scandinavian','2 lantai','desain','balcony','balkon','atap segitiga','tema'], 3,
$kb$Sierra adalah hunian 2 lantai bergaya Scandinavian Contemporary: fasad atap segitiga, panel kayu, jendela kaca besar agar cahaya alami masuk. Ada balcony di setiap tipe, smartdoor lock standar, dan private pool di varian tertentu. Semua tipe: 3 kamar tidur, 2 kamar mandi. Tipe: Bianca (Garden, Deluxe) dan Arnica (Garden, Pool), masing-masing ada versi Hook. Spesifikasi lebih premium dibanding Montana (pondasi, granite tile, kamar mandi).$kb$),

('profil', 'Dua tema desain dalam satu kawasan', array['tema','desain','selera','american','scandinavian','pilihan desain','dua cluster','fleksibel'], 2,
$kb$Ada dua pilihan tema desain dalam satu kawasan besar: American Style (Montana) dan Scandinavian Contemporary (Sierra), jadi pengunjung dengan selera berbeda tetap bisa satu kawasan tanpa pindah. Tanyakan lebih suka gaya klasik hangat atau modern minimalis.$kb$),

('montana', 'Smartdoor lock', array['smart door lock','smartdoor lock','kunci','pintu pintar','akses','standar'], 3,
$kb$Smartdoor lock adalah fitur standar di semua unit, di kedua cluster (Montana dan Sierra), bukan opsional atau tambahan. Penghuni tidak perlu repot membawa dan mencari kunci; aksesnya praktis dan modern untuk seluruh anggota keluarga.$kb$),

('montana', 'Mezzanine', array['mezzanine','lantai tambahan','ruang ekstra','kamar tidur','fleksibel','workspace','ruang kerja'], 3,
$kb$Mezzanine adalah lantai tambahan setengah tingkat di dalam rumah, ruang tambahan fleksibel untuk bersantai, workspace, ruang baca, area bermain anak, atau penyimpanan. Fitur yang jarang ada di rumah sekelas ini ada di sejumlah tipe Montana: New Gwen, Angeline, dan Darlene (juga versi Hook-nya). Untuk dijadikan kamar tidur, peruntukan dan spesifikasi per tipe dikonfirmasi dulu ke tim marketing.$kb$),

('montana', 'Tipe Standard dan Hook', array['hook','standard','sudut','pojok','kavling pojok','posisi','tipe hook','beda','cahaya','privasi','investasi','resale'], 3,
$kb$Hook adalah unit di posisi sudut (kavling pojok): punya sisi tambahan yang terbuka sehingga cahaya dan sirkulasi lebih baik, lebih privat, dan luas efektif lebih besar. Karena posisinya, unit Hook sering dilirik pembeli yang memikirkan nilai jangka panjang atau investasi, tetapi jangan menjanjikan kenaikan nilai atau resale. Unit mana yang Hook, ketersediaan, dan selisih harga dengan versi Standard: arahkan ke tim marketing.$kb$),

-- TIPE MONTANA -----------------------------------------------------------
('montana', 'Tipe Gwen', array['gwen','tipe gwen','38','72','106','entry','termurah','hook','murah'], 4,
$kb$Gwen adalah tipe entry Montana, harga mulai sekitar Rp598 jutaan cash (cek pricelist terbaru untuk harga pasti). LB 38 m2; Gwen Standard LT 72 m2, Gwen Hook LT 106 m2. 2 kamar tidur, 1 kamar mandi, ruang tamu, ruang makan, dapur, carport 2 mobil. Desain American Style dengan smartdoor lock standar. Pas untuk keluarga kecil atau pembeli dengan budget terbatas. Catatan: harga dan spesifikasi peluncuran lama sudah tidak berlaku, jadi konfirmasi ke tim marketing sebelum menyebut angka pasti.$kb$),

('montana', 'Tipe New Gwen', array['new gwen','tipe new gwen','45','72','112','hook','mezzanine','beda gwen','versi baru'], 4,
$kb$New Gwen: LB 45 m2, sudah dengan mezzanine. New Gwen Standard LT 72 m2, New Gwen Hook LT 112 m2 (kavling pojok). 2 kamar tidur, 1 kamar mandi. Cocok untuk keluarga urban yang ingin ruang tambahan fleksibel. Kalau pengunjung menyebut "Gwen" dari promo lama, klarifikasi halus: yang tersedia sekarang New Gwen, dan harga serta spesifikasi peluncuran lama sudah tidak berlaku. Harga pasti: arahkan ke tim marketing.$kb$),

('montana', 'Tipe Angeline', array['angeline','tipe angeline','45','90','133','mezzanine','hook','luas','terbesar'], 3,
$kb$Angeline: LB 45 m2 dengan mezzanine, 2 kamar tidur, 1 kamar mandi. Angeline Standard LT 90 m2, Angeline Hook LT 133 m2 (salah satu tipe dengan lahan terbesar di Montana, cocok untuk yang mau unit paling lega).$kb$),

('montana', 'Tipe Darlene', array['darlene','tipe darlene','45','91','mezzanine','estetik','desain','cantik'], 3,
$kb$Darlene, "Rumah Estetik" Montana: LB 45 m2, LT 91 m2, dengan mezzanine, 2 kamar tidur, 1 kamar mandi. Tonjolkan sisi desain American Style dan mezzanine yang estetik sekaligus fungsional. Cocok untuk pengunjung yang peduli tampilan rumah, bukan hanya harga.$kb$),

-- TIPE SIERRA -----------------------------------------------------------
('sierra', 'Varian Sierra: Bianca dan Arnica', array['varian','garden','deluxe','pool','hook','bianca','arnica','pilihan','tipe sierra','daftar tipe','beda'], 4,
$kb$Sierra punya dua keluarga desain, masing-masing bervariasi: Bianca Garden (LB 55 / LT 72, tanpa pool, entry point Sierra), Bianca Deluxe (LB 65 / LT 72, lebih luas dan masih satu keluarga desain), Bianca Deluxe Hook (kavling pojok); Arnica Garden (LB 70 / LT 90, layout berbeda dari Bianca), Arnica Pool (LB 91 / LT 90, private pool, satu-satunya varian non-hook dengan pool), Arnica Garden Hook, dan Arnica Pool Hook (paling premium). Semua: 2 lantai, 3 kamar tidur, 2 kamar mandi, balcony, smartdoor lock. Harga tiap varian: arahkan ke tim marketing.$kb$),

('sierra', 'Tipe Bianca (Garden, Deluxe, Hook)', array['bianca','bianca garden','bianca deluxe','garden','deluxe','55','65','72','efisien','hook'], 3,
$kb$Bianca Garden: LB 55 / LT 72, tanpa private pool, entry point Sierra: tetap dapat 2 lantai, balcony, dan desain Scandinavian Contemporary. Bianca Deluxe: LB 65 / LT 72, 3 kamar tidur, lebih luas, upgrade kecil dari Garden. Bianca Deluxe Hook: posisi kavling pojok, sisi tambahan untuk cahaya dan privasi. Selisih harga antarvarian dikonfirmasi lewat tim marketing.$kb$),

('sierra', 'Tipe Arnica (Garden, Pool, Hook)', array['arnica','arnica garden','arnica pool','70','91','90','private pool','garden','hook','kolam'], 3,
$kb$Arnica Garden: LB 70 / LT 90, 3 kamar tidur, opsi desain kedua di Sierra dengan layout berbeda dari Bianca. Arnica Pool: LB 91 / LT 90, dengan private pool, satu-satunya varian non-hook yang punya private pool. Arnica Garden Hook dan Arnica Pool Hook: versi kavling pojok (Pool Hook adalah yang teratas di Sierra). Ukuran LB/LT versi Hook dan harga: arahkan ke tim marketing.$kb$),

('sierra', 'Private pool Sierra', array['private pool','kolam renang','kolam','pool','ukuran kolam','filtrasi','berenang','pribadi'], 3,
$kb$Private pool hanya tersedia pada varian Sierra tertentu (Arnica Pool dan Arnica Pool Hook), tidak semua unit; fitur baru yang jadi pembeda kuat di segmen hunian menengah-atas Sidoarjo. Ukuran, kedalaman, dan sistem filtrasi kolam tidak ada di data: arahkan ke tim marketing. Unit premium biasanya terbatas; jangan menyebut ketersediaan pasti.$kb$),

('sierra', 'Perbedaan Montana dan Sierra', array['beda','bedanya','montana','sierra','bandingkan','pilih','perbandingan','premium'], 4,
$kb$Montana: American Style, mezzanine di sejumlah tipe, 2 kamar tidur 1 kamar mandi, carport 2 mobil, entry price kompetitif (Gwen sekitar Rp598 jutaan cash), pondasi batu kali, granite tile 60x60. Sierra: Scandinavian Contemporary 2 lantai, balcony, 3 kamar tidur 2 kamar mandi, private pool di varian tertentu, nuansa lebih privat dan spesifikasi lebih premium: pondasi batu kali plus strauss pile, granite tile 80x80, kamar mandi lebih besar dengan keramik dinding 30x60. Keduanya smartdoor lock standar. Tanyakan kebutuhan keluarga dan budget untuk merekomendasikan.$kb$),

('profil', 'Rekomendasi tipe sesuai kebutuhan', array['rekomendasi','saran','cocok','pilih','budget','murah','investasi','estetik','lifestyle','bingung','mana yang'], 3,
$kb$Panduan merekomendasikan (tanyakan budget dan kebutuhan dulu): budget terbatas atau baru cari-cari: Gwen (Montana) atau Bianca Garden (Sierra). Peduli desain dan estetika: Darlene. Mau ruang tambahan fleksibel: New Gwen, Angeline, atau Darlene (ada mezzanine). Mau rumah 2 lantai dengan balcony: Bianca. Ingin kolam renang pribadi atau gaya hidup eksklusif: Arnica Pool. Memikirkan investasi atau nilai jangka panjang: unit Hook (kavling pojok), tanpa menjanjikan kenaikan nilai. Jangan membuka dengan unit termahal (Arnica Pool atau Pool Hook) ke pengunjung yang sensitif harga; mulai dari entry point, naikkan kalau mereka menunjukkan budget lebih besar.$kb$),

-- SPESIFIKASI -----------------------------------------------------------
('spesifikasi', 'Spesifikasi bangunan standar semua unit', array['spesifikasi','spek','material','kualitas','hebel','bata ringan','bata merah','atap','genteng','baja ringan','plafon','hollow','galvalum','rayap','pintu','engineer door','kusen','aluminium','konstruksi','bangunan','tahan lama'], 4,
$kb$Standar semua unit: dinding bata ringan (hebel), lebih presisi serta kedap suara dan panas lebih baik dibanding bata merah; atap genteng beton flat dengan rangka baja ringan, tahan lama dan minim perawatan; rangka plafon hollow galvalum, anti rayap dan tidak mudah lapuk seperti rangka kayu; pintu engineer door dengan kusen aluminium powder coating, material presisi dan tahan lama; instalasi PDAM, listrik PLN, internet, dan TV kabel sudah lengkap per unit saat serah terima. Dibangun langsung oleh PT Neo Pudji Jaya sebagai developer sekaligus general contractor.$kb$),

('spesifikasi', 'Spesifikasi premium Sierra vs Montana', array['spesifikasi sierra','pondasi','strauss pile','batu kali','granite','granit','keramik','kamar mandi','lantai','premium','80x80','60x60','nat'], 3,
$kb$Pembeda Sierra dibanding Montana: pondasi Sierra kombinasi batu kali dan strauss pile, struktur ekstra kuat untuk hunian 2 lantai (Montana batu kali saja); granite tile lantai Sierra 80x80 dibanding Montana 60x60, kesan ruang lebih premium dan minim sambungan nat; kamar mandi Sierra memakai keramik dinding 30x60 dan lantai 60x60, lebih besar dibanding Montana (25x40 dan 25x25), finishing kelas atas.$kb$),

('profil', 'Developer PT Neo Pudji Jaya', array['developer','pengembang','neo pudji jaya','pengalaman','kontraktor','general contractor','portofolio','proyek lain','company profile','pendiri','satu tangan'], 3,
$kb$Dikembangkan dan dibangun langsung oleh PT Neo Pudji Jaya sebagai developer sekaligus general contractor: satu tangan dari desain sampai bangun, bukan dilempar ke kontraktor pihak ketiga. Berpengalaman puluhan tahun (jangan menyebut angka tahun) membangun perumahan, villa, dan pusat bisnis. Visi: kawasan hunian modern, nyaman, dan berkelanjutan untuk keluarga masa depan. Company profile PDF tersedia di website atau bisa diminta lewat tim marketing.$kb$),

-- HARGA & PEMBAYARAN ------------------------------------------------------
('harga', 'Harga mulai', array['harga','berapa','mulai','murah','budget','harga rumah','entry','598','terjangkau'], 5,
$kb$Entry price kompetitif: tipe Gwen di Montana mulai sekitar Rp598 jutaan cash, pintu masuk yang realistis untuk budget terbatas (cek pricelist terbaru untuk harga pasti). Harga Sierra dan harga per tipe tidak ada di data: jangan menyebut angka, arahkan ke tim marketing untuk pricelist terbaru. Jangan langsung menawarkan diskon atau menurunkan harga sebelum tahu budget dan kebutuhan pengunjung; tawarkan simulasi cicilan sesuai budget.$kb$),

('harga', 'Skema pembayaran dan nego', array['cash','hard cash','tunai','tunai bertahap','bertahap','kpr','skema','pembayaran','cara bayar','nego','tawar','diskon','inhouse'], 4,
$kb$Skema pembayaran fleksibel: Hard Cash, KPR, atau Tunai Bertahap. Detail tiap skema dan jadwal tunai bertahap dijelaskan tim marketing sesuai tipe. KPR didukung bank rekanan, termasuk opsi syariah. Nego harga: jangan menjanjikan diskon di luar promo resmi; arahkan ke tim marketing.$kb$),

('kpr', 'KPR dan bank rekanan', array['kpr','bank','rekanan','partner','bsi','btn','bri','bsn','dki','jatim','bni','mandiri','syariah','suku bunga','bunga','tenor','pengajuan','kredit','cicil'], 5,
$kb$KPR dibantu tim marketing bersama bank rekanan, dari simulasi sampai akad. Bank rekanan: BSI, BTN, BRI, BSN, Bank DKI Jatim, BNI, dan Mandiri; opsi syariah lewat BSI dan BSN. Suku bunga, tenor maksimal, dan syarat per bank tidak ada di data: arahkan ke tim marketing. Tenor ditentukan bank dan profil pemohon; jangan menjanjikan persetujuan KPR.$kb$),

('promo', 'DP 0% dan gratis biaya AJB, BBN, BPHTB (skema standar)', array['dp 0','dp nol','dp','gratis biaya','free biaya','ajb','bbn','bphtb','notaris','biaya kpr','gratis semua biaya','standar','uang muka'], 5,
$kb$DP 0% dan gratis biaya AJB, BBN, dan BPHTB adalah skema pembiayaan standar perusahaan, bukan hanya promo musiman. Yang berlaku khusus selama promo adalah komponen notaris dan biaya KPR (syarat dan ketentuan berlaku). Yang perlu disiapkan di awal adalah booking fee. Detail simulasi dibantu tim marketing.$kb$),

('promo', 'Promo Octoboo: ringkasan', array['promo','octoboo','diskon','bonus','benefit','sampai kapan','berakhir','31 oktober','periode'], 5,
$kb$Promo Octoboo berlaku sampai 31 Oktober 2026 (syarat dan ketentuan berlaku), untuk Cluster Montana dan Sierra: gratis semua biaya termasuk notaris dan biaya KPR selama promo (di atas skema standar DP 0% dan gratis AJB, BBN, BPHTB); gratis kanopi dan AC; subsidi angsuran Rp1 juta x 6 bulan; gratis IPL; subsidi asuransi hingga Rp10 juta; Spooky Discount berupa diskon puluhan juta rupiah. Booking fee Montana Rp2,5 juta, Sierra Rp5 juta. Khusus Montana ada hadiah Grand Prize Honda Brio, Honda Beat, dan hadiah lain. Khusus Sierra ada gratis peningkatan SHM. Selalu sebut tanggal berakhir dan ajak jadwalkan survey.$kb$),

-- KEBERATAN (panduan menjawab) -----------------------------------------
('keberatan', 'Pengunjung ragu soal harga', array['mahal','kemahalan','harga','budget','keberatan','ragu','terlalu','nego','diskon'], 4,
$kb$Panduan: tunjukkan empati dulu, lalu beri gambaran, jangan langsung diskon. Contoh gaya: "Paham banget, Kak. Buat gambaran, tipe Gwen di Montana mulai sekitar 598 jutaan cash, dan ada DP 0% plus gratis biaya AJB, BBN, dan BPHTB. Kalau mau, aku bantu hitungin simulasi cicilannya sesuai budget biar kelihatan per bulannya." Poin: entry price kompetitif, DP 0% dan gratis biaya standar, pembayaran fleksibel (Hard Cash, KPR, Tunai Bertahap) dengan bank rekanan termasuk syariah. Hindari menurunkan harga atau menawarkan diskon sebelum tahu budget.$kb$),

('keberatan', 'Pengunjung merasa lokasi jauh', array['jauh','lokasi jauh','pelosok','pinggiran','macet','kejauhan','keberatan'], 4,
$kb$Panduan: jangan membantah, tanyakan dulu domisili atau tempat kerja, lalu tunjukkan waktu tempuh nyata. Contoh gaya: "Lokasinya justru di Sidoarjo kota lho, Kak: 1 menit ke Puskesmas Sidodadi, 8 menit ke RS Delta Surya, 9 menit ke Gate Tol Sidoarjo. Mal juga dekat, Lippo Plaza 8 menit dan Suncity Mall 10 menit." Untuk yang komuter ke Surabaya, tonjolkan gate tol 9 menit. Lalu ajak survey.$kb$),

('keberatan', 'Pengunjung belum waktunya beli', array['belum waktunya','nanti','tahun depan','masih lama','belum siap','nanti dulu','pikir-pikir','keberatan','timing'], 3,
$kb$Panduan: jangan menekan atau mengulang ajakan beli. Contoh gaya: "Tidak apa-apa, Kak. Boleh tahu rencananya kira-kira kapan? Kalau mau, survey dulu tanpa komitmen biar tahu gambaran unitnya." Tanyakan perkiraan waktu, tawarkan survey tanpa komitmen sebagai cara mengenal unit, lalu biarkan pengunjung memutuskan.$kb$),

('keberatan', 'Pengunjung membandingkan dengan perumahan lain', array['bandingkan','kompetitor','perumahan lain','dibanding','saingan','sebelah','lebih bagus','keberatan','survey perumahan'], 4,
$kb$Panduan: wajar sekali membandingkan; tanyakan perumahan mana yang sedang dilihat, jangan menjelekkan. Tonjolkan yang bisa dibuktikan saat survey: kawasan bebas banjir, one gate system dengan CCTV dan security 24 jam, dibangun langsung oleh PT Neo Pudji Jaya (developer sekaligus kontraktor, satu tangan dari desain sampai bangun), dan standar semua unit: hebel, rangka atap baja ringan, plafon hollow galvalum, smartdoor lock. Paling jelas dibandingkan lewat survey langsung.$kb$);

commit;
select category, count(*) from public.chatbot_kb group by category order by category;
