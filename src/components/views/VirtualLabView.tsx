import React, { useState, useEffect } from 'react';
import { ActiveMenu, LabTrial } from '../../types/index.ts';
import { 
  runFermentationSimulation, 
  SimulationResult 
} from '../../simulation/fermentationModel.ts';
import { 
  FlaskConical, 
  Sliders, 
  Play, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Thermometer, 
  Clock, 
  Layers, 
  Activity, 
  Sparkles,
  ArrowRight,
  Eye,
  Microscope
} from 'lucide-react';

interface VirtualLabViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
  trials: LabTrial[];
  setTrials: React.Dispatch<React.SetStateAction<LabTrial[]>>;
}

export const VirtualLabView: React.FC<VirtualLabViewProps> = ({
  setActiveMenu,
  trials,
  setTrials,
}) => {
  const productType = 'tempoyak' as const;

  // Experimental Parameters
  const [massGrams, setMassGrams] = useState<number>(250);
  const [saltPercentage, setSaltPercentage] = useState<number>(4);
  const [fermentationDays, setFermentationDays] = useState<number>(7);
  const [storageTemp, setStorageTemp] = useState<number>(28);
  const [containerCondition, setContainerCondition] = useState<'anaerob' | 'aerob'>('anaerob');

  // Simulation running state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentDayProgress, setCurrentDayProgress] = useState<number>(0);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [savedNotification, setSavedNotification] = useState<boolean>(false);
  const [activeTabDetail, setActiveTabDetail] = useState<'grafik' | 'tabel' | 'mikroba'>('grafik');

  // Calculate simulation result whenever parameters change
  useEffect(() => {
    const res = runFermentationSimulation({
      productType,
      massGrams,
      saltPercentage,
      fermentationDays,
      storageTempCelsius: storageTemp,
      containerCondition,
    });
    setSimulationResult(res);
    setCurrentDayProgress(0);
    setIsRunning(false);
  }, [massGrams, saltPercentage, fermentationDays, storageTemp, containerCondition]);

  // Animated progression
  const handleStartExperiment = () => {
    setIsRunning(true);
    setCurrentDayProgress(0);

    let day = 0;
    const interval = setInterval(() => {
      day += 1;
      setCurrentDayProgress(day);
      if (day >= fermentationDays) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 400); // 400ms per day
  };

  const handleFastForward = () => {
    setCurrentDayProgress(fermentationDays);
    setIsRunning(false);
  };

  const handleReset = () => {
    setCurrentDayProgress(0);
    setIsRunning(false);
  };

  // Record data to journal
  const handleRecordData = () => {
    if (!simulationResult) return;

    const newTrial: LabTrial = {
      id: `trial-${Date.now()}`,
      timestamp: Date.now(),
      productType,
      sampleName: `Tempoyak (Garam ${saltPercentage}%, ${fermentationDays}hr, ${storageTemp}°C, ${containerCondition})`,
      massGrams,
      saltPercentage,
      fermentationDays,
      storageTempCelsius: storageTemp,
      containerCondition,
      finalPh: simulationResult.finalPh,
      dailyPhData: simulationResult.dailyProgression.map((s) => ({
        day: s.day,
        ph: s.ph,
        balCount: s.balCount,
        pathogenRisk: s.pathogenRisk,
      })),
      aromaScore: simulationResult.aromaScore,
      textureScore: simulationResult.textureScore,
      colorScore: simulationResult.colorScore,
      qualityStatus: simulationResult.qualityStatus,
      notes: simulationResult.scientificExplanation,
    };

    setTrials((prev) => [newTrial, ...prev]);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const activeDayIndex = Math.min(
    currentDayProgress, 
    simulationResult?.dailyProgression.length ? simulationResult.dailyProgression.length - 1 : 0
  );
  const activeStep = simulationResult?.dailyProgression[activeDayIndex] || {
    day: 0,
    ph: 6.2,
    balCount: 4.2,
    pathogenRisk: 5,
    description: 'Daging buah durian segar dan garam dimasukkan ke dalam toples.',
  };

  // Visual coloring of the tempoyak durian vessel
  let jarSubstrateColor = 'from-amber-200 to-amber-300';
  if (simulationResult?.qualityStatus === 'Gagal / Kontaminasi Pembusuk') {
    jarSubstrateColor = 'from-stone-500 to-amber-900/80';
  } else if (simulationResult?.qualityStatus === 'Terlalu Asin / Fermentasi Lambat') {
    jarSubstrateColor = 'from-amber-100 to-yellow-200';
  } else {
    jarSubstrateColor = 'from-amber-300 via-amber-400 to-yellow-500';
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-[#168AAD] text-white p-6 shadow-lg border border-cyan-400/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <FlaskConical className="w-6 h-6 text-[#F4C95D]" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
                Simulasi Eksperimen Terintegrasi
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold">Virtual Laboratory Fermentasi Tempoyak</h1>
              <p className="text-xs sm:text-sm text-cyan-100">
                Uji Pengaruh Kadar Garam (NaCl), Lama Waktu, Suhu Ruang, dan Aerasi terhadap Dinamika Penurunan pH
              </p>
            </div>
          </div>

          {/* Module Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-900 font-extrabold text-xs shadow-md border border-amber-300/40">
            <span>🍈</span>
            <span>Laboratorium Tempoyak Durian Lampung</span>
          </div>
        </div>
      </div>

      {/* Main Laboratory Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parameter Configuration Sliders */}
        <div className="lg:col-span-4 rounded-2xl bg-white p-5 shadow-md border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-extrabold text-[#123B67] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#168AAD]" />
              Panel Pengaturan Variabel
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
              Daging Durian Matang
            </span>
          </div>

          {/* Massa Bahan */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-700">Massa Daging Durian:</span>
              <span className="font-extrabold text-[#168AAD]">{massGrams} gram</span>
            </div>
            <input
              type="range"
              min={100}
              max={500}
              step={25}
              value={massGrams}
              onChange={(e) => setMassGrams(Number(e.target.value))}
              disabled={isRunning}
              className="w-full accent-[#168AAD] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>100g</span>
              <span>250g (Standar)</span>
              <span>500g</span>
            </div>
          </div>

          {/* Kadar Garam (NaCl %) */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-700">Konsentrasi Garam Dapur (NaCl):</span>
              <span className={`font-extrabold px-2 py-0.5 rounded text-xs ${
                saltPercentage >= 2 && saltPercentage <= 5 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : saltPercentage > 10 
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {saltPercentage}% (b/b)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              step={1}
              value={saltPercentage}
              onChange={(e) => setSaltPercentage(Number(e.target.value))}
              disabled={isRunning}
              className="w-full accent-[#168AAD] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0% (Tawar)</span>
              <span className="font-semibold text-emerald-700">2-5% (Rentang Ideal)</span>
              <span>20% (Jenuh)</span>
            </div>
          </div>

          {/* Lama Waktu Fermentasi */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-700">Lama Waktu Fermentasi:</span>
              <span className="font-extrabold text-[#168AAD]">{fermentationDays} Hari</span>
            </div>
            <input
              type="range"
              min={1}
              max={14}
              step={1}
              value={fermentationDays}
              onChange={(e) => setFermentationDays(Number(e.target.value))}
              disabled={isRunning}
              className="w-full accent-[#168AAD] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1 Hari</span>
              <span>7 Hari (Standar Tradisi)</span>
              <span>14 Hari</span>
            </div>
          </div>

          {/* Suhu Penyimpanan */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-700">Suhu Ruang Penyimpanan:</span>
              <span className="font-extrabold text-[#168AAD]">{storageTemp}°C</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Kulkas (15°C)', value: 15 },
                { label: 'Ruang (28°C)', value: 28 },
                { label: 'Hangat (37°C)', value: 37 }
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStorageTemp(opt.value)}
                  disabled={isRunning}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition ${
                    storageTemp === opt.value
                      ? 'bg-[#123B67] text-white border-[#123B67]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Kerapatan Wadah (Anaerob vs Aerob) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Kondisi Aerasi Toples:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setContainerCondition('anaerob')}
                disabled={isRunning}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                  containerCondition === 'anaerob'
                    ? 'bg-[#2E8B57] text-white border-[#2E8B57] shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Toples Kedap (Anaerob)
              </button>
              <button
                type="button"
                onClick={() => setContainerCondition('aerob')}
                disabled={isRunning}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                  containerCondition === 'aerob'
                    ? 'bg-rose-700 text-white border-rose-700 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Toples Terbuka (Aerob)
              </button>
            </div>
          </div>

          {/* Simulation Control Buttons */}
          <div className="pt-2 space-y-2 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleStartExperiment}
                disabled={isRunning}
                className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#2E8B57] hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Mulai Eksperimen</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Awal</span>
              </button>
            </div>

            {isRunning && (
              <button
                onClick={handleFastForward}
                className="w-full py-1.5 text-[11px] font-semibold text-[#168AAD] hover:underline text-center"
              >
                ⏩ Percepat Langsung ke Hari Terakhir
              </button>
            )}

            <button
              onClick={handleRecordData}
              disabled={isRunning || currentDayProgress === 0}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#123B67] hover:bg-[#103054] disabled:opacity-40 text-white font-bold text-xs shadow-md transition-all"
            >
              <Save className="w-4 h-4 text-[#F4C95D]" />
              <span>Catat Data ke Jurnal Eksperimen</span>
            </button>

            {savedNotification && (
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 animate-bounce">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Data berhasil dicatat ke Jurnal Analisis Data!
              </div>
            )}
          </div>
        </div>

        {/* Center / Right Column: The Visual Vessel, Digital Instruments & Real-time Graph */}
        <div className="lg:col-span-8 space-y-6">
          {/* Visual Fermentation Chamber & Digital Meter */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-[#102a45] text-white p-6 shadow-xl border border-cyan-800/50 relative overflow-hidden">
            {/* Top Chamber Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-cyan-200 uppercase tracking-widest">
                  Ruang Inkubasi Toples Tempoyak
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[#F4C95D] font-mono font-bold">
                  Hari ke-{currentDayProgress} dari {fermentationDays} Hari
                </span>
                <span className="text-slate-300">
                  {containerCondition === 'anaerob' ? '🔒 Toples Kedap (Anaerob)' : '⚠️ Terbuka (Aerob)'}
                </span>
              </div>
            </div>

            {/* Chamber Core: Jar Graphics & Digital Sensor Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Left inside Chamber: Interactive Fermentation Jar */}
              <div className="sm:col-span-6 flex flex-col items-center justify-center relative">
                {/* Fermentation Vessel Jar SVG */}
                <div className="relative w-44 h-56 flex items-center justify-center">
                  {/* Jar Lid */}
                  <div className={`absolute top-0 w-28 h-6 rounded-t-xl z-20 border-2 border-white/40 shadow-md ${
                    containerCondition === 'anaerob' ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}>
                    <div className="text-[9px] text-white font-black text-center pt-0.5 uppercase tracking-tighter">
                      {containerCondition === 'anaerob' ? 'KEDAP (TUTUP RAPAT)' : 'TERBUKA'}
                    </div>
                  </div>

                  {/* Jar Glass Body */}
                  <div className="w-40 h-50 rounded-b-3xl border-4 border-white/30 bg-white/10 backdrop-blur-sm relative overflow-hidden shadow-2xl flex flex-col justify-end p-2">
                    {/* Fill Level */}
                    <div 
                      className={`w-full rounded-b-2xl bg-gradient-to-t ${jarSubstrateColor} transition-all duration-700 relative`}
                      style={{ height: `${Math.min(85, 45 + (massGrams / 500) * 40)}%` }}
                    >
                      {/* Animated bubbles if fermentation active and anaerob */}
                      {currentDayProgress > 0 && containerCondition === 'anaerob' && saltPercentage <= 10 && (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <span className="absolute bottom-2 left-4 w-2 h-2 rounded-full bg-white/60 animate-bounce" />
                          <span className="absolute bottom-5 right-6 w-1.5 h-1.5 rounded-full bg-white/50 animate-ping" />
                          <span className="absolute bottom-8 left-8 w-2.5 h-2.5 rounded-full bg-white/40 animate-pulse" />
                        </div>
                      )}

                      {/* Aerobic Spoiled mold overlay */}
                      {containerCondition === 'aerob' && currentDayProgress >= 2 && (
                        <div className="absolute top-0 left-0 right-0 h-4 bg-stone-700/80 border-b border-stone-900 flex items-center justify-center">
                          <span className="text-[9px] text-stone-200 font-bold">Kapang / Jamur Aerob</span>
                        </div>
                      )}

                      <div className="absolute bottom-2 inset-x-0 text-center text-[10px] font-black text-slate-900/80 uppercase">
                        Daging Durian + Garam ({saltPercentage}%)
                      </div>
                    </div>

                    {/* Immersed pH Electrode / Test Strip */}
                    <div className="absolute top-2 right-6 w-3 h-32 bg-slate-200 rounded-b-full border border-slate-400 shadow-md flex flex-col justify-end items-center">
                      <div className={`w-2 h-10 rounded-b-full transition-colors duration-500 ${
                        activeStep.ph < 4.2 
                          ? 'bg-rose-500' 
                          : activeStep.ph < 5.0 
                          ? 'bg-amber-400' 
                          : 'bg-emerald-400'
                      }`} />
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-cyan-200 mt-2 font-medium text-center max-w-xs">
                  {activeStep.description}
                </div>
              </div>

              {/* Right inside Chamber: Digital Instruments HUD */}
              <div className="sm:col-span-6 space-y-3">
                {/* Big Digital pH Display */}
                <div className="p-4 rounded-xl bg-black/40 border border-cyan-400/40 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span className="font-semibold flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" /> Sensor Derajat Keasaman (pH)
                    </span>
                    <span className="text-[10px] text-cyan-300 font-mono">Digital Probe</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-4xl sm:text-5xl font-black text-[#F4C95D] tracking-tight">
                      {activeStep.ph.toFixed(2)}
                    </span>
                    <div className="text-xs">
                      <div className="font-bold text-white">
                        {activeStep.ph <= 4.4 ? 'Asam Optimal (<4.4)' : activeStep.ph < 5.5 ? 'Asam Sedang' : 'Mendekati Netral'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {activeStep.ph <= 4.4 ? 'Bakteri pembusuk tertekan sempurna' : 'Perlu waktu & asam laktat lagi'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Microbe Biomass / Risk Bars */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                      <span className="font-bold text-emerald-400">Populasi Bakteri Asam Laktat (BAL):</span>
                      <span className="font-mono font-bold">{activeStep.balCount} Log CFU/g</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${Math.min(100, (activeStep.balCount / 9.0) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                      <span className="font-bold text-rose-400">Risiko Mikroba Pembusuk / Kontaminan:</span>
                      <span className="font-mono font-bold">{activeStep.pathogenRisk}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          activeStep.pathogenRisk > 30 ? 'bg-rose-500' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${activeStep.pathogenRisk}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quality Status Badge */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Prediksi Mutu Tempoyak:</span>
                  <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${
                    simulationResult?.qualityStatus === 'Optimal'
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400'
                      : simulationResult?.qualityStatus === 'Gagal / Kontaminasi Pembusuk'
                      ? 'bg-rose-500/30 text-rose-300 border border-rose-400'
                      : 'bg-amber-500/30 text-amber-300 border border-amber-400'
                  }`}>
                    {simulationResult?.qualityStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section: Dynamic SVG Chart, Daily Table & Microscopic View */}
          <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
            {/* Tabs for details */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTabDetail('grafik')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTabDetail === 'grafik' 
                      ? 'bg-[#168AAD] text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  📈 Grafik Kinetika pH vs Hari
                </button>
                <button
                  onClick={() => setActiveTabDetail('tabel')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTabDetail === 'tabel' 
                      ? 'bg-[#168AAD] text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  📋 Tabel Data Harian
                </button>
                <button
                  onClick={() => setActiveTabDetail('mikroba')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTabDetail === 'mikroba' 
                      ? 'bg-[#168AAD] text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🔬 Lensa Mikroskopis BAL
                </button>
              </div>

              <div className="text-[11px] text-slate-500 font-medium">
                Garam {saltPercentage}% • Suhu {storageTemp}°C
              </div>
            </div>

            {/* Content: SVG Graph */}
            {activeTabDetail === 'grafik' && (
              <div className="space-y-3">
                <div className="h-60 w-full relative bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#cbd5e1" strokeDasharray="3 3" />
                    <line x1="40" y1="65" x2="480" y2="65" stroke="#cbd5e1" strokeDasharray="3 3" />
                    <line x1="40" y1="110" x2="480" y2="110" stroke="#cbd5e1" strokeDasharray="3 3" />
                    <line x1="40" y1="155" x2="480" y2="155" stroke="#cbd5e1" strokeDasharray="3 3" />
                    
                    {/* Axes */}
                    <line x1="40" y1="170" x2="480" y2="170" stroke="#475569" strokeWidth="2" />
                    <line x1="40" y1="10" x2="40" y2="170" stroke="#475569" strokeWidth="2" />

                    {/* Y Axis labels (pH 7.0 down to 3.5) */}
                    <text x="32" y="25" textAnchor="end" className="text-[10px] fill-slate-500">7.0</text>
                    <text x="32" y="70" textAnchor="end" className="text-[10px] fill-slate-500">6.0</text>
                    <text x="32" y="115" textAnchor="end" className="text-[10px] fill-slate-500">5.0</text>
                    <text x="32" y="160" textAnchor="end" className="text-[10px] fill-slate-500">4.0</text>

                    {/* Safe Acidity Line (pH 4.4) */}
                    <line x1="40" y1="142" x2="480" y2="142" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="480" y="138" textAnchor="end" className="text-[9px] fill-emerald-600 font-bold">Batas Aman Asam (pH 4.4)</text>

                    {/* Plot Points & Lines */}
                    {simulationResult && (
                      <>
                        {(() => {
                          const steps = simulationResult.dailyProgression;
                          const total = steps.length - 1;
                          const points = steps.map((s, idx) => {
                            const x = 40 + (idx / Math.max(1, total)) * 440;
                            // mapping pH 7.0 (y=20) to pH 3.5 (y=170)
                            const y = 20 + ((7.0 - s.ph) / (7.0 - 3.5)) * 150;
                            return { x, y, ...s };
                          });

                          const pathData = points.reduce((acc, curr, i) => 
                            i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`, ''
                          );

                          return (
                            <>
                              <path d={pathData} fill="none" stroke="#168AAD" strokeWidth="3" />
                              {points.map((pt, i) => (
                                <g key={i}>
                                  <circle 
                                    cx={pt.x} 
                                    cy={pt.y} 
                                    r={i === currentDayProgress ? "6" : "4"} 
                                    fill={i === currentDayProgress ? "#F4C95D" : "#123B67"}
                                    stroke="#FFFFFF"
                                    strokeWidth="2"
                                  />
                                  <text x={pt.x} y="185" textAnchor="middle" className="text-[9px] fill-slate-600">
                                    H-{pt.day}
                                  </text>
                                  <text x={pt.x} y={pt.y - 8} textAnchor="middle" className="text-[8px] font-bold fill-[#123B67]">
                                    {pt.ph.toFixed(1)}
                                  </text>
                                </g>
                              ))}
                            </>
                          );
                        })()}
                      </>
                    )}
                  </svg>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>Sumbu X: Waktu Pemeraman (Hari)</span>
                  <span>Sumbu Y: Derajat Keasaman (pH)</span>
                </div>
              </div>
            )}

            {/* Content: Daily Table */}
            {activeTabDetail === 'tabel' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 text-slate-800">
                    <tr>
                      <th className="p-2.5">Waktu</th>
                      <th className="p-2.5">Nilai pH</th>
                      <th className="p-2.5">Populasi BAL (Log CFU/g)</th>
                      <th className="p-2.5">Risiko Kontaminasi</th>
                      <th className="p-2.5">Deskripsi Perubahan Fisik</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {simulationResult?.dailyProgression.map((step) => (
                      <tr 
                        key={step.day} 
                        className={step.day === currentDayProgress ? 'bg-cyan-50 font-semibold' : 'hover:bg-slate-50'}
                      >
                        <td className="p-2.5">Hari ke-{step.day}</td>
                        <td className="p-2.5 text-[#168AAD] font-bold">{step.ph.toFixed(2)}</td>
                        <td className="p-2.5 text-emerald-700">{step.balCount}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            step.pathogenRisk > 30 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {step.pathogenRisk}%
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-600">{step.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Content: Microscopic Lens View */}
            {activeTabDetail === 'mikroba' && (
              <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-36 h-36 rounded-full border-4 border-cyan-400 bg-slate-950 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                  {/* Grid overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#168aad_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

                  {/* Bacteria Rods (BAL) */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center flex-wrap gap-2 p-4">
                    {Array.from({ length: Math.min(24, Math.max(4, Math.round(activeStep.balCount * 2.5))) }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-3.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 transform rotate-12 animate-pulse"
                      />
                    ))}

                    {/* Pathogen Cocci if high risk */}
                    {activeStep.pathogenRisk > 20 && Array.from({ length: Math.min(10, Math.round(activeStep.pathogenRisk / 8)) }).map((_, i) => (
                      <div 
                        key={`path-${i}`} 
                        className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="font-bold text-cyan-300 text-sm flex items-center gap-2">
                    <Microscope className="w-4 h-4 text-[#F4C95D]" /> Visualisasi Mikroskopis Bakteri Fermentasi Durian
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Batang hijau merepresentasikan koloni <strong className="text-emerald-400 italic">Bakteri Asam Laktat</strong> (seperti *Lactobacillus plantarum* dan *Lactobacillus fermentum*). Titik merah (jika muncul) merepresentasikan mikroba pembusuk kontaminan.
                  </p>
                  <div className="text-[11px] text-slate-400 pt-1">
                    Pada kadar garam ideal ({saltPercentage}%) dan kondisi anaerobik kedap, Bakteri Asam Laktat mendominasi medium durian dan menekan bakteri patogen pembusuk.
                  </div>
                </div>
              </div>
            )}

            {/* Scientific Explanation Box */}
            <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-[#123B67] flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#168AAD]" /> Analisis Ilmiah Kondisi Eksperimen Ini:
              </div>
              <p className="leading-relaxed">
                {simulationResult?.scientificExplanation}
              </p>
            </div>

            {/* Mandatory Educational Disclaimer */}
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Keterbatasan Model:</strong> {simulationResult?.disclaimer}
              </span>
            </div>

            {/* Next step to Data Analysis */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveMenu('analisis')}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#168AAD] to-[#2E8B57] text-white font-bold text-xs shadow-md hover:scale-[1.02] transition"
              >
                <span>Buka Tabel & Grafik Perbandingan di Analisis Data</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
