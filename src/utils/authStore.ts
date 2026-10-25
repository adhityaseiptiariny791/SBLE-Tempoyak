import { UserAccount, StudentLearningData, ActiveMenu, LabTrial } from '../types/index.ts';

const ACCOUNTS_STORAGE_KEY = 'SBLE_USER_ACCOUNTS_V3';
const CURRENT_USER_KEY = 'SBLE_CURRENT_USER_V3';

export const INITIAL_STUDENT_DATA_FACTORY = (name: string, className: string): StudentLearningData => ({
  progressPercent: 7,
  completedMenus: ['beranda'],
  trials: [],
  problemAnswers: { q1: '', q2: '', q3: '', q4: '' },
  investigation: {
    problemIdentification: '',
    researchQuestion: '',
    independentVar: '',
    dependentVar: '',
    controlVars: '',
    hypothesis: '',
    evidenceArg: '',
    conclusion: '',
    limitations: '',
  },
  criticalThinkingScores: {},
  evaluationScores: {},
  selfAssessment: {
    curiosity: 3,
    accuracy: 3,
    objectivity: 3,
    openness: 3,
    honesty: 4,
    responsibility: 3,
    notes: '',
  },
  teacherObservation: {
    curiosity: 3,
    accuracy: 3,
    objectivity: 3,
    openness: 3,
    honesty: 4,
    responsibility: 3,
    teacherName: 'Adhitya Seiptiariny, S.Pd.',
    notes: 'Siswa aktif dan antusias dalam memulai investigasi bioteknologi tempoyak.',
  },
  reflection: {
    mindfulNotes: '',
    meaningfulNotes: '',
    joyfulNotes: '',
  },
  lastActive: Date.now(),
});

