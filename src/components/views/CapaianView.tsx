import React from 'react';
import { ActiveMenu } from '../../types/index.ts';
import { CAPAIAN_PEMBELAJARAN } from '../../data/learningContent.ts';
import { 
  Target, 
  CheckCircle2, 
  Brain, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight,
  BookCheck,
  Compass
} from 'lucide-react';

interface CapaianViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
}

export const CapaianView: React.FC<CapaianViewProps> = ({ setActiveMenu }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-[#168AAD] text-white p-6 shadow-lg border border-cyan-400/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <Target className="w-6 h-6 text-[#F4C95D]" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
              {CAPAIAN_PEMBELAJARAN.fase}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold">Capaian & Tujuan Pembelajaran (CP & TP)</h1>
            <p className="text-xs sm:text-sm text-cyan-100">
              Elemen: {CAPAIAN_PEMBELAJARAN.elemen}
            </p>
          </div>
        </div>
      </div>

      {/* Capaian Umum Card */}
      <div className="rounded-2xl bg-white p-6 shadow-md border-l-4 border-[#168AAD]">
        <h2 className="text-base font-extrabold text-[#123B67] mb-2 flex items-center gap-2">
          <BookCheck className="w-5 h-5 text-[#168AAD]" />
          Capaian Pembelajaran (CP) IPA Fase D
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          "{CAPAIAN_PEMBELAJARAN.capaianUmum}"
        </p>
      </div>

      {/* Tujuan Pembelajaran List */}
      <div className="rounded-2xl bg-white p-6 shadow-md space-y-4">
        <h2 className="text-base font-extrabold text-[#123B67] flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#2E8B57]" />
          Tujuan Pembelajaran Khusus (TP)
        </h2>
        <div className="space-y-3">
          {CAPAIAN_PEMBELAJARAN.tujuanPembelajaran.map((tp, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-400 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-[#2E8B57] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {tp}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2 Targets: Berpikir Kritis & Sikap Ilmiah */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Berpikir Kritis */}
        <div className="rounded-2xl bg-white p-6 shadow-md border-t-4 border-[#F4C95D] space-y-3">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
            <Brain className="w-5 h-5 text-[#F4C95D]" />
            6 Indikator Berpikir Kritis (Facione & Ennis)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {[
              { num: '1', title: 'Interpretasi Data', desc: 'Membaca data grafik pH & tabel pengamatan' },
              { num: '2', title: 'Analisis Hubungan', desc: 'Menghubungkan variabel garam & laju fermentasi' },
              { num: '3', title: 'Evaluasi Bukti', desc: 'Menguji kebenaran klaim toples terbuka vs tertutup' },
              { num: '4', title: 'Inferensi Logis', desc: 'Menarik simpulan kondisi pembusukan vs keberhasilan' },
              { num: '5', title: 'Eksplanasi Ilmiah', desc: 'Menerangkan mekanisme biokimia asam laktat' },
              { num: '6', title: 'Regulasi Diri', desc: 'Menyadari batasan model & mengevaluasi pemikiran' }
            ].map((item) => (
              <div key={item.num} className="p-3 rounded-lg bg-amber-50/60 border border-amber-200">
                <div className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-900 text-[10px] flex items-center justify-center font-black">
                    {item.num}
                  </span>
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-600 mt-1 leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sikap Ilmiah */}
        <div className="rounded-2xl bg-white p-6 shadow-md border-t-4 border-[#2E8B57] space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <HeartHandshake className="w-5 h-5 text-[#2E8B57]" />
            6 Dimensi Sikap Ilmiah yang Dikembangkan
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {[
              { title: 'Rasa Ingin Tahu', desc: 'Antusias mencari tahu penyebab keasaman fermentasi' },
              { title: 'Ketelitian', desc: 'Cermat mencatat parameter angka dan waktu perlakuan' },
              { title: 'Objektivitas', desc: 'Menilai hasil berbasis fakta data terukur tanpa bias' },
              { title: 'Keterbukaan', desc: 'Menerima fakta baru bila data berbeda dengan hipotesis' },
              { title: 'Kejujuran Data', desc: 'Melaporkan hasil apa adanya tanpa manipulasi angka' },
              { title: 'Tanggung Jawab', desc: 'Menuntaskan seluruh rangkaian investigasi dengan tekun' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <div className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-600 mt-1 leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => setActiveMenu('fenomena')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] hover:from-cyan-600 hover:to-emerald-600 text-white font-bold text-xs shadow-md transition-all"
        >
          <span>Lanjut ke Fenomena Lokal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
