import React, { useEffect, useState } from "react";

import {
  Flex,
  ActionIcon,
  Text,
  ThemeIcon,
  Popover,
  Transition,
} from "@mantine/core";

import { IconLogout, IconCopy, IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useHover } from "@mantine/hooks";

export default function Header() {
  const navigate = useNavigate();
  const { hovered, ref } = useHover();
  const [walletKey, setWalletKey] = useState("");
  const [walletKeyCopied, setWalletKeyCopied] = useState(false);

  const parseWalletKey = (str) => {
    if (str.length <= 10) {
      return str;
    } else {
      const first5 = str.slice(0, 5);
      const last5 = str.slice(-5);
      return `${first5}...${last5}`;
    }
  };

  const onClickLogout = () => {
    localStorage.removeItem("walletKey");
    localStorage.removeItem("apiKey");
    navigate("/");
  };

  const onClickHome = () => {
    navigate("/home");
  };

  const copyWalletKey = () => {
    navigator.clipboard.writeText(walletKey);
    setWalletKeyCopied(true);
  };

  useEffect(() => {
    setWalletKey(localStorage.getItem("walletKey"));

    // Function to handle reading from clipboard
    const readFromClipboard = async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        console.log("Clipboard value:", clipboardText);
        return clipboardText;
      } catch (error) {
        return null;
      }
    };

    // Call the function to read from clipboard
    const clipboardText = readFromClipboard();
    if (clipboardText && clipboardText === walletKey) {
      setWalletKeyCopied(true);
    } else {
      setWalletKeyCopied(false);
    }

    return () => {
      // Cleanup function
    };
  }, []);

  return (
    <>
      <Flex
        h={"76px"}
        style={{ boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.1)" }}
        pt={"2px"}
        pos={"sticky"}
        top={0}
        left={0}
        zIndex={9990}
      >
        <Flex
          w={"65px"}
          style={{ flexGrow: "1" }}
          align={"center"}
          justify={"center"}
        >
          <ActionIcon
            variant="light"
            aria-label="Logout"
            pos={"relative"}
            top={"0px"}
            right={"0px"}
            onClick={onClickHome}
            size={"lg"}
          >
            <IconHome style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Flex>
        <Flex align={"center"} justify={"center"} style={{ flexGrow: "2" }}>
          <Popover
            width={"98px"}
            shadow="md"
            position="right"
            opened={hovered}
            withArrow
          >
            <Popover.Target>
              <Flex
                ref={ref}
                bg={hovered ? "#f8f8f8" : "white"}
                h={"40px"}
                px={"8px"}
                gap={"6px"}
                align={"center"}
                justify={"center"}
                style={{
                  borderRadius: "12px",
                  cursor: hovered ? "pointer" : "default",
                }}
                onClick={copyWalletKey}
              >
                <Text size="md" style={{ userSelect: "none" }}>
                  {parseWalletKey(walletKey)}
                </Text>
                <ThemeIcon variant="white" aria-label="Copy" bg={"transparent"} size={"lg"}>
                  <IconCopy
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ThemeIcon>
              </Flex>
            </Popover.Target>

            <Transition
              mounted={hovered}
              transition="pop"
              duration={200}
              timingFunction="ease"
            >
              {(styles) => (
                <Popover.Dropdown
                  p={"4px"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    ...styles,
                  }}
                >
                  <Text size="xs" style={{ userSelect: "none" }}>
                    {walletKeyCopied ? "Address copied" : "Copy address"}
                  </Text>
                </Popover.Dropdown>
              )}
            </Transition>
          </Popover>
        </Flex>
        <Flex
          w={"65px"}
          style={{ flexGrow: "1" }}
          align={"center"}
          justify={"center"}
        >
          <ActionIcon
            variant="light"
            aria-label="Logout"
            pos={"relative"}
            top={"0px"}
            right={"0px"}
            onClick={onClickLogout}
            size={"lg"}
          >
            <IconLogout style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Flex>
      </Flex>
    </>
  );
}
