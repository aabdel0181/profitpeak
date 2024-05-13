import {
  Box,
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function ConnectPage() {
  const [walletKeyError, setWalletKeyError] = useState("");
  const [apiKeyError, setApiKeyError] = useState("");

  const [walletKey, setWalletKey] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function validateKeyAddress(walletKey, apiKey) {

    const url = `https://api-sepolia.etherscan.io/api?module=account&action=balance&address=${walletKey}&tag=latest&apikey=${apiKey}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.status == "1") {
        return true;
      } else if (data.result.includes("API Key")) {
        setApiKeyError("Invalid Api key!");
      } else {
        setWalletKeyError("Invalid wallet address!");
      }
      return false;

    } catch (error) {

      setWalletKeyError("Invalid wallet address!");
      setApiKeyError("Invalid Api key!");
      return false;
    }
  }

  async function onConnectClick() {
    setLoading(true);

    if (await validateKeyAddress(walletKey, apiKey) == true) {
      console.log("reached!");
      localStorage.setItem("walletKey", walletKey);
      localStorage.setItem("apiKey", apiKey);
      navigate("/home");

      // Todo, chrome storage check for previous data
    }

    setLoading(false);
  }

  // Auto login/connect if api and walletkey are present
  useEffect(() => {
    const wKey = localStorage.getItem("walletKey");
    const aKey = localStorage.getItem("apiKey");
    
    if (wKey && aKey) {
      setWalletKey(wKey);
      setApiKey(aKey);
      navigate("/home");
    }

    return () => {};
  }, []);

  return (
    <>
      <Box
        w={"526px"}
        h={"600px"}
        style={{
          overflowY: "hidden",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container size={480} w={"400px"} my={40}>
          <Title ta="center" className={""}>
            Profit Peak
          </Title>
          <Text c="dimmed" mb={"64px"} size="sm" ta="center" mt={5}>
          Cryptocurrency transaction analytics: gain insights into trade history, profit/loss calculations, and trends analysis
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Wallet Address"
              placeholder="0x123456789"
              value={walletKey}
              onChange={(e) => {
                e.preventDefault();
                setWalletKey(e.target.value);
              }}
              error={walletKeyError}
              required
            />
            <PasswordInput
              label="Api Key"
              placeholder="Your Etherscan Api key"
              value={apiKey}
              onChange={(e) => {
                e.preventDefault();
                setApiKey(e.target.value);
              }}
              error={apiKeyError}
              required
              mt="md"
            />
            <Group justify="end" mt="lg">
              <Anchor
                href="https://docs.etherscan.io/getting-started/viewing-api-usage-statistics"
                target="_blank"
                size="sm"
              >
                Get Api key
              </Anchor>
            </Group>
            <Button onClick={onConnectClick} loading={loading} fullWidth mt="xl">
              Connect Wallet
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
