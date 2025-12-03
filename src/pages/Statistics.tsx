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
  Badge,
  Button,
} from "@mantine/core";
import { PieChart, AreaChart } from "@mantine/charts";
import { IconTrophy, IconChartPie, IconTrendingUp, IconDownload } from "@tabler/icons-react";
import { EXPENSE_CATEGORY_COLORS, INCOME_CATEGORY_COLORS } from "../types/expense";
import { useTransactions } from "../contexts/ExpenseContext";
import { useMemo } from "react";
import dayjs from "dayjs";

export default function Statistics() {
  const { stats, transactions } = useTransactions();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
  };

  // Prepare monthly trend data (last 6 months)
  const monthlyTrendData = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const month = dayjs().subtract(i, "month");
      const monthStr = month.format("YYYY-MM");
      const monthTransactions = transactions.filter((t) => t.date.startsWith(monthStr));

      const income = monthTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = monthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({
        month: month.format("MM/YYYY"),
        "Thu nhập": income,
        "Chi tiêu": expense,
      });
    }
    return months;
  }, [transactions]);

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

  const handleExport = () => {
    // Create CSV content
    const headers = ["Ngày", "Tiêu đề", "Loại", "Danh mục", "Số tiền", "Ghi chú"];
    const rows = transactions.map((t) => [
      dayjs(t.date).format("DD/MM/YYYY"),
      t.title,
      t.type === "income" ? "Thu nhập" : "Chi tiêu",
      t.category,
      t.amount.toString(),
      t.note || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `giao-dich-${dayjs().format("YYYY-MM-DD")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container size="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Title order={2}>Thống kê</Title>
            <Text c="dimmed" size="sm">
              Phân tích các giao dịch của bạn
            </Text>
          </div>
          <Button
            leftSection={<IconDownload size={18} />}
            variant="light"
            onClick={handleExport}
            disabled={transactions.length === 0}
          >
            Xuất CSV
          </Button>
        </Group>

        {/* Category Distribution */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Card withBorder padding="lg" radius="md">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={40} radius="md" variant="light" color="red">
                  <IconChartPie size={24} stroke={1.5} />
                </ThemeIcon>
                <Title order={4}>Phân bố chi tiêu</Title>
              </Group>

              {expenseChartData.length > 0 ? (
                <Group justify="center" py="md">
                  <PieChart
                    size={280}
                    data={expenseChartData}
                    withLabels
                    labelsType="percent"
                    withTooltip
                    tooltipDataSource="segment"
                  />
                </Group>
              ) : (
                <Text c="dimmed" size="sm" ta="center" py="xl">
                  Chưa có dữ liệu chi tiêu
                </Text>
              )}
            </Stack>
          </Card>

          <Card withBorder padding="lg" radius="md">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={40} radius="md" variant="light" color="green">
                  <IconChartPie size={24} stroke={1.5} />
                </ThemeIcon>
                <Title order={4}>Phân bố thu nhập</Title>
              </Group>

              {incomeChartData.length > 0 ? (
                <Group justify="center" py="md">
                  <PieChart
                    size={280}
                    data={incomeChartData}
                    withLabels
                    labelsType="percent"
                    withTooltip
                    tooltipDataSource="segment"
                  />
                </Group>
              ) : (
                <Text c="dimmed" size="sm" ta="center" py="xl">
                  Chưa có dữ liệu thu nhập
                </Text>
              )}
            </Stack>
          </Card>
        </SimpleGrid>

        {/* Top Categories */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Card withBorder padding="lg" radius="md">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={40} radius="md" variant="light" color="red">
                  <IconTrophy size={24} stroke={1.5} />
                </ThemeIcon>
                <Title order={4}>Top danh mục chi tiêu</Title>
              </Group>

              {stats.topExpenseCategories.length > 0 ? (
                <List spacing="md" size="md" center>
                  {stats.topExpenseCategories.slice(0, 3).map((cat, index) => (
                    <List.Item
                      key={cat.category}
                      icon={
                        <ThemeIcon
                          color={index === 0 ? "yellow" : index === 1 ? "gray" : "orange"}
                          size={24}
                          radius="xl"
                        >
                          <Text size="xs" fw={700}>
                            {index + 1}
                          </Text>
                        </ThemeIcon>
                      }
                    >
                      <Group justify="space-between">
                        <Badge
                          color={
                            EXPENSE_CATEGORY_COLORS[
                              cat.category as keyof typeof EXPENSE_CATEGORY_COLORS
                            ]
                          }
                          variant="dot"
                        >
                          {cat.category}
                        </Badge>
                        <Text fw={700}>{formatCurrency(cat.amount)}</Text>
                      </Group>
                    </List.Item>
                  ))}
                </List>
              ) : (
                <Text c="dimmed" size="sm" ta="center" mt="md">
                  Thêm giao dịch để xem thống kê
                </Text>
              )}
            </Stack>
          </Card>

          <Card withBorder padding="lg" radius="md">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={40} radius="md" variant="light" color="green">
                  <IconTrophy size={24} stroke={1.5} />
                </ThemeIcon>
                <Title order={4}>Top danh mục thu nhập</Title>
              </Group>

              {stats.topIncomeCategories.length > 0 ? (
                <List spacing="md" size="md" center>
                  {stats.topIncomeCategories.slice(0, 3).map((cat, index) => (
                    <List.Item
                      key={cat.category}
                      icon={
                        <ThemeIcon
                          color={index === 0 ? "yellow" : index === 1 ? "gray" : "orange"}
                          size={24}
                          radius="xl"
                        >
                          <Text size="xs" fw={700}>
                            {index + 1}
                          </Text>
                        </ThemeIcon>
                      }
                    >
                      <Group justify="space-between">
                        <Badge
                          color={
                            INCOME_CATEGORY_COLORS[
                              cat.category as keyof typeof INCOME_CATEGORY_COLORS
                            ]
                          }
                          variant="dot"
                        >
                          {cat.category}
                        </Badge>
                        <Text fw={700}>{formatCurrency(cat.amount)}</Text>
                      </Group>
                    </List.Item>
                  ))}
                </List>
              ) : (
                <Text c="dimmed" size="sm" ta="center" mt="md">
                  Thêm giao dịch để xem thống kê
                </Text>
              )}
            </Stack>
          </Card>
        </SimpleGrid>

        {/* Monthly Trends */}
        <Card withBorder padding="lg" radius="md">
          <Stack gap="md">
            <Group>
              <ThemeIcon size={40} radius="md" variant="light" color="blue">
                <IconTrendingUp size={24} stroke={1.5} />
              </ThemeIcon>
              <Title order={4}>Xu hướng 6 tháng gần đây</Title>
            </Group>

            {monthlyTrendData.some((d) => d["Thu nhập"] > 0 || d["Chi tiêu"] > 0) ? (
              <AreaChart
                h={300}
                data={monthlyTrendData}
                dataKey="month"
                series={[
                  { name: "Thu nhập", color: "green.6" },
                  { name: "Chi tiêu", color: "red.6" },
                ]}
                curveType="monotone"
                withLegend
                withDots
                withYAxis
                withXAxis
                gridAxis="xy"
              />
            ) : (
              <Text c="dimmed" ta="center" py="xl">
                Bắt đầu theo dõi giao dịch để xem xu hướng hàng tháng.
              </Text>
            )}
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
