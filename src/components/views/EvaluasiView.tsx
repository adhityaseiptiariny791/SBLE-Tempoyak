import React, { useState } from 'react';
import { ActiveMenu, EvaluationScore } from '../../types/index.ts';
import { EVALUATION_QUESTIONS, QuestionItem } from '../../data/learningContent.ts';
import { 
  CheckSquare, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  HelpCircle,
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';

interface EvaluasiViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
  scores: EvaluationScore;
  setScores: React.Dispatch<React.SetStateAction<EvaluationScore>>;
}

export const EvaluasiView: React.FC<EvaluasiViewProps> = ({
  setActiveMenu,
  scores,
  setScores,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hasSubmittedTest, setHasSubmittedTest] = useState(false);
  const [tempAnswers, setTempAnswers] = useState<{ [qId: string]: number }>({});

  const totalQuestions = EVALUATION_QUESTIONS.length;
  const currentQ: QuestionItem = EVALUATION_QUESTIONS[currentIdx];

  const handleSelectTempOption = (optIdx: number) => {
    if (hasSubmittedTest) return; // Locked once submitted
    setTempAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIdx,
    }));
  };

  const answeredCount = Object.keys(tempAnswers).length;

  const handleSubmitTest = () => {
    if (answeredCount < totalQuestions) {
      if (!window.confirm(`Kamu baru menjawab ${answeredCount} dari ${totalQuestions} soal. Tetap ingin mengumpulkan jawaban?`)) {
        return;
      }
    }

    const finalScores: EvaluationScore = {};
    EVALUATION_QUESTIONS.forEach((q) => {
      const selected = tempAnswers[q.id];
      const isCorrect = selected !== undefined && selected === q.correctIndex;
      if (selected !== undefined) {
        finalScores[q.id] = {
          selectedOption: selected,
          isCorrect,
        };
      }
    });

    setScores(finalScores);
    setHasSubmittedTest(true);
  };

  const handleRetakeTest = () => {
    if (window.confirm('Apakah kamu ingin mengulang kembali tes evaluasi ini?')) {
      setTempAnswers({});
      setScores({});
      setHasSubmittedTest(false);
      setCurrentIdx(0);
    }
  };

  const correctAnswersCount = Object.values(scores).filter((s) => s.isCorrect).length;
  const finalPercentage = Math.round((correctAnswersCount / totalQuestions) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-[#168AAD] text-white p-6 shadow-lg border border-cyan-400/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <CheckSquare className="w-6 h-6 text-[#F4C95D]" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
                Asesmen Pemahaman Konsep IPA
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold">Evaluasi Hasil Belajar Bioteknologi</h1>
              <p className="text-xs sm:text-sm text-cyan-100">
                Uji Pemahaman Komprehensif Berbasis Kasus Fermentasi Tempoyak Durian Khas Lampung
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-300 font-semibold">Status Tes</div>
              <div className="text-sm font-extrabold text-[#F4C95D]">
                {hasSubmittedTest ? `Skor: ${finalPercentage}%` : `${answeredCount}/${totalQuestions} Terjawab`}
              </div>
            </div>
            {hasSubmittedTest && (
              <button
                onClick={handleRetakeTest}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition"
                title="Ulangi Tes"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Test Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question Grid Numbers */}
        <div className="lg:col-span-4 rounded-2xl bg-white p-5 shadow-md border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-[#123B67]">
              Navigasi Butir Soal (10 Soal)
            </h2>
            <span className="text-[10px] text-slate-400 font-semibold">
              {hasSubmittedTest ? 'Koreksi Aktif' : 'Sedang Mengerjakan'}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {EVALUATION_QUESTIONS.map((q, idx) => {
              const isCurrent = currentIdx === idx;
              const ans = tempAnswers[q.id];
              const scoreRec = scores[q.id];

              let bgStyle = 'bg-slate-100 border-slate-200 text-slate-700';
              if (hasSubmittedTest) {
                if (scoreRec?.isCorrect) {
                  bgStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                } else {
                  bgStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                }
              } else if (ans !== undefined) {
                bgStyle = 'bg-[#168AAD] text-white border-cyan-500 font-bold';
              }

              if (isCurrent) {
                bgStyle += ' ring-2 ring-[#F4C95D] shadow-md scale-105';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-11 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center ${bgStyle}`}
                >
                  <span>{idx + 1}</span>
                  {hasSubmittedTest && (
                    <span className="text-[9px]">
                      {scoreRec?.isCorrect ? '✓' : '✗'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Test Submit / Retake Action Button */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            {!hasSubmittedTest ? (
              <button
                onClick={handleSubmitTest}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#2E8B57] to-[#168AAD] text-white font-extrabold text-xs shadow-md hover:scale-[1.02] transition"
              >
                Selesaikan & Kumpulkan Jawaban ({answeredCount}/{totalQuestions})
              </button>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2 text-center">
                <div className="text-xs text-slate-300">Hasil Evaluasi Belajar:</div>
                <div className="text-3xl font-black text-[#F4C95D]">
                  {finalPercentage} / 100
                </div>
                <p className="text-[11px] text-slate-300">
                  Benar {correctAnswersCount} dari {totalQuestions} soal studi kasus.
                </p>
                <div className="text-[10px] text-cyan-300 pt-1 border-t border-white/10">
                  *Gunakan umpan balik pada tiap butir soal untuk memperdalam pemahaman konsep sainsmu.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Question Content */}
        <div className="lg:col-span-8 rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-5">
          {/* Question Indicator Header */}
          <div className="flex items-start justify-between border-b border-slate-100 pb-3 gap-3">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-[#168AAD] mb-1">
                Indikator: {currentQ.indicator}
              </span>
              <h2 className="text-base font-extrabold text-[#123B67]">
                {currentQ.context}
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold shrink-0">
              Butir {currentIdx + 1} dari {totalQuestions}
            </span>
          </div>

          {/* Scenario Case */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <strong className="text-[#123B67]">Konteks Sains:</strong>
            <p className="mt-1">{currentQ.scenario}</p>
          </div>

          {/* Question Text */}
          <div className="text-xs sm:text-sm font-bold text-slate-900">
            {currentQ.question}
          </div>

          {/* Answer Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = tempAnswers[currentQ.id] === optIdx;
              const isCorrectOpt = optIdx === currentQ.correctIndex;

              let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
              if (hasSubmittedTest) {
                if (isCorrectOpt) {
                  style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected) {
                  style = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                } else {
                  style = 'opacity-60 bg-slate-50 border-slate-200';
                }
              } else if (isSelected) {
                style = 'bg-cyan-50 border-[#168AAD] text-[#123B67] font-semibold ring-2 ring-[#168AAD]/30';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={hasSubmittedTest}
                  onClick={() => handleSelectTempOption(optIdx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start justify-between gap-3 ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 text-slate-700">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {hasSubmittedTest && isCorrectOpt && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {hasSubmittedTest && isSelected && !isCorrectOpt && (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Post-submission In-depth Explanation Feedback */}
          {hasSubmittedTest && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-[#123B67]">
                <HelpCircle className="w-4 h-4 text-[#168AAD]" />
                Penjelasan Ilmiah & Evaluasi Kognitif:
              </div>
              <p className="text-slate-700">
                <strong>Alasan Jawaban:</strong> {currentQ.explanation.correctReason}
              </p>
              <p className="text-slate-700">
                <strong>Konsep Sains Terkait:</strong> {currentQ.explanation.scientificConcept}
              </p>
              <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mt-2">
                ⚠️ <strong>Catatan Konstruktif:</strong> Skor evaluasi ini adalah tolok ukur penguasaan materi saat ini. Keberhasilan berpikir kritis berkembang secara kontinu melalui latihan investigasi berkala.
              </div>
            </div>
          )}

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(currentIdx - 1)}
              className="px-4 py-2 rounded-lg text-xs font-bold border border-slate-300 disabled:opacity-40 hover:bg-slate-100 text-slate-700"
            >
              &larr; Butir Sebelumnya
            </button>

            {currentIdx < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentIdx(currentIdx + 1)}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-[#168AAD] hover:bg-cyan-600 text-white shadow"
              >
                Butir Selanjutnya &rarr;
              </button>
            ) : (
              <button
                onClick={() => setActiveMenu('refleksi')}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-xs shadow-md"
              >
                <span>Lanjut ke Refleksi Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
