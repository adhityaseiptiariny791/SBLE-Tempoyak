import React, { useState } from 'react';
import { ActiveMenu, LabTrial } from '../../types/index.ts';
import { 
  BarChart3, 
  Trash2, 
  Plus, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  Layers, 
  Info,
  Save,
  FlaskConical
} from 'lucide-react';

interface AnalisisDataViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
  trials: LabTrial[];
  setTrials: React.Dispatch<React.SetStateAction<LabTrial[]>>;
}

export const AnalisisDataView: React.FC<AnalisisDataViewProps> = ({
  setActiveMenu,
  trials,
  setTrials,
}) => {
  const [selectedTrialsForChart, setSelectedTrialsForChart] = useState<string[]>([]);
  const [analysisAnswers, setAnalysisAnswers] = useState({
    pattern: '',
    difference: '',
    evidence: '',
    hypothesisMatch: '',
    limitations: '',
  });
  const [savedNotification, setSavedNotification] = useState(false);

  // Auto select top 3 trials for comparison if none selected
  React.useEffect(() => {
    if (trials.length > 0 && selectedTrialsForChart.length === 0) {
      setSelectedTrialsForChart(trials.slice(0, 3).map((t) => t.id));
    }
  }, [trials]);

  const toggleSelectTrial = (id: string) => {
    if (selectedTrialsForChart.includes(id)) {
      setSelectedTrialsForChart(selectedTrialsForChart.filter((item) => item !== id));
    } else {
      setSelectedTrialsForChart([...selectedTrialsForChart, id]);
    }
  };

  const deleteTrial = (id: string) => {
    setTrials(trials.filter((t) => t.id !== id));
    setSelectedTrialsForChart(selectedTrialsForChart.filter((item) => item !== id));
  };

  const handleSaveAnalysis = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  // Pre-seed standard benchmark data if empty
  const handleAddPresetTrials = () => {
    const preset1: LabTrial = {
      id: `preset-1-${Date.now()}`,
      timestamp: Date.now() - 300000,
      productType: 'tempoyak',
      sampleName: 'Tempoyak Kontrol Ideal (Garam 4%, 28°C, Anaerob)',
      massGrams: 250,
      saltPercentage: 4,
      fermentationDays: 7,
      storageTempCelsius: 28,
      containerCondition: 'anaerob',
      finalPh: 3.98,
      dailyPhData: [
        { day: 0, ph: 6.2, balCount: 4.2, pathogenRisk: 5 },
        { day: 1, ph: 5.7, balCount: 5.4, pathogenRisk: 4 },
        { day: 2, ph: 5.0, balCount: 6.8, pathogenRisk: 3 },
        { day: 3, ph: 4.4, balCount: 7.9, pathogenRisk: 1 },
        { day: 4, ph: 4.15, balCount: 8.4, pathogenRisk: 0 },
        { day: 5, ph: 4.05, balCount: 8.7, pathogenRisk: 0 },
        { day: 6, ph: 4.00, balCount: 8.8, pathogenRisk: 0 },
        { day: 7, ph: 3.98, balCount: 8.8, pathogenRisk: 0 },
      ],
      aromaScore: 'Aroma asam segar khas durian fermentasi',
      textureScore: 'Pasta pulen lembut homogen',
      colorScore: 'Kuning keemasan cerah',
      qualityStatus: 'Optimal',
      notes: 'Bakteri asam laktat mendominasi medium dan memproduksi asam laktat secara maksimal.',
    };

    const preset2: LabTrial = {
      id: `preset-2-${Date.now()}`,
      timestamp: Date.now() - 200000,
      productType: 'tempoyak',
      sampleName: 'Tempoyak Garam Tinggi (Garam 15%, 28°C, Anaerob)',
      massGrams: 250,
      saltPercentage: 15,
      fermentationDays: 7,
      storageTempCelsius: 28,
      containerCondition: 'anaerob',
      finalPh: 4.85,
      dailyPhData: [
        { day: 0, ph: 6.2, balCount: 4.0, pathogenRisk: 0 },
        { day: 1, ph: 6.0, balCount: 4.3, pathogenRisk: 0 },
        { day: 2, ph: 5.7, balCount: 4.8, pathogenRisk: 0 },
        { day: 3, ph: 5.4, balCount: 5.3, pathogenRisk: 0 },
        { day: 4, ph: 5.15, balCount: 5.8, pathogenRisk: 0 },
        { day: 5, ph: 5.00, balCount: 6.2, pathogenRisk: 0 },
        { day: 6, ph: 4.90, balCount: 6.5, pathogenRisk: 0 },
        { day: 7, ph: 4.85, balCount: 6.7, pathogenRisk: 0 },
      ],
      aromaScore: 'Aroma asam sangat lemah, dominan aroma garam',
      textureScore: 'Kering dan agak kaku',
      colorScore: 'Kuning pucat',
      qualityStatus: 'Terlalu Asin / Fermentasi Lambat',
      notes: 'Kadar garam tinggi menghambat pembelahan BAL akibat tekanan osmotik.',
    };

    const preset3: LabTrial = {
      id: `preset-3-${Date.now()}`,
      timestamp: Date.now() - 100000,
      productType: 'tempoyak',
      sampleName: 'Tempoyak Kontaminasi Aerob (Garam 1%, 28°C, Aerob)',
      massGrams: 250,
      saltPercentage: 1,
      fermentationDays: 7,
      storageTempCelsius: 28,
      containerCondition: 'aerob',
      finalPh: 5.60,
      dailyPhData: [
        { day: 0, ph: 6.2, balCount: 4.0, pathogenRisk: 35 },
        { day: 1, ph: 6.1, balCount: 4.2, pathogenRisk: 45 },
        { day: 2, ph: 5.9, balCount: 4.5, pathogenRisk: 60 },
        { day: 3, ph: 5.8, balCount: 4.8, pathogenRisk: 75 },
        { day: 4, ph: 5.7, balCount: 5.0, pathogenRisk: 85 },
        { day: 5, ph: 5.65, balCount: 5.1, pathogenRisk: 90 },
        { day: 6, ph: 5.62, balCount: 5.2, pathogenRisk: 95 },
        { day: 7, ph: 5.60, balCount: 5.2, pathogenRisk: 98 },
      ],
      aromaScore: 'Tengik busuk menyengat amonia',
      textureScore: 'Berlendir encer rusak',
      colorScore: 'Kusam kecokelatan berkapang hitam',
      qualityStatus: 'Gagal / Kontaminasi Pembusuk',
      notes: 'Bakteri pembusuk dan kapang mendominasi toples aerob.',
    };

    setTrials((prev) => [preset1, preset2, preset3, ...prev]);
    setSelectedTrialsForChart([preset1.id, preset2.id, preset3.id]);
  };

  const chartColors = ['#168AAD', '#E63946', '#2E8B57', '#F4C95D', '#8338EC'];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-[#168AAD] text-white p-6 shadow-lg border border-cyan-400/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <BarChart3 className="w-6 h-6 text-[#F4C95D]" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
                Investigasi Berbasis Bukti
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold">Analisis Data Eksperimen</h1>
              <p className="text-xs sm:text-sm text-cyan-100">
                Membandingkan Hasil Uji, Menganalisis Pola Kurva pH, dan Merumuskan Argumen Sains
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveMenu('virtuallab')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition"
            >
              <FlaskConical className="w-3.5 h-3.5 text-[#F4C95D]" />
              <span>Praktikum Lagi</span>
            </button>
            {trials.length === 0 && (
              <button
                onClick={handleAddPresetTrials}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Muat Data Uji Standar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table of Recorded Trials */}
      <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#123B67] flex items-center gap-2">
            <span>📊</span> Tabel Jurnal Hasil Eksperimen ({trials.length} Percobaan)
          </h2>
          <span className="text-xs text-slate-500">
            Centang untuk menampilkan kurva pada grafik pembanding di bawah
          </span>
        </div>

        {trials.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-50 border border-dashed border-slate-300 space-y-3">
            <p className="text-sm font-semibold text-slate-600">
              Belum ada data eksperimen yang dicatat dari Virtual Laboratory.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setActiveMenu('virtuallab')}
                className="px-4 py-2 rounded-xl bg-[#168AAD] text-white font-bold text-xs shadow hover:bg-cyan-600 transition"
              >
                Buka Virtual Lab & Uji Sampel
              </button>
              <button
                onClick={handleAddPresetTrials}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-300 transition"
              >
                Muat 3 Sampel Standar untuk Dianalisis
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-[#123B67] text-white">
                <tr>
                  <th className="p-2.5 text-center">Plot</th>
                  <th className="p-2.5">Nama Sampel / Perlakuan</th>
                  <th className="p-2.5">Garam (%)</th>
                  <th className="p-2.5">Durasi</th>
                  <th className="p-2.5">Suhu</th>
                  <th className="p-2.5">Wadah</th>
                  <th className="p-2.5">pH Akhir</th>
                  <th className="p-2.5">Status Kualitas</th>
                  <th className="p-2.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-slate-50">
                {trials.map((trial, idx) => {
                  const isChecked = selectedTrialsForChart.includes(trial.id);
                  const color = chartColors[idx % chartColors.length];

                  return (
                    <tr key={trial.id} className="hover:bg-white transition-colors">
                      <td className="p-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectTrial(trial.id)}
                          className="cursor-pointer accent-[#168AAD] w-4 h-4"
                        />
                      </td>
                      <td className="p-2.5 font-bold text-slate-800 flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full shrink-0" 
                          style={{ backgroundColor: color }} 
                        />
                        <span>{trial.sampleName}</span>
                      </td>
                      <td className="p-2.5 font-semibold text-slate-700">{trial.saltPercentage}%</td>
                      <td className="p-2.5 text-slate-600">{trial.fermentationDays} Hari</td>
                      <td className="p-2.5 text-slate-600">{trial.storageTempCelsius}°C</td>
                      <td className="p-2.5 text-slate-600 capitalize">{trial.containerCondition}</td>
                      <td className="p-2.5 font-bold text-[#168AAD]">{trial.finalPh.toFixed(2)}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          trial.qualityStatus === 'Optimal' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : trial.qualityStatus === 'Gagal / Kontaminasi Pembusuk'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {trial.qualityStatus}
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => deleteTrial(trial.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 transition"
                          title="Hapus data"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Multi-Trial Comparative Graph */}
      {selectedTrialsForChart.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h3 className="text-sm font-extrabold text-[#123B67] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#168AAD]" />
              Grafik Perbandingan Kinetika Penurunan pH Antar-Perlakuan
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {trials
                .filter((t) => selectedTrialsForChart.includes(t.id))
                .map((t, idx) => (
                  <div key={t.id} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: chartColors[idx % chartColors.length] }} 
                    />
                    <span className="truncate max-w-[150px]">{t.productType} (Garam {t.saltPercentage}%)</span>
                  </div>
                ))}
            </div>
          </div>

          {/* SVG Comparative Chart */}
          <div className="h-64 w-full bg-slate-50 p-4 rounded-xl border border-slate-200">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
              {/* Grid */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#cbd5e1" strokeDasharray="3 3" />
              <line x1="40" y1="65" x2="480" y2="65" stroke="#cbd5e1" strokeDasharray="3 3" />
              <line x1="40" y1="110" x2="480" y2="110" stroke="#cbd5e1" strokeDasharray="3 3" />
              <line x1="40" y1="155" x2="480" y2="155" stroke="#cbd5e1" strokeDasharray="3 3" />
              
              <line x1="40" y1="170" x2="480" y2="170" stroke="#475569" strokeWidth="2" />
              <line x1="40" y1="10" x2="40" y2="170" stroke="#475569" strokeWidth="2" />

              {/* Y Axis labels */}
              <text x="32" y="25" textAnchor="end" className="text-[10px] fill-slate-500">7.0</text>
              <text x="32" y="70" textAnchor="end" className="text-[10px] fill-slate-500">6.0</text>
              <text x="32" y="115" textAnchor="end" className="text-[10px] fill-slate-500">5.0</text>
              <text x="32" y="160" textAnchor="end" className="text-[10px] fill-slate-500">4.0</text>

              {/* Threshold pH 4.4 */}
              <line x1="40" y1="142" x2="480" y2="142" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="480" y="138" textAnchor="end" className="text-[9px] fill-emerald-600 font-bold">Batas Aman Asam (pH 4.4)</text>

              {/* Render lines for each selected trial */}
              {trials
                .filter((t) => selectedTrialsForChart.includes(t.id))
                .map((t, trialIndex) => {
                  const points = t.dailyPhData.map((d, i) => {
                    const x = 40 + (i / Math.max(1, t.dailyPhData.length - 1)) * 440;
                    const y = 20 + ((7.0 - d.ph) / (7.0 - 3.5)) * 150;
                    return { x, y, ...d };
                  });

                  const pathStr = points.reduce((acc, curr, i) => 
                    i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`, ''
                  );
                  const color = chartColors[trialIndex % chartColors.length];

                  return (
                    <g key={t.id}>
                      <path d={pathStr} fill="none" stroke={color} strokeWidth="2.5" />
                      {points.map((pt, pIdx) => (
                        <circle key={pIdx} cx={pt.x} cy={pt.y} r="3.5" fill={color} stroke="#fff" strokeWidth="1.5" />
                      ))}
                    </g>
                  );
                })}

              {/* X Axis days ticks */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((d) => (
                <text key={d} x={40 + (d / 7) * 440} y="185" textAnchor="middle" className="text-[9px] fill-slate-500">
                  H-{d}
                </text>
              ))}
            </svg>
          </div>
        </div>
      )}

      {/* Scaffolded Data Analysis Questions */}
      <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
        <h3 className="text-base font-extrabold text-[#123B67] flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#168AAD]" />
          Pertanyaan Analisis Data & Penalaran Ilmiah
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              1. Pola apa yang terlihat dari grafik perbandingan nilai pH antar-perlakuan?
            </label>
            <textarea
              value={analysisAnswers.pattern}
              onChange={(e) => setAnalysisAnswers({ ...analysisAnswers, pattern: e.target.value })}
              placeholder="Jelaskan bagaimana kemiringan kurva pH pada hari ke-0 hingga ke-4 dibandingkan hari ke-5 hingga ke-7..."
              rows={2}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              2. Perlakuan mana (kadar garam/suhu/wadah) yang menghasilkan perubahan paling optimal vs yang gagal?
            </label>
            <textarea
              value={analysisAnswers.difference}
              onChange={(e) => setAnalysisAnswers({ ...analysisAnswers, difference: e.target.value })}
              placeholder="Sebutkan perlakuan spesifik dan bandingkan angka pH akhirnya..."
              rows={2}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              3. Bukti data apa (angka pH, waktu, atau populasi BAL) yang mendukung pendapatmu?
            </label>
            <textarea
              value={analysisAnswers.evidence}
              onChange={(e) => setAnalysisAnswers({ ...analysisAnswers, evidence: e.target.value })}
              placeholder="Tuliskan bukti angka spesifik yang kamu peroleh dari tabel..."
              rows={2}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              4. Apakah hasil data eksperimen ini mendukung hipotesis awal yang kamu susun sebelumnya? Mengapa?
            </label>
            <textarea
              value={analysisAnswers.hypothesisMatch}
              onChange={(e) => setAnalysisAnswers({ ...analysisAnswers, hypothesisMatch: e.target.value })}
              placeholder="Refleksikan kesesuaian data dengan hipotesis awalmu..."
              rows={2}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              5. Apa keterbatasan dari eksperimen simulasi ini bila dibandingkan dengan fermentasi tempoyak durian nyata di dapur?
            </label>
            <textarea
              value={analysisAnswers.limitations}
              onChange={(e) => setAnalysisAnswers({ ...analysisAnswers, limitations: e.target.value })}
              placeholder="Jelaskan bahwa simulasi merupakan model komputasi matematis yang mengasumsikan bahan seragam..."
              rows={2}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveAnalysis}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow transition"
            >
              <Save className="w-4 h-4 text-[#F4C95D]" />
              <span>Simpan Analisis Siswa</span>
            </button>
            {savedNotification && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Analisis berhasil disimpan!
              </span>
            )}
          </div>

          <button
            onClick={() => setActiveMenu('berpikir-kritis')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-xs shadow-md hover:scale-[1.02] transition"
          >
            <span>Lanjut ke Tantangan Berpikir Kritis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
