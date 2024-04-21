// import { useState } from 'react';

import { useState, useEffect } from "react";

import { Box } from "@mantine/core";

const Transactions = () => {
  const [walletKey, setWalletKey] = useState("");
  const [apiKey, setApiKey] = useState("");

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
      <Box w={"526px"} h={"600px"} style={{ overflowY: "hidden" }}>{walletKey + apiKey}</Box>
    </>
  );
};

export default Transactions;
