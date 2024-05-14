import axios from "axios";
import cheerio from "cheerio";

const ETHERSCAN_API = "https://api.etherscan.io/api";
const ETHERSCAN_BLOCK_URL = "https://api.etherscan.io/block/";

export const get_balance = async (apiKey, address) => {
  const url = `${ETHERSCAN_API}?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;

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

export const async_get_txs = async (api_key, address, start_date) => {
  // NO LONGER ON ARBITRUM
  // const norm_txs = `https://api-sepolia.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${api_key}`;
  const norm_txs = `${ETHERSCAN_API}?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${api_key}`;
  try {
    const response = await fetch(norm_txs);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error:", error);
  }
};

async function async_get_txs_spec(api_key, address, start_date) {
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

export const formatRelativeTime = (timestamp) => {
  const now = Date.now(); // Current timestamp in milliseconds
  const diffInSeconds = Math.floor((now - timestamp * 1000) / 1000); // Difference in seconds

  // Convert seconds to minutes, hours, days, weeks, months, and years
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44); // Approximate average number of days in a month
  const years = Math.floor(days / 365.25); // Approximate average number of days in a year

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (weeks < 4) {
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  } else if (months < 12) {
    return `${months} month${months === 1 ? "" : "s"} ago`;
  } else {
    return `${years} year${years === 1 ? "" : "s"} ago`;
  }
};

export const timestampToLocalTime = (timestamp) => {
  // Convert Unix timestamp to milliseconds by multiplying by 1000
  const milliseconds = timestamp * 1000;

  // Create a new Date object with the milliseconds
  const dateObject = new Date(milliseconds);

  // Format the date and time into a string
  const formattedDate = dateObject.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Return the formatted date string
  return formattedDate;
};

export const get_block_url = (block) => {
  return ETHERSCAN_BLOCK_URL + block;
};

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

      console.log(swapDetails);

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

// Function to map IN and OUT transactions for a specific address and contract
async function mapTransactions(userAddress, uniswapAddress, apiKey) {
  const transactionsToUniswap = await async_get_txs_spec(
    apiKey,
    userAddress,
    0
  );

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
export async function processTransactions(userAddress, apiKey) {
  const uniswapAddress = "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD";
  console.log("PROCESSING...");
  try {
    console.log(userAddress, uniswapAddress, apiKey);
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
    return null;
  }
}

/*
Input a ticker like "btc" and it checks if 
it exists in the sorted_crypto_data.json file. Then, if the coin exists,
return the coin full name (slug) like "bitcoin"
*/
export function checkTickerExists(ticker) {
  try {
    const slug = localStorage.getItem(ticker);
    if (slug) {
      return slug;
    }
    return false;
  } catch (error) {
    console.error("Error:", error.message);
    return false;
  }
}

/* returns objects inData and outData. These have the arrays: prices, market_caps, and total_volumes
We are only interested in prices.
It also modifies the prices array to multiply the value by the amount of the coin bought.
Gets prices in USD.
When getting the prices array, must call like this: returnedName.inData.prices
*/
export async function historicalData(inName, inAmt, outName, outAmt, time) {
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

export async function netTransactions(transactions) {
  let netUSD = 0;

  for (const transaction of transactions) {
      if (!transaction) continue;

      // convert all token tickers to slug
      const tokenIn = checkTickerExists(transaction.tokenInName);
      const tokenOut = checkTickerExists(transaction.tokenOutName);
      console.log(tokenIn, tokenOut);
      // const fun = await historicalData(slugName, 1, slugName, 3, 1713658546);
      const val = await historicalData(tokenIn, transaction.tokenInAmount, tokenOut, transaction.tokenOutAmount, transaction.timestamp);

      const numIn = val.inData.prices[0][1]; 
      const numOut = val.outData.prices[0][1];

      netUSD += (numOut - numIn);
  }

  return netUSD;
}