import axios from "axios";

const API_KEY = "zZipPR1t8GwFoJe2sE";
const API_SECRET = "MNTlSRdd4lXZarJjHsZD6wFiFh2Iw1iBwP5M";

const BYBIT_API_URL = "https://api.bybit.com";

// Function to place a buy order on Bybit
async function placeBuyOrder(symbol, price, quantity) {
  const timestamp = Date.now();
  const signature = generateSignature("POST", "/private/order/create", {
    symbol,
    side: "Buy",
    price,
    qty: quantity,
    time_in_force: "GoodTillCancel",
    timestamp,
  });
  const payload = {
    api_key: API_KEY,
    symbol,
    side: "Buy",
    order_type: "Limit",
    qty: quantity,
    price,
    time_in_force: "GoodTillCancel",
    timestamp,
    sign: signature,
  };
  try {
    const response = await axios.post(
      `${BYBIT_API_URL}/v2/private/order/create`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error placing buy order:", error);
    return null;
  }
}

// Function to generate HMAC signature for Bybit private API
function generateSignature(method, endpoint, params) {
  const queryString = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const payload = `${method}${endpoint}${queryString}`;
  const signature = crypto
    .createHmac("sha256", API_SECRET)
    .update(payload)
    .digest("hex");
  return signature;
}
