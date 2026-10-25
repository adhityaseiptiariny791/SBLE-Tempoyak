import React, { useState } from 'react';
import { ActiveMenu, ScientificAttitudeSelfAssessment, ScientificAttitudeTeacherObservation } from '../../types/index.ts';
import { SIKAP_ILMIAH_INDICATORS } from '../../data/learningContent.ts';
import { 
  HeartHandshake, 
  ArrowRight, 
  Save, 
  CheckCircle2, 
  User, 
  GraduationCap, 
  Info,
  Sparkles,
  ClipboardCheck
} from 'lucide-react';

interface SikapIlmiahViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
  selfAssessment: ScientificAttitudeSelfAssessment;
  setSelfAssessment: React.Dispatch<React.SetStateAction<ScientificAttitudeSelfAssessment>>;
  teacherObservation: ScientificAttitudeTeacherObservation;
  setTeacherObservation: React.Dispatch<React.SetStateAction<ScientificAttitudeTeacherObservation>>;
}

export const SikapIlmiahView: React.FC<SikapIlmiahViewProps> = ({
  setActiveMenu,
  selfAssessment,
  setSelfAssessment,
  teacherObservation,
  setTeacherObservation,
}) => {
  const [activeTab, setActiveTab] = useState<'self' | 'teacher'>('self');
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSelfRating = (id: keyof ScientificAttitudeSelfAssessment, rating: number) => {
    setSelfAssessment((prev) => ({
      ...prev,
      [id]: rating,
    }));
  };

  const handleTeacherRating = (id: keyof ScientificAttitudeTeacherObservation, rating: number) => {
    setTeacherObservation((prev) => ({
      ...prev,
      [id]: rating,
    }));
  };

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  // Calculate self average
  const selfScores = [
    selfAssessment.curiosity,
    selfAssessment.accuracy,
    selfAssessment.objectivity,
    selfAssessment.openness,
    selfAssessment.honesty,
    selfAssessment.responsibility,
  ];
  const selfAvg = (selfScores.reduce((a, b) => a + b, 0) / 6).toFixed(1);

  // Calculate teacher average
  const teacherScores = [
    teacherObservation.curiosity,
    teacherObservation.accuracy,
    teacherObservation.objectivity,
    teacherObservation.openness,
    teacherObservation.honesty,
    teacherObservation.responsibility,
  ];
  const teacherAvg = (teacherScores.reduce((a, b) => a + b, 0) / 6).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-[#2E8B57] text-white p-6 shadow-lg border border-emerald-400/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <HeartHandshake className="w-6 h-6 text-[#F4C95D]" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                Pengembangan Karakter Peneliti Muda
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold">Sikap Ilmiah (Scientific Attitude)</h1>
              <p className="text-xs sm:text-sm text-cyan-100">
                Refleksi Diri Siswa & Lembar Observasi Autentik Guru Sains
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/60 border border-white/15">
            <button
              onClick={() => setActiveTab('self')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'self'
                  ? 'bg-[#2E8B57] text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Refleksi Diri Siswa</span>
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'teacher'
                  ? 'bg-[#168AAD] text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Lembar Observasi Guru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Distinction Notice (Strict rule from prompt: Do not calculate scientific attitude purely from quiz scores) */}
      <div className="rounded-2xl bg-cyan-950/20 border border-cyan-800/40 p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-200 leading-relaxed">
          <strong className="text-white">Prinsip Asesmen Sikap:</strong> Sikap ilmiah tidak dapat disimpulkan hanya dari nilai kuis pilihan ganda. Sikap dinilai secara triangulasi melalui refleksi kesadaran diri siswa (self-assessment) serta observasi perilaku autentik oleh guru selama proses penyelidikan dan analisis data.
        </p>
      </div>

      {/* Main Rubric Form */}
      <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-base font-extrabold text-[#123B67] flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-[#2E8B57]" />
              {activeTab === 'self' ? 'Instrumen Penilaian Diri Siswa' : 'Lembar Observasi Kinerja oleh Guru'}
            </h2>
            <p className="text-xs text-slate-500">
              Skala: 1 = Kurang, 2 = Cukup, 3 = Baik, 4 = Sangat Baik / Membudaya
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] text-slate-400 font-semibold">Rata-rata Skor:</div>
              <div className="text-sm font-extrabold text-[#2E8B57]">
                {activeTab === 'self' ? selfAvg : teacherAvg} / 4.0
              </div>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow transition"
            >
              <Save className="w-4 h-4 text-[#F4C95D]" />
              <span>Simpan Penilaian</span>
            </button>
          </div>
        </div>

        {savedStatus && (
          <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Penilaian sikap ilmiah berhasil disimpan ke profil belajar!
          </div>
        )}

        {/* 6 Dimensions Rubric */}
        <div className="space-y-4">
          {SIKAP_ILMIAH_INDICATORS.map((ind, idx) => {
            const currentRating = activeTab === 'self' 
              ? (selfAssessment as any)[ind.id] || 3 
              : (teacherObservation as any)[ind.id] || 3;

            return (
              <div key={ind.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#168AAD]">
                      Dimensi {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800">{ind.name}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{ind.description}</p>
                    {activeTab === 'teacher' && (
                      <p className="text-[11px] text-indigo-700 italic mt-1 font-medium">
                        📌 Fokus Observasi Guru: {ind.teacherObservationPoint}
                      </p>
                    )}
                  </div>

                  {/* 1 - 4 Rating Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {[1, 2, 3, 4].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          if (activeTab === 'self') {
                            handleSelfRating(ind.id as any, star);
                          } else {
                            handleTeacherRating(ind.id as any, star);
                          }
                        }}
                        className={`w-9 h-9 rounded-lg font-bold text-xs border transition-all ${
                          currentRating === star
                            ? 'bg-[#2E8B57] text-white border-emerald-600 shadow-md scale-105'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rubric descriptor for selected value */}
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                  <span className="font-bold text-[#2E8B57] text-[11px] shrink-0">
                    Skor {currentRating}:
                  </span>
                  <span>{ind.scaleDescriptors[currentRating - 1]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes & Teacher Name */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          {activeTab === 'self' ? (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Catatan Refleksi Pribadi Siswa terhadap Pengalaman Belajar:
              </label>
              <textarea
                value={selfAssessment.notes}
                onChange={(e) => setSelfAssessment({ ...selfAssessment, notes: e.target.value })}
                placeholder="Tuliskan tantangan yang kamu hadapi dalam menjaga ketelitian atau kejujuran saat data eksperimen tidak sesuai harapan..."
                rows={2}
                className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#2E8B57] focus:outline-none"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Nama Guru Pengamat:
                </label>
                <input
                  type="text"
                  value={teacherObservation.teacherName}
                  onChange={(e) => setTeacherObservation({ ...teacherObservation, teacherName: e.target.value })}
                  placeholder="Nama Lengkap Guru IPA & Gelar..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Catatan Observasi Khusus Guru (Catatan Anekdot Perilaku Siswa):
                </label>
                <textarea
                  value={teacherObservation.notes}
                  onChange={(e) => setTeacherObservation({ ...teacherObservation, notes: e.target.value })}
                  placeholder="Catatan perkembangan kemandirian, objektivitas data, dan keaktifan siswa selama praktikum..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => setActiveMenu('evaluasi')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-xs shadow-md hover:scale-[1.02] transition"
          >
            <span>Lanjut ke Evaluasi Akhir</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
