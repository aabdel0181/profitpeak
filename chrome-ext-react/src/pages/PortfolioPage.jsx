import {
  Box,
  Flex,
  Loader,
  Divider,
  Table,
  ScrollArea,
  Text,
  Popover,
  Badge,
  Title,
} from "@mantine/core";
import { useState, useEffect } from "react";

import Header from "../Components/Header";

import { processTransactions, netTransactions } from "../utils/etherscan_calls";

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [netValue, setNetValue] = useState(0);

  useEffect(() => {
    // Get wallet and api key from localStorage
    // Get data from api
    const fetchData = async () => {
      const wKey = await localStorage.getItem("walletKey");
      const aKey = await localStorage.getItem("apiKey");

      // Get transcations
      let txns = await processTransactions(wKey, aKey);
      txns = txns.filter((item) => item !== null);

      let netUsd = await netTransactions(txns);
      console.log(netUsd);
      setNetValue(netUsd);

      setLoading(false);
    };
    fetchData();

    return () => {};
  }, []);

  return (
    <Box w={"526px"} h={"600px"} style={{ overflowY: "hidden" }}>
      <Header />
      <Flex direction={"column"} align={"center"} pt={"xl"}>
        {loading && (
          <>
            <Title mt={"xl"} fw={600} align={"center"}>
              Calculating Portfolio Performance...
            </Title>
            <Loader mt={"xl"} />
          </>
        )}
        {!loading && (
          <>
            <Title mt={"xl"} fw={600} align={"center"}>
              Net {netValue > 0 ? "Gain" : "Loss"}
            </Title>
            <Text fz={"h1"} fw={500} mt={"lg"}>
              {netValue > 0 ? "+" : ""}
              {netValue.toFixed(2)}
            </Text>
            {netValue > 0 ? (
              <Badge variant="light" color="teal" mt={"4px"}>
                Your portfolio is profitable
              </Badge>
            ) : (
              <Badge variant="light" color="red" mt={"4px"}>
                Your portfolio is at a loss
              </Badge>
            )}
          </>
        )}
      </Flex>
    </Box>
  );
}
