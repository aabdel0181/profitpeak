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
  Popover,
  Text,
} from "@mantine/core";

import Header from "../Components/Header";

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
  const [walletKey, setWalletKey] = useState("");
  const [apiKey, setApiKey] = useState("");

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
      const wKey = await localStorage.getItem("walletKey");
      const aKey = await localStorage.getItem("apiKey");

      setWalletKey(wKey);
      setApiKey(aKey);
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
                  {[0, 0, 0, 0].map((_, i) => {
                    return (
                    <Popover
                      width={440}
                      position="bottom"
                      withArrow
                      shadow="md"
                    >
                      <Popover.Target>
                        <Table.Tr>
                          <Table.Td>7 hrs ago</Table.Td>
                          <Table.Td>USDC</Table.Td>
                          <Table.Td>6.432</Table.Td>
                          <Table.Td>ETH</Table.Td>
                          <Table.Td>1.23</Table.Td>
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
                    </Popover>)
                  })}

                </Table.Tbody>
              </Table>
            </Flex>
          </Box>
        </ScrollArea>
      </Box>
    </>
  );
};

export default Transactions;
