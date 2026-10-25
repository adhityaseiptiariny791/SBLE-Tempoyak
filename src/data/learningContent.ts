export interface QuestionItem {
  id: string;
  indicator: string;
  indicatorDescription: string;
  context: string;
  scenario: string;
  tableData?: { [key: string]: string | number }[];
  question: string;
  options: string[];
  correctIndex: number;
  explanation: {
    correctReason: string;
    scientificConcept: string;
    criticalThinkingSkill: string;
    commonMisconception: string;
  };
}

export const CAPAIAN_PEMBELAJARAN = {
  fase: 'Fase D (SMP/MTs Kelas IX)',
  elemen: 'Pemahaman IPA & Keterampilan Proses',
  capaianUmum: 'Peserta didik memahami penerapan bioteknologi konvensional pada proses fermentasi pangan lokal khas Lampung, serta mampu melakukan penyelidikan ilmiah untuk menganalisis pengaruh variabel lingkungan terhadap bioproses fermentasi tempoyak durian.',
  tujuanPembelajaran: [
    'Menganalisis prinsip dasar bioteknologi konvensional pada proses fermentasi tempoyak durian khas Lampung.',
    'Menyelidiki pengaruh kadar garam, lama fermentasi, aerasi, dan suhu terhadap dinamika penurunan pH dan viabilitas mikroorganisme melalui Virtual Laboratory.',
    'Menginterpretasikan data grafik kinetika pH dan tabel pengamatan untuk merumuskan argumen ilmiah berbasis bukti (Claim-Evidence-Reasoning).',
    'Mengembangkan 6 keterampilan berpikir kritis (interpretasi data, analisis sebab-akibat, evaluasi bukti, inferensi, eksplanasi ilmiah, dan regulasi diri).',
    'Menumbuhkan sikap ilmiah (rasa ingin tahu, ketelitian, objektivitas, keterbukaan terhadap bukti, kejujuran data, dan tanggung jawab) selama proses investigasi sains.'
  ],
  deepLearningPillars: {
    mindful: 'Siswa aktif mengamati fenomena, merumuskan hipotesis secara sadar, memonitor pemahaman sendiri, dan mengevaluasi asumsi ilmiah.',
    meaningful: 'Menghubungkan biokimia fermentasi asam laktat dengan kekayaan kuliner lokal Lampung (tempoyak durian) yang nyata dalam tradisi masyarakat.',
    joyful: 'Eksplorasi interaktif simulasi variabel tanpa rasa takut keliru, visualisasi mikroskopis BAL, eksperimen bebas risiko, dan apresiasi ketekunan belajar.'
  }
};

export const FENOMENA_LOKAL_DATA = {
  tempoyak: {
    title: 'Tempoyak: Mahakarya Fermentasi Durian Khas Lampung',
    subtitle: 'Kearifan Lokal Mengawetkan Buah Bermusim dengan Bakteri Asam Laktat (BAL)',
    overview: 'Tempoyak merupakan produk fermentasi tradisional yang sangat populer di Provinsi Lampung, khususnya masyarakat Tulang Bawang Barat dan daerah aliran sungai. Tempoyak dibuat dari daging buah durian (Durio zibethinus) masak pohon yang dipisahkan dari bijinya, kemudian dicampur garam dengan konsentrasi terukur dan diperam dalam wadah kedap udara (anaerob).',
    ingredients: [
      { name: 'Daging Buah Durian Matang', role: 'Substrat utama alami yang kaya akan karbohidrat fermentabel (sukrosa, glukosa, dan fruktosa) serta membawa mikroflora indigenous alami.' },
      { name: 'Garam Dapur (NaCl 2% - 5%)', role: 'Zat penyeleksi mikroorganisme alami; menciptakan tekanan osmotik untuk menghambat bakteri pembusuk patogen sekaligus memicu pertumbuhan bakteri asam laktat halotoleran.' },
      { name: 'Wadah Tertutup Rapat (Toples Anaerob)', role: 'Menciptakan lingkungan tanpa oksigen bebas untuk mendukung metabolisme fermentatif anaerob/fakultatif anaerob serta mencegah kontaminasi spora kapang udara.' }
    ],
    microbes: [
      'Lactobacillus plantarum (Dominan)',
      'Lactobacillus fermentum',
      'Leuconostoc mesenteroides',
      'Pediococcus acidilactici'
    ],
    fermentationDynamics: 'Selama 3 hingga 7 hari pemeraman, Bakteri Asam Laktat (BAL) memecah gula durian menjadi asam laktat melalui jalur glikolisis fermentatif. Akumulasi asam laktat menurunkan pH medium dari sekitar 6.2 menjadi 3.8 - 4.4, menghasilkan tekstur pasta lembut pulen beraroma asam segar khas durian fermentasi.',
    culinaryUses: 'Di Lampung, tempoyak menjadi bumbu dasar masakan legendaris seperti Seruit Lampung, Gulai Taboh Ikan Patin Tempoyak, Sambal Tempoyak Mentah, dan Pindang Tempoyak.',
    diversityNote: 'Variasi resep keluarga di Lampung dapat berbeda dalam takaran garam (2-6%) dan lama waktu pemeraman (3-10 hari), menciptakan spektrum rasa dari asam manis segar hingga asam asin gurih pekat.'
  }
};

