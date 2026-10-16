-- Knowledge base awal Shaistanaya City (sumber: "Database Lengkap dan 100 FAQ", 15 Oktober 2026).
-- Jalankan sekali setelah migrasi. Untuk melatih bot, edit atau tambah baris di tabel chatbot_kb.
insert into public.chatbot_kb (category, title, tags, priority, content) values

-- PROFIL ---------------------------------------------------------------
('profil', 'Profil Shaistanaya City', array['perumahan','konsep','cozy urban living','tagline','alamat','website','sosial media','instagram','tiktok'], 2,
$kb$Shaistanaya City (tagline: Cozy Urban Living) adalah perumahan modern di pusat Kota Sidoarjo. Ada dua cluster hunian: Montana (American Style) dan Sierra (Scandinavian Contemporary), plus ruko strategis. Cluster Dakota akan hadir (upcoming). Cozy Urban Living artinya hunian nyaman dan hangat, tetapi praktis di tengah kota: dekat aktivitas kota namun pulang ke lingkungan yang tenang, aman, dan tertata. Alamat: Jl. Sidodadi, Sudio, Sidodadi, Kec. Candi, Kabupaten Sidoarjo, Jawa Timur. Website shaistanayacity.com. Instagram dan TikTok @shaistanayacity, YouTube @shaistanayacity, linktr.ee/shaistanayacity.$kb$),

('profil', 'Keunggulan Shaistanaya City', array['keunggulan','kelebihan','dibanding','perumahan lain','beda','alasan'], 1,
$kb$Keunggulan: lokasi di pusat Kota Sidoarjo, konsep desain berbeda (American Style dengan mezzanine, Scandinavian dengan private pool di unit terpilih), one gate system dan CCTV area publik 24 jam, kawasan dirancang bebas banjir dengan drainase modern, row jalan lebar, legalitas terjamin, dan developer berpengalaman. Jangan menjelekkan perumahan lain; tanyakan prioritas pengunjung lalu cocokkan dengan keunggulan ini.$kb$),

('profil', 'Cocok untuk siapa', array['cocok','keluarga','untuk siapa','investasi','anak muda','urban'], 0,
$kb$Cocok untuk keluarga urban yang ingin tinggal dekat pusat kota tapi tetap nyaman dan aman. Montana pas untuk keluarga kecil atau pasangan muda yang ingin rumah fungsional dengan ruang ekstra. Sierra pas untuk keluarga yang mau rumah 2 lantai dengan 3 kamar tidur dan balcony. Tanyakan jumlah anggota keluarga.$kb$),

('profil', 'Penghuni dan testimoni', array['penghuni','testimoni','sudah ada','ditempati','review'], 0,
$kb$Sudah ada penghuni. Beberapa penghuni memberi testimoni soal keamanan lingkungan, kualitas bangunan, dan pengerjaan yang cepat. Calon pembeli bisa survey langsung untuk melihat suasana lingkungan.$kb$),

('profil', 'Masterplan dan siteplan', array['masterplan','siteplan','denah kawasan','tata letak','virtual tour','foto','video'], 1,
$kb$Ada masterplan interaktif di masterplanshaistanayacity.vercel.app untuk melihat tata letak kawasan. Ada juga foto, video unit, dan virtual tour di website shaistanayacity.com. Tetap sarankan survey langsung karena paling terasa.$kb$),

('profil', 'Ruko', array['ruko','toko','komersial','usaha','bisnis'], 1,
$kb$Tersedia ruko strategis di pusat bisnis Sidoarjo dengan desain modern bergaya Amerika klasik. Ukuran, harga, dan ketersediaan unit ruko tidak ada di data: arahkan ke tim marketing WhatsApp.$kb$),

('profil', 'Cluster Dakota (upcoming)', array['dakota','cluster baru','upcoming','peluncuran','cluster lain'], 1,
$kb$Dakota adalah cluster modern yang akan hadir (upcoming) dengan lingkungan asri dan fasilitas lengkap untuk keluarga. Tipe, ukuran, harga, dan jadwal peluncuran belum tersedia: arahkan ke tim marketing WhatsApp.$kb$),

