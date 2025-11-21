import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from "react";
import type {
  Transaction,
  TransactionFilters,
  TransactionStats,
  Budget,
  ExpenseCategory,
  IncomeCategory,
} from "../types/expense";

const TRANSACTIONS_STORAGE_KEY = "expense-tracker-transactions";
const BUDGETS_STORAGE_KEY = "expense-tracker-budgets";

interface TransactionContextType {
  // Transactions
  transactions: Transaction[];
  filters: TransactionFilters;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  setFilters: (filters: TransactionFilters) => void;
  filteredTransactions: Transaction[];

  // Budgets
  budgets: Budget[];
  addBudget: (budget: Budget) => void;
  updateBudget: (id: string, budget: Budget) => void;
  deleteBudget: (id: string) => void;
  getBudgetForMonth: (month: string, category?: ExpenseCategory) => Budget | undefined;
  isBudgetExceeded: (month: string, category?: ExpenseCategory) => boolean;

  // Statistics
  stats: TransactionStats;

  // Legacy aliases
  expenses: Transaction[];
  addExpense: (transaction: Transaction) => void;
  updateExpense: (id: string, transaction: Transaction) => void;
  deleteExpense: (id: string) => void;
  filteredExpenses: Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load transactions from localStorage on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
      console.log("📥 Loading transactions from localStorage:", storedData);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log("✅ Loaded transactions:", parsedData);
        setTransactions(parsedData);
      } else {
        console.log("ℹ️ No transactions found in localStorage");
      }
    } catch (error) {
      console.error("❌ Failed to load transactions from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Load budgets from localStorage on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(BUDGETS_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setBudgets(parsedData);
      }
    } catch (error) {
      console.error("Failed to load budgets from localStorage:", error);
    }
  }, []);

  // Save transactions to localStorage whenever they change (but only after initial load)
  useEffect(() => {
    if (!isLoaded) return; // Don't save on initial mount

    try {
      console.log("💾 Saving transactions to localStorage:", transactions);
      localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
      console.log("✅ Transactions saved successfully");
    } catch (error) {
      console.error("❌ Failed to save transactions to localStorage:", error);
    }
  }, [transactions, isLoaded]);

  // Save budgets to localStorage whenever they change
  useEffect(() => {
    if (!isLoaded) return; // Don't save on initial mount

    try {
      localStorage.setItem(BUDGETS_STORAGE_KEY, JSON.stringify(budgets));
    } catch (error) {
      console.error("Failed to save budgets to localStorage:", error);
    }
  }, [budgets, isLoaded]);

  // Transaction operations
  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const updateTransaction = (id: string, updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((transaction) => (transaction.id === id ? updatedTransaction : transaction))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
  };

  // Budget operations
  const addBudget = (budget: Budget) => {
    setBudgets((prev) => [budget, ...prev]);
  };

  const updateBudget = (id: string, updatedBudget: Budget) => {
    setBudgets((prev) => prev.map((budget) => (budget.id === id ? updatedBudget : budget)));
  };

  const deleteBudget = (id: string) => {
    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
  };

  const getBudgetForMonth = (month: string, category?: ExpenseCategory) => {
    return budgets.find(
      (budget) =>
        budget.month === month && (category ? budget.category === category : !budget.category)
    );
  };

  const isBudgetExceeded = (month: string, category?: ExpenseCategory) => {
    const budget = getBudgetForMonth(month, category);
    if (!budget) return false;

    const monthExpenses = transactions.filter(
      (t) =>
        t.type === "expense" &&
        t.date.substring(0, 7) === month &&
        (category ? t.category === category : true)
    );

    const totalExpense = monthExpenses.reduce((sum, t) => sum + t.amount, 0);
    return totalExpense > budget.limit;
  };

  // Apply filters to get filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Filter by search (title)
      if (
        filters.search &&
        !transaction.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Filter by type
      if (filters.type && transaction.type !== filters.type) {
        return false;
      }

      // Filter by category
      if (filters.category && transaction.category !== filters.category) {
        return false;
      }

      // Filter by date range
      if (filters.startDate && transaction.date < filters.startDate) {
        return false;
      }

      if (filters.endDate && transaction.date > filters.endDate) {
        return false;
      }

      // Filter by month (YYYY-MM format)
      if (filters.month) {
        const transactionMonth = transaction.date.substring(0, 7);
        if (transactionMonth !== filters.month) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, filters]);

  // Calculate statistics
  const stats: TransactionStats = useMemo(() => {
    const income = filteredTransactions.filter((t) => t.type === "income");
    const expenses = filteredTransactions.filter((t) => t.type === "expense");

    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

    // Calculate top expense categories
    const expenseByCat = expenses.reduce(
      (acc, t) => {
        const cat = t.category as ExpenseCategory;
        acc[cat] = (acc[cat] || 0) + t.amount;
        return acc;
      },
      {} as Record<ExpenseCategory, number>
    );

    const topExpenseCategories = Object.entries(expenseByCat)
      .map(([category, amount]) => ({
        category: category as ExpenseCategory,
        amount,
        percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    // Calculate top income categories
    const incomeByCat = income.reduce(
      (acc, t) => {
        const cat = t.category as IncomeCategory;
        acc[cat] = (acc[cat] || 0) + t.amount;
        return acc;
      },
      {} as Record<IncomeCategory, number>
    );

    const topIncomeCategories = Object.entries(incomeByCat)
      .map(([category, amount]) => ({
        category: category as IncomeCategory,
        amount,
        percentage: totalIncome > 0 ? (amount / totalIncome) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      incomeCount: income.length,
      expenseCount: expenses.length,
      topExpenseCategories,
      topIncomeCategories,
    };
  }, [filteredTransactions]);

  const value: TransactionContextType = {
    transactions,
    filters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setFilters,
    filteredTransactions,
    budgets,
    addBudget,
    updateBudget,
    deleteBudget,
    getBudgetForMonth,
    isBudgetExceeded,
    stats,
    // Legacy aliases
    expenses: transactions,
    addExpense: addTransaction,
    updateExpense: updateTransaction,
    deleteExpense: deleteTransaction,
    filteredExpenses: filteredTransactions,
  };

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};

// Legacy alias
export const ExpenseProvider = TransactionProvider;

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};

// Legacy alias
export const useExpenses = useTransactions;
