import { Card, Group, Select, Stack, TextInput } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconSearch, IconFilter, IconCalendar } from "@tabler/icons-react";
import { EXPENSE_CATEGORIES } from "../../types/expense";

export const Filter = () => {
  return (
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
  );
};
