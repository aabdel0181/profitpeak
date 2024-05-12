import fs from "fs";

async function get_closest_block(api_key, timestamp) {
  // const url = `https://api-sepolia.etherscan.io/api
  // ?module=block
  // &action=getblocknobytime
  // &timestamp=${timestamp}
  // &closest=before
  // &apikey=${api_key}`;
  const url2 = `https://api-sepolia.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${api_key}`;
  try {
    const response = await fetch(url2);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.result;
  } catch (err) {
    return 0;
  }
}

// Define the API URL
async function async_get_txs(api_key, address, start_date) {
  // NO LONGER ON ARBITRUM
  // const norm_txs = `https://api-sepolia.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${api_key}`;
  const norm_txs = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${api_key}`;
  try {
    const response = await fetch(norm_txs);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log(data);
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

const get_date_years_ago = (years) => {
  // Get the current date
  const currentDate = new Date();

  // Subtract 2 years from the current date
  const twoYearsAgo = new Date(currentDate);
  twoYearsAgo.setFullYear(currentDate.getFullYear() - 2);

  // Convert the date to Unix timestamp (milliseconds since January 1, 1970)
  const unixTimestamp = Math.floor(twoYearsAgo.getTime() / 1000);

  return unixTimestamp;
};

const main = async () => {
  const apiKey = "ZSPYYMRN3UBZTQ1KF3VMHY19JUKNRYWTF5";
  const address = "0xF15DC770221B99C98D4aAEd568f2ab04B9d16e42"; //"0xbE197f43EC7b1B0f50BACF77c12C262C435EeD4D";

  //const res = await get_balance(apiKey, address);
  //console.log(res);

  const prevDate = await get_closest_block(apiKey, get_date_years_ago(1));
  const res2 = await async_get_txs(apiKey, address, prevDate);
  console.log(res2.result.length);

  // const res3 = await get_closest_block(apiKey, get_date_years_ago(1));
  // console.log("out", res3);

  const content = JSON.stringify(res2);
  fs.writeFile("./test_output.json", content, (err) => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
};

main();
