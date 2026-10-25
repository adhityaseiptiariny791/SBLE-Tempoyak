import React from 'react';
import { ActiveMenu, InvestigationData } from '../../types/index.ts';
import { INVESTIGASI_STAGES } from '../../data/learningContent.ts';
import { 
  Compass, 
  ArrowRight, 
  FlaskConical, 
  Save, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  ClipboardList
} from 'lucide-react';

interface InvestigasiViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
  investigation: InvestigationData;
  setInvestigation: React.Dispatch<React.SetStateAction<InvestigationData>>;
}

export const InvestigasiView: React.FC<InvestigasiViewProps> = ({
  setActiveMenu,
  investigation,
  setInvestigation,
}) => {
  const [activeStep, setActiveStep] = React.useState(1);
  const [savedStatus, setSavedStatus] = React.useState(false);

  const handleFieldChange = (field: keyof InvestigationData, value: string) => {
    setInvestigation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-[#2E8B57] text-white p-6 shadow-lg border border-emerald-400/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <Compass className="w-6 h-6 text-[#F4C95D]" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
              Tahapan Penyelidikan Sains Terbimbing
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold">Alur Investigasi Ilmiah Bioteknologi</h1>
            <p className="text-xs sm:text-sm text-cyan-100">
              Menerapkan Metode Ilmiah untuk Menyelidiki Pengaruh Variabel Fermentasi Pangan Lokal
            </p>
          </div>
        </div>
      </div>

      {/* 9 Steps Visual Stepper Header */}
      <div className="rounded-2xl bg-white p-4 shadow-md border border-slate-200 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-[700px] gap-2">
          {INVESTIGASI_STAGES.map((s) => {
            const isActive = activeStep === s.step;
            const isPassed = activeStep > s.step;

            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`flex-1 flex flex-col items-center text-center p-2 rounded-xl transition-all border ${
                  isActive
                    ? 'bg-[#168AAD] text-white border-cyan-400 shadow-md scale-105'
                    : isPassed
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                    isActive ? 'bg-[#F4C95D] text-slate-900' : isPassed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isPassed ? '✓' : s.step}
                </div>
                <div className="text-[10px] font-bold truncate max-w-[80px]">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Workspace Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Guidelines for current step */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#168AAD] uppercase tracking-wider">
              <ClipboardList className="w-4 h-4 text-[#168AAD]" />
              Panduan Langkah ke-{activeStep}
            </div>
            <h2 className="text-lg font-extrabold text-[#123B67]">
              {INVESTIGASI_STAGES[activeStep - 1].title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {INVESTIGASI_STAGES[activeStep - 1].desc}
            </p>

            {/* Step specific tips */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1 text-amber-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Tips Berpikir Kritis:
              </div>
              {activeStep === 1 && <p>Amati mengapa toples dengan garam sedikit sering berbau busuk, sementara toples dengan kadar garam sedang (3-5%) beraroma asam segar.</p>}
              {activeStep === 2 && <p>Gunakan format: "Bagaimana pengaruh [Variabel Bebas: Kadar Garam] terhadap [Variabel Terikat: Penurunan pH & Mutu] pada fermentasi tempoyak?"</p>}
              {activeStep === 3 && <p>Variabel kontrol harus dijaga persis sama agar eksperimen adil (fair test). Contoh: jenis wadah, suhu, dan massa bahan.</p>}
              {activeStep === 4 && <p>Hipotesis adalah prediksi teruji berbasis teori ilmiah: "Jika kadar garam optimal (3-5%), maka BAL tumbuh subur dan menurunkan pH di bawah 4.4."</p>}
              {activeStep === 5 && <p>Jalankan uji coba di Virtual Lab! Ujilah minimal 3 kondisi berbeda untuk melihat perbandingannya.</p>}
              {activeStep === 6 && <p>Catat data numerik secara teliti dan jujur apa adanya ke dalam tabel hasil pengamatan.</p>}
              {activeStep === 7 && <p>Gunakan grafik garis ganda di Analisis Data untuk membandingkan kemiringan kurva penurunan pH.</p>}
              {activeStep === 8 && <p>Susun argumen dengan struktur: Pernyataan (Klaim) + Bukti Data Angka + Penalaran Konsep Biokimia.</p>}
              {activeStep === 9 && <p>Tarik simpulan yang menjawab rumusan masalah awal dan sadari keterbatasan simulasi komputer.</p>}
            </div>

            {/* Quick action to Virtual Lab */}
            <div className="pt-2">
              <button
                onClick={() => setActiveMenu('virtuallab')}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform"
              >
                <FlaskConical className="w-4 h-4 text-[#F4C95D]" />
                <span>Buka Virtual Laboratory Sekarang</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Worksheet Form */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-[#123B67] flex items-center gap-2">
                <span>📝</span> Lembar Kerja Investigasi Ilmiah Siswa
              </h3>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow transition"
              >
                <Save className="w-3.5 h-3.5 text-[#F4C95D]" />
                <span>Simpan Lembar Kerja</span>
              </button>
            </div>

            {savedStatus && (
              <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Lembar kerja tersimpan di sesi belajar ini!
              </div>
            )}

            {/* Input according to step */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  1. Identifikasi Masalah & Latar Belakang Fenomena:
                </label>
                <textarea
                  value={investigation.problemIdentification}
                  onChange={(e) => handleFieldChange('problemIdentification', e.target.value)}
                  placeholder="Contoh: Sering terjadi kegagalan fermentasi tempoyak di mana toples menjadi berbau busuk bila garam terlalu sedikit..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  2. Rumusan Pertanyaan Penelitian:
                </label>
                <input
                  type="text"
                  value={investigation.researchQuestion}
                  onChange={(e) => handleFieldChange('researchQuestion', e.target.value)}
                  placeholder="Contoh: Bagaimana pengaruh konsentrasi garam (3%, 7%, 15%) terhadap nilai pH tempoyak?"
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-800 mb-1">
                    Variabel Bebas:
                  </label>
                  <input
                    type="text"
                    value={investigation.independentVar}
                    onChange={(e) => handleFieldChange('independentVar', e.target.value)}
                    placeholder="Contoh: Kadar Garam (%)"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-800 mb-1">
                    Variabel Terikat:
                  </label>
                  <input
                    type="text"
                    value={investigation.dependentVar}
                    onChange={(e) => handleFieldChange('dependentVar', e.target.value)}
                    placeholder="Contoh: Nilai pH & Mutu"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-800 mb-1">
                    Variabel Kontrol:
                  </label>
                  <input
                    type="text"
                    value={investigation.controlVars}
                    onChange={(e) => handleFieldChange('controlVars', e.target.value)}
                    placeholder="Contoh: Suhu 28°C, anaerob"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  4. Rumusan Hipotesis Awal:
                </label>
                <textarea
                  value={investigation.hypothesis}
                  onChange={(e) => handleFieldChange('hypothesis', e.target.value)}
                  placeholder="Contoh: Jika kadar garam berada pada rentang 3-5%, maka penurunan pH akan mencapai optimal (<4.4) tanpa pembusukan..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  8. Argumen Berbasis Bukti (Claim-Evidence-Reasoning):
                </label>
                <textarea
                  value={investigation.evidenceArg}
                  onChange={(e) => handleFieldChange('evidenceArg', e.target.value)}
                  placeholder="Klaim: Kadar garam 4% menghasilkan kualitas terbaik. Bukti: Nilai pH turun dari 6.2 ke 4.02 pada hari ke-7. Alasan: Garam menekan pembusuk sehingga BAL bekerja maksimal..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  9. Kesimpulan & Keterbatasan Model:
                </label>
                <textarea
                  value={investigation.conclusion}
                  onChange={(e) => handleFieldChange('conclusion', e.target.value)}
                  placeholder="Tuliskan kesimpulan akhir dan keterbatasan bahwa data simulasi merupakan pemodelan matematis..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                />
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={activeStep === 1}
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-4 py-2 rounded-lg text-xs font-bold border border-slate-300 disabled:opacity-40 hover:bg-slate-100 text-slate-700"
              >
                &larr; Tahap Sebelumnya
              </button>

              {activeStep < 9 ? (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-[#168AAD] hover:bg-cyan-600 text-white shadow"
                >
                  Tahap Selanjutnya &rarr;
                </button>
              ) : (
                <button
                  onClick={() => setActiveMenu('virtuallab')}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-xs shadow-md"
                >
                  <span>Mulai Praktikum Virtual Lab</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
