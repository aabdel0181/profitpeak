import { Box, Button, Flex, useMantineColorScheme, Title, Input, Divider} from '@mantine/core'
import { useState } from 'react'

// Contains the the extension and its sizing
function App() {

  useMantineColorScheme("light")

  const [walletKey, setWalletKey] = useState("");
  const [apiKey, setApiKey] = useState("");

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
          value={walletKey} 
          onChange={(e) => {
            e.preventDefault();
            setWalletKey(e.target.value);
          }} 
        />
        <Input 
          variant="filled" 
          size="md" 
          radius="md" 
          placeholder="API Key" 
          value={apiKey}
          onChange={(e) => {
            e.preventDefault();
            setApiKey(e.target.value);
          }}
        />
        <Button color={"blue"} radius={"md"} size="md">Connect Wallet</Button>
      </Flex>
    </Box>
  )
}

export default App
