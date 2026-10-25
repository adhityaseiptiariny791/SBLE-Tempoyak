import React from 'react';
import { ActiveMenu } from '../../types/index.ts';
import { 
  HelpCircle, 
  FlaskConical, 
  Brain, 
  HeartHandshake, 
  BarChart3, 
  Sparkles, 
  ArrowRight,
  Sliders,
  Play,
  RotateCcw,
  Save,
  Maximize2
} from 'lucide-react';

interface PetunjukViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
}

export const PetunjukView: React.FC<PetunjukViewProps> = ({ setActiveMenu }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] to-[#168AAD] text-white p-6 shadow-lg border border-cyan-400/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <HelpCircle className="w-6 h-6 text-[#F4C95D]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold">Petunjuk Penggunaan Lingkungan SBLE</h1>
            <p className="text-xs sm:text-sm text-cyan-100">
              Panduan lengkap mengeksplorasi modul, melakukan investigasi sains, dan mengoperasikan Virtual Lab.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Learning Stages Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white p-5 border-t-4 border-[#168AAD] shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xs font-bold text-[#168AAD] uppercase tracking-wider mb-1">Tahap 1</div>
          <h2 className="text-base font-bold text-[#123B67] mb-2">Eksplorasi & Orientasi</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mulai dari membaca <strong>Fenomena Lokal</strong> (tempoyak durian khas Lampung), menjawab pertanyaan pemantik di <strong>Orientasi Masalah</strong>, lalu mempelajari konsep di <strong>Materi Bioteknologi</strong>.
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 border-t-4 border-[#2E8B57] shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xs font-bold text-[#2E8B57] uppercase tracking-wider mb-1">Tahap 2</div>
          <h2 className="text-base font-bold text-[#123B67] mb-2">Investigasi & Virtual Lab</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pahami langkah-langkah di <strong>Investigasi Ilmiah</strong>, lalu buka <strong>Virtual Laboratory</strong> untuk menguji pengaruh kadar garam, suhu, dan waktu terhadap penurunan pH.
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 border-t-4 border-[#F4C95D] shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Tahap 3</div>
          <h2 className="text-base font-bold text-[#123B67] mb-2">Analisis & Berpikir Kritis</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Periksa tabel dan grafik perbandingan di <strong>Analisis Data</strong>. Selanjutnya, asah logika di <strong>Tantangan Berpikir Kritis</strong> dengan umpan balik ilmiah mendalam.
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 border-t-4 border-indigo-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Tahap 4</div>
          <h2 className="text-base font-bold text-[#123B67] mb-2">Sikap, Evaluasi & Rapor</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nilai kejujuran dan ketelitianmu di <strong>Sikap Ilmiah</strong>, kerjakan tes di <strong>Evaluasi</strong>, isi jurnal <strong>Refleksi</strong>, dan unduh laporan di <strong>Dashboard</strong>.
          </p>
        </div>
      </div>

      {/* Virtual Laboratory Detailed Tutorial */}
      <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
        <h2 className="text-lg font-bold text-[#123B67] flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-[#168AAD]" />
          Panduan Praktikum di Virtual Laboratory
        </h2>
        <p className="text-xs text-slate-600">
          Laboratorium virtual SBLE dirancang untuk melatih kemampuan mengendalikan variabel secara aman dan akurat:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 text-[#168AAD] flex items-center justify-center font-bold mb-2">
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">1. Atur Variabel</h3>
            <p className="text-xs text-slate-600 mt-1">
              Atur massa durian (gram), kadar garam (%), waktu fermentasi (hari), suhu penyimpanan (°C), dan kondisi wadah (anaerob/aerob).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#2E8B57] flex items-center justify-center font-bold mb-2">
              <Play className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">2. Mulai Eksperimen</h3>
            <p className="text-xs text-slate-600 mt-1">
              Klik tombol hijau "Mulai Eksperimen". Amati animasi gelembung gas, perubahan warna toples, indikator pH digital, dan kurva grafik pH.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-2">
              <Save className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">3. Catat Data Uji</h3>
            <p className="text-xs text-slate-600 mt-1">
              Setelah simulasi selesai, klik "Catat Data ke Jurnal". Data akan otomatis tersimpan ke tabel perbandingan pada menu <strong>Analisis Data</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-2">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">4. Variasikan Perlakuan</h3>
            <p className="text-xs text-slate-600 mt-1">
              Uji kadar garam yang berbeda (misal 3% vs 8% vs 15%) untuk membuktikan hipotesismu mengenai rentang toleransi bakteri asam laktat.
            </p>
          </div>
        </div>
      </div>

      {/* Screen Aspect Ratio and Device Controls */}
      <div className="rounded-2xl bg-cyan-950/20 border border-cyan-800/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#168AAD]/20 flex items-center justify-center text-[#168AAD]">
            <Maximize2 className="w-5 h-5 text-[#F4C95D]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Standar Resolusi Layar 16:9</h2>
            <p className="text-xs text-slate-300">
              Aplikasi ini dioptimalkan dengan rasio 16:9 standar desktop (1920×1080) dan responsif pada tablet serta smartphone. Gunakan tombol rasio di header atas jika diperlukan.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveMenu('capaian')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#168AAD] hover:bg-cyan-600 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap"
        >
          <span>Lanjut ke Capaian & Tujuan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