-- CLUSTER MONTANA -------------------------------------------------------
('montana', 'Cluster Montana: konsep dan desain', array['montana','american style','desain','atap','mezzanine','pintu lengkung'], 2,
$kb$Montana bergaya American Style yang modern dan timeless: atap miring bersih, panel kayu, pintu utama berbentuk lengkung, lampu dinding hangat di setiap muka rumah, dan mezzanine yang membuat rumah terasa lebih lega dan tinggi. Setiap unit memakai smart door lock. Semua tipe Montana punya 2 kamar tidur, 1 kamar mandi, ruang tamu, ruang makan, dapur, dan carport untuk 2 mobil. Tipe: Gwen, New Gwen, Angeline, Darlene.$kb$),

('montana', 'Tipe Gwen', array['gwen','tipe gwen','38','106','luas'], 2,
$kb$Gwen: luas bangunan 38 m2, luas tanah 106 m2. 2 kamar tidur, 1 kamar mandi, ruang tamu, ruang makan, dapur, carport 2 mobil. Tersedia pilihan Standard dan Hook. Cocok untuk keluarga kecil.$kb$),

('montana', 'Tipe New Gwen', array['new gwen','tipe new gwen','72','106','beda gwen'], 2,
$kb$New Gwen: luas bangunan 38 m2 dengan dua pilihan luas tanah, yaitu 72 m2 dan 106 m2. Cocok untuk keluarga urban yang ingin rumah fungsional. Perbedaan denah detail dengan Gwen belum ada di data: arahkan ke tim marketing WhatsApp.$kb$),

('montana', 'Tipe Angeline', array['angeline','tipe angeline','45','90','133','mezzanine'], 2,
$kb$Angeline: luas bangunan 45 m2, pilihan luas tanah 90 m2 atau 133 m2. 2 kamar tidur, 1 kamar mandi, dengan mezzanine. Tersedia pilihan Standard dan Hook.$kb$),

('montana', 'Tipe Darlene', array['darlene','tipe darlene','45','91','mezzanine'], 2,
$kb$Darlene: luas bangunan 45 m2, luas tanah 91 m2, desain elegan dan ruang luas serta nyaman. 2 kamar tidur, 1 kamar mandi, dengan mezzanine. Tipe Standard.$kb$),

('montana', 'Mezzanine', array['mezzanine','lantai tambahan','ruang ekstra','kamar tidur','fleksibel'], 2,
$kb$Mezzanine adalah lantai tambahan setengah tingkat di dalam rumah. Fungsinya fleksibel: ruang kerja, ruang baca, area bermain anak, atau penyimpanan, jadi pembeli dapat ruang ekstra tanpa membeli rumah jauh lebih besar. Mezzanine ada di Angeline dan Darlene (untuk Gwen dan New Gwen belum pasti, arahkan ke marketing). Untuk dijadikan kamar tidur, peruntukan dan spesifikasi per tipe dikonfirmasi dulu ke tim marketing.$kb$),

('montana', 'Smart door lock', array['smart door lock','kunci','pintu pintar','akses'], 1,
$kb$Setiap unit Montana dilengkapi smart door lock, jadi tidak perlu repot membawa dan mencari kunci. Aksesnya lebih praktis dan modern untuk seluruh anggota keluarga.$kb$),

('montana', 'Tipe Standard dan Hook', array['hook','standard','sudut','posisi','tipe hook','beda'], 2,
$kb$Tipe Hook adalah unit di posisi sudut, biasanya punya sisi samping yang terbuka sehingga cahaya dan sirkulasi udara lebih baik, dan kadang lahan lebih luas. Di Sierra, tipe Standard punya carport 1 mobil dan Hook carport 2 mobil. Unit mana saja yang Hook, ketersediaan, dan selisih harganya: arahkan ke tim marketing WhatsApp.$kb$),

