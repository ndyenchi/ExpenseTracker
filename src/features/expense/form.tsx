import {
  Card,
  Stack,
  TextInput,
  NumberInput,
  Select,
  Textarea,
  Group,
  Button,
  Modal,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconPlus, IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  type TransactionType,
  type Transaction,
} from "../../types/expense";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useTransactions } from "../../contexts/ExpenseContext";
import { generateUUID } from "../../utils/uuid";
import { useState } from "react";

interface AddTransactionProps {
  defaultType?: TransactionType;
}

export const AddExpense = ({ defaultType = "expense" }: AddTransactionProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleClose = () => {
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Thêm giao dịch" size="md">
        <FormExpense onClose={handleClose} defaultType={defaultType} />
      </Modal>

      <Button variant="filled" size="md" onClick={open} leftSection={<IconPlus size={18} />}>
        Thêm giao dịch
      </Button>
    </>
  );
};

interface FormExpenseProps {
  onClose: () => void;
  defaultType?: TransactionType;
  transaction?: Transaction;
}

const FormExpense = ({ onClose, defaultType = "expense", transaction }: FormExpenseProps) => {
  const { addTransaction, updateTransaction } = useTransactions();
  const [transactionType, setTransactionType] = useState<TransactionType>(
    transaction?.type || defaultType
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: transaction?.title || "",
      category: transaction?.category || "",
      amount: transaction?.amount || 0,
      date: transaction?.date ? new Date(transaction.date) : new Date(),
      note: transaction?.note || "",
    },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Vui lòng nhập tiêu đề"),
      amount: (value) => (value > 0 ? null : "Số tiền phải lớn hơn 0"),
      category: (value) => (value ? null : "Vui lòng chọn danh mục"),
    },
  });

  const onSubmit = form.onSubmit((values) => {
    const transactionData: Transaction = {
      id: transaction?.id || generateUUID(),
      title: values.title,
      amount: values.amount,
      type: transactionType,
      category: values.category as Transaction["category"],
      date: values.date.toISOString().split("T")[0],
      note: values.note || undefined,
    };

    if (transaction) {
      updateTransaction(transaction.id, transactionData);
    } else {
      addTransaction(transactionData);
    }

    form.reset();
    onClose();
  });

  const categories = transactionType === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <Card withBorder={false} padding="md" radius="md">
      <form onSubmit={onSubmit}>
        <Stack gap="md">
          <div>
            <Text size="sm" fw={500} mb={8}>
              Loại giao dịch
            </Text>
            <SegmentedControl
              value={transactionType}
              onChange={(value) => {
                setTransactionType(value as TransactionType);
                form.setFieldValue("category", "");
              }}
              fullWidth
              data={[
                {
                  value: "expense",
                  label: (
                    <Group gap="xs" justify="center">
                      <IconTrendingDown size={16} />
                      <span>Chi tiêu</span>
                    </Group>
                  ),
                },
                {
                  value: "income",
                  label: (
                    <Group gap="xs" justify="center">
                      <IconTrendingUp size={16} />
                      <span>Thu nhập</span>
                    </Group>
                  ),
                },
              ]}
              color={transactionType === "expense" ? "red" : "green"}
            />
          </div>

          <TextInput
            label="Tiêu đề"
            placeholder="VD: Mua sắm tạp hóa"
            required
            size="md"
            {...form.getInputProps("title")}
          />

          <NumberInput
            label="Số tiền"
            required
            min={0}
            decimalScale={0}
            thousandSeparator=","
            suffix=" ₫"
            size="md"
            {...form.getInputProps("amount")}
          />

          <Select
            label="Danh mục"
            placeholder="Chọn danh mục"
            required
            data={categories}
            size="md"
            {...form.getInputProps("category")}
          />

          <DatePickerInput
            label="Ngày"
            placeholder="Chọn ngày"
            required
            leftSection={<IconCalendar size={18} />}
            size="md"
            maxDate={new Date()}
            {...form.getInputProps("date")}
          />

          <Textarea
            label="Ghi chú"
            placeholder={`Ghi chú về ${transactionType === "expense" ? "khoản chi" : "khoản thu"} này`}
            minRows={3}
            size="md"
            {...form.getInputProps("note")}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={onClose}>
              Hủy
            </Button>
            <Button
              type="submit"
              size="md"
              leftSection={<IconPlus size={18} />}
              color={transactionType === "expense" ? "red" : "green"}
            >
              {transaction ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
};

// Export for use in other components
export { FormExpense };
