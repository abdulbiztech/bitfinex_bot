import axios from "axios";
import crypto from "crypto";

// API endpoint for placing orders
const orderUrl = "https://api.bybit.com/open-api/order/create";

// Your API key and secret
const api_key = "zZipPR1t8GwFoJe2sE";
const api_secret = "MNTlSRdd4lXZarJjHsZD6wFiFh2Iw1iBwP5M";

// Additional parameters for placing orders
const symbol = "SOLUSDT"; // Solana/USDT trading pair
const quantity = 10; // Quantity of SOL to buy or sell
const price = 188; // Price at which to place the order
const side = "Buy"; // Buy or Sell
const orderType = "Limit"; // Limit or Market

// Generate timestamp
const timestamp = Date.now();

// Construct signature
const sign_str = `POST/api/v2/private/v5/order/create${timestamp}${JSON.stringify(
  {
    symbol,
    side,
    order_type: orderType,
    qty: quantity,
    price,
  }
)}`;
const signature = crypto
  .createHmac("sha256", api_secret)
  .update(sign_str)
  .digest("hex");

// Include API key, timestamp, and signature in request headers
const headers = {
  "api-key": api_key,
  timestamp: timestamp.toString(),
  sign: signature,
};

// Request body for placing an order
const requestBody = {
  symbol,
  side,
  order_type: orderType,
  qty: quantity,
  price,
};

// Make API request to place an order
axios
  .post(orderUrl, requestBody, { headers })
  .then((response) => {
    console.log("res", response.data); // Order response
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
