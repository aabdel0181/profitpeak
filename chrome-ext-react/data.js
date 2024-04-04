// Define the API URL
async function async_get_txs(api_key, address, start_date) {
  const norm_txs = `https://api-sepolia.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${api_key}`;

  try {
    const response = await fetch(norm_txs);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error:", error);
  }
}

(async () => {
  // An IIFE (Immediately Invoked Function Expression) to use await at the top level
  const tx_response = await async_get_txs(
    "BPEKEDICIBHURQCA92GMSMI8RFGYEFHGDV",
    "0xd262677A79Fb6962084a546D63a162F2336de298",
    "0"
  );

  // Processing the response:
  if (
    tx_response &&
    tx_response.result &&
    tx_response.result.some(
      (tx) =>
        tx.to.toLowerCase() ===
        "0xd262677a79fb6962084a546d63a162f2336de298".toLowerCase()
    )
  ) {
    console.log("Wow");
  }
})();
