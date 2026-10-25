import React from 'react';
import { ActiveMenu, StudentProfile } from '../../types/index.ts';
import { 
  Sparkles, 
  BookOpen, 
  FlaskConical, 
  Award, 
  ArrowRight, 
  Brain, 
  Compass, 
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Atom
} from 'lucide-react';

interface BerandaViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
  progressPercent: number;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  setActiveMenu,
  progressPercent,
  student,
  setStudent,
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#123B67] via-[#103054] to-[#0a1e36] text-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-cyan-800/40 overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#168AAD]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#2E8B57]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-900/50 border border-cyan-400/30 text-cyan-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
              Lingkungan Belajar Digital Terintegrasi Berbasis Deep Learning
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Jelajahi Rahasia <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C95D] via-amber-200 to-white">
                Fermentasi Pangan Lokal
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Selamat datang di <strong className="text-white">Smart Bio-Learning Environment (SBLE)</strong>. 
              Temukan bagaimana nenek moyang masyarakat Lampung mengolah durian menjadi <strong className="text-amber-300">Tempoyak</strong> melalui sains bioteknologi fermentasi asam laktat. Selidiki variabel ilmiah (kadar garam, suhu, waktu, wadah), uji hipotesis di laboratorium virtual, dan kembangkan kemampuan berpikir kritis serta sikap ilmiahmu!
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveMenu('fenomena')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-sm shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all border border-cyan-300/40"
              >
                <span>Mulai Petualangan Sains</span>
                <ArrowRight className="w-4 h-4 text-[#F4C95D]" />
              </button>

              <button
                onClick={() => setActiveMenu('virtuallab')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20 hover:border-[#F4C95D]"
              >
                <FlaskConical className="w-4 h-4 text-[#F4C95D]" />
                <span>Masuk Virtual Laboratory</span>
              </button>

              <button
                onClick={() => setActiveMenu('petunjuk')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm transition-all border border-slate-700/50"
              >
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Panduan Belajar</span>
              </button>
            </div>

            {/* Progress indicator card */}
            <div className="pt-4 flex items-center gap-4 border-t border-white/10">
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-white">Status Belajar:</span> {progressPercent}% Selesai
              </div>
              <div className="flex-1 max-w-xs h-2 bg-slate-800 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-[#2E8B57] to-[#F4C95D] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <button
                onClick={() => setActiveMenu('dashboard')}
                className="text-xs text-[#F4C95D] hover:underline font-semibold"
              >
                Lihat Rapor Belajar &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: Authentic Logo & Scientific Emblems */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="w-56 sm:w-64 lg:w-72 aspect-square rounded-3xl bg-gradient-to-br from-white/15 to-white/5 p-4 border-2 border-white/20 shadow-2xl backdrop-blur-md flex items-center justify-center group-hover:border-[#F4C95D] transition-all">
                <img 
                  src="/assets/aistudio/Logo_SBLE__Belajar_dan_Berinovasi_5eeda7a9.png" 
                  alt="Logo Smart Bio-Learning Environment" 
                  className="w-full h-full object-contain filter drop-shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs font-semibold text-cyan-200 uppercase tracking-widest">
                  Media Tesis Magister Pendidikan Sains
                </p>
                <p className="text-[11px] text-slate-300 italic">
                  Belajar • Bereksplorasi • Berpikir Kritis • Beraksi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Focal Local Context Cards: Tempoyak & Bioteknologi Fermentasi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tempoyak Card */}
        <div 
          onClick={() => setActiveMenu('fenomena')}
          className="group cursor-pointer rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all border-2 border-amber-200/80 hover:border-amber-400 relative overflow-hidden"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider mb-2">
                Kearifan Fermentasi Buah Lampung
              </span>
              <h2 className="text-xl font-extrabold text-[#123B67] group-hover:text-[#168AAD] transition-colors">
                Tempoyak Durian Asli Lampung
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Olahan fermentasi daging buah durian masak berpadu garam dalam toples anaerob. Diubah oleh Bakteri Asam Laktat (*Lactobacillus plantarum*) menjadi pasta asam gurih pelengkap masakan khas Lampung seperti Gulai Taboh & Seruit.
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-3xl shadow-sm">
              🍈
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
            <span className="flex items-center gap-1">
              <FlaskConical className="w-4 h-4 text-[#2E8B57]" /> Substrat: Glukosa & Fruktosa Durian
            </span>
            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Eksplorasi Fenomena &rarr;
            </span>
          </div>
        </div>

        {/* Bioproses & Virtual Lab Card */}
        <div 
          onClick={() => setActiveMenu('virtuallab')}
          className="group cursor-pointer rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all border-2 border-cyan-200/80 hover:border-[#168AAD] relative overflow-hidden"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-100 text-cyan-800 uppercase tracking-wider mb-2">
                Laboratorium & Kinetika Bioproses
              </span>
              <h2 className="text-xl font-extrabold text-[#123B67] group-hover:text-[#168AAD] transition-colors">
                Simulasi Kinetika pH & BAL
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Uji langsung pengaruh kadar garam 0–20%, durasi 1–14 hari, dan suhu penyimpanan terhadap laju pembentukan asam laktat, populasi BAL, serta pencegahan bakteri pembusuk secara virtual tanpa risiko kegagalan bahan.
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0 text-3xl shadow-sm">
              🔬
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#168AAD]">
            <span className="flex items-center gap-1">
              <Atom className="w-4 h-4 text-[#2E8B57]" /> Model Dinamis: Penurunan pH &lt; 4.4
            </span>
            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Buka Virtual Lab &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* Deep Learning Pillars Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-[#103054] text-white p-6 shadow-lg border border-slate-700/60">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-base font-bold text-[#F4C95D] uppercase tracking-wider flex items-center justify-center gap-2">
            <Brain className="w-5 h-5 text-[#F4C95D]" /> Integrasi Tiga Pilar Deep Learning
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Membangun pemahaman mendalam, kemampuan berpikir kritis, dan sikap ilmiah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 transition-colors">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-1">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Mindful Learning
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mengamati fenomena secara teliti, menyusun hipotesis terarah, dan merefleksikan proses berpikir secara mandiri (metakognisi).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400 transition-colors">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Meaningful Learning
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Menghubungkan konsep biokimia fermentasi dengan kekayaan budaya kuliner Lampung yang nyata dalam kehidupan sehari-hari siswa.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 transition-colors">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-1">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> Joyful Learning
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Eksperimen interaktif tanpa rasa takut keliru di laboratorium virtual, tantangan ilmiah bertahap, dan apresiasi ketekunan belajar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