export const MATERI_SECTIONS = [
  {
    id: 'konsep-dasar',
    title: '1. Pengertian & Prinsip Bioteknologi',
    badge: 'Fondasi Teori',
    content: `Bioteknologi berasal dari tiga kata: *bios* (hidup), *tekhne* (teknologi/penerapan), dan *logos* (ilmu). Secara luas, bioteknologi adalah cabang ilmu biologi terapan yang memanfaatkan organisme hidup (bakteri, jamur) atau metabolitnya untuk menghasilkan produk dan jasa yang bernilai bagi manusia.

Bioteknologi dibagi menjadi dua cabang utama:
1. **Bioteknologi Konvensional (Tradisional)**: Memanfaatkan mikroorganisme alami secara langsung melalui proses fermentasi biokimia alami dengan peralatan sederhana yang diwariskan turun-temurun. Contoh autentik: **Tempoyak Durian**, Tempe, Tapai singkong, dan Yoghurt.
2. **Bioteknologi Modern**: Memanfaatkan rekayasa genetika (rekombinasi materi DNA), fusi sel, dan kloning di laboratorium steril berteknologi canggih. Contoh: Produksi hormon insulin manusia dengan bakteri transgenik, vaksin rekombinan, dan tanaman transgenik tahan hama.`
  },
  {
    id: 'fermentasi-biokimia',
    title: '2. Biokimia Fermentasi Asam Laktat pada Durian',
    badge: 'Mekanisme Seluler',
    content: `Fermentasi adalah proses katabolisme anaerobik senyawa organik (terutama karbohidrat sederhana berupa glukosa dan fruktosa) tanpa menggunakan oksigen bebas sebagai akseptor elektron akhir.

Pada proses pembuatan **tempoyak durian**, reaksi utama yang berlangsung adalah **Fermentasi Asam Laktat Homoformentatif dan Heterofermentatif**.

Persamaan Reaksi Kimia Dasar:
$$C_6H_{12}O_6 \\text{ (Glukosa Durian)} \\xrightarrow{\\text{Enzim BAL (L. plantarum)}} 2 C_3H_6O_3 \\text{ (Asam Laktat)} + 2 \\text{ ATP}$$

**Peran Sentral Bakteri Asam Laktat (BAL):**
1. **Akumulasi Asam Laktat**: Menghasilkan ion hidrogen ($H^+$) yang menurunkan pH medium durian dari netral (~6.2) menuju tingkat keasaman optimal (<4.4).
2. **Efek Pengawetan Alami**: Lingkungan ber-pH rendah (<4.4) menghambat dan mematikan bakteri patogen pembusuk (*Salmonella*, *Escherichia coli*, dan *Clostridium*).
3. **Pembentukan Cita Rasa & Aroma**: Memproduksi senyawa volatil (diasetil, asam asetat, dan ester alami durian) yang menciptakan aroma asam segar yang khas dan menggugah selera.`
  },
  {
    id: 'faktor-fermentasi',
    title: '3. Faktor Kritis Penentu Fermentasi Tempoyak',
    badge: 'Variabel Eksperimen',
    content: `Keberhasilan dan mutu organoleptik tempoyak durian sangat ditentukan oleh kesetimbangan variabel-variabel berikut:

1. **Konsentrasi Garam Dapur (NaCl % b/b)**
   - Garam berfungsi sebagai agen seleksi osmotik alami.
   - Kadar garam terlalu rendah (<2%): Bakteri pembusuk proteolitik tidak tertekan, toples berisiko membusuk, berlendir, dan berbau amonia.
   - Kadar garam ideal (2% - 5%): Memberikan kondisi optimum bagi Bakteri Asam Laktat halotoleran untuk tumbuh dominan dan menurunkan pH secara cepat.
   - Kadar garam berlebih (>10%): Tekanan osmotik terlampau pekat menarik air keluar sel mikroba secara ekstrem sehingga aktivitas metabolisme BAL terhambat dan fermentasi menjadi sangat lambat.

2. **Kondisi Kerapatan Wadah (Anaerob vs Aerob)**
   - BAL merupakan bakteri anaerob / fakultatif anaerob yang bekerja optimal tanpa oksigen bebas.
   - Masuknya oksigen memicu pertumbuhan spora kapang (jamur) dan khamir oksidatif di permukaan toples yang menyebabkan ketengikan dan bercak kehitaman.

3. **Suhu Ruang Penyimpanan (°C)**
   - Suhu optimum bagi BAL mesofilik durian adalah 25°C - 32°C (suhu ruang tropis Indonesia).
   - Suhu dingin (<18°C / kulkas) memperlambat laju kinetika reaksi metabolisme enzim BAL.
   - Suhu terlalu tinggi (>38°C) dapat menurunkan viabilitas sel bakteri alami.

4. **Waktu / Lama Fermentasi (Hari)**
   - Diperlukan waktu minimal 4 hingga 7 hari agar BAL mencapai fase stasioner dengan konsentrasi asam laktat maksimal.`
  },
  {
    id: 'keamanan-pangan',
    title: '4. Keamanan Pangan & Manfaat Probiotik Tempoyak',
    badge: 'Aplikasi Nyata',
    content: `**Manfaat Kesehatan Probiotik:**
- Tempoyak mengandung kultur hidup Bakteri Asam Laktat (terutama *Lactobacillus plantarum*) yang berperan sebagai agens probiotik alami untuk memelihara mikrobioma saluran pencernaan manusia.
- Membantu meningkatkan bioavailabilitas nutrisi mikro durian dan memperkuat imunitas saluran cerna.

**Kriteria Mutu & Keamanan Pangan:**
- Nilai pH (<4.4) merupakan indikator biokimia penting, namun harus dipadukan dengan pengamatan organoleptik:
  * **Tempoyak Layak**: Warna kuning cerah alami, tekstur pasta pulen kental homogen, aroma asam segar durian.
  * **Tempoyak Rusak/Terkontaminasi**: Berbau busuk menyengat amonia/H2S, tekstur berlendir encer berair, serta muncul lapisan miselia kapang jamur hitam/putih abu-abu di permukaan toples.`
  }
];

