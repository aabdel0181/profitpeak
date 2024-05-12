import Web3 from "web3";
import fs from "fs";
import abiDecoder from "abi-decoder";
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/f501be219210471882183e36c2e042db"
  )
);
import axios from "axios";
import cheerio from "cheerio";
const uni_abi = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "permit2", type: "address" },
          { internalType: "address", name: "weth9", type: "address" },
          { internalType: "address", name: "seaportV1_5", type: "address" },
          { internalType: "address", name: "seaportV1_4", type: "address" },
          { internalType: "address", name: "openseaConduit", type: "address" },
          { internalType: "address", name: "nftxZap", type: "address" },
          { internalType: "address", name: "x2y2", type: "address" },
          { internalType: "address", name: "foundation", type: "address" },
          { internalType: "address", name: "sudoswap", type: "address" },
          { internalType: "address", name: "elementMarket", type: "address" },
          { internalType: "address", name: "nft20Zap", type: "address" },
          { internalType: "address", name: "cryptopunks", type: "address" },
          { internalType: "address", name: "looksRareV2", type: "address" },
          {
            internalType: "address",
            name: "routerRewardsDistributor",
            type: "address",
          },
          {
            internalType: "address",
            name: "looksRareRewardsDistributor",
            type: "address",
          },
          { internalType: "address", name: "looksRareToken", type: "address" },
          { internalType: "address", name: "v2Factory", type: "address" },
          { internalType: "address", name: "v3Factory", type: "address" },
          {
            internalType: "bytes32",
            name: "pairInitCodeHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "poolInitCodeHash",
            type: "bytes32",
          },
        ],
        internalType: "struct RouterParameters",
        name: "params",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "BalanceTooLow", type: "error" },
  { inputs: [], name: "BuyPunkFailed", type: "error" },
  { inputs: [], name: "ContractLocked", type: "error" },
  { inputs: [], name: "ETHNotAccepted", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "commandIndex", type: "uint256" },
      { internalType: "bytes", name: "message", type: "bytes" },
    ],
    name: "ExecutionFailed",
    type: "error",
  },
  { inputs: [], name: "FromAddressIsNotOwner", type: "error" },
  { inputs: [], name: "InsufficientETH", type: "error" },
  { inputs: [], name: "InsufficientToken", type: "error" },
  { inputs: [], name: "InvalidBips", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "commandType", type: "uint256" }],
    name: "InvalidCommandType",
    type: "error",
  },
  { inputs: [], name: "InvalidOwnerERC1155", type: "error" },
  { inputs: [], name: "InvalidOwnerERC721", type: "error" },
  { inputs: [], name: "InvalidPath", type: "error" },
  { inputs: [], name: "InvalidReserves", type: "error" },
  { inputs: [], name: "InvalidSpender", type: "error" },
  { inputs: [], name: "LengthMismatch", type: "error" },
  { inputs: [], name: "SliceOutOfBounds", type: "error" },
  { inputs: [], name: "TransactionDeadlinePassed", type: "error" },
  { inputs: [], name: "UnableToClaim", type: "error" },
  { inputs: [], name: "UnsafeCast", type: "error" },
  { inputs: [], name: "V2InvalidPath", type: "error" },
  { inputs: [], name: "V2TooLittleReceived", type: "error" },
  { inputs: [], name: "V2TooMuchRequested", type: "error" },
  { inputs: [], name: "V3InvalidAmountOut", type: "error" },
  { inputs: [], name: "V3InvalidCaller", type: "error" },
  { inputs: [], name: "V3InvalidSwap", type: "error" },
  { inputs: [], name: "V3TooLittleReceived", type: "error" },
  { inputs: [], name: "V3TooMuchRequested", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsSent",
    type: "event",
  },
  {
    inputs: [{ internalType: "bytes", name: "looksRareClaim", type: "bytes" }],
    name: "collectRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "commands", type: "bytes" },
      { internalType: "bytes[]", name: "inputs", type: "bytes[]" },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "commands", type: "bytes" },
      { internalType: "bytes[]", name: "inputs", type: "bytes[]" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC1155BatchReceived",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC1155Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "int256", name: "amount0Delta", type: "int256" },
      { internalType: "int256", name: "amount1Delta", type: "int256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "uniswapV3SwapCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

async function decode_tx(inputData) {
  console.log("inputted data: ", inputData);

  try {
    abiDecoder.addABI(uni_abi);

    const data = abiDecoder.decodeMethod(inputData);
    console.log("decoded data: ", data);

    if (!data) {
      console.error("No data returned from decodeMethod.");
      return; // Exit if no data to avoid further errors
    }

    let commands = data.params.find((p) => p.name === "commands")?.value;
    let inputs = data.params.find((p) => p.name === "inputs")?.value;
    let deadline = data.params.find((p) => p.name === "deadline")?.value;

    console.log("Commands:", commands);
    console.log("Inputs:", inputs);
    console.log("Deadline:", deadline);
    inputs.forEach((input) => {
      let decodedData = abiDecoder.decodeMethod(input);
      if (decodedData) {
        console.log("INPUTS Decoded Data:", decodedData);
        // Process the decoded data as needed
        // handleDecodedData(decodedData);
      } else {
        console.log("No data could be decoded from:", input);
      }
    });
    return data; // Return the decoded data for further processing
  } catch (error) {
    console.error("Error decoding transaction input:", error);
    return; // Handle errors and exit function if necessary
  }
}

// Function to decode transaction input
async function decodeTransactionInput(contractAddress, inputData) {
  // Load the ABI from a JSON file
  console.log("Loading... the API!");
  const abi = JSON.parse(fs.readFileSync("../abi/uni_sep.json", "utf-8"));
  console.log("Loaded the API!");

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
  const norm_txs = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${start_date}&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${api_key}`;
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
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error:", error);
  }
  // 564d51775ef4d4bd9c10d35d6e1b467b218db22ea0abe9dfebb6edf8caf48447
}

async function fetchTransactionDetails(txHash) {
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
        tokenInAmount: matches[1].trim(),
        tokenInName: matches[2].trim(),
        tokenOutAmount: matches[3].trim(),
        tokenOutName: matches[4].trim(),
      };

      console.log(swapDetails);
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
  const transactionsToUniswap = await async_get_txs(apiKey, userAddress, 0);

  // TODO: create empty mapping
  const transactionPairs = []; // This will be an array of objects

  if (transactionsToUniswap && transactionsToUniswap.result) {
    for (const tx of transactionsToUniswap.result) {
      if (tx.to.toLowerCase() === uniswapAddress.toLowerCase()) {
        console.log("Transaction to Uniswap found!", tx);
        transactionPairs.push(fetchTransactionDetails(tx.hash));
      }
    }
  }

  return transactionPairs;
}

async function processTransactions() {
  const userAddress = "0xd262677A79Fb6962084a546D63a162F2336de298";
  const uniswapAddress = "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD";
  const apiKey = "DEUAPZEBDSV83YQCZ8Q37S544SERNH4RZ9";
  console.log("PROCESSING...");
  try {
    const transactions = await mapTransactions(
      userAddress,
      uniswapAddress,
      apiKey
    );
    transactions.forEach((txPair) => {
      console.log("Transaction IN:", txPair.in);
      if (txPair.out) {
        console.log("Transaction OUT:", txPair.out);
      } else {
        console.log("No matching OUT transaction found.");
      }
    });
  } catch (error) {
    console.error("Error processing transactions:", error);
  }
}

processTransactions();
