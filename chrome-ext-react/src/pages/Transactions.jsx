/* eslint-disable react/prop-types */
// import { useState } from 'react';

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  Box,
  Title,
  Divider,
  ScrollArea,
  Flex,
  Table,
  Loader,
  Popover,
} from "@mantine/core";

import Header from "../Components/Header";
import {
  processTransactions,
  formatRelativeTime,
} from "../utils/etherscan_calls";

const transactions = [
  {
    time: "2022-01-01T00:00:00Z",
    tokenInType: "USDC",
    tokenInAmount: 6.432,
    tokenOutType: "ETH",
    tokenOutAmount: 1.23,
    price: 200,
  },
  {
    time: "2022-01-02T00:00:00Z",
    tokenInType: "USDC",
    tokenInAmount: 7.432,
    tokenOutType: "ETH",
    tokenOutAmount: 1.33,
    price: 210,
  },
  {
    time: "2022-01-03T00:00:00Z",
    tokenInType: "USDC",
    tokenInAmount: 8.432,
    tokenOutType: "ETH",
    tokenOutAmount: 1.43,
    price: 220,
  },
];

const Transactions = () => {
  const [fetchedTransactions, setFetchedTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const chartData = transactions.map((transaction) => ({
    name: new Date(transaction.time).toLocaleDateString(),
    price: transaction.price,
    tokenInType: transaction.tokenInType,
    tokenInAmount: transaction.tokenInAmount,
    tokenOutType: transaction.tokenOutType,
    tokenOutAmount: transaction.tokenOutAmount,
  }));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const wKey = await localStorage.getItem("walletKey");
      const aKey = await localStorage.getItem("apiKey");

      console.log(wKey, aKey);
      const txns = await processTransactions(wKey, aKey);
      setFetchedTransactions(
        txns
          .filter((item) => item !== null)
          .map((item) => {
            if (item) {
              return {
                ...item,
                tokenInType: item.tokenInName,
                tokenOutType: item.tokenOutName,
              };
            }
          })
          .reverse()
      );
      console.log(txns);
      setLoading(false);
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { tokenInType, tokenInAmount, tokenOutType, tokenOutAmount } =
        payload[0].payload;

      return (
        <div className="custom-tooltip">
          <p className="label" style={{ fontSize: "14px", fontWeight: "bold" }}>
            Date: {label}
          </p>
          <p className="intro" style={{ fontSize: "12px" }}>
            Price: {payload[0].value}
          </p>
          <p className="desc" style={{ fontSize: "12px" }}>
            In: {tokenInAmount} {tokenInType}
          </p>
          <p className="desc" style={{ fontSize: "12px" }}>
            Out: {tokenOutAmount} {tokenOutType}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Box w={"526px"} h={"600px"} style={{ overflowY: "hidden" }}>
        <Header />
        {loading && (
          <Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
            <Loader size={"xl"} />
          </Flex>
        )}
        {!loading && (
          <ScrollArea scrollbars="y">
            <Box w={"100%"} h={"520px"} px={"8px"} mt={"sm"}>
              <Flex h={"100%"} direction={"column"} align={"center"}>
                <Flex w={"100%"} align={"center"} direction={"column"} gap={1}>
                  <Title size={"h1"} style={{ fontWeight: 500 }} py={"24px"}>
                    Transactions Over Time
                  </Title>
                  <Divider w={"80%"} />
                </Flex>

                <Table mt={"28px"} horizontalSpacing="sm" highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Time</Table.Th>
                      <Table.Th>IN Tkn</Table.Th>
                      <Table.Th>IN Amt</Table.Th>
                      <Table.Th>OUT Tkn</Table.Th>
                      <Table.Th>OUT Amt</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {fetchedTransactions.map((item, i) => {
                      return (
                        <Popover
                          width={440}
                          position="bottom"
                          withArrow
                          shadow="md"
                          key={i}
                        >
                          <Popover.Target>
                            <Table.Tr>
                              <Table.Td>
                                {formatRelativeTime(item.timestamp)}
                              </Table.Td>
                              <Table.Td>{item.tokenInType}</Table.Td>
                              <Table.Td>{parseFloat(item.tokenInAmount).toFixed(6)}</Table.Td>
                              <Table.Td>{item.tokenOutType}</Table.Td>
                              <Table.Td>{parseFloat(item.tokenOutAmount).toFixed(6)}</Table.Td>
                            </Table.Tr>
                          </Popover.Target>
                          <Popover.Dropdown height={300}>
                            <Flex
                              w={"100%"}
                              h={"100%"}
                              align="center"
                              justify={"center"}
                            >
                              <LineChart
                                width={380}
                                height={200}
                                data={chartData}
                                margin={{
                                  top: 10,
                                  right: 30,
                                  left: -10,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey="price"
                                  stroke="#8884d8"
                                  activeDot={{ r: 8 }}
                                />
                              </LineChart>
                            </Flex>
                          </Popover.Dropdown>
                        </Popover>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              </Flex>
            </Box>
          </ScrollArea>
        )}
      </Box>
    </>
  );
};

export default Transactions;
