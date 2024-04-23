import {
  Box,
  Flex,
  Loader,
  Title,
  Divider,
  Table,
  ScrollArea,
  Text,
  Popover,
} from "@mantine/core";
import { useState, useEffect } from "react";

import Header from "../Components/Header";
import BalanceHeader from "../Components/BalanceHeader";

import {
  async_get_txs,
  formatRelativeTime,
  timestampToLocalTime,
} from "../utils/abitrum_test_calls";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const [walletKey, setWalletKey] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [hoveredToFromIndex, setHoveredToFromIndex] = useState(null);
  const [hoveredToFromIndex1, setHoveredToFromIndex1] = useState(null);

  const shortenStr = (str) => {
    if (str.length > 8) {
      return str.slice(0, 5) + "...";
    } else {
      return str;
    }
  };

  const getTableItems = (transactions) => {
    return transactions.map((item, index) => (
      <Table.Tr key={item.timeStamp}>
        <Table.Td>{shortenStr(item.hash)}</Table.Td>
        <Table.Td>
          <div>{item.value}</div>
          <div>${item.valueUSD}</div>
        </Table.Td>
        {/* <Table.Td>
          <Anchor
            href={get_block_url(item.blockNumber)}
            target="_blank"
            underline="hover"
            style={{ fontSize: "inherit" }}
          >
            {shortenStr(item.blockNumber)}
          </Anchor>
        </Table.Td> */}
        <Table.Td>
          <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
              <p style={{ cursor: "pointer" }}>
                {formatRelativeTime(item.timeStamp)}
              </p>
            </Popover.Target>
            <Popover.Dropdown width={180} p={8}>
              <Text size="sm">{timestampToLocalTime(item.timeStamp)}</Text>
            </Popover.Dropdown>
          </Popover>
        </Table.Td>
        <Table.Td>
          {item.to.toLowerCase() === walletKey.toLowerCase() ? (
            <Popover position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Box
                  bg={hoveredToFromIndex == index ? "#a2b4a6" : "#d5f0dc"}
                  onMouseEnter={() => setHoveredToFromIndex(index)}
                  onMouseLeave={() => setHoveredToFromIndex(null)}
                  px={"5px"}
                  py={"2px"}
                  style={{
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  {shortenStr(item.to)}
                </Box>
              </Popover.Target>
              <Popover.Dropdown width={180} p={8}>
                <Text size="sm">{item.to}</Text>
              </Popover.Dropdown>
            </Popover>
          ) : (
            <Popover position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Box
                  px={"5px"}
                  py={"2px"}
                  style={{
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                  bg={hoveredToFromIndex == index ? "#e2e2e2" : "#ffffff00"}
                  onMouseEnter={() => setHoveredToFromIndex(index)}
                  onMouseLeave={() => setHoveredToFromIndex(null)}
                >
                  {shortenStr(item.to)}
                </Box>
              </Popover.Target>
              <Popover.Dropdown width={180} p={8}>
                <Text size="sm">{item.to}</Text>
              </Popover.Dropdown>
            </Popover>
          )}
        </Table.Td>
        <Table.Td>
          {item.from.toLowerCase() === walletKey.toLowerCase() ? (
            <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
            <Box
              bg={hoveredToFromIndex1 == index ? "#a2b4a6" : "#d5f0dc"}
              onMouseEnter={() => setHoveredToFromIndex1(index)}
              onMouseLeave={() => setHoveredToFromIndex1(null)}
              px={"5px"}
              py={"2px"}
              style={{
                borderRadius: "12px",
                cursor: "pointer",
              }}
              onClick={() => alert(item.from)}
            >
              {shortenStr(item.from)}
            </Box>
            </Popover.Target>
              <Popover.Dropdown width={180} p={8}>
                <Text size="sm">{item.from}</Text>
              </Popover.Dropdown>
            </Popover>
          ) : (
            <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
            <Box
              px={"5px"}
              py={"2px"}
              style={{
                borderRadius: "12px",
                cursor: "pointer",
              }}
              bg={hoveredToFromIndex1 == index ? "#e2e2e2" : "#ffffff00"}
              onMouseEnter={() => setHoveredToFromIndex1(index)}
              onMouseLeave={() => setHoveredToFromIndex1(null)}
              onClick={() => alert(item.from)}
            >
              {shortenStr(item.from)}
            </Box>
            </Popover.Target>
            <Popover.Dropdown width={180} p={8}>
              <Text size="sm">{item.from}</Text>
            </Popover.Dropdown>
          </Popover>
          )}
        </Table.Td>
      </Table.Tr>
    ));
  };

  useEffect(() => {
    // Get wallet and api key from localStorage
    // Get data from api
    const fetchData = async () => {
      const wKey = await localStorage.getItem("walletKey");
      const aKey = await localStorage.getItem("apiKey");

      setWalletKey(wKey);
      setApiKey(aKey);

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
    //fetchData();

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
        value: "0.0001",
        valueUSD: "0.306779",
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
        value: "0.0001",
        valueUSD: "0.306779",
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
    <Box w={"526px"} h={"600px"} style={{ overflowY: "hidden", border: "1px solid black"}}>
      <Header />
      <ScrollArea h={"100%"} scrollbars="y">
        <Box w={"100%"} h={"520px"} px={"8px"}>
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
              <BalanceHeader />

              <Divider w={"80%"} mb={"24px"} />

              <Title size={"h2"} style={{ fontWeight: 400 }} mb={"12px"}>
                Transactions
              </Title>

              <Table horizontalSpacing="sm" highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Txn</Table.Th>
                    <Table.Th>Value: CC, USD</Table.Th>
                    <Table.Th pr={"32px"}>Time</Table.Th>
                    <Table.Th>To</Table.Th>
                    <Table.Th>From</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{getTableItems(transactions)}</Table.Tbody>
              </Table>
            </Flex>
          )}
        </Box>
      </ScrollArea>
    </Box>
  );
}
