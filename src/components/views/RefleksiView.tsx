import React, { useState } from 'react';
import { ActiveMenu, DeepLearningReflection } from '../../types/index.ts';
import { 
  Smile, 
  ArrowRight, 
  Save, 
  CheckCircle2, 
  Brain, 
  Sparkles, 
  Compass, 
  HeartHandshake
} from 'lucide-react';

interface RefleksiViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
  reflection: DeepLearningReflection;
  setReflection: React.Dispatch<React.SetStateAction<DeepLearningReflection>>;
}

export const RefleksiView: React.FC<RefleksiViewProps> = ({
  setActiveMenu,
  reflection,
  setReflection,
}) => {
  const [savedStatus, setSavedStatus] = useState(false);

  const handleTextChange = (field: keyof DeepLearningReflection, value: string) => {
    setReflection((prev) => ({
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
            <Smile className="w-6 h-6 text-[#F4C95D]" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
              Pendekatan Pembelajaran Mendalam (Deep Learning)
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold">Jurnal Refleksi Pembelajaran</h1>
            <p className="text-xs sm:text-sm text-cyan-100">
              Refleksi Tiga Pilar: Mindful, Meaningful, dan Joyful Learning dalam Bioteknologi Pangan Lokal
            </p>
          </div>
        </div>
      </div>

      {/* 3 Pillars Deep Learning Interactive Cards */}
      <div className="space-y-6">
        {/* Pilar 1: Mindful Learning */}
        <div className="rounded-2xl bg-white p-6 shadow-md border-l-4 border-cyan-500 space-y-3">
          <div className="flex items-center gap-2 text-cyan-800 font-extrabold text-sm uppercase tracking-wider">
            <Brain className="w-5 h-5 text-cyan-600" />
            1. Mindful Learning (Belajar Penuh Kesadaran & Metakognisi)
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menyadari proses berpikirmu sendiri: Bagaimana kamu mengamati perubahan fenomena, memeriksa apakah dugaanmu benar, dan mengevaluasi kesalahan penalaran selama praktikum?
          </p>
          <textarea
            value={reflection.mindfulNotes}
            onChange={(e) => handleTextChange('mindfulNotes', e.target.value)}
            placeholder="Tuliskan refleksimu (contoh: 'Awalnya saya mengira garam langsung mengasamkan durian, tetapi setelah melihat grafik pH dan simulasi BAL, saya menyadari asam laktat dihasilkan oleh metabolisme bakteri...')..."
            rows={3}
            className="w-full text-xs p-3.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none transition"
          />
        </div>

        {/* Pilar 2: Meaningful Learning */}
        <div className="rounded-2xl bg-white p-6 shadow-md border-l-4 border-[#2E8B57] space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm uppercase tracking-wider">
            <Compass className="w-5 h-5 text-[#2E8B57]" />
            2. Meaningful Learning (Belajar Bermakna & Relevansi Konteks Lokal)
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menghubungkan sains dengan kearifan lokal Lampung: Apa makna penting tradisi pembuatan tempoyak durian bagi ketahanan pangan keluarga dan pelestarian budaya kuliner daerahmu?
          </p>
          <textarea
            value={reflection.meaningfulNotes}
            onChange={(e) => handleTextChange('meaningfulNotes', e.target.value)}
            placeholder="Tuliskan refleksimu (contoh: 'Saya bangga bahwa masakan khas Lampung seperti Seruit dan Gulai Tempoyak ternyata memiliki landasan sains bioteknologi tingkat tinggi yang diwariskan nenek moyang...')..."
            rows={3}
            className="w-full text-xs p-3.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E8B57] focus:outline-none transition"
          />
        </div>

        {/* Pilar 3: Joyful Learning */}
        <div className="rounded-2xl bg-white p-6 shadow-md border-l-4 border-amber-400 space-y-3">
          <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-amber-500" />
            3. Joyful Learning (Belajar Menyenangkan, Eksploratif & Berdaya)
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Merasakan kepuasan bereksperimen: Pengalaman apa yang paling menarik saat menguji variabel di Virtual Laboratory dan memecahkan tantangan berpikir kritis?
          </p>
          <textarea
            value={reflection.joyfulNotes}
            onChange={(e) => handleTextChange('joyfulNotes', e.target.value)}
            placeholder="Tuliskan refleksimu (contoh: 'Saya sangat senang bisa melihat visualisasi toples dan kurva pH berubah seketika tanpa takut salah atau membuat durian asli membusuk di dapur...')..."
            rows={3}
            className="w-full text-xs p-3.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Save Button & Navigation */}
      <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow transition"
          >
            <Save className="w-4 h-4 text-[#F4C95D]" />
            <span>Simpan Jurnal Refleksi</span>
          </button>
          {savedStatus && (
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Jurnal tersimpan di portofolio!
            </span>
          )}
        </div>

        <button
          onClick={() => setActiveMenu('dashboard')}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-xs shadow-md hover:scale-[1.02] transition"
        >
          <span>Buka Dashboard Portofolio Belajar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
