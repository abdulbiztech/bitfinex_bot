import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import axios from "axios";

const providerUrl = "https://api.devnet.solana.com"; // Use the appropriate network URL
const connection = new Connection(providerUrl);

const walletPrivateKey =
  "183,21,191,64,170,72,153,177,153,198,112,228,52,199,252,37,156,215,129,230,215,139,206,204,56,160,42,135,78,235,175,208,29,253,101,17,124,148,162,241,100,134,100,8,192,86,243,6,101,15,145,51,109,37,177,134,232,203,152,107,65,80,91,107"; // Private key of the wallet used for trading
const secretKeyBytes = Uint8Array.from(walletPrivateKey.split(",").map(Number)); // Assuming walletPrivateKey is a string of comma-separated integers representing the secret key
const walletKeyPair = Keypair.fromSecretKey(secretKeyBytes);

async function getPrice(tokenSymbol) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbol}&vs_currencies=usd`
    );
    console.log("response", response);
    // Extract the price from the response data
    const price = response.data[tokenSymbol.toLowerCase()].usd;

    // Return the price
    return price;
  } catch (error) {
    // Handle errors (e.g., API request failure)
    console.error("Error fetching token price:", error);
    throw error;
  }
}

// async function placeOrder(side, tokenSymbol, size, price) {
//   // Implement logic to place a buy or sell order on the Solana DEX
// }

async function getOverallPrice(tokenSymbols) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbols.join(
        ","
      )}&vs_currencies=usd`
    );
    console.log("response", response);

    const prices = {};
    for (const tokenSymbol of tokenSymbols) {
      const price = response.data[tokenSymbol.toLowerCase()].usd;
      prices[tokenSymbol] = price;
    }

    return prices;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    throw error;
  }
}
async function main() {
  try {
    const tokenSymbols = ["BTC", "ETH", "SOL"]; // Example tokens
    const prices = await getOverallPrice(tokenSymbols);
    console.log(prices);
  } catch (error) {
    console.error("Error in main loop:", error);
  }
}

main();