export const INVESTIGASI_STAGES = [
  {
    step: 1,
    title: 'Identifikasi Masalah',
    desc: 'Amati variasi mutu tempoyak di masyarakat: mengapa beberapa toples menghasilkan tempoyak pulen asam segar, sementara yang lain berbau busuk berlendir atau terlalu asin?'
  },
  {
    step: 2,
    title: 'Rumusan Pertanyaan Penelitian',
    desc: 'Susun pertanyaan terarah mengenai hubungan antara variabel bebas (kadar garam, suhu, waktu) dengan variabel terikat (nilai pH, populasi BAL, aroma, mutu tempoyak).'
  },
  {
    step: 3,
    title: 'Penentuan Variabel Penelitian',
    desc: 'Tentukan secara tegas: Variabel Bebas (Independent), Variabel Terikat (Dependent), dan Variabel Kontrol agar eksperimen bersifat adil (fair test).'
  },
  {
    step: 4,
    title: 'Penyusunan Hipotesis',
    desc: 'Rumuskan dugaan ilmiah sementara yang dapat diuji (testable prediction) berdasarkan konsep biokimia fermentasi asam laktat pada durian.'
  },
  {
    step: 5,
    title: 'Pelaksanaan Eksperimen Virtual',
    desc: 'Jalankan simulasi di Virtual Laboratory dengan mengubah parameter kadar garam, suhu, dan aerasi toples secara terkontrol.'
  },
  {
    step: 6,
    title: 'Pencatatan Data Pengamatan',
    desc: 'Catat nilai pH harian, populasi mikroba BAL, dan perubahan fisik ke dalam tabel data penelitian secara objektif dan jujur.'
  },
  {
    step: 7,
    title: 'Analisis & Perbandingan Kurva',
    desc: 'Bandingkan grafik kinetika penurunan pH antar-perlakuan (misal: garam 4% vs 15% vs toples terbuka) untuk menemukan pola data ilmiah.'
  },
  {
    step: 8,
    title: 'Penyusunan Argumen Berbasis Bukti',
    desc: 'Gunakan data angka terukur dan bukti observasi untuk mendukung pernyataan klaim ilmiah menggunakan kerangka Claim-Evidence-Reasoning.'
  },
  {
    step: 9,
    title: 'Penarikan Kesimpulan & Batasan Model',
    desc: 'Tarik kesimpulan logis yang menjawab rumusan masalah serta sadari batasan pemodelan komputasi simulasi.'
  }
];