-- CLUSTER SIERRA --------------------------------------------------------
('sierra', 'Cluster Sierra: konsep dan desain', array['sierra','scandinavian','modern scandinavian','2 lantai','desain','balcony','atap segitiga'], 2,
$kb$Sierra adalah hunian 2 lantai bergaya Modern Scandinavian Urban Living: fasad atap segitiga, panel kayu, dan jendela kaca besar agar cahaya alami masuk lebih banyak. Ada balcony di setiap tipe dan pilihan private pool di unit terpilih. Semua tipe Sierra: 2 lantai, 3 kamar tidur, 2 kamar mandi, ruang tamu, ruang makan, dapur. Tipe: Arnica dan Bianca.$kb$),

('sierra', 'Tipe Arnica', array['arnica','tipe arnica','70','91','90','private pool','garden'], 2,
$kb$Arnica: luas tanah 90 m2, dua pilihan luas bangunan 70 m2 dan 91 m2. 3 kamar tidur, 2 kamar mandi, 2 lantai dengan balcony. Tersedia varian private pool dan garden. Bangunan lebih besar daripada Bianca.$kb$),

('sierra', 'Tipe Bianca', array['bianca','tipe bianca','55','65','72','efisien'], 2,
$kb$Bianca: luas tanah 72 m2, dua pilihan luas bangunan 55 m2 dan 65 m2. 3 kamar tidur, 2 kamar mandi, 2 lantai dengan balcony. Cocok untuk yang ingin tata ruang efisien.$kb$),

('sierra', 'Balcony di Sierra', array['balcony','balkon','lantai atas','santai'], 1,
$kb$Balcony tersedia di lantai atas setiap tipe Sierra, pas untuk ngopi pagi atau bersantai sore tanpa harus keluar rumah.$kb$),

('sierra', 'Private pool Sierra', array['private pool','kolam renang','kolam','pool','ukuran kolam','filtrasi'], 2,
$kb$Private pool hanya tersedia pada unit Sierra terpilih, tidak semua unit. Ukuran, kedalaman, dan sistem filtrasi kolam belum ada di data: arahkan ke tim marketing WhatsApp. Tanyakan apakah pengunjung berminat, lalu tim cek unit mana yang tersedia.$kb$),

('sierra', 'Carport Sierra', array['carport','garasi','parkir','mobil','muat'], 1,
$kb$Sierra tipe Standard punya carport 1 mobil, sedangkan tipe Hook carport untuk 2 mobil. Kalau pengunjung punya lebih dari satu kendaraan, tipe Hook bisa jadi pilihan.$kb$),

('sierra', 'Perbedaan Montana dan Sierra', array['beda','bedanya','montana','sierra','bandingkan','pilih','perbandingan'], 3,
$kb$Montana: American Style, mezzanine, smart door lock, 2 kamar tidur 1 kamar mandi, carport 2 mobil, harga masuk lebih ringan (mulai Rp600 juta). Sierra: Scandinavian Contemporary 2 lantai, balcony di setiap tipe, 3 kamar tidur 2 kamar mandi, pilihan private pool di unit terpilih, nuansa lebih privat. Tanyakan kebutuhan keluarga untuk merekomendasikan.$kb$),

-- HARGA DAN PEMBAYARAN --------------------------------------------------
('harga', 'Harga mulai', array['harga','berapa','mulai','murah','budget','harga rumah'], 3,
$kb$Harga rumah mulai dari Rp600 juta untuk Cluster Montana. Untuk tipe dan unit tertentu bisa berbeda. Harga Cluster Sierra dan harga per tipe belum ada di data: jangan menyebut angka, arahkan ke tim marketing WhatsApp untuk pricelist terbaru.$kb$),

('harga', 'Harga Sierra dan pricelist', array['harga sierra','pricelist','daftar harga','harga tipe','arnica','bianca','hook','private pool'], 3,
$kb$Harga Sierra berbeda tergantung tipe dan unit (misalnya Hook atau private pool). Pricelist selalu diperbarui, jadi minta versi terbarunya ke tim marketing di wa.me/6282330034200. Jangan menyebut angka harga Sierra.$kb$),