// Pre-seeded accounts: 1 Guru Pengampu (SMPN Satu Atap 4 Tulang Bawang Barat) + 3 Siswa (Tempoyak only)
export const DEFAULT_ACCOUNTS: UserAccount[] = [
  {
    id: 'guru-1',
    username: 'guru.adhitya',
    password: 'guru123',
    role: 'guru',
    name: 'Adhitya Seiptiariny, S.Pd.',
    nip: '198907142014032001',
    school: 'SMPN Satu Atap 4 Tulang Bawang Barat',
    createdDate: '2026-10-01',
  },
  {
    id: 'siswa-1',
    username: '0081234567',
    password: 'siswa123',
    role: 'siswa',
    name: 'Ahmad Fauzan',
    nisn: '0081234567',
    className: 'Kelas IX-A',
    school: 'SMPN Satu Atap 4 Tulang Bawang Barat',
    createdDate: '2026-10-15',
    studentData: {
      progressPercent: 73,
      completedMenus: [
        'beranda',
        'petunjuk',
        'capaian',
        'fenomena',
        'masalah',
        'materi',
        'investigasi',
        'virtuallab',
        'analisis',
        'berpikir-kritis',
        'sikap-ilmiah',
      ],
      trials: [
        {
          id: 'trial-fauzan-1',
          timestamp: Date.now() - 86400000,
          productType: 'tempoyak',
          sampleName: 'Tempoyak Kontrol Ideal (Garam 4%, 28°C, Anaerob)',
          massGrams: 250,
          saltPercentage: 4,
          fermentationDays: 7,
          storageTempCelsius: 28,
          containerCondition: 'anaerob',
          finalPh: 3.98,
          dailyPhData: [
            { day: 0, ph: 6.2, balCount: 4.2, pathogenRisk: 5 },
            { day: 2, ph: 5.0, balCount: 6.8, pathogenRisk: 3 },
            { day: 4, ph: 4.15, balCount: 8.4, pathogenRisk: 0 },
            { day: 7, ph: 3.98, balCount: 8.8, pathogenRisk: 0 },
          ],
          aromaScore: 'Aroma asam segar khas durian fermentasi',
          textureScore: 'Pasta pulen lembut homogen',
          colorScore: 'Kuning keemasan cerah',
          qualityStatus: 'Optimal',
          notes: 'Kadar garam 4% berhasil menyeleksi BAL dan menekan bakteri pembusuk.',
        },
        {
          id: 'trial-fauzan-2',
          timestamp: Date.now() - 43200000,
          productType: 'tempoyak',
          sampleName: 'Tempoyak Uji Garam Rendah (Garam 1%, 28°C, Aerob)',
          massGrams: 250,
          saltPercentage: 1,
          fermentationDays: 7,
          storageTempCelsius: 28,
          containerCondition: 'aerob',
          finalPh: 5.62,
          dailyPhData: [
            { day: 0, ph: 6.2, balCount: 4.0, pathogenRisk: 30 },
            { day: 3, ph: 5.8, balCount: 4.6, pathogenRisk: 65 },
            { day: 7, ph: 5.62, balCount: 5.1, pathogenRisk: 95 },
          ],
          aromaScore: 'Tengik busuk menyengat amonia',
          textureScore: 'Berlendir encer berair',
          colorScore: 'Kusam berkapang keabuan',
          qualityStatus: 'Gagal / Kontaminasi Pembusuk',
          notes: 'Toples terbuka membiarkan kapang aerob tumbuh subur.',
        },
      ],
      problemAnswers: {
        q1: 'Daging buah durian berubah rasa menjadi asam karena bakteri asam laktat merombak glukosa durian menjadi asam laktat.',
        q2: 'Kadar garam mengatur seleksi bakteri; garam ideal (3-5%) mendukung BAL dan mencegah pembusukan.',
        q3: 'Data grafik penurunan pH membuktikan secara objektif kinetika keasaman tempoyak.',
        q4: 'Pengamatan objektif sangat penting agar kesimpulan sains dapat dipertanggungjawabkan.',
      },
      investigation: {
        problemIdentification: 'Kondisi fermentasi yang tidak tepat sering menyebabkan toples tempoyak berbau busuk atau rusak.',
        researchQuestion: 'Bagaimana pengaruh konsentrasi garam (4% vs 15%) terhadap nilai pH tempoyak durian?',
        independentVar: 'Konsentrasi Garam (%)',
        dependentVar: 'Nilai pH & Mutu Organoleptik Tempoyak',
        controlVars: 'Suhu 28°C, toples kedap anaerob, massa durian 250g',
        hypothesis: 'Jika kadar garam 4%, maka penurunan pH mencapai optimal (<4.4) tanpa kontaminasi pembusuk.',
        evidenceArg: 'Klaim: Garam 4% optimum. Bukti: pH turun ke 3.98 di hari ke-7. Alasan: BAL mendominasi substrat durian.',
        conclusion: 'Konsentrasi garam 4% menghasilkan tempoyak bermutu optimal dengan derajat keasaman aman.',
        limitations: 'Model simulasi mengasumsikan durian seragam, sedangkan durian di alam bervariasi kadar gulanya.',
      },
      criticalThinkingScores: {
        'ct-1': { selectedOption: 1, isCorrect: true },
        'ct-2': { selectedOption: 0, isCorrect: true },
        'ct-3': { selectedOption: 0, isCorrect: true },
        'ct-4': { selectedOption: 0, isCorrect: true },
        'ct-5': { selectedOption: 0, isCorrect: true },
      },
      evaluationScores: {
        'eval-1': { selectedOption: 0, isCorrect: true },
        'eval-2': { selectedOption: 0, isCorrect: true },
        'eval-3': { selectedOption: 0, isCorrect: true },
        'eval-4': { selectedOption: 0, isCorrect: true },
        'eval-5': { selectedOption: 0, isCorrect: true },
        'eval-6': { selectedOption: 0, isCorrect: true },
        'eval-7': { selectedOption: 0, isCorrect: true },
        'eval-8': { selectedOption: 0, isCorrect: true },
      },
      selfAssessment: {
        curiosity: 4,
        accuracy: 4,
        objectivity: 4,
        openness: 3,
        honesty: 4,
        responsibility: 4,
        notes: 'Saya sangat tertarik dengan peran garam dalam fermentasi tempoyak dan mencatat data apa adanya.',
      },
      teacherObservation: {
        curiosity: 4,
        accuracy: 4,
        objectivity: 4,
        openness: 4,
        honesty: 4,
        responsibility: 4,
        teacherName: 'Adhitya Seiptiariny, S.Pd.',
        notes: 'Ahmad sangat tekun, cermat menganalisis grafik pH tempoyak, dan proaktif bertanya di kelas.',
      },
      reflection: {
        mindfulNotes: 'Saya sekarang paham bahwa reaksi bioteknologi tempoyak membutuhkan pemantauan variabel yang teliti.',
        meaningfulNotes: 'Tempoyak durian khas Lampung ternyata memiliki biokimia yang canggih warisan nenek moyang.',
        joyfulNotes: 'Sangat menyenangkan mencoba simulasi tanpa takut durian asli terbuang sia-sia.',
      },
      lastActive: Date.now() - 3600000,
    },
  },
  {
    id: 'siswa-2',
    username: '0087654321',
    password: 'siswa123',
    role: 'siswa',
    name: 'Siti Nurhaliza',
    nisn: '0087654321',
    className: 'Kelas IX-A',
    school: 'SMPN Satu Atap 4 Tulang Bawang Barat',
    createdDate: '2026-10-15',
    studentData: {
      progressPercent: 100,
      completedMenus: [
        'beranda', 'petunjuk', 'capaian', 'fenomena', 'masalah',
        'materi', 'investigasi', 'virtuallab', 'analisis',
        'berpikir-kritis', 'sikap-ilmiah', 'evaluasi', 'refleksi', 'dashboard', 'profil'
      ],
      trials: [
        {
          id: 'trial-siti-1',
          timestamp: Date.now() - 72000000,
          productType: 'tempoyak',
          sampleName: 'Tempoyak Suhu Dingin (Garam 4%, 15°C, Anaerob)',
          massGrams: 250,
          saltPercentage: 4,
          fermentationDays: 7,
          storageTempCelsius: 15,
          containerCondition: 'anaerob',
          finalPh: 4.88,
          dailyPhData: [
            { day: 0, ph: 6.2, balCount: 4.2, pathogenRisk: 5 },
            { day: 7, ph: 4.88, balCount: 6.4, pathogenRisk: 0 },
          ],
          aromaScore: 'Asam sangat lemah, fermentasi lambat',
          textureScore: 'Kering agak kaku',
          colorScore: 'Kuning pucat stabil',
          qualityStatus: 'Terlalu Asin / Fermentasi Lambat',
          notes: 'Suhu 15°C memperlambat laju metabolisme enzim BAL.',
        },
      ],
      problemAnswers: {
        q1: 'Mikroorganisme asam laktat memfermentasi gula durian menjadi asam.',
        q2: 'Garam mengontrol mikroba yang tumbuh.',
        q3: 'Grafik menunjukkan waktu pH turun hingga batas aman (pH 4.4).',
        q4: 'Agar hasil eksperimen dapat dipertanggungjawabkan.',
      },
      investigation: {
        problemIdentification: 'Pengaruh suhu penyimpanan terhadap fermentasi tempoyak durian.',
        researchQuestion: 'Bagaimana suhu 15°C vs 28°C memengaruhi kecepatan fermentasi tempoyak?',
        independentVar: 'Suhu Penyimpanan (°C)',
        dependentVar: 'Laju Penurunan pH Tempoyak',
        controlVars: 'Garam 4%, toples anaerob, durian 250g',
        hypothesis: 'Suhu 28°C fermentasi lebih cepat dibandingkan 15°C.',
        evidenceArg: 'pH di 28°C turun ke 3.98 sementara di 15°C hanya 4.88.',
        conclusion: 'Suhu ruang (28°C) optimum untuk aktivitas bakteri asam laktat tempoyak.',
        limitations: 'Model simulasi tidak memperhitungkan fluktuasi suhu cuaca ekstrem.',
      },
      criticalThinkingScores: {
        'ct-1': { selectedOption: 1, isCorrect: true },
        'ct-2': { selectedOption: 0, isCorrect: true },
        'ct-3': { selectedOption: 0, isCorrect: true },
        'ct-4': { selectedOption: 0, isCorrect: true },
        'ct-5': { selectedOption: 0, isCorrect: true },
        'ct-6': { selectedOption: 0, isCorrect: true },
      },
      evaluationScores: {
        'eval-1': { selectedOption: 0, isCorrect: true },
        'eval-2': { selectedOption: 0, isCorrect: true },
        'eval-3': { selectedOption: 0, isCorrect: true },
        'eval-4': { selectedOption: 0, isCorrect: true },
        'eval-5': { selectedOption: 0, isCorrect: true },
        'eval-6': { selectedOption: 0, isCorrect: true },
        'eval-7': { selectedOption: 0, isCorrect: true },
        'eval-8': { selectedOption: 0, isCorrect: true },
        'eval-9': { selectedOption: 0, isCorrect: true },
        'eval-10': { selectedOption: 0, isCorrect: true },
      },
      selfAssessment: {
        curiosity: 4,
        accuracy: 4,
        objectivity: 4,
        openness: 4,
        honesty: 4,
        responsibility: 4,
        notes: 'Semua modul bioteknologi tempoyak telah saya selesaikan dengan teliti.',
      },
      teacherObservation: {
        curiosity: 4,
        accuracy: 4,
        objectivity: 4,
        openness: 4,
        honesty: 4,
        responsibility: 4,
        teacherName: 'Adhitya Seiptiariny, S.Pd.',
        notes: 'Siti meraih nilai sempurna pada evaluasi tempoyak dan menunjukkan penguasaan konsep yang luar biasa.',
      },
      reflection: {
        mindfulNotes: 'Saya belajar untuk selalu memeriksa ulang data sebelum menarik kesimpulan ilmiah.',
        meaningfulNotes: 'Tempoyak durian adalah bukti kecerdasan biologis kearifan lokal Tulang Bawang Barat & Lampung.',
        joyfulNotes: 'Eksperimen virtual tempoyak ini sangat seru dan visualnya mudah dipahami.',
      },
      lastActive: Date.now() - 7200000,
    },
  },
  {
    id: 'siswa-3',
    username: '0089988776',
    password: 'siswa123',
    role: 'siswa',
    name: 'Budi Pratama',
    nisn: '0089988776',
    className: 'Kelas IX-B',
    school: 'SMPN Satu Atap 4 Tulang Bawang Barat',
    createdDate: '2026-10-18',
    studentData: {
      progressPercent: 40,
      completedMenus: ['beranda', 'petunjuk', 'capaian', 'fenomena', 'masalah', 'materi'],
      trials: [],
      problemAnswers: {
        q1: 'Ada perubahan rasa dari manis durian menjadi asam segar.',
        q2: 'Garam membuat tempoyak awet dan tidak busuk.',
        q3: 'Dengan grafik kita tahu kapan tempoyak matang.',
        q4: 'Supaya tidak salah mencatat data.',
      },
      investigation: {
        problemIdentification: '',
        researchQuestion: '',
        independentVar: '',
        dependentVar: '',
        controlVars: '',
        hypothesis: '',
        evidenceArg: '',
        conclusion: '',
        limitations: '',
      },
      criticalThinkingScores: {
        'ct-1': { selectedOption: 1, isCorrect: true },
        'ct-2': { selectedOption: 0, isCorrect: true },
      },
      evaluationScores: {},
      selfAssessment: {
        curiosity: 3,
        accuracy: 3,
        objectivity: 3,
        openness: 3,
        honesty: 3,
        responsibility: 3,
        notes: 'Saya sedang mempelajari materi faktor fermentasi tempoyak.',
      },
      teacherObservation: {
        curiosity: 3,
        accuracy: 3,
        objectivity: 3,
        openness: 3,
        honesty: 3,
        responsibility: 3,
        teacherName: 'Adhitya Seiptiariny, S.Pd.',
        notes: 'Perlu didorong untuk segera menyelesaikan praktikum di Virtual Lab tempoyak.',
      },
      reflection: {
        mindfulNotes: '',
        meaningfulNotes: '',
        joyfulNotes: '',
      },
      lastActive: Date.now() - 172800000,
    },
  },
];

