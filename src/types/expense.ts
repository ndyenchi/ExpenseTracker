export type ExpenseCategory =
  | 'Food & Drinks'
  | 'Transportation'
  | 'Shopping'
  | 'Bills'
  | 'Others';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // ISO date string
  note?: string;
}

export interface ExpenseFilters {
  month?: string; // Format: YYYY-MM
  category?: ExpenseCategory;
  search?: string;
}

export interface ExpenseStats {
  total: number;
  count: number;
  topCategories: Array<{
    category: ExpenseCategory;
    amount: number;
    percentage: number;
  }>;
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Food & Drinks',
  'Transportation',
  'Shopping',
  'Bills',
  'Others',
];

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  'Food & Drinks': '#FF6B6B',
  'Transportation': '#4ECDC4',
  'Shopping': '#45B7D1',
  'Bills': '#96CEB4',
  'Others': '#DDA0DD',
};
