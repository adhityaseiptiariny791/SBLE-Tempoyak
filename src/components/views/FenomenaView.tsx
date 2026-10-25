import React from 'react';
import { ActiveMenu } from '../../types/index.ts';
import { FENOMENA_LOKAL_DATA } from '../../data/learningContent.ts';
import { 
  Sparkles, 
  FlaskConical, 
  ArrowRight, 
  Info, 
  Layers, 
  Clock, 
  Flame,
  ShieldCheck,
  Award
} from 'lucide-react';

interface FenomenaViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
}

export const FenomenaView: React.FC<FenomenaViewProps> = ({ setActiveMenu }) => {
  const data = FENOMENA_LOKAL_DATA.tempoyak;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-[#168AAD] text-white p-6 shadow-lg border border-cyan-400/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-6 h-6 text-[#F4C95D]" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
                Eksplorasi Kearifan Lokal Lampung • Tulang Bawang Barat
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold">Fenomena Fermentasi Tempoyak Durian</h1>
              <p className="text-xs sm:text-sm text-cyan-100">
                Menyelidiki Rahasia Biologis dan Biokimia di Balik Olahan Warisan Leluhur Lampung
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold shrink-0">
            <span>🍈</span>
            <span>Konteks: Tempoyak Durian Asli Lampung</span>
          </div>
        </div>
      </div>

      {/* Main Content Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Overview & Process Diagram */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍈</span>
              <div>
                <h2 className="text-lg font-extrabold text-[#123B67]">{data.title}</h2>
                <p className="text-xs text-slate-500 font-medium">{data.subtitle}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {data.overview}
            </p>

            {/* Ingredients & Function */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#168AAD]" />
                Komponen Bahan & Fungsinya Secara Biologis
              </h3>
              <div className="space-y-2.5">
                {data.ingredients.map((ing, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#168AAD] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{ing.name}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{ing.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fermentation Dynamics */}
            <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200">
              <h3 className="text-xs font-bold text-[#123B67] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#168AAD]" />
                Dinamika Biokimia Selama Fermentasi Tempoyak
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {data.fermentationDynamics}
              </p>
            </div>
          </div>

          {/* Regional Recipe Diversity Notice */}
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Catatan Keanekaragaman Tradisi Resep Tempoyak Lampung
              </h4>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                {data.diversityNote} Di daerah Tulang Bawang Barat dan kabupaten lain di Lampung, tidak ada satu resep takaran kaku yang mutlak sama. Masyarakat menyesuaikan kadar garam (2-6%) dan lama pemeraman sesuai selera keluarga, tradisi tiyuh, dan jenis wadah tertutup yang digunakan.
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Microbes & Culinary Context */}
        <div className="lg:col-span-4 space-y-6">
          {/* Microbe Profile */}
          <div className="rounded-2xl bg-white p-5 shadow-md border-t-4 border-[#2E8B57] space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <FlaskConical className="w-5 h-5 text-[#2E8B57]" />
              Bakteri Asam Laktat (BAL) Alami Durian
            </div>
            <p className="text-[11px] text-slate-500">
              Mikroorganisme indigenous alami yang memandu fermentasi asam laktat:
            </p>
            <div className="space-y-2 pt-1">
              {data.microbes.map((microbe, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-emerald-900 italic">{microbe}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Culinary Uses in Lampung */}
          <div className="rounded-2xl bg-white p-5 shadow-md border-t-4 border-[#F4C95D] space-y-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <Flame className="w-5 h-5 text-amber-500" />
              Pemanfaatan Kuliner Khas Daerah Lampung
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {data.culinaryUses}
            </p>
            <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-[11px] text-amber-800 font-medium leading-relaxed">
              💡 <em>Kearifan fermentasi tempoyak menyelamatkan buah durian melimpah saat musim panen raya di kebun warga, mengubahnya menjadi persediaan protein dan cita rasa yang bernilai tinggi sepanjang tahun.</em>
            </div>
          </div>

          {/* Next Button */}
          <div className="pt-2">
            <button
              onClick={() => setActiveMenu('masalah')}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-xs shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Lanjut ke Orientasi Masalah</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