export const CRITICAL_THINKING_QUESTIONS: QuestionItem[] = [
  {
    id: 'ct-1',
    indicator: 'Interpretasi Data',
    indicatorDescription: 'Kemampuan membaca dan menafsirkan grafik kinetika penurunan pH selama fermentasi tempoyak.',
    context: 'Data Penurunan pH Fermentasi Tempoyak Selama 7 Hari',
    scenario: 'Siswa menguji sampel tempoyak durian dengan kadar garam 4% pada suhu ruang (28°C). Diperoleh data: Hari ke-0 = 6.20, Hari ke-2 = 5.10, Hari ke-4 = 4.25, Hari ke-6 = 4.02, Hari ke-7 = 3.98.',
    question: 'Berdasarkan data grafik tersebut, interpretasi yang paling tepat mengenai laju penurunan pH adalah...',
    options: [
      'Laju penurunan pH berlangsung konstan (penurunan sama besar tiap hari dari hari ke-0 hingga 7).',
      'Laju penurunan pH paling curam terjadi pada 4 hari pertama, kemudian melandai karena asam laktat telah terakumulasi tinggi.',
      'Penurunan pH terjadi karena garam mengasamkan durian secara langsung tanpa keterlibatan bakteri.',
      'Nilai pH akan terus turun tanpa batas hingga mendekati angka 0 jika dibiarkan selama 30 hari.'
    ],
    correctIndex: 1,
    explanation: {
      correctReason: 'Pada hari ke-0 hingga ke-4, Bakteri Asam Laktat berada pada fase logaritmik (eksponensial) menghasilkan asam laktat dalam jumlah besar sehingga kurva pH turun tajam. Setelah hari ke-4, keasaman tinggi (pH < 4.2) mulai membatasi laju metabolisme bakteri itu sendiri (self-limiting), sehingga laju penurunan pH melandai.',
      scientificConcept: 'Kinetika pertumbuhan mikroba dan akumulasi metabolit asam laktat.',
      criticalThinkingSkill: 'Menganalisis tren kemiringan gradien kurva grafik perubahan terhadap waktu.',
      commonMisconception: 'Banyak siswa mengira reaksi biologis selalu bergerak dengan kecepatan konstan seperti garis lurus.'
    }
  },
  {
    id: 'ct-2',
    indicator: 'Analisis Hubungan Sebab-Akibat',
    indicatorDescription: 'Mengidentifikasi keterkaitan antara konsentrasi garam dengan viabilitas bakteri asam laktat vs pembusuk.',
    context: 'Pengaruh Konsentrasi Garam pada Fermentasi Tempoyak Durian',
    scenario: 'Dua toples durian diperlakukan berbeda: Toples A diberi garam 1%, sedangkan Toples B diberi garam 4%. Pada hari ke-7, Toples A berbau busuk tengik berlendir (pH 5.8), sedangkan Toples B beraroma asam segar pulen (pH 3.98).',
    question: 'Analisis sebab-akibat manakah yang secara ilmiah menerangkan kegagalan pada Toples A?',
    options: [
      'Kadar garam 1% terlalu rendah untuk menekan bakteri pembusuk, sehingga bakteri pembusuk mendominasi substrat sebelum BAL sempat menghasilkan asam laktat.',
      'Kadar garam 1% membunuh seluruh mikroba termasuk BAL sehingga tidak ada aktivitas biologi sama sekali.',
      'Toples B berhasil karena garam dapur berubah menjadi asam cuka pekat secara spontan.',
      'Kegagalan Toples A murni disebabkan oleh durian yang terkena sinar bulan.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Garam berfungsi sebagai agen seleksi osmotik. Kadar garam 1% terlalu rendah untuk menekan bakteri pembusuk kontaminan. Akibatnya, bakteri pembusuk mendominasi substrat durian sebelum Bakteri Asam Laktat sempat memproduksi asam laktat untuk menurunkan pH.',
      scientificConcept: 'Tekanan osmotik garam, seleksi mikroflora halotoleran, dan kompetisi mikroba.',
      criticalThinkingSkill: 'Membedakan kondisi pemicu (penyebab) dengan manifestasi fisik (akibat).',
      commonMisconception: 'Garam disangka bertindak sebagai zat pengasam langsung, padahal pengasam sesungguhnya adalah metabolit asam laktat dari bakteri.'
    }
  },
  {
    id: 'ct-3',
    indicator: 'Evaluasi Bukti & Argumen',
    indicatorDescription: 'Mengevaluasi validitas klaim toples terbuka versus toples kedap udara.',
    context: 'Kontradiksi Toples Terbuka vs Tertutup Rapat',
    scenario: 'Seorang warga berpendapat: "Toples fermentasi durian sebaiknya dibiarkan terbuka agar udara segar masuk memberi oksigen bagi bakteri sehingga tempoyak lebih cepat jadi." Namun pengujian membuktikan toples terbuka ditumbuhi miselia kapang jamur hitam dan berbau tengik.',
    question: 'Evaluasi ilmiah manakah yang paling kuat untuk membantah pendapat warga tersebut?',
    options: [
      'Bakteri Asam Laktat merupakan organisme anaerob/fakultatif anaerob; masuknya oksigen bebas justru memicu pertumbuhan kapang aerob dan oksidasi lemak durian.',
      'Pendapat warga benar karena lubang udara membuat molekul garam terbang menguap.',
      'Toples terbuka menyebabkan durian terkena angin yang mematikan atom karbohidrat.',
      'Udara luar menyerap seluruh vitamin durian menjadi gas nitrogen.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Bakteri Asam Laktat bekerja optimum tanpa kehadiran oksigen (anaerob). Oksigen bebas justru memfasilitasi spora kapang kontaminan dan bakteri aerob pembusuk untuk berkembang biak, serta memicu reaksi oksidasi yang menimbulkan bau tengik.',
      scientificConcept: 'Metabolisme fermentatif anaerobik vs respirasi aerobik kontaminan kapang.',
      criticalThinkingSkill: 'Menimbang bukti empiris untuk mengkritisi dan membantah miskonsepsi populer.',
      commonMisconception: 'Anggapan keliru bahwa semua mikroba selalu membutuhkan pasokan oksigen bebas dalam jumlah melimpah.'
    }
  },
  {
    id: 'ct-4',
    indicator: 'Penarikan Inferensi Logis',
    indicatorDescription: 'Menarik kesimpulan logis dari data perlakuan suhu penyimpanan berbeda.',
    context: 'Pengaruh Suhu Penyimpanan Terhadap Kinetika Fermentasi Tempoyak',
    scenario: 'Dua toples tempoyak identik (garam 4%) disimpan pada kondisi suhu berbeda: Toples X di dalam kulkas (15°C) dan Toples Y pada suhu ruang (28°C). Pada hari ke-5, pH Toples Y mencapai 4.10, sedangkan Toples X masih berada di angka 5.40.',
    question: 'Inferensi logis apa yang dapat ditarik dari perbedaan data kedua toples tersebut?',
    options: [
      'Suhu dingin (15°C) memperlambat energi kinetik dan laju metabolisme enzimatis bakteri asam laktat.',
      'Bakteri asam laktat di Toples X telah mati seluruhnya dan tidak akan pernah bisa aktif kembali.',
      'Suhu 28°C merusak durian sehingga menjadi asam karena pembusukan cepat.',
      'Kulkas memancarkan zat kimia yang menetralkan keasaman durian.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Aktivitas metabolisme enzim dan pertumbuhan bakteri mesofilik sangat bergantung pada suhu. Suhu rendah (15°C) menurunkan energi kinetik molekul dan memperlambat laju reaksi biokimia fermentasi, bukan mematikan bakteri.',
      scientificConcept: 'Pengaruh suhu terhadap laju reaksi enzimatis dan kinetika mikroba mesofilik.',
      criticalThinkingSkill: 'Menarik kesimpulan sementara berdasarkan perbandingan dua perlakuan variabel terkontrol.',
      commonMisconception: 'Mengira bahwa ketiadaan perubahan pada suhu dingin berarti mikroba telah musnah total.'
    }
  },
  {
    id: 'ct-5',
    indicator: 'Eksplanasi Ilmiah Berbasis Bukti',
    indicatorDescription: 'Menjelaskan mengapa daging buah durian matang menjadi substrat ideal bagi fermentasi asam laktat.',
    context: 'Komposisi Biokimia Daging Durian sebagai Substrat Alami',
    scenario: 'Berbeda dengan fermentasi bahan hewani yang memerlukan tambahan karbohidrat, pembuatan tempoyak durian hanya memerlukan daging durian matang dan garam tanpa perlu menambahkan gula pasir atau ragi komersial.',
    question: 'Penjelasan ilmiah manakah yang paling akurat menerangkan mengapa daging buah durian matang sudah sangat ideal untuk fermentasi asam laktat alami?',
    options: [
      'Daging buah durian matang secara alami kaya akan karbohidrat fermentabel (sukrosa, glukosa, fruktosa) dan telah membawa mikrobiota indigenous Bakteri Asam Laktat alami pada permukaannya.',
      'Daging durian tidak memerlukan mikroba karena garam dapur secara otomatis memproduksi asam laktat.',
      'Durian mengandung senyawa lilin yang mengkristalkan udara menjadi rasa asam.',
      'Karena buah durian memiliki duri tajam yang menusuk dan mematikan semua mikroba pembusuk.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Daging buah durian matang memiliki kandungan gula alami (glukosa, fruktosa, sukrosa) yang tinggi sebagai sumber karbon untuk glikolisis BAL. Selain itu, mikroflora indigenous (bakteri asam laktat alami) sudah terdapat pada daging buah durian dan berkembang saat kondisi anaerob bergaram terpenuhi.',
      scientificConcept: 'Komposisi nutrisi substrat alami dan keberadaan mikrobiota indigenous.',
      criticalThinkingSkill: 'Menyusun eksplanasi berbasis mekanisme kausal biokimia bahan alam.',
      commonMisconception: 'Mengira fermentasi tradisional selalu memerlukan penambahan bibit ragi buatan pabrik.'
    }
  },
  {
    id: 'ct-6',
    indicator: 'Regulasi Diri & Batasan Model',
    indicatorDescription: 'Mengevaluasi keterbatasan simulasi sains dan objektivitas pengamatan.',
    context: 'Keterbatasan Model Simulasi Virtual vs Realitas Laboratorium Nyata',
    scenario: 'Setelah menjalankan simulasi virtual tempoyak, seorang siswa menyimpulkan: "Karena simulasi komputer menunjukkan pH 3.98 pada hari ke-7, maka 100% semua durian asli di pasar pasti menghasilkan pH 3.98 persis pada hari ke-7."',
    question: 'Sikap regulasi diri dan pemahaman kritis yang harus ditunjukkan siswa tersebut adalah...',
    options: [
      'Menyadari bahwa model simulasi merupakan representasi matematis berbasis prinsip sains ideal; di alam nyata terdapat variabilitas biologis seperti varietas durian, tingkat kematangan buah, dan keanekaragaman mikroflora liar.',
      'Menolak hasil simulasi komputer karena tidak ada manfaat belajar menggunakan simulasi digital.',
      'Memaksa pedagang buah durian untuk menyamakan kadar gula seluruh durian di pohon.',
      'Menyimpulkan bahwa instrumen digital di laboratorium selalu salah.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Sikap ilmiah yang matang menuntut kesadaran akan keterbatasan pemodelan ilmiah. Model simulasi sangat baik untuk memahami pola hubungan sebab-akibat antar variabel, namun bahan biologis nyata memiliki variasi alami (kadar air, varietas durian, derajat kemasakan buah).',
      scientificConcept: 'Hakikat sains (Nature of Science) dan pemodelan ilmiah (Scientific Modeling).',
      criticalThinkingSkill: 'Melakukan metakognisi dan evaluasi diri terhadap jangkauan generalisasi data.',
      commonMisconception: 'Menganggap model komputer adalah kebenaran mutlak yang kaku tanpa deviasi biologis alami.'
    }
  }
];

