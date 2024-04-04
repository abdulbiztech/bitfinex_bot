import axios from "axios";
import { createHmac } from "crypto";

// API endpoint for fetching order book
const url = "https://api.bybit.com/v2/public/orderBook/L2";

// API key and secret key
const api_key = "zZipPR1t8GwFoJe2sE";
const api_secret = "MNTlSRdd4lXZarJjHsZD6wFiFh2Iw1iBwP5M";

// Additional parameters
const symbol = "SOLUSDT"; // Solana/USDT trading pair
const limit = 10; // Number of order book levels to retrieve

// Function to generate HMAC signature
function generateSignature(api_secret, sign_str) {
  return createHmac("sha256", api_secret).update(sign_str).digest("hex");
}

// Construct request parameters
const params = {
  symbol: symbol,
  limit: limit,
};

// Generate timestamp
const timestamp = Math.floor(Date.now());

// Construct signature
const sign_str = `GET/realtime${timestamp}`;
const signature = generateSignature(api_secret, sign_str);

// Include API key, timestamp, and signature in request headers
const headers = {
  api_key: api_key,
  timestamp: timestamp.toString(),
  sign: signature,
};

// Function to fetch order book data
async function fetchOrderBook() {
  try {
    const response = await axios.get(url, { params: params, headers: headers });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Export the module
export default fetchOrderBook;
