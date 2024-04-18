import { Connection, PublicKey } from "@solana/web3.js";

async function checkBalance(walletAddress) {
  try {
    // Connect to the Solana network (Devnet in this example)
    const connection = new Connection("https://api.devnet.solana.com");

    // Convert wallet address to PublicKey object
    const publicKey = new PublicKey(walletAddress);

    // Retrieve the balance of the wallet address
    const balance = await connection.getBalance(publicKey);
    console.log(`Wallet balance: ${balance / 10 ** 9} SOL`); // Convert lamports to SOL
  } catch (error) {
    console.error("Error:", error);
  }
}

// Replace 'YOUR_WALLET_ADDRESS' with the actual Solana wallet address to check
const walletAddress = "7Nbsp3XUtjzRGXAJJ7zQ6HMpE64HAF4ovPxYto4dzbdq";

// Call the function to check the balance
checkBalance(walletAddress);
