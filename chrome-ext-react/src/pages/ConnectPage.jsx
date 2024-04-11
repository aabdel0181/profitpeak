/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Button, Flex, Title, Input, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function ConnectPage(props) {
  const [walletKeyValid, setWalletKeyValid] = useState(true);
  const [apiKeyValid, setApiKeyValid] = useState(true);
  const navigate = useNavigate();

  const validateWalletKey = (walletKey) => {
    return walletKey.length >= 20;
  };

  const validateApiKey = (apiKey) => {
    return apiKey.length >= 20;
  };

  const onConnectClick = (walletKey, apiKey, setLoggedIn) => {
    if (validateWalletKey(walletKey) && validateApiKey(apiKey)) {
      localStorage.setItem("walletKey", walletKey);
      localStorage.setItem("apiKey", apiKey);
      setLoggedIn(true);
      navigate("/transactions");
    } else {
      navigate("/transactions"); // remove this line but for now testing!!!!!
      setWalletKeyValid(false);
      setApiKeyValid(false);
    }
  };

  return (
    <Box w={"256px"}>
      <Flex direction={"column"} gap={"24px"} align={"center"} p={"32px"}>
        <Title order={1} size={"h1"} c={"blue"} mb={"-18px"}>
          ProfitPeak
        </Title>
        <Divider my="xs" w={"100%"} />
        <Input
          variant="filled"
          size="md"
          radius="md"
          placeholder="Wallet Key"
          value={props.walletKey}
          onChange={(e) => {
            e.preventDefault();
            props.setWalletKey(e.target.value);
          }}
          error={!walletKeyValid}
        />
        <Input
          variant="filled"
          size="md"
          radius="md"
          placeholder="API Key"
          value={props.apiKey}
          onChange={(e) => {
            e.preventDefault();
            props.setApiKey(e.target.value);
          }}
          error={!apiKeyValid}
        />
        <Button
          color={"blue"}
          radius={"md"}
          size="md"
          onClick={() => {
            onConnectClick(props.walletKey, props.apiKey, props.setLoggedIn);
          }}
        >
          Connect Wallet
        </Button>
      </Flex>
    </Box>
  );
}
