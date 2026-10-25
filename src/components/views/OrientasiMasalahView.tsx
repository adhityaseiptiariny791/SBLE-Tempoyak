import React from 'react';
import { ActiveMenu, ProblemOrientationAnswer } from '../../types/index.ts';
import { 
  HelpCircle, 
  ArrowRight, 
  Brain, 
  Lightbulb, 
  Sparkles, 
  Save, 
  CheckCircle2,
  FileQuestion,
  FlaskConical
} from 'lucide-react';

interface OrientasiMasalahViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
  answers: ProblemOrientationAnswer;
  setAnswers: React.Dispatch<React.SetStateAction<ProblemOrientationAnswer>>;
}

export const OrientasiMasalahView: React.FC<OrientasiMasalahViewProps> = ({
  setActiveMenu,
  answers,
  setAnswers,
}) => {
  const [savedNotification, setSavedNotification] = React.useState(false);

  const handleInputChange = (field: keyof ProblemOrientationAnswer, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const isComplete = answers.q1.trim() && answers.q2.trim() && answers.q3.trim() && answers.q4.trim();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-[#168AAD] text-white p-6 shadow-lg border border-cyan-400/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <Lightbulb className="w-6 h-6 text-[#F4C95D]" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
              Problem-Based Learning (PBL)
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold">Orientasi Masalah Sains</h1>
            <p className="text-xs sm:text-sm text-cyan-100">
              Membangun Rasa Ingin Tahu & Merumuskan Gagasan Awal Sebelum Penyelidikan
            </p>
          </div>
        </div>
      </div>

      {/* Authentic Problem Scenario Card */}
      <div className="rounded-2xl bg-white p-6 shadow-md border-l-4 border-amber-400 space-y-4">
        <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" /> Skenario Masalah Nyata di Masyarakat
        </div>
        
        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-slate-800 text-sm leading-relaxed italic">
          “Masyarakat di tiyuh-tiyuh Lampung, termasuk di Tulang Bawang Barat, terbiasa mengolah kelebihan panen buah durian menjadi tempoyak. Namun, dalam kenyataannya, kondisi fermentasi sering kali menghasilkan karakteristik yang berbeda-beda: ada toples yang menghasilkan pasta tempoyak kuning keemasan beraroma asam segar pulen yang lezat, ada yang terlalu asin dan kaku, bahkan ada toples yang rusak berlendir serta berbau busuk amonia. Bagaimana kita dapat menyelidiki pengaruh kondisi fermentasi durian menggunakan bukti ilmiah?”
        </div>

        <div className="text-xs text-slate-600">
          💡 <em>Sebagai calon ilmuwan muda, tugasmu adalah menggali apa yang sebenarnya terjadi di balik perubahan tersebut, lalu membuktikannya melalui penyelidikan di laboratorium virtual.</em>
        </div>
      </div>

      {/* 4 Scaffolded Inquisitive Questions */}
      <div className="rounded-2xl bg-white p-6 shadow-md space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-extrabold text-[#123B67] flex items-center gap-2">
            <FileQuestion className="w-5 h-5 text-[#168AAD]" />
            Pertanyaan Pemantik & Gagasan Awal Siswa
          </h2>
          {isComplete ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" /> 4/4 Jawaban Terisi
            </span>
          ) : (
            <span className="text-xs text-slate-500 font-medium">
              Tuliskan pemikiran awalmu sendiri
            </span>
          )}
        </div>

        {/* Question 1 */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            1. Mengapa daging buah durian mengalami perubahan rasa manis menjadi asam segar, perubahan tekstur, dan aroma khas selama fermentasi tempoyak?
          </label>
          <textarea
            value={answers.q1}
            onChange={(e) => handleInputChange('q1', e.target.value)}
            placeholder="Tuliskan dugaanmu di sini (misal: apa peran bakteri atau enzim di dalam bahan)..."
            rows={2}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#168AAD] focus:border-transparent transition"
          />
        </div>

        {/* Question 2 */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            2. Bagaimana kadar garam dan lama waktu fermentasi dapat memengaruhi perubahan produk tersebut?
          </label>
          <textarea
            value={answers.q2}
            onChange={(e) => handleInputChange('q2', e.target.value)}
            placeholder="Tuliskan dugaanmu di sini (misal: apa yang terjadi jika garam terlalu sedikit atau terlalu banyak)..."
            rows={2}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#168AAD] focus:border-transparent transition"
          />
        </div>

        {/* Question 3 */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            3. Bagaimana data numerik eksperimen (seperti grafik penurunan pH) dapat digunakan untuk mendukung kesimpulanmu?
          </label>
          <textarea
            value={answers.q3}
            onChange={(e) => handleInputChange('q3', e.target.value)}
            placeholder="Tuliskan pandanganmu di sini tentang pentingnya bukti angka terukur..."
            rows={2}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#168AAD] focus:border-transparent transition"
          />
        </div>

        {/* Question 4 */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            4. Mengapa seorang peneliti sains perlu melakukan pengamatan secara teliti dan objektif tanpa mengubah-ubah data?
          </label>
          <textarea
            value={answers.q4}
            onChange={(e) => handleInputChange('q4', e.target.value)}
            placeholder="Tuliskan refleksimu tentang sikap kejujuran dan keterbukaan terhadap data..."
            rows={2}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#168AAD] focus:border-transparent transition"
          />
        </div>

        {/* Save button and next action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow transition-colors"
            >
              <Save className="w-4 h-4 text-[#F4C95D]" />
              <span>Simpan Jawaban Awal</span>
            </button>
            {savedNotification && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="w-4 h-4" /> Tersimpan di sesi belajar!
              </span>
            )}
          </div>

          <button
            onClick={() => setActiveMenu('materi')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-xs shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Lanjut ke Materi Bioteknologi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
