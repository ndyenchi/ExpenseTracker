import { Title, SimpleGrid, Card, Group, ThemeIcon, Text } from "@mantine/core";
import { IconCash, IconReceipt, IconTrendingUp, IconCategory } from "@tabler/icons-react";

export const OverView = () => {
  return (
    <>
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
    </>
  );
};
