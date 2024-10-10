const Crypto = require("../models/crypto");
const calculateStandardDeviation = require("../utils/calcDeviation");
const asyncHandler = require("express-async-handler");

/**
 * Returns the latest statistics for a given cryptocurrency.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The latest statistics for the given cryptocurrency.
 */
const getStats = asyncHandler(async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) {
      res.status(400);
      throw new Error("Coin query parameter is required");
    }

    const validCoins = ["bitcoin", "matic", "ethereum"];
    if (!validCoins.includes(coin)) {
      res.status(400);
      throw new Error(
        "Invalid coin. Supported coins are bitcoin, matic, and ethereum"
      );
    }

    let coinName = coin === "matic" ? "matic-network" : coin;
    const latestRecord = await Crypto.findOne({ coin: coinName }).sort({
      timestamp: -1,
    });
    if (!latestRecord) {
      res.status(404);
      throw new Error("No data found for this coin");
    }

    res.json({
      price: latestRecord.price,
      marketCap: latestRecord.marketCap,
      "24hChange": latestRecord.change24h,
    });
  } catch (error) {
    console.error("Error in getStats:", error);
    throw new Error(error.message);
  }
});

/**
 * Calculates and returns the standard deviation of prices for a given cryptocurrency.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The standard deviation of prices for the given cryptocurrency.
 */
const getDeviation = asyncHandler(async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) {
      res.status(400);
      throw new Error("Coin query parameter is required");
    }

    const validCoins = ["bitcoin", "matic", "ethereum"];
    if (!validCoins.includes(coin)) {
      res.status(400);
      throw new Error(
        "Invalid coin. Supported coins are bitcoin, matic, and ethereum"
      );
    }

    let coinName = coin === "matic" ? "matic-network" : coin;
    const records = await Crypto.find({ coin: coinName })
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();

    if (records.length < 2) {
      res.status(400);
      throw new Error("Not enough data to calculate deviation");
    }
    const prices = records.map((record) => record.price);
    const deviation = parseFloat(calculateStandardDeviation(prices).toFixed(2));

    res.json({ deviation });
  } catch (error) {
    console.error("Error in getDeviation:", error);
    throw new Error(error.message);
  }
});

module.exports = {
  getStats,
  getDeviation,
};
