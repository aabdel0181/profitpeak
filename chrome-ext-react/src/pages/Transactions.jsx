/* eslint-disable react/prop-types */
// import { useState } from 'react';

import { useState, useEffect } from "react";

import {
  Box,
  Title,
  Divider,
  ScrollArea,
  Flex,
  Table,
  Collapse,
  Popover,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { AreaChart, Card, Title as TremorTitle } from "@tremor/react";

import Header from "../Components/Header";

const Transactions = () => {
  const [walletKey, setWalletKey] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [opened, { toggle }] = useDisclosure(false);

  useEffect(() => {
    const fetchData = async () => {
      const wKey = await localStorage.getItem("walletKey");
      const aKey = await localStorage.getItem("apiKey");

      setWalletKey(wKey);
      setApiKey(aKey);
    };

    fetchData();
  }, []);

  return (
    <>
      <Box w={"526px"} h={"600px"} style={{ overflowY: "hidden" }}>
        <Header />

        <ScrollArea h={"100%"} scrollbars="y">
          <Box w={"100%"} h={"520px"} px={"8px"}>
            <Flex h={"100%"} direction={"column"} align={"center"}>
              <Flex w={"100%"} align={"center"} direction={"column"} gap={1}>
                <Title size={"h1"} style={{ fontWeight: 500 }} py={"24px"}>
                  Transactions
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
                  <Popover width={400} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                      <Table.Tr>
                        <Table.Td>7 hrs ago</Table.Td>
                        <Table.Td>USDC</Table.Td>
                        <Table.Td>6.432</Table.Td>
                        <Table.Td>ETH</Table.Td>
                        <Table.Td>1.23</Table.Td>
                      </Table.Tr>
                    </Popover.Target>
                    <Popover.Dropdown height={400}>
                        <Text>e</Text>
                    </Popover.Dropdown>
                  </Popover>

                  <Table.Tr>
                    <Table.Td>7 hrs ago</Table.Td>
                    <Table.Td>USDC</Table.Td>
                    <Table.Td>6.432</Table.Td>
                    <Table.Td>ETH</Table.Td>
                    <Table.Td>1.23</Table.Td>
                  </Table.Tr>
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
