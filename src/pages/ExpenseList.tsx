import {
  Container,
  Title,
  Text,
  Card,
  Stack,
  TextInput,
  Select,
  Group,
  Table,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconSearch, IconFilter, IconCalendar } from "@tabler/icons-react";
import { EXPENSE_CATEGORIES } from "../types/expense";

export default function ExpenseList() {
  return (
    <Container size="lg">
      <Stack gap="lg">
        <div>
          <Title order={2}>Expenses</Title>
          <Text c="dimmed" size="sm">
            View and manage all your expenses
          </Text>
        </div>

        <Card withBorder padding="lg" radius="md">
          <Stack gap="md">
            <Group grow>
              <TextInput
                placeholder="Search by title..."
                leftSection={<IconSearch size={18} />}
                size="md"
              />
              <Select
                placeholder="All categories"
                leftSection={<IconFilter size={18} />}
                data={["All", ...EXPENSE_CATEGORIES]}
                size="md"
                clearable
              />
              <MonthPickerInput
                placeholder="Filter by month"
                leftSection={<IconCalendar size={18} />}
                size="md"
                clearable
              />
            </Group>
          </Stack>
        </Card>

        <Card withBorder padding="lg" radius="md">
          <Table.ScrollContainer minWidth={600}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th style={{ textAlign: "right" }}>Amount</Table.Th>
                  <Table.Th style={{ width: 50 }}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Text c="dimmed" ta="center" py="xl">
                      No expenses found. Add your first expense to get started!
                    </Text>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Card>
      </Stack>
    </Container>
  );
}
