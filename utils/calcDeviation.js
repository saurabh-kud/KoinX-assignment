/**
 * Calculates the standard deviation of an array of values.
 * @param {number[]} values - Array of numeric values.
 * @returns {number} The standard deviation.
 */
function calculateStandardDeviation(values) {
  if (values.length === 0) return 0;

  const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
  const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
  const variance =
    squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
  return Math.sqrt(variance);
}
module.exports = calculateStandardDeviation;