('harga', 'Cicilan per bulan', array['cicilan','angsuran','per bulan','bulanan','simulasi','kpr','3 jutaan'], 3,
$kb$Untuk promo Octoboo Sierra, cicilan bisa mulai sekitar Rp3 jutaan per bulan (syarat dan ketentuan berlaku, promo sampai 31 Oktober 2026). Angka pasti tergantung tipe, tenor, dan bank, jadi tim marketing yang membuat simulasi sesuai kemampuan pengunjung. Tanyakan cicilan bulanan yang nyaman.$kb$),

('harga', 'Kenaikan harga', array['naik','harga naik','kenaikan','tahun depan'], 1,
$kb$Harga mengikuti kebijakan developer dan bisa berubah. Di Instagram resmi disebutkan harga berpotensi naik tahun depan, jadi lebih baik diamankan sejak sekarang selagi promo berjalan. Jangan menjanjikan angka kenaikan.$kb$),

('harga', 'Pembayaran cash, bertahap, dan nego', array['cash','tunai','bertahap','inhouse','cicilan developer','nego','tawar','diskon'], 2,
$kb$Pembayaran cash bisa dibicarakan; skema pembayarannya dijelaskan tim marketing sesuai tipe. Skema bertahap atau cicilan langsung ke developer tidak ada di data, jangan dijanjikan; sebut opsi KPR dengan bank rekanan. Nego harga: jangan menjanjikan diskon di luar promo resmi, arahkan ke tim marketing.$kb$),

('harga', 'UTJ dan booking fee', array['utj','booking fee','tanda jadi','uang muka','dp','booking','refund','kembali'], 3,
$kb$UTJ mulai Rp5 juta. Selama promo Octoboo, booking fee Cluster Montana hanya Rp2,5 juta dan Cluster Sierra Rp5 juta (syarat dan ketentuan berlaku). Kebijakan pengembalian (refund) booking fee dijelaskan tim marketing sesuai ketentuan berlaku; jangan menjanjikan refund.$kb$),

-- PROMO -----------------------------------------------------------------
('promo', 'Promo Octoboo: ringkasan', array['promo','octoboo','diskon','bonus','benefit','sampai kapan','berakhir','31 oktober'], 4,
$kb$Promo Octoboo berlaku sampai 31 Oktober 2026 (syarat dan ketentuan berlaku), untuk Cluster Montana dan Sierra: DP 0%; gratis semua biaya (AJB, BBN, notaris, BPHTB, biaya KPR selama promo); gratis kanopi dan AC; subsidi angsuran Rp1 juta x 6 bulan; gratis IPL; subsidi asuransi hingga Rp10 juta; Spooky Discount berupa diskon puluhan juta rupiah. Booking fee Montana Rp2,5 juta, Sierra Rp5 juta. Khusus Montana ada hadiah Grand Prize Honda Brio, Honda Beat, dan hadiah lain. Khusus Sierra ada gratis peningkatan SHM. Selalu sebut tanggal berakhir dan ajak jadwalkan survey.$kb$),

('promo', 'DP 0% dan gratis biaya', array['dp 0','dp nol','gratis biaya','ajb','bbn','notaris','bphtb','biaya kpr','gratis semua biaya'], 3,
$kb$DP 0% berlaku selama periode Octoboo dengan syarat dan ketentuan; yang perlu disiapkan di awal adalah booking fee. Gratis semua biaya mencakup AJB, BBN, notaris, BPHTB, dan biaya KPR selama promo berjalan, jadi tidak perlu menyiapkan biaya itu secara terpisah. Detail simulasi dibantu tim marketing.$kb$),

