import { Card, Group, Select, Stack, TextInput, SegmentedControl, Text } from "@mantine/core";
import { MonthPickerInput, DatePickerInput } from "@mantine/dates";
import { IconSearch, IconFilter, IconCalendar } from "@tabler/icons-react";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  type TransactionType,
  type TransactionCategory,
} from "../../types/expense";
import { useTransactions } from "../../contexts/ExpenseContext";
import { useState } from "react";
import dayjs from "dayjs";

type FilterMode = "month" | "range";

export const Filter = () => {
  const { filters, setFilters } = useTransactions();
  const [filterMode, setFilterMode] = useState<FilterMode>("month");
  const [selectedType, setSelectedType] = useState<TransactionType | "all">(filters.type || "all");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: event.target.value || undefined });
  };

  const handleTypeChange = (value: string) => {
    const newType = value as TransactionType | "all";
    setSelectedType(newType);
    setFilters({
      ...filters,
      type: newType === "all" ? undefined : newType,
      category: undefined, // Reset category when type changes
    });
  };

  const handleCategoryChange = (value: string | null) => {
    setFilters({ ...filters, category: (value as TransactionCategory) || undefined });
  };

  const handleMonthChange = (value: Date | null) => {
    if (value) {
      const monthStr = dayjs(value).format("YYYY-MM");
      setFilters({ ...filters, month: monthStr, startDate: undefined, endDate: undefined });
    } else {
      setFilters({ ...filters, month: undefined });
    }
  };

  const handleStartDateChange = (value: Date | null) => {
    const dateStr = value ? dayjs(value).format("YYYY-MM-DD") : undefined;
    setFilters({
      ...filters,
      startDate: dateStr,
      month: undefined,
    });
  };

  const handleEndDateChange = (value: Date | null) => {
    const dateStr = value ? dayjs(value).format("YYYY-MM-DD") : undefined;
    setFilters({
      ...filters,
      endDate: dateStr,
      month: undefined,
    });
  };

  const categories =
    selectedType === "expense"
      ? EXPENSE_CATEGORIES
      : selectedType === "income"
        ? INCOME_CATEGORIES
        : [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES.filter((cat) => cat !== "Khác")];

  return (
    <Card withBorder padding="lg" radius="md">
      <Stack gap="md">
        {/* Type Filter */}
        <div>
          <Text size="sm" fw={500} mb={8}>
            Loại giao dịch
          </Text>
          <SegmentedControl
            value={selectedType}
            onChange={handleTypeChange}
            fullWidth
            data={[
              { label: "Tất cả", value: "all" },
              { label: "Chi tiêu", value: "expense" },
              { label: "Thu nhập", value: "income" },
            ]}
          />
        </div>

        {/* Search and Category */}
        <Group grow>
          <TextInput
            placeholder="Tìm kiếm theo tiêu đề..."
            leftSection={<IconSearch size={18} />}
            size="md"
            value={filters.search || ""}
            onChange={handleSearchChange}
          />
          <Select
            placeholder="Tất cả danh mục"
            leftSection={<IconFilter size={18} />}
            data={categories}
            size="md"
            clearable
            value={filters.category || null}
            onChange={handleCategoryChange}
          />
        </Group>

        {/* Date Filter Mode Toggle */}
        <div>
          <Text size="sm" fw={500} mb={8}>
            Lọc theo thời gian
          </Text>
          <SegmentedControl
            value={filterMode}
            onChange={(value) => setFilterMode(value as FilterMode)}
            fullWidth
            data={[
              { label: "Theo tháng", value: "month" },
              { label: "Khoảng thời gian", value: "range" },
            ]}
          />
        </div>

        {/* Date Filters */}
        {filterMode === "month" ? (
          <MonthPickerInput
            placeholder="Chọn tháng"
            leftSection={<IconCalendar size={18} />}
            size="md"
            clearable
            value={filters.month ? new Date(filters.month + "-01") : null}
            onChange={handleMonthChange as any}
          />
        ) : (
          <Group grow>
            <DatePickerInput
              placeholder="Từ ngày"
              leftSection={<IconCalendar size={18} />}
              size="md"
              clearable
              value={filters.startDate ? new Date(filters.startDate) : null}
              onChange={handleStartDateChange as any}
              maxDate={filters.endDate ? new Date(filters.endDate) : new Date()}
            />
            <DatePickerInput
              placeholder="Đến ngày"
              leftSection={<IconCalendar size={18} />}
              size="md"
              clearable
              value={filters.endDate ? new Date(filters.endDate) : null}
              onChange={handleEndDateChange as any}
              minDate={filters.startDate ? new Date(filters.startDate) : undefined}
              maxDate={new Date()}
            />
          </Group>
        )}
      </Stack>
    </Card>
  );
};
