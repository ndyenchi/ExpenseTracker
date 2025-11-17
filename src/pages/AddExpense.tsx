import {
  Container,
  Title,
  Text,
  Card,
  Stack,
  TextInput,
  NumberInput,
  Select,
  Textarea,
  Button,
  Group,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconPlus, IconCalendar } from "@tabler/icons-react";
import { EXPENSE_CATEGORIES } from "../types/expense";

export default function AddExpense() {
  return (
    <Container size="sm">
      <Stack gap="lg">
        <div>
          <Title order={2}>Add Expense</Title>
          <Text c="dimmed" size="sm">
            Record a new expense transaction
          </Text>
        </div>

        <Card withBorder padding="xl" radius="md">
          <form>
            <Stack gap="md">
              <TextInput
                label="Title"
                placeholder="e.g., Grocery shopping"
                required
                size="md"
              />

              <NumberInput
                label="Amount"
                placeholder="0.00"
                required
                min={0}
                decimalScale={2}
                fixedDecimalScale
                prefix="$"
                size="md"
              />

              <Select
                label="Category"
                placeholder="Select category"
                required
                data={EXPENSE_CATEGORIES}
                size="md"
              />

              <DatePickerInput
                defaultValue={new Date()}
                label="Date"
                placeholder="Pick date"
                required
                leftSection={<IconCalendar size={18} />}
                size="md"
                maxDate={new Date()}
              />

              <Textarea
                label="Note"
                placeholder="Optional notes about this expense"
                minRows={3}
                size="md"
              />

              <Group justify="flex-end" mt="md">
                <Button
                  type="submit"
                  size="md"
                  leftSection={<IconPlus size={18} />}
                >
                  Add Expense
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
}
