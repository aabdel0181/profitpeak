import {
  Box,
  Title,
  ScrollArea,
  Flex,
  Text,
  Loader,
  Stack,
} from "@mantine/core";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InitializePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // THIS IS HERE FOR TESTING
    // TODO: We actually want to fetch data here
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  }, []);

  return (
    <>
      <Box
        w={"526px"}
        h={"600px"}
        style={{ overflowY: "hidden", border: "1px black solid" }}
      >
        <ScrollArea h={"100%"} scrollbars="y">
          <Box w={"100%"} h={"600px"} px={"8px"}>
            <Flex
              h={"100%"}
              direction={"column"}
              align={"center"}
              justify={"center"}
            >
              <Stack align="center">
                <Loader size="xl" />
                <Title size={"h3"} style={{ fontWeight: 500 }} py={"24px"}>
                  Fetching transactions
                </Title>
              </Stack>
              <Text c="#a1a1a1">This action may take a few minutes</Text>
            </Flex>
          </Box>
        </ScrollArea>
      </Box>
    </>
  );
}
