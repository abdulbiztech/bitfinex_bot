import axios from "axios";
import { createHmac } from "crypto";

const API_KEY = "4f14b60e9193b88ed35ac17aefc6b72cc7ec3d99";
const API_SECRET =
  "10a2093c4625c8041896e4b71af86244f16fb44ace30eb2d81c0fa2ae2c1730a";
const API_MEMO = "test";
const BASE_URL = "https://api-cloud.bitmart.com";

function getTimestamp() {
  return new Date().getTime().toString();
}

function generateSignature(timestamp, body) {
  const message = `${timestamp}#${API_MEMO}#${body}`;
  return createHmac("sha256", API_SECRET).update(message).digest("hex");
}
async function placeOrder(side, symbol, size, price) {
  const path = "/spot/v2/submit_order";
  const timestamp = getTimestamp();
  const body = {
    size: size,
    price: price,
    side: side,
    symbol: symbol,
    type: "limit",
  };
  const headers = {
    "Content-Type": "application/json",
    "X-BM-KEY": API_KEY,
    "X-BM-TIMESTAMP": timestamp,
    "X-BM-SIGN": generateSignature(timestamp, JSON.stringify(body)),
  };
  console.log("headerslogg", headers);
  const url = BASE_URL + path;
  try {
    const response = await axios.post(url, body, { headers });
    console.log("response loggin", response.data);
  } catch (error) {
    console.error("Error placing order:", error);
    console.error("Response Data:", error.response);
  }
}

async function getOverallPrice() {
  try {
    const response = await axios.get(
      "https://api-cloud.bitmart.com/spot/v1/ticker_detail?symbol=DEOD_USDT"
    );
    console.log("response", response);
    const bestBidPrice = response.data.data.best_bid;
    console.log("bestBidPrice", bestBidPrice);
    return parseFloat(bestBidPrice);
  } catch (error) {
    console.error("Error fetching best bid price:", error);
    throw error;
  }
}

async function main() {
  while (true) {
    try {
      const randomUsdtPrice = Math.random() * (7 - 6) + 6; // Random price between 6 and 7
      const usdtPrice = await getOverallPrice();
      const deodSize = Math.floor(6 / usdtPrice);
      const usdtSize = Math.floor(deodSize * usdtPrice);

      console.log("Random USDT Price:", randomUsdtPrice);
      console.log("Current DEOD Price:", usdtPrice);
      console.log("DEOD Size:", deodSize);
      console.log("USDT Size:", usdtSize);

      await placeOrder("buy", "DEOD_USDT", deodSize, usdtPrice);
      await placeOrder("sell", "DEOD_USDT", usdtSize, usdtPrice);

      await new Promise((resolve) => setTimeout(resolve, 30000)); // 30 second delay
    } catch (error) {
      console.error("Error in main loop:", error);
    }
  }
}

main();