// Helper functions for auth and student management
export function loadAccounts(): UserAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) {
      saveAccounts(DEFAULT_ACCOUNTS);
      return DEFAULT_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ACCOUNTS;
  } catch (e) {
    return DEFAULT_ACCOUNTS;
  }
}

export function saveAccounts(accounts: UserAccount[]): void {
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save accounts to storage:', e);
  }
}

export function loadCurrentUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function saveCurrentUser(user: UserAccount | null): void {
  try {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Failed to save current user to storage:', e);
  }
}

export function authenticateUser(username: string, password: string): UserAccount | null {
  const accounts = loadAccounts();
  const trimmedUser = username.trim().toLowerCase();
  const trimmedPass = password.trim();

  const found = accounts.find(
    (acc) => acc.username.toLowerCase() === trimmedUser && acc.password === trimmedPass
  );

  if (found) {
    saveCurrentUser(found);
    return found;
  }
  return null;
}

export function addStudentAccount(data: {
  name: string;
  nisn: string;
  className: string;
  school: string;
  password?: string;
}): UserAccount {
  const accounts = loadAccounts();
  const nisnClean = data.nisn.trim();
  const defaultPass = data.password && data.password.trim() ? data.password.trim() : 'siswa123';

  // Check if username/nisn already exists
  const existing = accounts.find((a) => a.username.toLowerCase() === nisnClean.toLowerCase());
  if (existing) {
    throw new Error(`Akun dengan NISN/Username ${nisnClean} sudah terdaftar (${existing.name}).`);
  }

  const newStudent: UserAccount = {
    id: `siswa-${Date.now()}`,
    username: nisnClean,
    password: defaultPass,
    role: 'siswa',
    name: data.name.trim(),
    nisn: nisnClean,
    className: data.className.trim(),
    school: data.school.trim() || 'SMPN Satu Atap 4 Tulang Bawang Barat',
    createdDate: new Date().toISOString().split('T')[0],
    studentData: INITIAL_STUDENT_DATA_FACTORY(data.name.trim(), data.className.trim()),
  };

  const updated = [newStudent, ...accounts];
  saveAccounts(updated);
  return newStudent;
}

