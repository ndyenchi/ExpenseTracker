import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { Profile } from "./Profile";
import { Logo } from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { Navigation } from "./Navigation";
import classes from "./index.module.scss";

export function AppLayout() {
  const [opened, { toggle, close }] = useDisclosure();

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
            <Logo />
          </Group>
          <Group>
            <ModeToggle />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          <Navigation close={close} />
        </AppShell.Section>
        <AppShell.Section className={classes.profileContainer}>
          <Profile />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main pos={"relative"}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
