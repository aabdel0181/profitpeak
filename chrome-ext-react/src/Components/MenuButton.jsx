import { Menu, rem, useMantineTheme, ActionIcon } from "@mantine/core";
import {
  IconMenu2,
  IconHome,
  IconSettings,
  IconReportMoney,
  IconBriefcase,
  IconSwitchHorizontal,
} from "@tabler/icons-react";

import { useNavigate } from "react-router-dom";

export default function MenuButton() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const onClickLogout = async () => {
    await localStorage.removeItem("walletKey");
    await localStorage.removeItem("apiKey");
    navigate("/");
  };

  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
        {/* <Button
          rightSection={
            <IconChevronDown
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          pr={12}
        >
          Create new
        </Button> */}
        <ActionIcon
          variant="light"
          aria-label="Menu"
          pos={"relative"}
          top={"0px"}
          right={"0px"}
          size={"lg"}
        >
          <IconMenu2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown w={"180px"} ml={"8px"}>
        <Menu.Label>Pages</Menu.Label>
        <Menu.Item
          leftSection={
            <IconHome
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
          onClick={(e) => {
            e.preventDefault();
            navigate("/home");
          }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconReportMoney
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.green[6]}
              stroke={1.5}
            />
          }
          onClick={(e) => {
            e.preventDefault();
            navigate("/transactions");
          }}
        >
          Transactions
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconBriefcase
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.violet[6]}
              stroke={1.5}
            />
          }
          onClick={(e) => {
            e.preventDefault();
            navigate("/portfolio");
          }}
        >
          Portfolio
        </Menu.Item>
        <Menu.Label>Utility</Menu.Label>
        <Menu.Item
          color="blue"
          leftSection={
            <IconSwitchHorizontal style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={(e) => {
            e.preventDefault();
            onClickLogout();
          }}
        >
          Switch Wallets
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
