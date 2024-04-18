import { Connection, PublicKey } from "@solana/web3.js";
import axios from "axios";

const SOL_USDT_SYMBOL = "SOLUSDT";
const BYBIT_API_URL = "https://api.bybit.com/v2/public/tickers";

async function main() {
  try {
    // Connect to Solana devnet
    const connection = new Connection("https://api.devnet.solana.com");

    // Fetch account balance
    const walletPublicKey = new PublicKey(
      "7Nbsp3XUtjzRGXAJJ7zQ6HMpE64HAF4ovPxYto4dzbdq"
    );
    const balance = await connection.getBalance(walletPublicKey);
    console.log(`Solana Balance: ${balance / 10 ** 9} SOL`);

    // Fetch SOL/USDT price from Bybit
    const response = await axios.get(`${BYBIT_API_URL}/v2/public/tickers`, {
      params: { symbol: "SOLUSDT" },
    });
    const solUsdtPrice = response.data.result[0].last_price;
    console.log(`Current Solana (SOL) Price: ${solUsdtPrice} USDT`);

    // Set buy threshold price (example)
    const buyThresholdPrice = 150; // USDT

    // Implement buy logic
    if (solUsdtPrice < buyThresholdPrice && balance > 0) {
      const quantityToBuy = Math.floor(balance / solUsdtPrice); // Buy as much SOL as possible with the balance
      const buyOrderResult = await placeBuyOrder(
        "SOLUSDT",
        solUsdtPrice,
        quantityToBuy
      );
      if (buyOrderResult) {
        console.log(
          `Buy order placed successfully: ${quantityToBuy} SOL at ${solUsdtPrice} USDT`
        );
      } else {
        console.log("Failed to place buy order.");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
