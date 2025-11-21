// Transaction types
export type TransactionType = "income" | "expense";

// Vietnamese categories for expenses
export type ExpenseCategory =
  | "Ăn uống"
  | "Sinh hoạt"
  | "Giải trí"
  | "Mua sắm"
  | "Di chuyển"
  | "Y tế"
  | "Giáo dục"
  | "Khác";

// Vietnamese categories for income
export type IncomeCategory = "Lương" | "Thưởng" | "Đầu tư" | "Kinh doanh" | "Khác";

export type TransactionCategory = ExpenseCategory | IncomeCategory;

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string; // ISO date string
  note?: string;
}

// Legacy alias for backward compatibility
export type Expense = Transaction;

export interface TransactionFilters {
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  month?: string; // Format: YYYY-MM
  category?: TransactionCategory;
  type?: TransactionType;
  search?: string;
}

// Legacy alias
export type ExpenseFilters = TransactionFilters;

export interface TransactionStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  incomeCount: number;
  expenseCount: number;
  topExpenseCategories: Array<{
    category: ExpenseCategory;
    amount: number;
    percentage: number;
  }>;
  topIncomeCategories: Array<{
    category: IncomeCategory;
    amount: number;
    percentage: number;
  }>;
}

// Legacy alias
export type ExpenseStats = TransactionStats;

export interface Budget {
  id: string;
  month: string; // Format: YYYY-MM
  limit: number;
  category?: ExpenseCategory; // Optional: budget per category
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Ăn uống",
  "Sinh hoạt",
  "Giải trí",
  "Mua sắm",
  "Di chuyển",
  "Y tế",
  "Giáo dục",
  "Khác",
];

export const INCOME_CATEGORIES: IncomeCategory[] = [
  "Lương",
  "Thưởng",
  "Đầu tư",
  "Kinh doanh",
  "Khác",
];

export const EXPENSE_CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  "Ăn uống": "#FF6B6B",
  "Sinh hoạt": "#96CEB4",
  "Giải trí": "#DDA0DD",
  "Mua sắm": "#45B7D1",
  "Di chuyển": "#4ECDC4",
  "Y tế": "#FF8787",
  "Giáo dục": "#74C0FC",
  Khác: "#A9A9A9",
};

export const INCOME_CATEGORY_COLORS: Record<IncomeCategory, string> = {
  Lương: "#51CF66",
  Thưởng: "#94D82D",
  "Đầu tư": "#FFD43B",
  "Kinh doanh": "#22B8CF",
  Khác: "#868E96",
};

// Legacy export
export const CATEGORY_COLORS = EXPENSE_CATEGORY_COLORS;
