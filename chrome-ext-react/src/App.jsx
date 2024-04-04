import { Box, Button, Flex, useMantineColorScheme, Title, Input} from '@mantine/core'

// Contains the the extension and its sizing
function App() {

  useMantineColorScheme("light")

  return (
    <Box w={"256px"}>
      <Flex direction={"column"} gap={"48px"} align={"center"} p={"32px"}>
        <Title order={1} size={"h1"} c={"blue"}>
          ProfitPeak
        </Title>
        <Input variant="filled" size="md" radius="md" placeholder="Wallet Key" />
        <Button color={"blue"} radius={"md"} size="md" mt={"-18px"}>Connect Wallet</Button>
      </Flex>
    </Box>
  )
}

export default App
