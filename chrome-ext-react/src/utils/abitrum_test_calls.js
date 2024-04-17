export const get_balance = async (apiKey, address) => {
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

export const async_get_txs = async (api_key, address, start_date) => {
  // NO LONGER ON ARBITRUM
  // const norm_txs = `https://api-sepolia.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${api_key}`;
  const norm_txs = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${api_key}`;
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

// Example usage:
const timestamp = 1712693844; // Example timestamp
const relativeTime = formatRelativeTime(timestamp);
console.log(relativeTime); // Output: "3 weeks ago" (or whatever the calculated relative time is)
