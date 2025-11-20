import { SimpleGrid, Text, Card, Title, Group, RingProgress } from "@mantine/core";

export const Chart = () => {
  return (
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
  );
};
