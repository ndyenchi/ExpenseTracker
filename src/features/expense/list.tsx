import { Card, Table, Text, Badge, ActionIcon, Group, Modal, Button, Stack } from "@mantine/core";
import { IconEdit, IconTrash, IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { useTransactions } from "../../contexts/ExpenseContext";
import {
  EXPENSE_CATEGORY_COLORS,
  INCOME_CATEGORY_COLORS,
  type Transaction,
} from "../../types/expense";
import { useState } from "react";
import { FormExpense } from "./form";
import dayjs from "dayjs";

export const ExpenseList = () => {
  const { filteredTransactions, deleteTransaction } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteTransaction(id);
    setDeletingId(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
  };

  if (filteredTransactions.length === 0) {
    return (
      <Card withBorder padding="lg" radius="md">
        <Text c="dimmed" ta="center" py="xl">
          Không tìm thấy giao dịch nào. Thêm giao dịch đầu tiên của bạn!
        </Text>
      </Card>
    );
  }

  return (
    <>
      <Card withBorder padding="lg" radius="md">
        <Table.ScrollContainer minWidth={600}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: 100 }}>Ngày</Table.Th>
                <Table.Th>Tiêu đề</Table.Th>
                <Table.Th style={{ width: 120 }}>Loại</Table.Th>
                <Table.Th style={{ width: 150 }}>Danh mục</Table.Th>
                <Table.Th style={{ textAlign: "right", width: 150 }}>Số tiền</Table.Th>
                <Table.Th style={{ width: 80, textAlign: "center" }}>Thao tác</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredTransactions.map((transaction) => {
                const categoryColor =
                  transaction.type === "expense"
                    ? EXPENSE_CATEGORY_COLORS[
                        transaction.category as keyof typeof EXPENSE_CATEGORY_COLORS
                      ]
                    : INCOME_CATEGORY_COLORS[
                        transaction.category as keyof typeof INCOME_CATEGORY_COLORS
                      ];

                return (
                  <Table.Tr key={transaction.id}>
                    <Table.Td>
                      <Text size="sm">{dayjs(transaction.date).format("DD/MM/YYYY")}</Text>
                    </Table.Td>
                    <Table.Td>
                      <div>
                        <Text size="sm" fw={500}>
                          {transaction.title}
                        </Text>
                        {transaction.note && (
                          <Text size="xs" c="dimmed" lineClamp={1}>
                            {transaction.note}
                          </Text>
                        )}
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={transaction.type === "expense" ? "red" : "green"}
                        variant="light"
                        leftSection={
                          transaction.type === "expense" ? (
                            <IconTrendingDown size={14} />
                          ) : (
                            <IconTrendingUp size={14} />
                          )
                        }
                      >
                        {transaction.type === "expense" ? "Chi tiêu" : "Thu nhập"}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={categoryColor} variant="dot">
                        {transaction.category}
                      </Badge>
                    </Table.Td>
                    <Table.Td style={{ textAlign: "right" }}>
                      <Text size="sm" fw={600} c={transaction.type === "expense" ? "red" : "green"}>
                        {transaction.type === "expense" ? "-" : "+"}
                        {formatCurrency(transaction.amount)}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={4} justify="center">
                        <ActionIcon
                          variant="subtle"
                          color="blue"
                          onClick={() => setEditingTransaction(transaction)}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => setDeletingId(transaction.id)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>

      {/* Edit Modal */}
      <Modal
        opened={editingTransaction !== null}
        onClose={() => setEditingTransaction(null)}
        title="Chỉnh sửa giao dịch"
        size="md"
      >
        {editingTransaction && (
          <FormExpense
            transaction={editingTransaction}
            onClose={() => setEditingTransaction(null)}
            defaultType={editingTransaction.type}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deletingId !== null}
        onClose={() => setDeletingId(null)}
        title="Xác nhận xóa"
        size="sm"
      >
        <Stack>
          <Text>Bạn có chắc chắn muốn xóa giao dịch này không?</Text>
          <Group justify="flex-end">
            <Button variant="subtle" onClick={() => setDeletingId(null)}>
              Hủy
            </Button>
            <Button color="red" onClick={() => deletingId && handleDelete(deletingId)}>
              Xóa
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