('promo', 'Gratis kanopi, AC, subsidi angsuran, subsidi asuransi', array['kanopi','ac','subsidi angsuran','subsidi asuransi','asuransi','angsuran rp1 juta','6 bulan'], 2,
$kb$Gratis kanopi dan AC selama promo (jumlah AC, PK, dan spesifikasi dijelaskan tim marketing). Subsidi angsuran Rp1 juta per bulan selama 6 bulan pertama untuk meringankan awal masa cicilan (mekanisme pencairan dijelaskan marketing). Subsidi asuransi hingga Rp10 juta dengan syarat dan ketentuan; rinciannya dijelaskan tim marketing.$kb$),

('promo', 'Gratis IPL dan iuran lingkungan', array['ipl','iuran','pengelolaan lingkungan','bulanan lingkungan'], 2,
$kb$Selama promo Octoboo ada benefit gratis IPL (iuran pengelolaan lingkungan) dengan syarat dan ketentuan. Durasi pastinya dan besaran IPL setelah gratis diinfokan tim marketing; jangan menyebut angka.$kb$),

('promo', 'Spooky Discount dan hadiah Honda Brio', array['spooky','discount','hadiah','honda brio','honda beat','grand prize','undian'], 2,
$kb$Spooky Discount adalah diskon puluhan juta rupiah selama promo Octoboo; nominal tergantung tipe unit, diinfokan setelah pengunjung menentukan tipe. Hadiah utama Honda Brio, Honda Beat, dan hadiah lain ada di promo Cluster Montana; mekanisme dan syaratnya dijelaskan tim marketing.$kb$),

('promo', 'Promo Sierra: gratis peningkatan SHM', array['shm','peningkatan shm','sertifikat','hgb','sierra promo'], 2,
$kb$Di promo Octoboo Cluster Sierra ada benefit gratis peningkatan SHM. Mekanisme dan jenis sertifikat awal dijelaskan tim marketing agar tidak keliru.$kb$),

('promo', 'Promo setelah 31 Oktober', array['setelah promo','promo berakhir','beli setelah','promo berikutnya','lewat'], 2,
$kb$Promo Octoboo berlaku sampai 31 Oktober 2026. Untuk promo sesudahnya, tim marketing yang akan memberi info terbaru; jangan menebak. Kalau pengunjung ingin benefit yang sekarang, sarankan merencanakan sebelum tanggal tersebut dan ajak survey.$kb$),

-- KPR -------------------------------------------------------------------
('kpr', 'KPR dan bank rekanan', array['kpr','bank','rekanan','suku bunga','bunga','syariah','tenor','pengajuan'], 3,
$kb$Bisa pakai KPR. Tim marketing membantu proses KPR bersama bank rekanan, dari simulasi sampai akad. Daftar bank, perbandingan suku bunga, tenor maksimal, dan KPR syariah tergantung bank rekanan dan tidak ada di data: arahkan ke tim marketing WhatsApp. Tenor ditentukan bank dan profil pemohon.$kb$),

('kpr', 'Syarat dokumen KPR', array['syarat','dokumen','ktp','kartu keluarga','npwp','slip gaji','rekening koran','wiraswasta','freelance','karyawan'], 3,
$kb$Secara umum dibutuhkan KTP, Kartu Keluarga, NPWP, dan bukti penghasilan seperti slip gaji atau rekening koran. Persyaratan tiap bank bisa berbeda. Wiraswasta atau freelance bisa mengajukan; biasanya bank meminta dokumen usaha dan rekening koran beberapa bulan terakhir, keputusan akhir ada di bank. Ini informasi umum, bukan ketentuan resmi proyek.$kb$),

('kpr', 'Proses KPR dan biaya', array['lama proses','proses kpr','berapa lama','biaya di luar','bphtb','bbn','akad'], 2,
$kb$Lama proses KPR bergantung pada bank dan kelengkapan berkas; jangan menjanjikan jumlah hari. Biaya di luar harga rumah biasanya AJB, BBN, notaris, BPHTB, dan biaya KPR; selama promo Octoboo semuanya gratis. BPHTB adalah pajak atas perolehan hak atas tanah dan bangunan; BBN (bea balik nama) adalah biaya mengubah nama kepemilikan sertifikat ke nama pembeli. Tim marketing bisa membuat simulasi cicilan sesuai tipe dan kemampuan.$kb$),

