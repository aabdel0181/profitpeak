import fetch from 'node-fetch';
// Define the API URL and function to fetch transaction data
// const apiKey = process.env.REACT_APP_GECKO_API_KEY;
// console.log(apiKey);
// console.log(import.meta.env.REACT_APP_GECKO_API_KEY)

// console.log(`${process.env.REACT_APP_FIREBASE_API_KEY}`);
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
    // data.result.forEach((transaction) => {
    //   transaction.value = parseFloat(transaction.value) / Math.pow(10, 18);
    // });
    data.result.forEach((transaction) => {
      transaction.timeStamp = new Date(
        parseInt(transaction.timeStamp, 10) * 1000
      );
    });
    // data.result.forEach((transaction) => {
    //   transaction.valueUsd = transaction.value * ethUsdRate;
    // });
    console.log(data);
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error:", error);
  }
  // 564d51775ef4d4bd9c10d35d6e1b467b218db22ea0abe9dfebb6edf8caf48447
}


async function getCoinId(ticker) {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/list';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-aBJNgqwjUNLeSoXcHHJdR4Ko'
            }
        };

        const response = await fetch(url, options);
        const data = await response.json();

        const coin = data.find(coin => coin.symbol === ticker.toLowerCase());

        if (coin) {
            return coin.id;
        } else {
            throw new Error(`Coin with ticker '${ticker}' not found.`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}


// 1 day from current time = 5-minutely data
// 1 day from any time (except current time) = hourly data
// 2 - 90 days from any time = hourly data
// above 90 days from any time = daily data (00:00 UTC)
// Cache / Update Frequency:
// Based on days range (all the API plans)
// 1 day = 30 seconds cache
// 2 -90 days = 30 minutes cache
// 90 days = 12 hours cache

async function historicalData(inName, inAmt, outName, outAmt, time) {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${inName}/market_chart/range?vs_currency=usd&from=${time}&to=9999999999`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        'x-cg-demo-api-key': 'CG-aBJNgqwjUNLeSoXcHHJdR4Ko'
      }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
    // console.log(data);
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
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
  try {
    const btcId = await getCoinId("eth");
    console.log("ID for ticker 'eth':", btcId);
  } catch (error) {
      console.error(error);
  }
  try {
    const fun = await historicalData("bitcoin", 1, "bitcoin", 3, 1713658546);
    console.log(fun);
  } catch (error) {
    console.error(error);
  }
})();
