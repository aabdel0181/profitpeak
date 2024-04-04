import { Box, Button, Flex, useMantineColorScheme, Title} from '@mantine/core'

// Contains the the extension and its sizing
function App() {

  useMantineColorScheme("dark")

  return (
    <Box w={"280px"} bg={"dark"}>
      <Flex direction={"column"} gap={"48px"} align={"center"} p={"32px"}>
        <Title order={1} size={"h1"} c={"orange"}>
          ProfitPeak
        </Title>
        <Button color={"orange"} radius={"md"} size="md">Connect Wallet</Button>
      </Flex>
    </Box>
  )
}

export default App
