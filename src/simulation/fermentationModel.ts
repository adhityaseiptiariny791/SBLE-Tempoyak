/**
 * Model Simulasi Fermentasi SBLE (Tempoyak Durian Lampung)
 * 
 * CATATAN EDUKASI & KETERBATASAN MODEL:
 * Angka dan keluaran yang dihasilkan model ini merupakan representasi komputasi edukatif 
 * berbasis prinsip biokimia fermentasi asam laktat (kinetika kurva pH, aktivitas Bakteri Asam Laktat,
 * dan pengaruh faktor garam, suhu, serta aerasi), BUKAN hasil pengukuran empiris laboratorium basah nyata.
 * Nilai pH, populasi mikroba, dan skor organoleptik dimodelkan secara konsisten untuk keperluan
 * melatih penalaran ilmiah, variabel penelitian, dan berpikir kritis siswa SMP.
 */

export interface SimulationParams {
  productType?: 'tempoyak';
  massGrams: number;
  saltPercentage: number; // e.g. 0 to 20 (%)
  fermentationDays: number; // 1 to 14 (days)
  storageTempCelsius: number; // e.g. 15, 28, 37 (°C)
  containerCondition: 'anaerob' | 'aerob';
}

export interface DailySimulationStep {
  day: number;
  ph: number;
  balCount: number; // log10 CFU/g approx (e.g. 3.5 - 9.0)
  pathogenRisk: number; // scale 0 - 100%
  description: string;
}

export interface SimulationResult {
  dailyProgression: DailySimulationStep[];
  finalPh: number;
  finalBalCount: number;
  finalPathogenRisk: number;
  aromaScore: string;
  textureScore: string;
  colorScore: string;
  qualityStatus: 'Optimal' | 'Cukup Baik' | 'Terlalu Asin / Fermentasi Lambat' | 'Gagal / Kontaminasi Pembusuk';
  scientificExplanation: string;
  disclaimer: string;
}

