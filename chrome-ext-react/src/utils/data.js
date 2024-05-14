import fetch from "node-fetch";
import fs from "fs";
import axios from "axios";
import cheerio from "cheerio";

/*
Get transaction history for an address
*/
async function async_get_txs(api_key, address, start_date) {
  const norm_txs = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${api_key}`;
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
    // only get transactions using uniswap:
    // data.result = data.result.filter(transaction => {
    //   return transaction.from === '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD' || transaction.to === '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD';
    // });
    // data.result.forEach((transaction) => {
    //   transaction.timeStamp = new Date(
    //     parseInt(transaction.timeStamp, 10) * 1000
    //   );
    // });
    // console.log(data);
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error:", error);
  }
}

/*
Using the Coin Cap API to get the top 100 coins and 
store the array in sorted_crypto_data.json
*/
async function getCoinIdCoinCap() {
  try {
    const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-CMC_PRO_API_KEY": "0685549f-d9a5-4c08-99f8-e45351b8f2cf",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    const filteredData = data.data.filter((coin) => coin.rank <= 100);
    const sortedData = filteredData.sort((a, b) => a.rank - b.rank);
    fs.writeFileSync(
      "sorted_crypto_data.json",
      JSON.stringify(sortedData, null, 2)
    );
    return sortedData;
    // const coin = data.find(coin => coin.symbol === ticker.toLowerCase());

    // if (coin) {
    //     return coin.id;
    // } else {
    //     throw new Error(`Coin with ticker '${ticker}' not found.`);
    // }
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

/*
Input a ticker like "btc" and it checks if 
it exists in the sorted_crypto_data.json file. Then, if the coin exists,
return the coin full name (slug) like "bitcoin"
*/
function checkTickerExists(ticker) {
  try {
    const rawData = fs.readFileSync("sorted_crypto_data.json");
    const cryptoData = JSON.parse(rawData);

    const coin = cryptoData.find(
      (coin) => coin.symbol.toLowerCase() === ticker.toLowerCase()
    );
    if (coin) {
      return coin.slug;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return false;
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

// in coin name, out coin name, time, output: historical date for each coin
// convert amount coin to usd

/* returns objects inData and outData. These have the arrays: prices, market_caps, and total_volumes
We are only interested in prices.
It also modifies the prices array to multiply the value by the amount of the coin bought.
Gets prices in USD.
When getting the prices array, must call like this: returnedName.inData.prices
*/
async function historicalData(inName, inAmt, outName, outAmt, time) {
  try {
    const inUrl = `https://api.coingecko.com/api/v3/coins/${inName}/market_chart/range?vs_currency=usd&from=${time}&to=9999999999`;
    const outUrl = `https://api.coingecko.com/api/v3/coins/${outName}/market_chart/range?vs_currency=usd&from=${time}&to=9999999999`;
    const inOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-aBJNgqwjUNLeSoXcHHJdR4Ko",
      },
    };
    const outOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-aBJNgqwjUNLeSoXcHHJdR4Ko",
      },
    };
    const inResponse = await fetch(inUrl, inOptions);
    const outResponse = await fetch(outUrl, outOptions);
    const inData = await inResponse.json();
    const outData = await outResponse.json();
    inData.prices = inData.prices.map(([timestamp, value]) => [
      timestamp,
      value * inAmt,
    ]);
    outData.prices = outData.prices.map(([timestamp, value]) => [
      timestamp,
      value * outAmt,
    ]);
    return { inData, outData };
    // console.log(data);
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

// Define the API URL and function to fetch transaction data
// const apiKey = process.env.REACT_APP_GECKO_API_KEY;
// console.log(apiKey);
// console.log(import.meta.env.REACT_APP_GECKO_API_KEY)

// function for webscraping on a particular tx hash
async function fetchTransactionDetails(txHash, time) {
  const url = `https://etherscan.io/tx/${txHash}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const wrapperContent = $("#wrapperContent");

    // Extracting the token details directly from the structure
    let detailsText = wrapperContent.text(); // Get all text from the container

    // regex
    const tokenRegex =
      /(\d+\.?\d*)\s*([a-zA-Z]+)\s*for\s*(\d+\.?\d*)\s*([a-zA-Z]+)\s*on\s*Uniswap/;

    let matches = detailsText.match(tokenRegex);
    if (matches && matches.length >= 5) {
      const swapDetails = {
        timestamp: time,
        tokenInAmount: matches[1].trim(),
        tokenInName: matches[2].trim(),
        tokenOutAmount: matches[3].trim(),
        tokenOutName: matches[4].trim(),
      };

      // console.log(swapDetails);
      return swapDetails;
    } else {
      console.log("No match found or incorrect format in transaction details.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    return null;
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

// Function to map IN and OUT transactions for a specific address and contract
async function mapTransactions(userAddress, uniswapAddress, apiKey) {
  const transactionsToUniswap = await async_get_txs(apiKey, userAddress, 0);

  // TODO: create empty mapping
  const transactionPairs = []; // This will be an array of objects

  if (transactionsToUniswap && transactionsToUniswap.result) {
    for (const tx of transactionsToUniswap.result) {
      if (tx.to.toLowerCase() === uniswapAddress.toLowerCase()) {
        // calls webscraper for each tx to uniswap found
        transactionPairs.push(fetchTransactionDetails(tx.hash, tx.timeStamp));
      }
    }
  }

  return transactionPairs;
}

// main function that fetches all txs, and gets the mapping
async function processTransactions() {
  const userAddress = "0xd262677A79Fb6962084a546D63a162F2336de298";
  const uniswapAddress = "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD";
  const apiKey = "DEUAPZEBDSV83YQCZ8Q37S544SERNH4RZ9";
  console.log("PROCESSING...");
  try {
    // array of promises
    const transactionsPromises = await mapTransactions(
      userAddress,
      uniswapAddress,
      apiKey
    );

    // Await all promises to resolve
    const transactions = await Promise.all(transactionsPromises);
    // console.log("OUTPUTS: ", transactions);
    return transactions;
  } catch (error) {
    console.error("Error processing transactions:", error);
  }
}

// Main function to process transactions
(async () => {
  let x = await processTransactions();
  console.log(x);
  // try {
  //   const info = await getCoinIdCoinCap();
  //   console.log(info);
  // } catch (error) {
  //   console.error(error);
  // }
  // try {
  //   const btcId = await getCoinId("doge");
  //   console.log("ID for ticker 'dogecoin':", btcId);
  // } catch (error) {
  //     console.error(error);
  // }
  // try {
  //   const fun = await historicalData("bitcoin", 1, "bitcoin", 3, 1713658546);
  //   console.log(fun);
  // } catch (error) {
  //   console.error(error);
  // }
  const ticker = "BTC";
  const slugName = checkTickerExists(ticker);
  console.log(`Ticker ${ticker} exists: ${slugName}`);
  const fun = await historicalData(slugName, 1, slugName, 3, 1713658546);
  console.log(fun.inData);
  console.log(fun.outData);
})();