-- DEVELOPER & LEGALITAS ------------------------------------------------
('developer', 'Developer PT Neo Pudji Jaya', array['developer','pengembang','neo pudji jaya','pengalaman','kontraktor','portofolio','proyek lain','company profile','pendiri'], 3,
$kb$Developernya PT Neo Pudji Jaya, Real Estate Developer sekaligus General Contractor, jadi pembangunan dan kualitas konstruksi dikelola dalam satu tangan. Berpengalaman puluhan tahun (jangan menyebut angka tahun) membangun perumahan, villa, dan pusat bisnis. Visi: mewujudkan kawasan hunian modern, nyaman, dan berkelanjutan untuk keluarga masa depan. Company profile tersedia sebagai PDF di website resmi atau bisa diminta lewat WhatsApp wa.me/6282330034200.$kb$),

('legalitas', 'Legalitas, sertifikat, IMB/PBG', array['legalitas','sertifikat','shm','hgb','imb','pbg','izin','perizinan','dokumen legal','aman'], 3,
$kb$Shaistanaya City mengedepankan legalitas lengkap dan terjamin untuk setiap transaksi. Dokumen legalitas bisa dilihat lewat tim marketing saat survey. Jenis sertifikat (SHM atau HGB) dan prosesnya, serta nomor IMB/PBG, dijelaskan tim marketing sesuai unit; jangan menyebut detail yang tidak ada di data.$kb$),

-- FASILITAS -------------------------------------------------------------
('fasilitas', 'Fasilitas kawasan', array['fasilitas','masjid','lapangan basket','outdoor gym','playground','bbq','hangout garden','taman','olahraga','anak','bermain'], 3,
$kb$Fasilitas kawasan: masjid modern, lapangan basket, outdoor gym, playground untuk anak, BBQ pit, hangout garden, taman, row jalan lebar, drainase modern, dan ruko strategis. Jangan menyebut kolam renang umum atau pusat kebugaran karena tidak ada.$kb$),

('fasilitas', 'Keamanan dan one gate system', array['keamanan','aman','one gate','cctv','satu pintu','security','portal'], 3,
$kb$One gate system artinya akses keluar-masuk kawasan lewat satu pintu utama, supaya lebih aman dan privat karena orang dan kendaraan lebih mudah dipantau. Ditambah CCTV area publik 24 jam. Beberapa penghuni menyebut keamanan sebagai nilai plus.$kb$),

('fasilitas', 'Bebas banjir dan jalan lebar', array['banjir','bebas banjir','drainase','jalan','row jalan','lebar'], 2,
$kb$Kawasan dirancang dengan sistem drainase modern dan dipasarkan sebagai kawasan bebas banjir; untuk memastikan, calon pembeli bisa melihat langsung kondisi lingkungan saat survey. Row jalan lebar sehingga nyaman berkendara dan mudah dilewati tamu; ukuran row jalan tidak ada di data.$kb$),

('fasilitas', 'Listrik, internet, dan air', array['listrik','pln','internet','iconnet','air','pdam','air bersih','daya'], 2,
$kb$Listrik memakai PLN prabayar (daya per tipe dikonfirmasi marketing). Internet tersedia dari ICONNET. Sumber air bersih (PDAM atau lainnya) tidak ada di data: arahkan ke tim marketing agar akurat.$kb$),

-- LOKASI ----------------------------------------------------------------
('lokasi', 'Alamat dan peta', array['alamat','lokasi','dimana','maps','google maps','peta','sidodadi','candi','sidoarjo'], 3,
$kb$Alamat: Jl. Sidodadi, Sudio, Sidodadi, Kec. Candi, Kabupaten Sidoarjo, Jawa Timur. Lokasi ada di Google Maps dengan nama Shaistanaya City, link maps.app.goo.gl/Wsjrt22mkCcUVqdN9. Dipasarkan sebagai hunian di pusat Kota Sidoarjo karena akses cepat ke pusat aktivitas, tol, stasiun, dan pusat belanja.$kb$),

