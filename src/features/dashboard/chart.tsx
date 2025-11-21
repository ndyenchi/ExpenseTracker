import { SimpleGrid, Text, Card, Title, Stack, Group, Badge } from "@mantine/core";
import { PieChart } from "@mantine/charts";
import { useTransactions } from "../../contexts/ExpenseContext";
import { EXPENSE_CATEGORY_COLORS, INCOME_CATEGORY_COLORS } from "../../types/expense";

export const Chart = () => {
  const { stats } = useTransactions();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
  };

  // Prepare expense chart data
  const expenseChartData = stats.topExpenseCategories.map((cat) => ({
    name: cat.category,
    value: cat.amount,
    color: EXPENSE_CATEGORY_COLORS[cat.category as keyof typeof EXPENSE_CATEGORY_COLORS],
  }));

  // Prepare income chart data
  const incomeChartData = stats.topIncomeCategories.map((cat) => ({
    name: cat.category,
    value: cat.amount,
    color: INCOME_CATEGORY_COLORS[cat.category as keyof typeof INCOME_CATEGORY_COLORS],
  }));

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
      {/* Expense Distribution */}
      <Card withBorder padding="lg" radius="md">
        <Title order={4} mb="md">
          Phân bố chi tiêu
        </Title>
        {expenseChartData.length > 0 ? (
          <Stack gap="md">
            <PieChart
              data={expenseChartData}
              size={220}
              withLabelsLine
              labelsPosition="outside"
              labelsType="percent"
              withTooltip
              tooltipDataSource="segment"
            />
            <Stack gap="xs">
              {stats.topExpenseCategories.slice(0, 5).map((cat) => (
                <Group key={cat.category} justify="space-between">
                  <Group gap="xs">
                    <Badge
                      color={
                        EXPENSE_CATEGORY_COLORS[
                          cat.category as keyof typeof EXPENSE_CATEGORY_COLORS
                        ]
                      }
                      variant="dot"
                      size="lg"
                    >
                      {cat.category}
                    </Badge>
                  </Group>
                  <Text size="sm" fw={500}>
                    {formatCurrency(cat.amount)} ({cat.percentage.toFixed(1)}%)
                  </Text>
                </Group>
              ))}
            </Stack>
          </Stack>
        ) : (
          <Text c="dimmed" size="sm" ta="center" py="xl">
            Chưa có dữ liệu chi tiêu.
            <br />
            Thêm giao dịch chi tiêu đầu tiên của bạn!
          </Text>
        )}
      </Card>

      {/* Income Distribution */}
      <Card withBorder padding="lg" radius="md">
        <Title order={4} mb="md">
          Phân bố thu nhập
        </Title>
        {incomeChartData.length > 0 ? (
          <Stack gap="md">
            <PieChart
              data={incomeChartData}
              size={220}
              withLabelsLine
              labelsPosition="outside"
              labelsType="percent"
              withTooltip
              tooltipDataSource="segment"
            />
            <Stack gap="xs">
              {stats.topIncomeCategories.slice(0, 5).map((cat) => (
                <Group key={cat.category} justify="space-between">
                  <Group gap="xs">
                    <Badge
                      color={
                        INCOME_CATEGORY_COLORS[cat.category as keyof typeof INCOME_CATEGORY_COLORS]
                      }
                      variant="dot"
                      size="lg"
                    >
                      {cat.category}
                    </Badge>
                  </Group>
                  <Text size="sm" fw={500}>
                    {formatCurrency(cat.amount)} ({cat.percentage.toFixed(1)}%)
                  </Text>
                </Group>
              ))}
            </Stack>
          </Stack>
        ) : (
          <Text c="dimmed" size="sm" ta="center" py="xl">
            Chưa có dữ liệu thu nhập.
            <br />
            Thêm giao dịch thu nhập đầu tiên của bạn!
          </Text>
        )}
      </Card>
    </SimpleGrid>
  );
};
