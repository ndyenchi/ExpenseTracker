import { Title, SimpleGrid, Card, Group, ThemeIcon, Text, Stack } from "@mantine/core";
import { IconCash, IconTrendingUp, IconTrendingDown, IconWallet } from "@tabler/icons-react";
import { useTransactions } from "../../contexts/ExpenseContext";
import { useMemo } from "react";
import dayjs from "dayjs";

export const OverView = () => {
  const { stats, transactions } = useTransactions();

  // Calculate current month stats
  const currentMonthStats = useMemo(() => {
    const currentMonth = dayjs().format("YYYY-MM");
    const monthTransactions = transactions.filter((t) => t.date.startsWith(currentMonth));

    const monthIncome = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const monthExpense = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income: monthIncome,
      expense: monthExpense,
      balance: monthIncome - monthExpense,
      count: monthTransactions.length,
    };
  }, [transactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
  };

  return (
    <>
      <div>
        <Title order={2}>Tổng quan</Title>
        <Text c="dimmed" size="sm">
          Thống kê giao dịch của bạn
        </Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        {/* Total Income */}
        <Card withBorder padding="lg" radius="md">
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                Tổng thu nhập
              </Text>
              <Text fw={700} size="xl" c="green">
                {formatCurrency(stats.totalIncome)}
              </Text>
            </div>
            <ThemeIcon size={50} radius="md" variant="light" color="green">
              <IconTrendingUp size={28} stroke={1.5} />
            </ThemeIcon>
          </Group>
          <Text size="xs" c="dimmed" mt="md">
            {stats.incomeCount} giao dịch thu
          </Text>
        </Card>

        {/* Total Expense */}
        <Card withBorder padding="lg" radius="md">
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                Tổng chi tiêu
              </Text>
              <Text fw={700} size="xl" c="red">
                {formatCurrency(stats.totalExpense)}
              </Text>
            </div>
            <ThemeIcon size={50} radius="md" variant="light" color="red">
              <IconTrendingDown size={28} stroke={1.5} />
            </ThemeIcon>
          </Group>
          <Text size="xs" c="dimmed" mt="md">
            {stats.expenseCount} giao dịch chi
          </Text>
        </Card>

        {/* Balance */}
        <Card withBorder padding="lg" radius="md">
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                Số dư
              </Text>
              <Text fw={700} size="xl" c={stats.balance >= 0 ? "green" : "red"}>
                {formatCurrency(stats.balance)}
              </Text>
            </div>
            <ThemeIcon
              size={50}
              radius="md"
              variant="light"
              color={stats.balance >= 0 ? "green" : "red"}
            >
              <IconWallet size={28} stroke={1.5} />
            </ThemeIcon>
          </Group>
          <Text size="xs" c="dimmed" mt="md">
            Thu nhập - Chi tiêu
          </Text>
        </Card>

        {/* This Month */}
        <Card withBorder padding="lg" radius="md">
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                Tháng này
              </Text>
              <Text fw={700} size="xl" c={currentMonthStats.balance >= 0 ? "green" : "red"}>
                {formatCurrency(currentMonthStats.balance)}
              </Text>
            </div>
            <ThemeIcon size={50} radius="md" variant="light" color="blue">
              <IconCash size={28} stroke={1.5} />
            </ThemeIcon>
          </Group>
          <Stack gap={2} mt="sm">
            <Group justify="space-between">
              <Text size="xs" c="dimmed">
                Thu: {formatCurrency(currentMonthStats.income)}
              </Text>
              <Text size="xs" c="green" fw={500}>
                +{currentMonthStats.income > 0 ? formatCurrency(currentMonthStats.income) : "0 ₫"}
              </Text>
            </Group>
            <Group justify="space-between">
              <Text size="xs" c="dimmed">
                Chi: {formatCurrency(currentMonthStats.expense)}
              </Text>
              <Text size="xs" c="red" fw={500}>
                -{currentMonthStats.expense > 0 ? formatCurrency(currentMonthStats.expense) : "0 ₫"}
              </Text>
            </Group>
          </Stack>
        </Card>
      </SimpleGrid>
    </>
  );
};
