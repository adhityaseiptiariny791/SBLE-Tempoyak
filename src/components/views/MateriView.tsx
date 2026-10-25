import React, { useState } from 'react';
import { ActiveMenu } from '../../types/index.ts';
import { MATERI_SECTIONS } from '../../data/learningContent.ts';
import { 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Atom,
  FlaskConical,
  Flame,
  Layers,
  Thermometer,
  ShieldCheck
} from 'lucide-react';

interface MateriViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
}

export const MateriView: React.FC<MateriViewProps> = ({ setActiveMenu }) => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentSection = MATERI_SECTIONS[selectedSection];

  const handleQuizSelect = (idx: number) => {
    setQuizAnswer(idx);
    setQuizSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-[#168AAD] text-white p-6 shadow-lg border border-cyan-400/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <BookOpen className="w-6 h-6 text-[#F4C95D]" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
              Modul Pembelajaran Interaktif
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold">Materi Bioteknologi & Fermentasi Asam Laktat</h1>
            <p className="text-xs sm:text-sm text-cyan-100">
              Konsep Ilmiah, Reaksi Biokimia, dan Penerapannya dalam Pangan Tradisional Lampung
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Navigation Tabs on left, Content on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Subtopic Navigation Tabs */}
        <div className="lg:col-span-4 space-y-2">
          {MATERI_SECTIONS.map((sec, idx) => {
            const isActive = selectedSection === idx;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setSelectedSection(idx);
                  setQuizSubmitted(false);
                  setQuizAnswer(null);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                  isActive
                    ? 'bg-white border-[#168AAD] shadow-md ring-2 ring-[#168AAD]/20'
                    : 'bg-white/80 hover:bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div 
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isActive ? 'bg-[#168AAD] text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {idx + 1}
                </div>
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#168AAD] mb-0.5">
                    {sec.badge}
                  </span>
                  <div className={`text-xs font-bold leading-snug ${isActive ? 'text-[#123B67]' : 'text-slate-800'}`}>
                    {sec.title}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Quick Concept Box: Biochemical Formula */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900 to-[#123B67] text-white border border-indigo-700/50 mt-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#F4C95D] font-bold text-xs mb-2">
              <Atom className="w-4 h-4" /> Persamaan Reaksi Fermentasi
            </div>
            <div className="bg-black/30 p-2.5 rounded-lg font-mono text-[11px] text-cyan-200 text-center border border-white/10 leading-relaxed">
              C₆H₁₂O₆ (Glukosa) <br />
              &darr; (Enzim Bakteri BAL) <br />
              <span className="text-[#F4C95D] font-bold">2 C₃H₆O₃ (Asam Laktat)</span> + 2 ATP
            </div>
            <p className="text-[10px] text-slate-300 mt-2 leading-tight">
              Asam laktat mendonorkan ion H⁺ yang menurunkan pH, menciptakan rasa asam segar, dan mensterilkan medium dari bakteri pembusuk.
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Reader Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#168AAD]">
                  {currentSection.badge}
                </span>
                <h2 className="text-lg font-extrabold text-[#123B67]">
                  {currentSection.title}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-[#168AAD] border border-cyan-200">
                Topik {selectedSection + 1} dari {MATERI_SECTIONS.length}
              </span>
            </div>

            {/* Markdown-like rendered content */}
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3 font-normal">
              {currentSection.content}
            </div>

            {/* If section 0: Show Conventional vs Modern Table */}
            {selectedSection === 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Tabel Perbandingan Bioteknologi Konvensional vs Modern
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-[#123B67] text-white">
                      <tr>
                        <th className="p-2.5">Parameter Pembeda</th>
                        <th className="p-2.5">Bioteknologi Konvensional</th>
                        <th className="p-2.5">Bioteknologi Modern</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-slate-50">
                      <tr>
                        <td className="p-2.5 font-bold text-slate-800">Prinsip Kerja</td>
                        <td className="p-2.5">Fermentasi alami oleh mikroorganisme utuh</td>
                        <td className="p-2.5">Rekayasa genetika & manipulasi DNA/gen</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-800">Peralatan</td>
                        <td className="p-2.5">Sederhana (toples, guci, kain, wadah tertutup)</td>
                        <td className="p-2.5">Canggih (bioreaktor steril, PCR, mikropipet)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-800">Contoh Produk</td>
                        <td className="p-2.5 text-amber-800 font-semibold">Tempoyak durian, Tempe kedelai, Tapai singkong, Yoghurt</td>
                        <td className="p-2.5 text-cyan-800 font-semibold">Insulin rekombinan, Tanaman transgenik, Vaksin mRNA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Interactive Concept Check / Mini Quiz */}
            <div className="mt-6 pt-5 border-t border-slate-200/80">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#123B67] uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-[#168AAD]" />
                  Uji Cepat Pemahaman Konsep (Refleksi Kognitif)
                </div>

                <p className="text-xs font-semibold text-slate-800">
                  {selectedSection === 0 && 'Manakah pernyataan yang tepat mengenai produk bioteknologi konvensional tempoyak durian?'}
                  {selectedSection === 1 && 'Mengapa Bakteri Asam Laktat (BAL) mampu menekan pertumbuhan bakteri patogen pembusuk?'}
                  {selectedSection === 2 && 'Apa dampak jika kadar garam pada fermentasi tempoyak diberikan di atas 15%?'}
                  {selectedSection === 3 && 'Mengapa nilai pH rendah bukan merupakan satu-satunya jaminan keamanan pangan fermentasi?'}
                </p>

                <div className="space-y-1.5">
                  {[
                    selectedSection === 0
                      ? 'Menggunakan mikroorganisme alami secara utuh melalui fermentasi biokimia sederhana tanpa mengubah DNA.'
                      : selectedSection === 1
                      ? 'Karena BAL memproduksi asam laktat yang menurunkan pH secara drastis ke level asam (<4.5) yang mematikan patogen.'
                      : selectedSection === 2
                      ? 'Tekanan osmotik yang sangat tinggi menghambat pembelahan dan metabolisme bakteri asam laktat.'
                      : 'Karena kita juga harus memeriksa adanya bau busuk amonia, lendir rusak, dan kapang beracun di permukaan.',
                    'Dihasilkan melalui penyuntikan zat kimia sintetis pengawet buatan pabrik.',
                    'Karena produk fermentasi tradisional tidak melibatkan bakteri hidup apapun.',
                    'Hanya faktor keberuntungan nasib tanpa ada penjelasan ilmiah.'
                  ].map((opt, idx) => {
                    const isSelected = quizAnswer === idx;
                    const isCorrect = idx === 0;

                    let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizSelect(idx)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs border transition-colors flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                        )}
                        {quizSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="text-xs p-3 rounded-lg bg-emerald-100/70 text-emerald-900 border border-emerald-300 font-medium leading-relaxed">
                    🎉 <strong>Penjelasan Ilmiah:</strong> Pilihan pertama adalah konsep sains yang tepat! Reaksi biokimia asam laktat menciptakan lingkungan selektif yang melindungi pangan dari pembusukan.
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Next/Prev buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={selectedSection === 0}
                onClick={() => setSelectedSection(selectedSection - 1)}
                className="px-4 py-2 rounded-lg text-xs font-bold border border-slate-300 disabled:opacity-40 hover:bg-slate-100 text-slate-700 transition"
              >
                &larr; Topik Sebelumnya
              </button>

              {selectedSection < MATERI_SECTIONS.length - 1 ? (
                <button
                  onClick={() => setSelectedSection(selectedSection + 1)}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-[#168AAD] hover:bg-cyan-600 text-white shadow transition"
                >
                  Topik Selanjutnya &rarr;
                </button>
              ) : (
                <button
                  onClick={() => setActiveMenu('investigasi')}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-xs shadow-md transition"
                >
                  <span>Lanjut ke Investigasi Ilmiah</span>
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
