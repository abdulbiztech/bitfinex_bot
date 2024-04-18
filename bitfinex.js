import ccxt from "ccxt";
import readline from "readline";

async function simulateTrading() {
  const exchange = new ccxt.kraken({
    apiKey: "VZPPwN5zFghnaT9cFbh8HRaSNLZSaaJUVkmdBCxvHuskv4iJG618jz9p",
    secret:
      "qKTcgLap623V6aTt8YJHbAOrubEhUL21zb6byTzAGAyxP+g7wqgL8RO5Kc9o7HP0L3oO8YHSpEOOfcmeeDIBBA==",
    // Add any additional options here (e.g., enableRateLimit: true)
  });

  try {
    let virtualUSDBalance = 1000; // Initial virtual USD balance
    let virtualSOLBalance = 0; // Initial virtual SOL balance

    while (true) {
      const currentMarketPrice = await getMarketPrice(exchange, "SOL/USD");
      console.log(`Current Market Price (SOL/USD): ${currentMarketPrice} USD`);

      // Enter your buy and sell price logic here
      const buyPrice = 150.5;
      const sellPrice = 150.9;

      if (currentMarketPrice < buyPrice && virtualUSDBalance > 0) {
        const buyAmount = Math.floor(virtualUSDBalance / currentMarketPrice);
        await executeOrder(
          exchange,
          "buy",
          "SOL/USD",
          buyAmount,
          currentMarketPrice
        );
        console.log(
          `Executed Buy Order: Bought ${buyAmount} SOL at ${currentMarketPrice} USD`
        );
        // Update virtual balances after buying
        virtualUSDBalance -= buyAmount * currentMarketPrice;
        virtualSOLBalance += buyAmount;
      }

      if (currentMarketPrice > sellPrice && virtualSOLBalance > 0) {
        await executeOrder(
          exchange,
          "sell",
          "SOL/USD",
          virtualSOLBalance,
          currentMarketPrice
        );
        console.log(
          `Executed Sell Order: Sold ${virtualSOLBalance} SOL at ${currentMarketPrice} USD`
        );
        // Update virtual balances after selling
        virtualUSDBalance += virtualSOLBalance * currentMarketPrice;
        virtualSOLBalance = 0;
        break; // Exit loop after successful sell order
      }

      // Pause for 5 seconds before checking market conditions again
      await sleep(5000);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getMarketPrice(exchange, symbol) {
  const ticker = await exchange.fetchTicker(symbol);
  return ticker.last;
}

async function executeOrder(exchange, side, symbol, amount, price) {
  // Execute a market order (buy or sell) on the exchange
  const order = await exchange.createOrder(
    symbol,
    "market",
    side,
    amount,
    price
  );
  return order;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Execute simulated trading function
simulateTrading();