export const EVALUATION_QUESTIONS: QuestionItem[] = [
  {
    id: 'eval-1',
    indicator: 'Konsep Bioteknologi',
    indicatorDescription: 'Membedakan bioteknologi konvensional dan modern.',
    context: 'Penerapan Bioteknologi Fermentasi Tempoyak',
    scenario: 'Masyarakat Lampung mengolah durian berlebih saat musim panen menjadi tempoyak sebagai wujud bioteknologi pangan.',
    question: 'Ciri utama yang membuktikan bahwa pembuatan tempoyak durian tergolong ke dalam bioteknologi konvensional adalah...',
    options: [
      'Memanfaatkan mikroorganisme alami secara utuh melalui proses fermentasi biokimia sederhana tanpa rekayasa genetika DNA.',
      'Menggunakan teknologi kloning sel dan penyisipan gen asing di laboratorium steril.',
      'Memerlukan mesin pencerna otomatis bertekanan tinggi buatan pabrik.',
      'Tidak melibatkan makhluk hidup mikroskopis sama sekali dalam proses pembuatannya.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Tempoyak adalah contoh klasik bioteknologi konvensional yang mengandalkan mikroorganisme hidup alami secara utuh (Bakteri Asam Laktat) melalui bioproses fermentasi sederhana tanpa manipulasi materi genetik.',
      scientificConcept: 'Karakteristik dasar bioteknologi konvensional.',
      criticalThinkingSkill: 'Klasifikasi konsep berdasarkan karakteristik ilmiah.',
      commonMisconception: 'Anggapan keliru bahwa produk tradisional tidak termasuk bioteknologi.'
    }
  },
  {
    id: 'eval-2',
    indicator: 'Biokimia Fermentasi',
    indicatorDescription: 'Menganalisis reaksi perubahan substrat menjadi produk.',
    context: 'Reaksi Fermentasi Asam Laktat',
    scenario: 'Bakteri Asam Laktat merombak karbohidrat pada daging buah durian matang.',
    question: 'Senyawa utama yang bertanggung jawab terhadap penurunan nilai pH dan sensasi rasa asam segar pada tempoyak durian adalah...',
    options: [
      'Asam laktat hasil pemecahan glukosa dan fruktosa oleh BAL.',
      'Asam klorida pekat yang keluar dari butiran garam dapur.',
      'Gas karbondioksida yang membeku menjadi cairan asam.',
      'Gas metana hasil pembusukan lemak durian.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Asam laktat ($C_3H_6O_3$) adalah produk utama fermentasi oleh Bakteri Asam Laktat yang mendonorkan ion $H^+$, menyebabkan penurunan pH medium durian.',
      scientificConcept: 'Reaksi glikolisis anaerobik dan pembentukan asam laktat.',
      criticalThinkingSkill: 'Menjelaskan mekanisme kausalitas biokimiawi.',
      commonMisconception: 'Mengira rasa asam berasal langsung dari garam dapur.'
    }
  },
  {
    id: 'eval-3',
    indicator: 'Peran Variabel Garam',
    indicatorDescription: 'Menilai pengaruh konsentrasi garam terhadap kualitas tempoyak.',
    context: 'Optimasi Kadar Garam pada Tempoyak',
    scenario: 'Seorang siswa melakukan fermentasi tempoyak dengan tiga perlakuan garam: Sampel A (1%), Sampel B (4%), dan Sampel C (18%).',
    question: 'Prediksi ilmiah yang paling akurat terhadap karakteristik ketiga sampel setelah 7 hari adalah...',
    options: [
      'Sampel A berisiko busuk berlendir, Sampel B matang optimal beraroma asam segar pulen, dan Sampel C terlalu asin dengan fermentasi lambat.',
      'Ketiga sampel akan menghasilkan tempoyak yang sama persis mutunya.',
      'Sampel A akan paling asam karena tidak ada garam yang menghalangi bakteri.',
      'Sampel C akan menjadi produk terbaik karena semakin banyak garam selalu semakin cepat asam.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Garam memiliki rentang optimum. Terlalu sedikit (<2%) membiarkan mikroba pembusuk tumbuh; optimum (2-5%) mendukung BAL; terlalu tinggi (>15%) menghambat BAL secara osmotik.',
      scientificConcept: 'Tekanan osmotik selektif garam pada viabilitas sel mikroba.',
      criticalThinkingSkill: 'Memprediksi keluaran sistem berdasarkan variasi variabel bebas.',
      commonMisconception: 'Beranggapan bahwa fungsi garam tidak memiliki batas toleransi biologis.'
    }
  },
  {
    id: 'eval-4',
    indicator: 'Kondisi Lingkungan',
    indicatorDescription: 'Menganalisis pengaruh ketersediaan oksigen.',
    context: 'Kerapatan Wadah Toples Fermentasi',
    scenario: 'Mengapa toples fermentasi tempoyak durian harus ditutup rapat kedap udara (anaerob)?',
    question: 'Alasan biologis yang paling tepat di balik keharusan penutupan rapat toples adalah...',
    options: [
      'Menciptakan kondisi anaerob yang disukai Bakteri Asam Laktat serta mencegah kontaminasi spora kapang jamur aerob dan oksidasi lemak durian.',
      'Mencegah durian meluap keluar dari dalam toples.',
      'Menjaga agar bau garam tidak tercium oleh serangga sekitar.',
      'Memastikan suhu di dalam toples selalu mendidih.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Kondisi anaerob merangsang metabolisme fermentasi asam laktat serta mencegah sporulasi jamur kapang dan bakteri pembusuk aerob obligat.',
      scientificConcept: 'Respirasi anaerob versus metabolisme aerob kontaminan.',
      criticalThinkingSkill: 'Menghubungkan rancangan perlakuan dengan kebutuhan fisiologis organisme.',
      commonMisconception: 'Berpikir penutupan wadah hanya demi kerapian mekanis semata.'
    }
  },
  {
    id: 'eval-5',
    indicator: 'Kearifan Lokal Kuliner Lampung',
    indicatorDescription: 'Mengidentifikasi penerapan tempoyak dalam hidangan khas Lampung.',
    context: 'Pemanfaatan Tempoyak di Tulang Bawang Barat & Lampung',
    scenario: 'Tempoyak durian merupakan bahan kuliner legendaris masyarakat Lampung.',
    question: 'Menu masakan tradisional Lampung yang memanfaatkan tempoyak sebagai kuah asam gurih khas untuk olahan ikan air tawar adalah...',
    options: [
      'Gulai Taboh Tempoyak Ikan Patin dan Seruit Lampung.',
      'Gudeg manis nangka muda.',
      'Rawon daging bumbu kluwek.',
      'Coto daging rempah kacang.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Gulai Taboh Tempoyak dan Seruit Lampung adalah hidangan kuliner ikonik khas Lampung yang memadukan keasaman tempoyak durian dengan ikan air tawar segar.',
      scientificConcept: 'Integrasi kearifan lokal kuliner dengan bioteknologi pangan.',
      criticalThinkingSkill: 'Mengidentifikasi aplikasi nyata produk bioteknologi dalam budaya lokal.',
      commonMisconception: 'Mengira tempoyak hanya dimakan mentah tanpa diolah ke masakan tradisional.'
    }
  },
  {
    id: 'eval-6',
    indicator: 'Pengendalian Mutu & Keamanan',
    indicatorDescription: 'Mengevaluasi tanda kelayakan konsumsi produk fermentasi tempoyak.',
    context: 'Indikator Organoleptik & Keamanan Tempoyak',
    scenario: 'Seorang siswa mendapati toples tempoyak yang nilai pH-nya 4.1 tetapi pada permukaannya terdapat lapisan lendir kehitaman berbau busuk amonia.',
    question: 'Keputusan ilmiah yang paling tepat dan aman yang harus diambil berdasarkan pengamatan tersebut adalah...',
    options: [
      'Produk tidak layak konsumsi karena meskipun pH rendah, adanya bau busuk amonia dan lendir hitam menandakan kontaminasi kapang toksigenik berbahaya.',
      'Produk tetap aman dimakan karena angka pH 4.1 adalah satu-satunya jaminan keamanan mutlak.',
      'Cukup membuang durian yang hitam lalu meminum cairannya.',
      'Menambahkan garam 50% lagi lalu langsung memakannya mentah.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Nilai pH bukanlah satu-satunya parameter keamanan pangan. Pengamatan organoleptik (bau amonia dan lendir kehitaman yang berpotensi menghasilkan mikotoksin) mengindikasikan produk terkontaminasi dan tidak aman.',
      scientificConcept: 'Keamanan pangan terpadu (mikrobiologis dan organoleptik).',
      criticalThinkingSkill: 'Mengevaluasi bukti holistik secara objektif untuk pengambilan keputusan.',
      commonMisconception: 'Menganggap angka instrumen tunggal (pH) menggantikan seluruh kriteria keamanan biologis.'
    }
  },
  {
    id: 'eval-7',
    indicator: 'Interpretasi Data Numerik',
    indicatorDescription: 'Membaca perbandingan data perlakuan suhu pada tempoyak.',
    context: 'Data Kinetika Suhu Penyimpanan Tempoyak',
    scenario: 'Dua sampel tempoyak (garam 4%) disimpan selama 5 hari: Sampel Ruang (28°C) mencapai pH 4.05, sedangkan Sampel Kulkas (15°C) mencapai pH 5.35.',
    question: 'Pernyataan kesimpulan yang paling valid berdasarkan data tersebut adalah...',
    options: [
      'Laju fermentasi asam laktat pada suhu ruang (28°C) berlangsung lebih cepat dibandingkan pada suhu kulkas (15°C).',
      'Suhu 15°C mematikan seluruh mikroorganisme secara permanen.',
      'Tempoyak sebaiknya selalu dipanaskan hingga mendidih selama pemeraman.',
      'Suhu tidak memiliki pengaruh nyata terhadap proses fermentasi.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Suhu 28°C berada pada rentang optimum enzim BAL mesofilik sehingga kinetika penurunan pH jauh lebih pesat dibanding suhu 15°C yang menekan laju reaksi metabolisme.',
      scientificConcept: 'Termodinamika reaksi biokimia dan laju pertumbuhan bakteri mesofilik.',
      criticalThinkingSkill: 'Menyusun kesimpulan yang sejalan secara presisi dengan data eksperimen.',
      commonMisconception: 'Membuat klaim absolut berlebihan tanpa bukti penunjang data.'
    }
  },
  {
    id: 'eval-8',
    indicator: 'Desain Eksperimen',
    indicatorDescription: 'Menentukan variabel kontrol dalam pengujian ilmiah tempoyak.',
    context: 'Metodologi Penelitian Sains Tempoyak',
    scenario: 'Kelompok siswa ingin menyelidiki pengaruh konsentrasi garam (3%, 6%, 9%) terhadap nilai pH tempoyak durian.',
    question: 'Agar eksperimen bersifat objektif dan adil (fair test), variabel manakah yang wajib dijaga tetap sama (variabel kontrol)?',
    options: [
      'Massa durian, jenis/varietas durian, suhu ruangan, lama waktu fermentasi, dan jenis toples kedap udara.',
      'Konsentrasi garam yang dicampurkan ke masing-masing sampel.',
      'Nilai pH akhir yang diukur setiap hari.',
      'Ukuran toples yang berbeda-beda untuk tiap sampel.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Dalam kaidah penyelidikan ilmiah yang valid, hanya satu variabel bebas yang dimanipulasi (kadar garam). Seluruh variabel lain (massa, jenis substrat durian, suhu, durasi, wadah) harus dikontrol ketat agar perbedaan pH murni disebabkan oleh variasi garam.',
      scientificConcept: 'Prinsip desain eksperimen terkontrol (fair testing).',
      criticalThinkingSkill: 'Mengidentifikasi dan membedakan jenis-jenis variabel eksperimen.',
      commonMisconception: 'Mengubah banyak parameter sekaligus sehingga membingungkan penarikan kesimpulan.'
    }
  },
  {
    id: 'eval-9',
    indicator: 'Sikap Ilmiah & Kejujuran Data',
    indicatorDescription: 'Menilai integritas pencatatan data ilmiah.',
    context: 'Etika Penyelidikan Sains Tempoyak',
    scenario: 'Saat melakukan eksperimen di lab virtual, hipotesis awal siswa menduga toples garam 15% akan paling cepat asam. Namun data menunjukkan pH toples garam 15% turun sangat lambat (pH 4.90).',
    question: 'Tindakan yang mencerminkan sikap ilmiah yang jujur dan objektif adalah...',
    options: [
      'Mencatat data pH 4.90 apa adanya sesuai fakta pengamatan, lalu merefleksikan alasan ilmiah mengapa hipotesis awal tidak terbukti.',
      'Mengubah angka di tabel menjadi 3.90 agar sesuai dengan dugaan awal.',
      'Menghapus toples dan menyalahkan komputer.',
      'Menyalin data milik kelompok lain tanpa melakukan eksperimen sendiri.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Kejujuran dan objektivitas adalah pilar sikap ilmiah utama. Data empiris harus dicatat apa adanya. Ketidaksesuaian hasil dengan hipotesis merupakan peluang belajar berharga untuk menelusuri fakta sains (inhibisi osmotik garam tinggi terhadap BAL).',
      scientificConcept: 'Integritas ilmiah, falsifikasi hipotesis, dan kejujuran akademis.',
      criticalThinkingSkill: 'Menunjukkan regulasi diri dan keterbukaan terhadap bukti kontra-hipotesis.',
      commonMisconception: 'Menganggap eksperimen gagal jika hasilnya menolak dugaan awal.'
    }
  },
  {
    id: 'eval-10',
    indicator: 'Manfaat Probiotik Tempoyak',
    indicatorDescription: 'Menganalisis dampak kesehatan pangan fermentasi tempoyak.',
    context: 'Tempoyak untuk Kesejahteraan & Kesehatan Manusia',
    scenario: 'Tempoyak durian khas Lampung dikenal kaya akan mikroorganisme Bakteri Asam Laktat yang berpotensi sebagai agens probiotik alami.',
    question: 'Manfaat utama mengonsumsi pangan fermentasi asam laktat tempoyak bagi sistem pencernaan manusia adalah...',
    options: [
      'Membantu menjaga keseimbangan mikrobiota usus, menghasilkan bakteriosin untuk menekan patogen pencernaan, dan mempermudah penyerapan nutrisi.',
      'Menghilangkan kebutuhan manusia untuk minum air selamanya.',
      'Menggantikan seluruh nutrisi sayuran hijau secara instan.',
      'Membuat lambung tidak perlu lagi memproduksi asam lambung.'
    ],
    correctIndex: 0,
    explanation: {
      correctReason: 'Bakteri Asam Laktat hidup (probiotik) pada tempoyak menghasilkan asam organik dan peptida antimikroba (bakteriosin) yang menekan bakteri patogen serta menyehatkan mikrobioma usus.',
      scientificConcept: 'Peran mikroba probiotik dalam kesehatan mikrobioma saluran pencernaan.',
      criticalThinkingSkill: 'Menghubungkan bioteknologi mikroba dengan kesehatan fungsional tubuh.',
      commonMisconception: 'Klaim berlebihan yang tidak rasional terhadap makanan fermentasi.'
    }
  }
];

