// Define the API URL
async function async_get_txs(api_key, address, start_date) {
  // NO LONGER ON ARBITRUM
  // const norm_txs = `https://api-sepolia.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${api_key}`;
  const norm_txs = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${api_key}`;
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

const get_balance = async (apiKey, address) => {
  const url = `https://api-sepolia.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// (async () => {
//   const apiKey = "ZSPYYMRN3UBZTQ1KF3VMHY19JUKNRYWTF5";
//   const address = "0xbE197f43EC7b1B0f50BACF77c12C262C435EeD4D";
//   const startDate = "0";
//   const tx_response = await async_get_txs(apiKey, address, startDate);

//   // Processing the response
//   if (
//     tx_response &&
//     tx_response.result &&
//     tx_response.result.some(
//       (tx) =>
//         tx.from.toLowerCase() ===
//         "0xbE197f43EC7b1B0f50BACF77c12C262C435EeD4D".toLowerCase()
//     )
//   ) {
//     console.log("Found");
//   }
// })();

const main = async () => {
  const apiKey = "ZSPYYMRN3UBZTQ1KF3VMHY19JUKNRYWTF5";
  const address = "0xbE197f43EC7b1B0f50BACF77c12C262C435EeD4D";

  const res = await get_balance(apiKey, address);
  console.log(res);
};

main();
