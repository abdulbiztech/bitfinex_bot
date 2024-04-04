import { Connection, Keypair } from "@solana/web3.js";

const providerUrl = "https://api.devnet.solana.com";
const connection = new Connection(providerUrl);

async function createWallet() {
  try {
    // Generate a new Solana wallet keypair
    const walletKeyPair = Keypair.generate();

    console.log("Public Key:", walletKeyPair.publicKey.toString());
    console.log("Secret Key:", walletKeyPair.secretKey.toString());

    // Use the wallet keypair for further operations
    // For example, you can use it to sign transactions

    return walletKeyPair;
  } catch (error) {
    console.error("Error creating wallet:", error);
  }
}

// Call the function to create a wallet
createWallet();
