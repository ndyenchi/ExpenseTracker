import { Avatar, Flex, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import classes from "./index.module.scss";

export const Profile = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened} position="right-end">
      <Menu.Target>
        <UnstyledButton py={"md"} w={"100%"} className={classes.profileWrapper}>
          <Flex gap="md" justify="space-between" align="center">
            <Flex gap="md" align="center">
              <Avatar src={null} alt="Yen Chi" radius="xl" size="md" color="blue">
                YC
              </Avatar>
              <div>
                <Text size="sm" fw={500} color="white">
                  Yen Chi
                </Text>
                <Text size="xs" color="dimmed">
                  yenchi@email.com
                </Text>
              </div>
            </Flex>
            <IconChevronDown
              size={16}
              style={{
                transition: "transform 0.2s ease",
                transform: opened ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Flex>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item leftSection={<IconUser size={14} />}>Profile Settings</Menu.Item>
        <Menu.Item leftSection={<IconSettings size={14} />}>Preferences</Menu.Item>

        <Menu.Divider />

        <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
