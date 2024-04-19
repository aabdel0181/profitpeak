import Web3 from "web3";
import fs from "fs";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/f501be219210471882183e36c2e042db"
  )
);

// Function to decode transaction input
async function decodeTransactionInput(contractAddress, inputData) {
  // Load the ABI from a JSON file
  const abi = JSON.parse(fs.readFileSync("../abi/uni_sep.json", "utf-8"));

  // Create a contract instance
  const contract = new web3.eth.Contract(abi, contractAddress);

  // Assuming we know the method ID, let's extract it to find the corresponding ABI item
  const methodId = inputData.slice(0, 10); // First 10 characters represent the method ID
  const functionABI = abi.find(
    (item) => web3.eth.abi.encodeFunctionSignature(item) === methodId
  );

  if (!functionABI) {
    throw new Error("Function ABI not found for the method ID provided.");
  }

  // Decode the input data
  const decodedInput = web3.eth.abi.decodeParameters(
    functionABI.inputs,
    inputData.slice(10)
  ); // Slice off the method ID before decoding
  return decodedInput;
}
// Define the API URL and function to fetch transaction data
async function async_get_txs(api_key, address, start_date) {
  const norm_txs = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${api_key}`;
  const ethToUsdUrl =
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=564d51775ef4d4bd9c10d35d6e1b467b218db22ea0abe9dfebb6edf8caf48447";
  try {
    const response = await fetch(norm_txs);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const ethToUsdResponse = await fetch(ethToUsdUrl);
    if (!ethToUsdResponse.ok) {
      throw new Error("Failed to fetch ETH to USD conversion rate");
    }
    const ethToUsdData = await ethToUsdResponse.json();
    const ethUsdRate = ethToUsdData.USD;
    // console.log(data);
    // only get transactions using uniswap:
    // data.result = data.result.filter(transaction => {
    //   return transaction.from === '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD' || transaction.to === '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD';
    // });
    data.result.forEach((transaction) => {
      transaction.value = parseFloat(transaction.value) / Math.pow(10, 18);
    });
    data.result.forEach((transaction) => {
      transaction.timeStamp = new Date(
        parseInt(transaction.timeStamp, 10) * 1000
      );
    });
    data.result.forEach((transaction) => {
      transaction.valueUsd = transaction.value * ethUsdRate;
    });
    console.log(data);
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error:", error);
  }
  // 564d51775ef4d4bd9c10d35d6e1b467b218db22ea0abe9dfebb6edf8caf48447
}

// Function to fetch internal transactions by transaction hash
async function getInternalTransactions(api_key, txHash, address) {
  const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlistinternal&txhash=${txHash}&apikey=${api_key}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch internal transactions");
    }
    const data = await response.json();
    console.log("Internal Transactions:", data);
    return data;
  } catch (error) {
    console.error("Error fetching internal transactions:", error);
  }
}

// Main function to process transactions
(async () => {
  const uniswapAddress = "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD";
  const tx_response = await async_get_txs(
    "ZSPYYMRN3UBZTQ1KF3VMHY19JUKNRYWTF5",
    "0xbE197f43EC7b1B0f50BACF77c12C262C435EeD4D",
    "0"
  );

  // Processing the response to check for transactions to Uniswap
  if (tx_response && tx_response.result) {
    for (const tx of tx_response.result) {
      if (tx.to.toLowerCase() === uniswapAddress.toLowerCase()) {
        console.log("Transaction to Uniswap found:", tx);
        await getInternalTransactions(
          "ZSPYYMRN3UBZTQ1KF3VMHY19JUKNRYWTF5",
          tx.hash,
          "0xbE197f43EC7b1B0f50BACF77c12C262C435EeD4D"
        ); // Fetch and output internal transactions
      }
    }
  }
  for (const tx of tx_response.result) {
    decodeTransactionInput(uniswapAddress, tx.input)
      .then((decoded) => {
        console.log("Decoded Input Data:", decoded);
      })
      .catch((error) => {
        console.error("Error decoding input:", error);
      });
  }
})();
