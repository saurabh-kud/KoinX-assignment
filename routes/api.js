const express = require("express");
const router = express.Router();

const {
  getStats,
  getDeviation,
} = require("../controllers/statsDeviationController");

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

/**
 * GET /stats
 * Returns the latest statistics for a given cryptocurrency.
 */
router.get("/stats", getStats);

/**
 * GET /deviation
 * Calculates and returns the standard deviation of prices for a given cryptocurrency.
 */
router.get("/deviation", getDeviation);

// router.get("/stats", async (req, res) => {
//   try {
//     let { coin } = req.query;

//     if (!coin) {
//       return res
//         .status(400)
//         .json({ error: "Coin query parameter is required" });
//     }

//     const validCoins = ["bitcoin", "matic", "ethereum"];
//     if (!validCoins.includes(coin)) {
//       return res.status(400).json({
//         error: "Invalid coin. Supported coins are bitcoin, matic, and ethereum",
//       });
//     }

//     if (coin === "matic") {
//       coin = "matic-network";
//     }
//     const latestRecord = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
//     if (!latestRecord) {
//       return res.status(404).json({ error: "No data found for this coin" });
//     }

//     res.json({
//       price: latestRecord.price,
//       marketCap: latestRecord.marketCap,
//       "24hChange": latestRecord.change24h,
//     });
//   } catch (error) {
//     console.error("Error in /stats route:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// /**
//  * GET /deviation
//  * Calculates and returns the standard deviation of prices for a given cryptocurrency.
//  */
// router.get("/deviation", async (req, res) => {
//   try {
//     let { coin } = req.query;

//     if (!coin) {
//       return res
//         .status(400)
//         .json({ error: "Coin query parameter is required" });
//     }

//     const validCoins = ["bitcoin", "matic", "ethereum"];
//     if (!validCoins.includes(coin)) {
//       return res.status(400).json({
//         error: "Invalid coin. Supported coins are bitcoin, matic, and ethereum",
//       });
//     }

//     if (coin === "matic") {
//       coin = "matic-network";
//     }
//     const records = await Crypto.find({ coin })
//       .sort({ timestamp: -1 })
//       .limit(100)
//       .lean();

//     if (records.length < 2) {
//       return res
//         .status(404)
//         .json({ error: "Not enough data to calculate deviation" });
//     }
//     const prices = records.map((record) => record.price);
//     const deviation = parseFloat(calculateStandardDeviation(prices).toFixed(2));

//     res.json({ deviation });
//   } catch (error) {
//     console.error("Error in /deviation route:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;
