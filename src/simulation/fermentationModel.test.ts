import test from 'node:test';
import assert from 'node:assert/strict';
import { runFermentationSimulation } from './fermentationModel.ts';

test('Tempoyak simulation under optimal conditions (garam 4%, 28°C, anaerob) produces lower pH and Optimal status', () => {
  const result = runFermentationSimulation({
    massGrams: 250,
    saltPercentage: 4,
    fermentationDays: 7,
    storageTempCelsius: 28,
    containerCondition: 'anaerob',
  });

  assert.equal(result.qualityStatus, 'Optimal');
  assert.ok(result.finalPh <= 4.4, `Final pH should be <= 4.4, got ${result.finalPh}`);
  assert.ok(result.dailyProgression.length === 8, 'Daily progression should have 8 steps (day 0 to 7)');
  assert.ok(result.finalBalCount > 6.0, 'BAL population should thrive in optimal conditions');
});

test('Tempoyak with 0% salt in aerobic container leads to failure/spoilage', () => {
  const result = runFermentationSimulation({
    massGrams: 250,
    saltPercentage: 0,
    fermentationDays: 7,
    storageTempCelsius: 28,
    containerCondition: 'aerob',
  });

  assert.equal(result.qualityStatus, 'Gagal / Kontaminasi Pembusuk');
  assert.ok(result.finalPathogenRisk > 20, 'Pathogen risk should be elevated');
  assert.ok(result.finalPh > 5.0, 'pH should not drop deeply in spoilage state');
});

test('High salt concentration (>10%) slows down tempoyak fermentation kinetics', () => {
  const highSalt = runFermentationSimulation({
    massGrams: 250,
    saltPercentage: 15,
    fermentationDays: 7,
    storageTempCelsius: 28,
    containerCondition: 'anaerob',
  });

  assert.equal(highSalt.qualityStatus, 'Terlalu Asin / Fermentasi Lambat');
  assert.ok(highSalt.finalPh >= 4.6, 'High salt inhibits BAL acid production rate');
});

test('Cold storage temperature (15°C) slows down tempoyak acidification', () => {
  const cold = runFermentationSimulation({
    massGrams: 250,
    saltPercentage: 4,
    fermentationDays: 7,
    storageTempCelsius: 15,
    containerCondition: 'anaerob',
  });

  const optimal = runFermentationSimulation({
    massGrams: 250,
    saltPercentage: 4,
    fermentationDays: 7,
    storageTempCelsius: 28,
    containerCondition: 'anaerob',
  });

  assert.ok(cold.finalPh > optimal.finalPh, 'Cold temperature should result in slower pH drop');
});
