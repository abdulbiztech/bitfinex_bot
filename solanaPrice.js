// Import the default export from 'axios'
import axios from "axios";

async function getSolanaPrice() {
  try {
    // Define Bybit API endpoint for SOL/USDT market data
    const endpoint = "https://api.bybit.com/v2/public/tickers";
    const symbol = "SOLUSDT";

    // Define query parameters
    const params = { symbol };

    // Send GET request to Bybit API using axios.get method
    const response = await axios.get(endpoint, { params });

    // Extract the price of SOL/USDT from the response
    if (response.data.ret_code === 0 && response.data.result.length > 0) {
      const solUsdtPrice = parseFloat(response.data.result[0].last_price);
      console.log(`Current Solana (SOL) Price: ${solUsdtPrice} USDT`);
      return solUsdtPrice;
    } else {
      console.log("Failed to fetch Solana price");
      return null;
    }
  } catch (error) {
    console.error("Request Error:", error.message);
    return null;
  }
}

// Call the function to get Solana price
getSolanaPrice();