export function updateStudentData(studentId: string, updatedData: Partial<StudentLearningData>): void {
  const accounts = loadAccounts();
  const idx = accounts.findIndex((a) => a.id === studentId);
  if (idx !== -1 && accounts[idx].studentData) {
    accounts[idx].studentData = {
      ...accounts[idx].studentData!,
      ...updatedData,
      lastActive: Date.now(),
    };
    saveAccounts(accounts);

    // If current logged-in user is this student, sync session
    const current = loadCurrentUser();
    if (current && current.id === studentId) {
      saveCurrentUser(accounts[idx]);
    }
  }
}

export function updateTeacherObservationForStudent(
  studentId: string,
  observation: StudentLearningData['teacherObservation']
): void {
  const accounts = loadAccounts();
  const idx = accounts.findIndex((a) => a.id === studentId);
  if (idx !== -1 && accounts[idx].studentData) {
    accounts[idx].studentData!.teacherObservation = observation;
    saveAccounts(accounts);
  }
}

export function resetStudentPassword(studentId: string, newPassword: string): void {
  const accounts = loadAccounts();
  const idx = accounts.findIndex((a) => a.id === studentId);
  if (idx !== -1) {
    accounts[idx].password = newPassword.trim();
    saveAccounts(accounts);
  }
}

export function deleteStudentAccount(studentId: string): void {
  const accounts = loadAccounts();
  const filtered = accounts.filter((a) => a.id !== studentId);
  saveAccounts(filtered);
}
