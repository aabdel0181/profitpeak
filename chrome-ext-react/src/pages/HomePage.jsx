import React from "react";

import {
    Box,
    Button,
    Flex,
    useMantineColorScheme,
    Title,
    Input,
    Divider,
    ActionIcon,
} from "@mantine/core";

import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const navigate = useNavigate();

    const onClickLogout = () => {
        localStorage.removeItem("walletKey");
        localStorage.removeItem("apiKey");
        navigate("/");
    };

    return (
        <Box w={"328px"} h={"480px"}>
            <Flex direction={"column"} gap={"24px"} align={"center"} p={"32px"}>
                <Title order={1} size={"h1"} c={"blue"} mb={"-18px"}>
                    ProfitPeak
                </Title>
                <Divider my="xs" w={"100%"} />
            </Flex>

            <ActionIcon
                variant="light"
                aria-label="Settings"
                pos={"absolute"}
                top={"16px"}
                right={"20px"}
                onClick={onClickLogout}
            >
                <IconLogout
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                />
            </ActionIcon>
        </Box>
    );
}
