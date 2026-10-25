export type ActiveMenu =
  | 'beranda'
  | 'petunjuk'
  | 'capaian'
  | 'fenomena'
  | 'masalah'
  | 'materi'
  | 'investigasi'
  | 'virtuallab'
  | 'analisis'
  | 'berpikir-kritis'
  | 'sikap-ilmiah'
  | 'evaluasi'
  | 'refleksi'
  | 'dashboard'
  | 'profil';

export type UserRole = 'guru' | 'siswa';

export interface StudentProfile {
  name: string;
  className: string;
  school: string;
  studentId: string;
}

export interface StudentLearningData {
  progressPercent: number;
  completedMenus: ActiveMenu[];
  trials: LabTrial[];
  problemAnswers: ProblemOrientationAnswer;
  investigation: InvestigationData;
  criticalThinkingScores: CriticalThinkingScore;
  evaluationScores: EvaluationScore;
  selfAssessment: ScientificAttitudeSelfAssessment;
  teacherObservation: ScientificAttitudeTeacherObservation;
  reflection: DeepLearningReflection;
  lastActive: number;
}

export interface UserAccount {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  name: string;
  nisn?: string;
  nip?: string;
  className?: string;
  school: string;
  createdDate: string;
  studentData?: StudentLearningData;
}

export interface LabTrial {
  id: string;
  timestamp: number;
  productType: 'tempoyak';
  sampleName: string;
  // Parameters
  massGrams: number;
  saltPercentage: number;
  fermentationDays: number;
  storageTempCelsius: number;
  containerCondition: 'anaerob' | 'aerob';
  // Outcomes (Simulated)
  finalPh: number;
  dailyPhData: { day: number; ph: number; balCount: number; pathogenRisk: number }[];
  aromaScore: string;
  textureScore: string;
  colorScore: string;
  qualityStatus: 'Optimal' | 'Cukup Baik' | 'Terlalu Asin / Fermentasi Lambat' | 'Gagal / Kontaminasi Pembusuk';
  notes: string;
}

export interface InvestigationData {
  problemIdentification: string;
  researchQuestion: string;
  independentVar: string;
  dependentVar: string;
  controlVars: string;
  hypothesis: string;
  evidenceArg: string;
  conclusion: string;
  limitations: string;
}

export interface ProblemOrientationAnswer {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
}

export interface CriticalThinkingScore {
  [questionId: string]: {
    selectedOption: number;
    isCorrect: boolean;
  };
}

export interface EvaluationScore {
  [questionId: string]: {
    selectedOption: number;
    isCorrect: boolean;
  };
}

export interface ScientificAttitudeSelfAssessment {
  curiosity: number; // 1-4
  accuracy: number;
  objectivity: number;
  openness: number;
  honesty: number;
  responsibility: number;
  notes: string;
}

export interface ScientificAttitudeTeacherObservation {
  curiosity: number;
  accuracy: number;
  objectivity: number;
  openness: number;
  honesty: number;
  responsibility: number;
  teacherName: string;
  notes: string;
}

export interface DeepLearningReflection {
  mindfulNotes: string;
  meaningfulNotes: string;
  joyfulNotes: string;
}