export function runFermentationSimulation(params: SimulationParams): SimulationResult {
  const {
    saltPercentage,
    fermentationDays,
    storageTempCelsius,
    containerCondition,
  } = params;

  // Initial biological values for fresh durian pulp
  const initialPh = 6.2;
  const steps: DailySimulationStep[] = [];

  // Determine rate multiplier based on Temperature
  // Optimal temp for mesophilic BAL (e.g. Lactobacillus plantarum) is ~28°C - 32°C
  let tempFactor = 1.0;
  if (storageTempCelsius <= 18) {
    tempFactor = 0.45; // Cold storage dramatically slows microbial kinetics
  } else if (storageTempCelsius >= 25 && storageTempCelsius <= 32) {
    tempFactor = 1.0; // Optimal ambient room temp in Lampung
  } else if (storageTempCelsius > 32 && storageTempCelsius <= 38) {
    tempFactor = 1.15; // Slightly faster initially, but higher risk of off-flavors
  } else {
    tempFactor = 0.5; // Extreme temperature
  }

  // Salt suitability check for Tempoyak (Ideal 3% - 5%)
  let saltSuitability = 1.0;
  let putrefactionRisk = 0;

  if (saltPercentage < 2) {
    saltSuitability = 0.4;
    putrefactionRisk = 75; // Lack of salt allows proteolytic contaminants & molds
  } else if (saltPercentage >= 2 && saltPercentage <= 5) {
    saltSuitability = 1.0; // Ideal range
    putrefactionRisk = 5;
  } else if (saltPercentage > 5 && saltPercentage <= 8) {
    saltSuitability = 0.75;
    putrefactionRisk = 0;
  } else {
    // >8% salt inhibits even halotolerant BAL
    saltSuitability = 0.35;
    putrefactionRisk = 0;
  }

  // Container aeration penalty (aerobic exposure allows mold and spoilage)
  const isAerobic = containerCondition === 'aerob';
  if (isAerobic) {
    saltSuitability *= 0.5;
    putrefactionRisk += 40;
  }

  // Target lowest possible pH under ideal conditions for tempoyak
  const targetMinPh = 3.9;

  let currentPh = initialPh;
  let currentBal = 4.2; // Initial indigenous BAL Log CFU/g

  for (let day = 0; day <= fermentationDays; day++) {
    if (day === 0) {
      steps.push({
        day: 0,
        ph: Number(currentPh.toFixed(2)),
        balCount: Number(currentBal.toFixed(1)),
        pathogenRisk: Math.min(100, Math.round(putrefactionRisk * 0.4)),
        description: 'Hari ke-0: Daging buah durian segar dicampur garam dan dimasukkan ke toples fermentasi.',
      });
      continue;
    }

    // Daily drop in pH
    if (putrefactionRisk >= 60 && isAerobic) {
      // Spoilage route: pH drops slightly then stagnates/rebounds, rotten smell
      currentPh = Math.max(5.5, currentPh - (0.1 * tempFactor));
      currentBal = Math.min(5.5, currentBal + 0.2);
    } else if (saltPercentage > 10) {
      // High salt inhibition route: very slow fermentation
      const drop = 0.12 * tempFactor * saltSuitability;
      currentPh = Math.max(4.8, currentPh - drop);
      currentBal = Math.min(6.8, currentBal + 0.3);
    } else {
      // Normal / successful lactic fermentation of durian sugars
      const progressRatio = 1 - Math.exp(-0.45 * day * tempFactor * saltSuitability);
      currentPh = initialPh - (initialPh - targetMinPh) * progressRatio;
      // BAL growth curve (logistic)
      currentBal = Math.min(8.8, 4.0 + (4.8 * progressRatio));
    }

    const currentRisk = Math.max(0, Math.min(100, Math.round(
      putrefactionRisk * Math.max(0.05, (currentPh - 4.0) / (initialPh - 4.0))
    )));

    let desc = `Hari ke-${day}: Aktivitas fermentasi asam laktat berlangsung (pH ${currentPh.toFixed(2)}).`;
    if (day === fermentationDays) {
      if (currentPh <= 4.4 && !isAerobic && putrefactionRisk < 30) {
        desc = `Hari ke-${day}: Tempoyak matang optimal, asam laktat terakumulasi sempurna dengan aroma asam durian segar.`;
      } else if (isAerobic || putrefactionRisk >= 50) {
        desc = `Hari ke-${day}: Terdeteksi kontaminasi kapang/pembusuk akibat toples terbuka atau garam terlalu sedikit.`;
      }
    }

    steps.push({
      day,
      ph: Number(currentPh.toFixed(2)),
      balCount: Number(currentBal.toFixed(1)),
      pathogenRisk: currentRisk,
      description: desc,
    });
  }

  const finalStep = steps[steps.length - 1];
  const finalPh = finalStep.ph;
  const finalBalCount = finalStep.balCount;
  const finalPathogenRisk = finalStep.pathogenRisk;

  // Determine quality status
  let qualityStatus: SimulationResult['qualityStatus'] = 'Optimal';
  let aromaScore = '';
  let textureScore = '';
  let colorScore = '';
  let scientificExplanation = '';

  if (isAerobic || saltPercentage < 2) {
    qualityStatus = 'Gagal / Kontaminasi Pembusuk';
    aromaScore = 'Tengik / Busuk Menyengat (amonia/H2S)';
    textureScore = 'Berlendir, encer berair, dan struktur daging durian rusak';
    colorScore = 'Kusam kecokelatan / bercak kapang jamur putih keabu-abuan';
    scientificExplanation = 'Kondisi aerob atau kadar garam yang terlalu rendah (<2%) menyebabkan bakteri pembusuk dan kapang mendominasi substrat sebelum Bakteri Asam Laktat sempat memproduksi asam laktat yang cukup untuk menurunkan pH ke level aman (<4.5).';
  } else if (saltPercentage > 10 || storageTempCelsius <= 18) {
    qualityStatus = 'Terlalu Asin / Fermentasi Lambat';
    aromaScore = 'Aroma asam sangat lemah, aroma garam pekat mendominasi';
    textureScore = 'Kering dan agak kaku';
    colorScore = 'Kuning pucat stabil';
    scientificExplanation = 'Konsentrasi garam yang terlalu tinggi (>10%) atau suhu dingin (<18°C) menghambat laju metabolisme dan pembelahan Bakteri Asam Laktat karena tekanan osmotik tinggi. Akibatnya, penurunan pH berlangsung lambat dan cita rasa khas tempoyak kurang terbentuk optimal.';
  } else if (finalPh <= 4.4 && fermentationDays >= 4) {
    qualityStatus = 'Optimal';
    aromaScore = 'Aroma asam segar khas durian fermentasi, sedap dan tidak berbau busuk';
    textureScore = 'Pasta kental lembut, homogen, dan pulen';
    colorScore = 'Kuning keemasan cerah khas daging durian masak';
    scientificExplanation = `Bakteri Asam Laktat (*Lactobacillus plantarum* dan *L. fermentum*) berkembang optimal pada kondisi toples anaerob dengan kadar garam terukur (${saltPercentage}%), mengonversi glukosa dan fruktosa durian menjadi asam laktat sehingga pH turun ke ${finalPh.toFixed(2)}, mengawetkan durian dan menghasilkan cita rasa asam gurih khas tempoyak Lampung.`;
  } else {
    qualityStatus = 'Cukup Baik';
    aromaScore = 'Asam ringan, fermentasi belum tuntas penuh';
    textureScore = 'Mulai melunak namun belum homogen optimal';
    colorScore = 'Kuning cerah / agak pucat';
    scientificExplanation = `Fermentasi telah berjalan ke arah yang benar, namun lama waktu fermentasi (${fermentationDays} hari) atau suhu belum memberikan waktu yang cukup bagi BAL untuk mencapai akumulasi asam laktat maksimal.`;
  }

  return {
    dailyProgression: steps,
    finalPh,
    finalBalCount,
    finalPathogenRisk,
    aromaScore,
    textureScore,
    colorScore,
    qualityStatus,
    scientificExplanation,
    disclaimer: 'Data simulasi merupakan data model pembelajaran komputasi berbasis konsep bioteknologi fermentasi asam laktat pada durian, bukan hasil pengukuran langsung laboratorium basah.',
  };
}
