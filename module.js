import fetchOrderBook from "./module.js";

// Example usage
fetchOrderBook()
  .then((data) => {
    console.log(JSON.stringify(data, null, 4));
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