('lokasi', 'Akses: tol, stasiun, bandara, mal, pasar', array['tol','gerbang tol','stasiun','bandara','juanda','mall','lippo','pasar suko','menit','jarak','dekat','akses','surabaya'], 3,
$kb$Estimasi waktu tempuh (tergantung lalu lintas): Pasar Suko sekitar 5 menit; Lippo Mall Plaza Sidoarjo sekitar 9 menit; Gerbang Tol Sidoarjo sekitar 9 menit; Stasiun Sidoarjo sekitar 11 menit; Bandara Juanda sekitar 30 menit. Surabaya: akses tol yang cukup praktis, waktu pastinya tergantung jam dan lalu lintas (jangan menyebut angka menit). Tanyakan area kerja pengunjung agar tim membantu perkiraan.$kb$),

('lokasi', 'Sekolah dan rumah sakit', array['sekolah','rumah sakit','rs','kampus','paud','kesehatan'], 2,
$kb$Lokasinya strategis dengan akses mudah ke sekolah, pusat belanja, dan rumah sakit, tetapi nama dan jarak sekolah atau rumah sakit tertentu tidak ada di data: jangan menyebut nama atau angka. Tanyakan kebutuhan pengunjung, lalu tim marketing akan memberi info jaraknya.$kb$),

-- SURVEY, BOOKING, KONTAK ----------------------------------------------
('survey', 'Cara survey ke lokasi', array['survey','kunjungan','datang','lihat langsung','jadwal','jam','kantor pemasaran','marketing gallery'], 4,
$kb$Untuk survey, chat tim marketing di wa.me/6282330034200 untuk jadwal, lalu tim menemani melihat lokasi dan unit. Jadwal survey disesuaikan dengan waktu calon pembeli; jam operasional kantor pemasaran dikonfirmasi saat menghubungi. Tanyakan hari yang nyaman. Bisa juga meninggalkan nama dan nomor WhatsApp agar tim yang menghubungi.$kb$),

('survey', 'Kontak resmi', array['kontak','nomor','whatsapp','wa','telepon','email','hubungi','marketing'], 4,
$kb$Satu-satunya nomor resmi: WhatsApp wa.me/6282330034200 (0823-3003-4200). Email: shaistanayacity@gmail.com. Jangan menyebut nomor lain.$kb$),

('survey', 'Cara booking unit', array['booking','pesan','beli','cara booking','langkah','alur','proses booking'], 3,
$kb$Proses booking diawali dengan memilih tipe dan unit, lalu membayar booking fee sesuai promo yang berlaku. Detail langkah dan dokumen dipandu tim marketing; alur resmi lengkap tidak ada di data, jangan menambah langkah.$kb$),

('survey', 'Ketersediaan unit: ready stock atau indent', array['ready stock','indent','stok','tersedia','unit tersedia','nomor unit','sisa unit','progres'], 3,
$kb$Ketersediaan unit berbeda tergantung tipe dan cluster, dan status pembangunan per unit tidak ada di data. Jangan menyebut unit tersedia atau tidak; arahkan ke tim marketing di WhatsApp untuk cek status unit yang diminati.$kb$),

('survey', 'Konsultasi dan info terbaru', array['konsultasi','tanya','bingung','info terbaru','update','ikuti','media sosial','promo terbaru'], 1,
$kb$Konsultasi dulu sebelum memutuskan sangat boleh. Tanyakan jumlah anggota keluarga dan budget cicilan bulanan supaya bisa dipilihkan tipe yang pas. Info terbaru dan promo rutin dibagikan di Instagram dan TikTok @shaistanayacity serta linktr.ee/shaistanayacity.$kb$);
