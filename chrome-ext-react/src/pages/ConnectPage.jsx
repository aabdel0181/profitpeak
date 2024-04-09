import React from 'react'

import { Box, Button, Flex, useMantineColorScheme, Title, Input, Divider} from '@mantine/core'

export default function ConnectPage(props) {
  return (
    <Box w={"256px"}>
        <Flex direction={"column"} gap={"24px"} align={"center"} p={"32px"}>
          <Title order={1} size={"h1"} c={"blue"} mb={"-18px"}>
            ProfitPeak
          </Title>
          <Divider
          my="xs"
          w={"100%"}
        />
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
          />
          <Button 
            color={"blue"} 
            radius={"md"} 
            size="md"
            onClick={() => {props.setLoggedIn(true)}}>Connect Wallet</Button>
        </Flex>
      </Box>
  )
}
