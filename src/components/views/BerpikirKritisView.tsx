import React, { useState } from 'react';
import { ActiveMenu, CriticalThinkingScore } from '../../types/index.ts';
import { CRITICAL_THINKING_QUESTIONS, QuestionItem } from '../../data/learningContent.ts';
import { 
  Brain, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  RotateCcw,
  Sparkles,
  Info,
  BookOpen
} from 'lucide-react';

interface BerpikirKritisViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
  scores: CriticalThinkingScore;
  setScores: React.Dispatch<React.SetStateAction<CriticalThinkingScore>>;
}

export const BerpikirKritisView: React.FC<BerpikirKritisViewProps> = ({
  setActiveMenu,
  scores,
  setScores,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentQuestion: QuestionItem = CRITICAL_THINKING_QUESTIONS[currentIdx];
  const userRecord = scores[currentQuestion.id];

  const handleSelectOption = (optIndex: number) => {
    const isCorrect = optIndex === currentQuestion.correctIndex;
    setScores((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selectedOption: optIndex,
        isCorrect,
      },
    }));
  };

  const answeredCount = Object.keys(scores).length;
  const correctCount = Object.values(scores).filter((s) => s.isCorrect).length;
  const scorePercent = Math.round((correctCount / CRITICAL_THINKING_QUESTIONS.length) * 100);

  const handleResetChallenges = () => {
    if (window.confirm('Apakah kamu ingin mengulang kembali latihan berpikir kritis ini?')) {
      setScores({});
      setCurrentIdx(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-amber-600 text-white p-6 shadow-lg border border-amber-400/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Brain className="w-6 h-6 text-[#F4C95D]" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                Latihan Formatif Penalaran Ilmiah
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold">Tantangan Berpikir Kritis Bioteknologi</h1>
              <p className="text-xs sm:text-sm text-cyan-100">
                Latihan 6 Keterampilan Berpikir Kritis (Facione & Ennis) dengan Umpan Balik Mendalam
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-amber-200 font-semibold">Progres Latihan</div>
              <div className="text-sm font-extrabold text-white">
                {answeredCount}/{CRITICAL_THINKING_QUESTIONS.length} Soal
              </div>
            </div>
            {answeredCount > 0 && (
              <button
                onClick={handleResetChallenges}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition"
                title="Reset Latihan"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question Navigator */}
        <div className="lg:col-span-4 rounded-2xl bg-white p-5 shadow-md border border-slate-200 space-y-4">
          <h2 className="text-sm font-extrabold text-[#123B67]">
            Daftar 6 Indikator Berpikir Kritis
          </h2>
          <div className="space-y-2">
            {CRITICAL_THINKING_QUESTIONS.map((q, idx) => {
              const isCurrent = currentIdx === idx;
              const rec = scores[q.id];
              const isAnswered = rec !== undefined;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-amber-50 border-amber-400 shadow-sm ring-2 ring-amber-300/40'
                      : isAnswered
                      ? rec.isCorrect
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                        : 'bg-rose-50/70 border-rose-300 text-rose-900'
                      : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div 
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isCurrent 
                          ? 'bg-amber-500 text-slate-900' 
                          : isAnswered 
                          ? rec.isCorrect 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-rose-500 text-white' 
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{q.indicator}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[150px]">{q.context}</div>
                    </div>
                  </div>

                  {isAnswered && (
                    rec.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )
                  )}
                </button>
              );
            })}
          </div>

          {/* Score Summary Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Capaian Berpikir Kritis:</span>
              <span className="font-bold text-[#F4C95D]">{scorePercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${scorePercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              {correctCount} dari {answeredCount} soal yang telah dijawab bernalar tepat.
            </p>
          </div>
        </div>

        {/* Right Column: Question Content & Interactive Feedback */}
        <div className="lg:col-span-8 rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-5">
          {/* Header Indicator */}
          <div className="flex items-start justify-between border-b border-slate-100 pb-3 gap-3">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 mb-1">
                Indikator {currentIdx + 1}: {currentQuestion.indicator}
              </span>
              <h2 className="text-base font-extrabold text-[#123B67]">
                {currentQuestion.context}
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold shrink-0">
              Soal {currentIdx + 1} dari {CRITICAL_THINKING_QUESTIONS.length}
            </span>
          </div>

          {/* Scenario Text */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <strong className="text-[#123B67]">Konteks Kasus / Data Eksperimen:</strong>
            <p className="mt-1">{currentQuestion.scenario}</p>
          </div>

          {/* Question Text */}
          <div className="text-xs sm:text-sm font-bold text-slate-900">
            {currentQuestion.question}
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = userRecord?.selectedOption === optIdx;
              const isCorrectOpt = optIdx === currentQuestion.correctIndex;
              const hasAnswered = userRecord !== undefined;

              let style = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';
              if (hasAnswered) {
                if (isCorrectOpt) {
                  style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected) {
                  style = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                } else {
                  style = 'opacity-60 bg-slate-50 border-slate-200';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start justify-between gap-3 ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 text-slate-700">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {hasAnswered && isCorrectOpt && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {hasAnswered && isSelected && !isCorrectOpt && (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Multi-tier In-depth Scientific Feedback */}
          {userRecord && (
            <div className={`p-4 rounded-xl border space-y-3 transition-all ${
              userRecord.isCorrect 
                ? 'bg-emerald-50/80 border-emerald-300' 
                : 'bg-amber-50/80 border-amber-300'
            }`}>
              <div className="flex items-center gap-2 text-xs font-bold">
                {userRecord.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-900">Penalaranmu Sangat Tepat!</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-4 h-4 text-amber-700" />
                    <span className="text-amber-900">Perhatikan Penjelasan Ilmiah Berikut:</span>
                  </>
                )}
              </div>

              <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <p>
                  <strong>Mengapa jawaban ini benar:</strong> {currentQuestion.explanation.correctReason}
                </p>
                <p>
                  <strong>Konsep Biokimia:</strong> {currentQuestion.explanation.scientificConcept}
                </p>
                <p>
                  <strong>Miskonsepsi yang Sering Terjadi:</strong> {currentQuestion.explanation.commonMisconception}
                </p>
                <div className="text-[11px] text-[#168AAD] font-semibold pt-1">
                  🎯 Keterampilan Berpikir yang Diasah: {currentQuestion.explanation.criticalThinkingSkill}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(currentIdx - 1)}
              className="px-4 py-2 rounded-lg text-xs font-bold border border-slate-300 disabled:opacity-40 hover:bg-slate-100 text-slate-700"
            >
              &larr; Soal Sebelumnya
            </button>

            {currentIdx < CRITICAL_THINKING_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(currentIdx + 1)}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-[#168AAD] hover:bg-cyan-600 text-white shadow"
              >
                Soal Berikutnya &rarr;
              </button>
            ) : (
              <button
                onClick={() => setActiveMenu('sikap-ilmiah')}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-xs shadow-md"
              >
                <span>Lanjut ke Sikap Ilmiah</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
