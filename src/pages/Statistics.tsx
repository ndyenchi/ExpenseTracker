import {
  Container,
  Title,
  Text,
  Card,
  Stack,
  SimpleGrid,
  Group,
  List,
  ThemeIcon,
} from "@mantine/core";
import { PieChart } from "@mantine/charts";
import { IconTrophy, IconChartPie } from "@tabler/icons-react";
import { CATEGORY_COLORS } from "../types/expense";

export default function Statistics() {
  // Placeholder data - will be connected to actual expense data
  const pieData = [
    {
      name: "Food & Drinks",
      value: 0,
      color: CATEGORY_COLORS["Food & Drinks"],
    },
    {
      name: "Transportation",
      value: 0,
      color: CATEGORY_COLORS["Transportation"],
    },
    { name: "Shopping", value: 0, color: CATEGORY_COLORS["Shopping"] },
    { name: "Bills", value: 0, color: CATEGORY_COLORS["Bills"] },
    { name: "Others", value: 0, color: CATEGORY_COLORS["Others"] },
  ];

  return (
    <Container size="lg">
      <Stack gap="lg">
        <div>
          <Title order={2}>Statistics</Title>
          <Text c="dimmed" size="sm">
            Analyze your spending patterns
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Card withBorder padding="lg" radius="md">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={40} radius="md" variant="light" color="blue">
                  <IconChartPie size={24} stroke={1.5} />
                </ThemeIcon>
                <Title order={4}>Expense Distribution</Title>
              </Group>

              <Group justify="center" py="md">
                <PieChart
                  size={280}
                  data={pieData}
                  withLabels
                  labelsType="percent"
                  withTooltip
                  tooltipDataSource="segment"
                />
              </Group>
            </Stack>
          </Card>

          <Card withBorder padding="lg" radius="md">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={40} radius="md" variant="light" color="yellow">
                  <IconTrophy size={24} stroke={1.5} />
                </ThemeIcon>
                <Title order={4}>Top 3 Categories</Title>
              </Group>

              <List spacing="md" size="md" center>
                <List.Item
                  icon={
                    <ThemeIcon color="gold" size={24} radius="xl">
                      <Text size="xs" fw={700}>
                        1
                      </Text>
                    </ThemeIcon>
                  }
                >
                  <Group justify="space-between">
                    <Text>No data</Text>
                    <Text fw={700}>$0.00</Text>
                  </Group>
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="gray.5" size={24} radius="xl">
                      <Text size="xs" fw={700}>
                        2
                      </Text>
                    </ThemeIcon>
                  }
                >
                  <Group justify="space-between">
                    <Text>No data</Text>
                    <Text fw={700}>$0.00</Text>
                  </Group>
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="orange.7" size={24} radius="xl">
                      <Text size="xs" fw={700}>
                        3
                      </Text>
                    </ThemeIcon>
                  }
                >
                  <Group justify="space-between">
                    <Text>No data</Text>
                    <Text fw={700}>$0.00</Text>
                  </Group>
                </List.Item>
              </List>

              <Text c="dimmed" size="sm" ta="center" mt="md">
                Add expenses to see your spending patterns
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>

        <Card withBorder padding="lg" radius="md">
          <Title order={4} mb="md">
            Monthly Trends
          </Title>
          <Text c="dimmed" ta="center" py="xl">
            Start tracking expenses to see monthly trends and patterns.
          </Text>
        </Card>
      </Stack>
    </Container>
  );
}
