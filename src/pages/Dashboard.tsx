import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  RingProgress,
  Stack,
  ThemeIcon,
} from "@mantine/core";
import { IconCash, IconReceipt, IconTrendingUp, IconCategory } from "@tabler/icons-react";

export default function Dashboard() {
  return (
    <Container size="lg">
      <Stack gap="lg">
        <div>
          <Title order={2}>Dashboard</Title>
          <Text c="dimmed" size="sm">
            Overview of your expenses
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          <Card withBorder padding="lg" radius="md">
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Total Expenses
                </Text>
                <Text fw={700} size="xl">
                  $0.00
                </Text>
              </div>
              <ThemeIcon size={50} radius="md" variant="light" color="blue">
                <IconCash size={28} stroke={1.5} />
              </ThemeIcon>
            </Group>
            <Text size="xs" c="dimmed" mt="md">
              This month's spending
            </Text>
          </Card>

          <Card withBorder padding="lg" radius="md">
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Transactions
                </Text>
                <Text fw={700} size="xl">
                  0
                </Text>
              </div>
              <ThemeIcon size={50} radius="md" variant="light" color="green">
                <IconReceipt size={28} stroke={1.5} />
              </ThemeIcon>
            </Group>
            <Text size="xs" c="dimmed" mt="md">
              Total number of expenses
            </Text>
          </Card>

          <Card withBorder padding="lg" radius="md">
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Average
                </Text>
                <Text fw={700} size="xl">
                  $0.00
                </Text>
              </div>
              <ThemeIcon size={50} radius="md" variant="light" color="orange">
                <IconTrendingUp size={28} stroke={1.5} />
              </ThemeIcon>
            </Group>
            <Text size="xs" c="dimmed" mt="md">
              Per transaction
            </Text>
          </Card>

          <Card withBorder padding="lg" radius="md">
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Categories
                </Text>
                <Text fw={700} size="xl">
                  5
                </Text>
              </div>
              <ThemeIcon size={50} radius="md" variant="light" color="grape">
                <IconCategory size={28} stroke={1.5} />
              </ThemeIcon>
            </Group>
            <Text size="xs" c="dimmed" mt="md">
              Available categories
            </Text>
          </Card>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Card withBorder padding="lg" radius="md">
            <Title order={4} mb="md">
              Expense Distribution
            </Title>
            <Group justify="center">
              <RingProgress
                size={200}
                thickness={20}
                roundCaps
                sections={[{ value: 0, color: "gray" }]}
                label={
                  <Text ta="center" size="sm" c="dimmed">
                    No data yet
                  </Text>
                }
              />
            </Group>
          </Card>

          <Card withBorder padding="lg" radius="md">
            <Title order={4} mb="md">
              Recent Expenses
            </Title>
            <Text c="dimmed" size="sm" ta="center" py="xl">
              No expenses recorded yet.
              <br />
              Start by adding your first expense!
            </Text>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
