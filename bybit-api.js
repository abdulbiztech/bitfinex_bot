import { RestClientV5 } from "bybit-api";

const API_KEY = "l8XAWOHIYVVx59Opz3";
const API_SECRET = "MNTlSRdd4lXZarJjHsZD6wFiFh2Iw1iBwP5M";
const useTestnet = true;

const client = new RestClientV5({
  key: API_KEY,
  secret: API_SECRET,
  testnet: useTestnet,
});

// Function to fetch account information
async function getAccountInfo() {
  try {
    const result = await client.getAccountInfo();
    console.log("Account Info:", result);
  } catch (error) {
    console.error("Error fetching account info:", error.message);
  }
}

// Function to fetch order book for a specific symbol and category
async function getOrderBook(symbol, category) {
  try {
    const result = await client.getOrderbook({ symbol, category });
    console.log(`Order Book (${category}):`, result);
  } catch (error) {
    console.error(`Error fetching order book (${category}):`, error.message);
  }
}

// Call the functions to demonstrate API usage
getAccountInfo(); // Fetch account information
getOrderBook("BTCUSD", "linear"); // Fetch order book for BTCUSD in linear category
