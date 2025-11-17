import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { AddExpense, ExpenseList, Filter } from "../features/expense";

export default function Expense() {
  return (
    <Container size="xl" pos={"relative"}>
      <Stack gap="lg">
        <div>
          <Title order={2}>Expenses</Title>
          <Text c="dimmed" size="sm">
            View and manage all your expenses
          </Text>
        </div>

        <Filter />
        <ExpenseList />
      </Stack>
      <Box pos={"absolute"} bottom={10} right={10}>
        <AddExpense />
      </Box>
    </Container>
  );
}
