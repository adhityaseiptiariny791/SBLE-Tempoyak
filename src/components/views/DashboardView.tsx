import React, { useState } from 'react';
import { 
  ActiveMenu, 
  StudentProfile, 
  LabTrial, 
  CriticalThinkingScore, 
  EvaluationScore, 
  ScientificAttitudeSelfAssessment, 
  ScientificAttitudeTeacherObservation, 
  DeepLearningReflection, 
  InvestigationData 
} from '../../types/index.ts';
import { 
  LayoutDashboard, 
  User, 
  Award, 
  Printer, 
  RotateCcw, 
  CheckCircle2, 
  FlaskConical, 
  Brain, 
  HeartHandshake, 
  CheckSquare, 
  FileText,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface DashboardViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  progressPercent: number;
  completedCount: number;
  totalModules: number;
  trials: LabTrial[];
  criticalThinkingScores: CriticalThinkingScore;
  evaluationScores: EvaluationScore;
  selfAssessment: ScientificAttitudeSelfAssessment;
  teacherObservation: ScientificAttitudeTeacherObservation;
  reflection: DeepLearningReflection;
  investigation: InvestigationData;
  onResetAllData: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveMenu,
  student,
  setStudent,
  progressPercent,
  completedCount,
  totalModules,
  trials,
  criticalThinkingScores,
  evaluationScores,
  selfAssessment,
  teacherObservation,
  reflection,
  investigation,
  onResetAllData,
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(student.name);
  const [profileClass, setProfileClass] = useState(student.className);
  const [profileSchool, setProfileSchool] = useState(student.school);
  const [profileId, setProfileId] = useState(student.studentId);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setStudent({
      name: profileName,
      className: profileClass,
      school: profileSchool,
      studentId: profileId,
    });
    setIsEditingProfile(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // Metrics
  const ctCorrect = Object.values(criticalThinkingScores).filter((s) => s.isCorrect).length;
  const evalCorrect = Object.values(evaluationScores).filter((s) => s.isCorrect).length;
  const evalTotal = 10;
  const evalPercent = Math.round((evalCorrect / evalTotal) * 100);

  const selfAvg = (
    (selfAssessment.curiosity +
      selfAssessment.accuracy +
      selfAssessment.objectivity +
      selfAssessment.openness +
      selfAssessment.honesty +
      selfAssessment.responsibility) / 6
  ).toFixed(1);

  return (
    <div className="space-y-6 print:m-0 print:p-0">
      {/* Header Banner (Hidden on print) */}
      <div className="print:hidden rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-[#168AAD] text-white p-6 shadow-lg border border-cyan-400/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <LayoutDashboard className="w-6 h-6 text-[#F4C95D]" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
                Portofolio Belajar Digital Terpadu
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold">Dashboard Hasil Belajar Siswa</h1>
              <p className="text-xs sm:text-sm text-cyan-100">
                Ringkasan Capaian Kompetensi, Aktivitas Lab, Berpikir Kritis, dan Sikap Ilmiah
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 shadow transition"
            >
              <Printer className="w-4 h-4 text-[#F4C95D]" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onResetAllData}
              className="p-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/40 transition"
              title="Reset Semua Data Pembelajaran"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Official Report Header for Print */}
      <div className="hidden print:block border-b-2 border-slate-900 pb-4 mb-6 text-center">
        <h1 className="text-xl font-black uppercase text-slate-900 tracking-wide">
          LAPORAN CAPAIAN BELAJAR SISWA (SBLE)
        </h1>
        <p className="text-xs text-slate-700">
          Smart Bio-Learning Environment • Materi Bioteknologi Fermentasi Pangan Lokal Lampung
        </p>
      </div>

      {/* Student Profile Card */}
      <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#168AAD] to-[#2E8B57] text-white flex items-center justify-center font-bold text-lg shadow">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#123B67]">{student.name}</h2>
              <p className="text-xs text-slate-500 font-medium">
                {student.className} • {student.school} {student.studentId && `(NISN: ${student.studentId})`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="print:hidden px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            {isEditingProfile ? 'Batal' : 'Edit Biodata Siswa'}
          </button>
        </div>

        {/* Edit Profile Form */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Lengkap:</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Kelas:</label>
              <input
                type="text"
                value={profileClass}
                onChange={(e) => setProfileClass(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Asal Sekolah:</label>
              <input
                type="text"
                value={profileSchool}
                onChange={(e) => setProfileSchool(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nomor Induk / NISN:</label>
              <input
                type="text"
                value={profileId}
                onChange={(e) => setProfileId(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#168AAD] text-white font-bold text-xs shadow hover:bg-cyan-600 transition"
              >
                Simpan Biodata
              </button>
            </div>
          </form>
        )}

        {/* Progress & Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-bold uppercase">Kelengkapan Modul</div>
            <div className="text-xl font-black text-[#123B67] mt-1">{progressPercent}%</div>
            <div className="text-[10px] text-slate-400">{completedCount} dari {totalModules} Menu</div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200">
            <div className="text-[11px] text-[#168AAD] font-bold uppercase">Praktikum Virtual</div>
            <div className="text-xl font-black text-[#168AAD] mt-1">{trials.length} Uji Coba</div>
            <div className="text-[10px] text-cyan-800">Tercatat di Jurnal</div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
            <div className="text-[11px] text-amber-800 font-bold uppercase">Berpikir Kritis</div>
            <div className="text-xl font-black text-amber-600 mt-1">{ctCorrect}/6 Tepat</div>
            <div className="text-[10px] text-amber-800">Latihan Formatif</div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="text-[11px] text-emerald-800 font-bold uppercase">Nilai Evaluasi</div>
            <div className="text-xl font-black text-[#2E8B57] mt-1">{evalPercent}/100</div>
            <div className="text-[10px] text-emerald-800">{evalCorrect} dari 10 Soal</div>
          </div>
        </div>
      </div>

      {/* Detailed Assessment Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sikap Ilmiah Summary */}
        <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
          <h3 className="text-sm font-extrabold text-[#123B67] flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#2E8B57]" />
            Profil Sikap Ilmiah (Refleksi Siswa & Guru)
          </h3>
          <div className="space-y-2">
            {[
              { label: 'Rasa Ingin Tahu', score: selfAssessment.curiosity },
              { label: 'Ketelitian Pengamatan', score: selfAssessment.accuracy },
              { label: 'Objektivitas Penilaian', score: selfAssessment.objectivity },
              { label: 'Keterbukaan terhadap Bukti', score: selfAssessment.openness },
              { label: 'Kejujuran Data', score: selfAssessment.honesty },
              { label: 'Tanggung Jawab Investigasi', score: selfAssessment.responsibility },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-700">{item.label}</span>
                <span className="font-extrabold text-[#2E8B57]">Skor {item.score} / 4</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 text-[11px] text-emerald-900 border border-emerald-200">
            <strong>Catatan Reflektif:</strong> {selfAssessment.notes || 'Belum diisi oleh siswa.'}
          </div>
        </div>

        {/* Investigasi & Lab Trials Summary */}
        <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
          <h3 className="text-sm font-extrabold text-[#123B67] flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-[#168AAD]" />
            Ringkasan Sampel Praktikum Virtual
          </h3>

          {trials.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4 text-center">
              Belum ada data eksperimen tersimpan.
            </p>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {trials.map((t) => (
                <div key={t.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{t.sampleName}</div>
                    <div className="text-[10px] text-slate-500">
                      pH Akhir: {t.finalPh.toFixed(2)} • {t.qualityStatus}
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    t.qualityStatus === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {t.qualityStatus}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="p-3 rounded-lg bg-cyan-50 text-[11px] text-cyan-900 border border-cyan-200">
            <strong>Hipotesis Penyelidikan:</strong> {investigation.hypothesis || 'Belum dirumuskan.'}
          </div>
        </div>
      </div>

      {/* Deep Learning Reflection Card */}
      <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-3">
        <h3 className="text-sm font-extrabold text-[#123B67] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#F4C95D]" />
          Refleksi Deep Learning Siswa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-[#168AAD] mb-1">Mindful Learning:</div>
            <p className="text-slate-600 leading-relaxed italic">
              {reflection.mindfulNotes || 'Belum ada catatan refleksi mindful.'}
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-[#2E8B57] mb-1">Meaningful Learning:</div>
            <p className="text-slate-600 leading-relaxed italic">
              {reflection.meaningfulNotes || 'Belum ada catatan refleksi kearifan lokal.'}
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-amber-700 mb-1">Joyful Learning:</div>
            <p className="text-slate-600 leading-relaxed italic">
              {reflection.joyfulNotes || 'Belum ada catatan pengalaman menyenangkan.'}
            </p>
          </div>
        </div>
      </div>

      {/* Signature block for print report */}
      <div className="hidden print:grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-300 text-xs text-center">
        <div>
          <p className="font-semibold text-slate-700">Mengetahui, Guru Mata Pelajaran IPA</p>
          <div className="h-16" />
          <p className="font-bold border-t border-slate-400 pt-1 inline-block min-w-[180px]">
            {teacherObservation.teacherName || 'Guru IPA SMP'}
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-700">Siswa Peneliti</p>
          <div className="h-16" />
          <p className="font-bold border-t border-slate-400 pt-1 inline-block min-w-[180px]">
            {student.name}
          </p>
        </div>
      </div>
    </div>
  );
};
