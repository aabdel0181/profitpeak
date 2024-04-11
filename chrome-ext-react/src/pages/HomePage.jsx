import React from "react";

import {
  Box,
  Button,
  Flex,
  useMantineColorScheme,
  Title,
  Input,
  Divider,
} from "@mantine/core";

export default function HomePage() {
  return (
    <Box w={"328px"} h={"480px"}>
      <Flex direction={"column"} gap={"24px"} align={"center"} p={"32px"}>
        <Title order={1} size={"h1"} c={"blue"} mb={"-18px"}>
          ProfitPeak
        </Title>
        <Divider my="xs" w={"100%"} />
      </Flex>
    </Box>
  );
}
