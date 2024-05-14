import {
  Box,
  Flex,
  Loader,
  Divider,
  Table,
  ScrollArea,
  Text,
  Popover,
} from "@mantine/core";
import { useState, useEffect } from "react";

import Header from "../Components/Header";
import BalanceHeader from "../Components/BalanceHeader";

// import {
//   async_get_txs,
//   formatRelativeTime,
//   timestampToLocalTime,
// } from "../utils/abitrum_test_calls";

import {
  async_get_txs,
  formatRelativeTime,
  timestampToLocalTime,
} from "../utils/etherscan_calls";



export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const [walletKey, setWalletKey] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [hoveredToFromIndex, setHoveredToFromIndex] = useState(null);
  const [hoveredToFromIndex1, setHoveredToFromIndex1] = useState(null);

  const divideAndRound = (number) => {
    const result = (number / 1_000_000_000_000_000_000).toFixed(4);
    return parseFloat(result);
  };

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
          <div>{divideAndRound(parseInt(item.value))}</div>
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
      console.log(transactionsResults);

      if (transactionsResults.status == "1") {
        setTransactions(transactionsResults.result);
      } else {
        setTransactions([]);
      }

      setLoading(false);
    };
    fetchData();

    return () => {};
  }, []);

  return (
    <Box w={"526px"} h={"600px"} style={{ overflowY: "hidden", border: "1px solid black"}}>
      <Header />
      <ScrollArea w={"100%"} scrollbars="y">
        <Box w={"100%"} h={"520px"} px={"8px"} sty>
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

              <Table horizontalSpacing="sm" highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Txn</Table.Th>
                    <Table.Th>Amount</Table.Th>
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