export const SIKAP_ILMIAH_INDICATORS = [
  {
    id: 'curiosity',
    name: 'Rasa Ingin Tahu (Curiosity)',
    description: 'Antusias mencari tahu penyebab perubahan fisik daging durian, aktif mengajukan pertanyaan "mengapa" dan "bagaimana" selama proses fermentasi tempoyak.',
    scaleDescriptors: [
      'Kurang menunjukkan minat atau pertanyaan selama eksplorasi fenomena tempoyak.',
      'Membaca fenomena tetapi jarang berinisiatif menggali pertanyaan baru.',
      'Aktif bertanya dan mengeksplorasi variabel simulasi tempoyak untuk mencari pola.',
      'Sangat antusias, kritis merumuskan pertanyaan mendalam, dan mengeksplorasi kondisi tak lazim untuk memperkaya wawasan.'
    ],
    teacherObservationPoint: 'Siswa aktif bertanya mengenai peran garam dan BAL serta mandiri mencoba variasi variabel di Virtual Lab tempoyak.'
  },
  {
    id: 'accuracy',
    name: 'Ketelitian (Accuracy)',
    description: 'Cermat dalam mengatur parameter variabel simulasi, mengamati detail perubahan warna durian, nilai pH, dan tekstur pasta secara teliti.',
    scaleDescriptors: [
      'Terburu-buru, sering melewatkan parameter atau salah mencatat angka pH.',
      'Cukup cermat namun sesekali mengabaikan detail kecil perubahan grafik.',
      'Cermat mengatur variabel dan teliti mencatat data numerik hingga dua desimal.',
      'Sangat teliti, konsisten memeriksa keselarasan data, dan tidak melewatkan anomali sekecil apapun.'
    ],
    teacherObservationPoint: 'Siswa teliti mencatat nilai pH harian tempoyak dan parameter tanpa pembulatan asal-asalan.'
  },
  {
    id: 'objectivity',
    name: 'Objektivitas (Objectivity)',
    description: 'Menilai keberhasilan fermentasi tempoyak berdasarkan bukti terukur dan data numerik nyata, bukan sekadar perasaan atau selera pribadi.',
    scaleDescriptors: [
      'Menyimpulkan hanya berdasarkan tebakan tanpa melihat data tabel pH.',
      'Memperhatikan data tetapi masih terpengaruh asumsi subjektif awal.',
      'Mendasarkan analisis pada angka pH dan parameter terukur secara konsisten.',
      'Sangat objektif, selalu menyertakan rujukan bukti numerik konkrit dalam setiap argumen.'
    ],
    teacherObservationPoint: 'Siswa menggunakan data pH dan indikator mikroba untuk memvalidasi keberhasilan fermentasi tempoyak, bukan dugaan.'
  },
  {
    id: 'openness',
    name: 'Keterbukaan terhadap Bukti (Openness)',
    description: 'Bersedia menerima fakta baru dan merevisi hipotesis awal apabila data eksperimen tempoyak menunjukkan hal berbeda.',
    scaleDescriptors: [
      'Bersikukuh pada pendapat awal meski data eksperimen membantahnya.',
      'Ragu-ragu mengakui perbedaan data dengan hipotesis awal.',
      'Menerima fakta bahwa hipotesis awal bisa saja tertolak oleh bukti eksperimen.',
      'Sangat terbuka, aktif mencari tahu alasan ilmiah di balik data tak terduga dengan penuh kerendahan hati ilmiah.'
    ],
    teacherObservationPoint: 'Siswa berjiwa besar mengevaluasi hipotesis yang salah saat kadar garam tinggi menghambat fermentasi tempoyak.'
  },
  {
    id: 'honesty',
    name: 'Kejujuran Data (Honesty)',
    description: 'Mencatat dan melaporkan data hasil simulasi tempoyak apa adanya tanpa memanipulasi angka agar terlihat "sempurna".',
    scaleDescriptors: [
      'Mengubah angka agar sesuai keinginan atau menyalin data tanpa menjalankan eksperimen.',
      'Hanya mencatat data yang disukai dan menyembunyikan data yang dianggap gagal.',
      'Mencatat seluruh data hasil simulasi apa adanya dengan jujur.',
      'Menjunjung tinggi integritas data, berani menampilkan data anomali, dan menyajikan penjelasan ilmiahnya.'
    ],
    teacherObservationPoint: 'Siswa tidak memanipulasi data uji gagal (misal toples berlendir karena garam 0%) pada lembar kerja analisis.'
  },
  {
    id: 'responsibility',
    name: 'Tanggung Jawab (Responsibility)',
    description: 'Menuntaskan tahapan investigasi, mengamati perkembangan tempoyak hingga tuntas, dan menyelesaikan refleksi pembelajaran.',
    scaleDescriptors: [
      'Meninggalkan tugas sebelum selesai atau sering berpindah menu tanpa fokus.',
      'Menyelesaikan sebagian tahapan namun tergesa-gesa di bagian refleksi.',
      'Menuntaskan seluruh modul investigasi dan analisis data secara teratur.',
      'Sangat berdedikasi, menuntaskan seluruh proses pembelajaran dengan penuh kesungguhan dan kepedulian mendalam.'
    ],
    teacherObservationPoint: 'Siswa menyelesaikan seluruh siklus belajar dari Fenomena hingga Dashboard Refleksi secara bertanggung jawab.'
  }
];
