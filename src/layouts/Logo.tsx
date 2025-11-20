import { Group, Title } from "@mantine/core";
import { IconWallet } from "@tabler/icons-react";

export const Logo = () => {
  return (
    <Group gap="xs">
      <IconWallet size={28} stroke={1.5} color="var(--mantine-color-blue-6)" />
      <Title order={3} visibleFrom="xs">
        ExpenseTracker
      </Title>
    </Group>
  );
};
