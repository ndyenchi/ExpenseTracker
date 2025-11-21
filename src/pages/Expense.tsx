import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { AddExpense, ExpenseList, Filter } from "../features/expense";

export default function Expense() {
  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={2}>Giao dịch</Title>
          <Text c="dimmed" size="sm">
            Xem và quản lý tất cả các giao dịch thu chi
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
