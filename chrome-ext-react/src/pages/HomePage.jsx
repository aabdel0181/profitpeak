import {
  Box,
  Flex,
  Loader,
  Title,
  Divider,
  Table,
  ScrollArea,
} from "@mantine/core";
import { useState, useEffect } from "react";

import Header from "../Components/Header";

import {
  get_balance,
  async_get_txs,
  formatRelativeTime,
} from "../utils/abitrum_test_calls";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const [walletKey, setWalletKey] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [transactions, setTransactions] = useState([]);

  const shortenStr = (str) => {
    if (str.length > 8) {
      return str.slice(0, 5) + "...";
    } else {
      return str;
    }
  };

  const divideAndRound = (number) => {
    // Divide the number by 1_000_000_000_000_000_000 and round to 4 decimal places
    const result = (number / 1_000_000_000_000_000_000).toFixed(4);
    return parseFloat(result); // Parse the result as float and return
  };

  useEffect(() => {
    // Get wallet and api key from localStorage
    // Get data from api
    const fetchData = async () => {
      const wKey = await localStorage.getItem("walletKey");
      const aKey = await localStorage.getItem("apiKey");

      setWalletKey(wKey);
      setApiKey(aKey);

      // Get balance
      const balanceResults = await get_balance(aKey, wKey);

      if (balanceResults.status == "1") {
        setWalletBalance(divideAndRound(parseInt(balanceResults.result)));
      } else {
        setWalletBalance(0);
      }

      // Get transcations
      const transactionsResults = await async_get_txs(aKey, wKey, 0);

      if (transactionsResults.status == "1") {
        setTransactions(transactionsResults.result);
      } else {
        setTransactions([]);
      }

      setLoading(false);
    };

    // TODO: uncomment this to actually get data
    // fetchData();

    // TODO: remove this testing numbers
    const wKey = localStorage.getItem("walletKey");
    const aKey = localStorage.getItem("apiKey");

    setWalletKey(wKey);
    setApiKey(aKey);
    setWalletBalance(0.9997);
    setTransactions([
      {
        blockNumber: "5663389",
        timeStamp: "1712693688",
        hash: "0x8465f44d5d8ef3a321a38ba1f8c4f4f7a1e95a414b3ffa78c7e776811ecee31d",
        nonce: "5",
        blockHash:
          "0xb8c7741e0464c4f8536d4c274cbb0f6863dbeb7208d3da8fddcf19966400a611",
        transactionIndex: "22",
        from: "0xd262677a79fb6962084a546d63a162f2336de298",
        to: "0xbe197f43ec7b1b0f50bacf77c12c262c435eed4d",
        value: "1000000000000000000",
        gas: "21000",
        gasPrice: "1500447326",
        isError: "0",
        txreceipt_status: "1",
        input: "0x",
        contractAddress: "",
        cumulativeGasUsed: "3921215",
        gasUsed: "21000",
        confirmations: "50662",
        methodId: "0x",
        functionName: "",
      },
      {
        blockNumber: "5663402",
        timeStamp: "1712693844",
        hash: "0x8c1eb61bf94e4b78fbcd82231cca156c921ea6b6c059f8a5a310fca5e9f772b2",
        nonce: "0",
        blockHash:
          "0x5aeada4a55e5c9e5f9b4de3cd5d8f8ab9ecbbefadb174b3099273acb2ee151a8",
        transactionIndex: "17",
        from: "0xbe197f43ec7b1b0f50bacf77c12c262c435eed4d",
        to: "0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad",
        value: "100000000000000",
        gas: "185125",
        gasPrice: "1500418510",
        isError: "0",
        txreceipt_status: "1",
        input:
          "0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000006615a48800000000000000000000000000000000000000000000000000000000000000020b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000005af3107a40000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000005af3107a40000000000000000000000000000000000000000000000000000000168c3bfaa04e00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002bfff9976782d46cc05630d1f6ebab18b2324d6b14000bb81f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000",
        contractAddress: "",
        cumulativeGasUsed: "3365368",
        gasUsed: "128549",
        confirmations: "50649",
        methodId: "0x3593564c",
        functionName: "execute(bytes commands,bytes[] inputs,uint256 deadline)",
      },
    ]);
    setLoading(false);

    // what do we care about:
    // blockNumber, timeStamp, from, to, value, hash, methodID

    return () => {};
  }, []);

  return (
    <Box w={"400px"} h={"600px"} style={{ overflowY: "hidden" }}>
      <Header />
      <ScrollArea h={"100%"} scrollbars="y">
        <Box w={"100%"} h={"520px"} px={"12px"}>
          {loading && (
            <Flex
              h={"100%"}
              direction={"column"}
              align={"center"}
              justify={"center"}
            >
              <Loader size={32} />
            </Flex>
          )}

          {!loading && (
            <Flex h={"100%"} direction={"column"} align={"center"}>
              <Title size={"h1"} style={{ fontWeight: 500 }} py={"24px"}>
                {`${walletBalance} ETH`}
              </Title>

              <Divider w={"80%"} mb={"24px"} />

              <Title size={"h2"} style={{ fontWeight: 400 }} mb={"12px"}>
                Transactions
              </Title>

              <Table horizontalSpacing="sm" highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Txn</Table.Th>
                    <Table.Th>Block #</Table.Th>
                    <Table.Th>Time</Table.Th>
                    <Table.Th>To</Table.Th>
                    <Table.Th>From</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {transactions.map((item) => (
                    <Table.Tr key={item.timeStamp}>
                      <Table.Td>{shortenStr(item.hash)}</Table.Td>
                      <Table.Td>{shortenStr(item.blockNumber)}</Table.Td>
                      <Table.Td>{formatRelativeTime(item.timeStamp)}</Table.Td>
                      <Table.Td>
                        {item.to.toLowerCase() === walletKey.toLowerCase() ? (
                          <Box
                            bg={"#d5f0dc"}
                            px={"5px"}
                            py={"2px"}
                            style={{
                              borderRadius: "12px",
                              cursor: "pointer",
                            }}
                          >
                            {shortenStr(item.to)}
                          </Box>
                        ) : (
                          shortenStr(item.to)
                        )}
                      </Table.Td>
                      <Table.Td>
                        {item.from.toLowerCase() === walletKey.toLowerCase() ? (
                          <Box
                            bg={"#d5f0dc"}
                            px={"5px"}
                            py={"2px"}
                            style={{
                              borderRadius: "12px",
                              cursor: "pointer",
                            }}
                          >
                            {shortenStr(item.from)}
                          </Box>
                        ) : (
                          shortenStr(item.from)
                        )}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Flex>
          )}
        </Box>
      </ScrollArea>
    </Box>
  );
}
