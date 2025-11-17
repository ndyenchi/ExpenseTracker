import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Title,
  useMantineColorScheme,
  ActionIcon,
  Text,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconHome,
  IconPlus,
  IconList,
  IconChartPie,
  IconSun,
  IconMoon,
  IconWallet,
} from "@tabler/icons-react";
import { Link, useLocation, Outlet } from "react-router-dom";

const navItems = [
  { icon: IconHome, label: "Dashboard", to: "/" },
  { icon: IconPlus, label: "Add Expense", to: "/add" },
  { icon: IconList, label: "Expenses", to: "/expenses" },
  { icon: IconChartPie, label: "Statistics", to: "/stats" },
];

export function AppLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap="xs">
              <IconWallet size={28} stroke={1.5} color="var(--mantine-color-blue-6)" />
              <Title order={3} visibleFrom="xs">
                ExpenseTracker
              </Title>
            </Group>
          </Group>
          <Group>
            <Badge variant="light" color="blue" size="lg">
              Personal Finance
            </Badge>
            <ActionIcon
              variant="default"
              size="lg"
              onClick={() => toggleColorScheme()}
              aria-label="Toggle color scheme"
            >
              {colorScheme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          <Text size="xs" fw={500} c="dimmed" mb="sm" tt="uppercase">
            Navigation
          </Text>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              component={Link}
              to={item.to}
              label={item.label}
              leftSection={<item.icon size={20} stroke={1.5} />}
              active={location.pathname === item.to}
              onClick={close}
              variant="light"
              mb={4}
              style={{ borderRadius: "var(--mantine-radius-md)" }}
            />
          ))}
        </AppShell.Section>
        <AppShell.Section>
          <Text size="xs" c="dimmed" ta="center">
            © 2025 ExpenseTracker
          </Text>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
