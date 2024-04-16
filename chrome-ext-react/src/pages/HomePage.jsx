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

import Header from "../Components/Header";

export default function HomePage() {
    const navigate = useNavigate();

    const onClickLogout = () => {
        localStorage.removeItem("walletKey");
        localStorage.removeItem("apiKey");
        navigate("/");
    };

    return (
        <Box w={"384px"} h={"480px"}>
          <Header />
        </Box>
    );
}
