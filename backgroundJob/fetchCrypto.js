const axios = require("axios");
const Crypto = require("../models/crypto");

const COINS = ["bitcoin", "matic-network", "ethereum"];
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";

const fetchCryptoData = async () => {
  try {
    console.log("Fetching crypto data...");
    const { data } = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: COINS.join(","),
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_change: true,
      },
      timeout: 5000,
    });

    const cryptoUpdates = COINS.map((coin) => ({
      coin,
      price: data[coin].usd,
      marketCap: data[coin].usd_market_cap,
      change24h: data[coin].usd_24h_change,
      timestamp: new Date(),
    }));

    await Crypto.insertMany(cryptoUpdates);
    console.log("Crypto data updated successfully");
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
  }
};

module.exports = fetchCryptoData;
