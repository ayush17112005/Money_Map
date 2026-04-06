import React, { useEffect, useMemo, useState } from "react";

import {
  DEFAULT_EDIT_FORM,
  INITIAL_TRANSACTIONS,
  ROLE_VALUES,
  SORT_VALUES,
  STORAGE_KEYS,
  TYPE_FILTER_VALUES,
} from "../constants/finance";
import {
  BALANCE_TREND_OPTIONS,
  buildBalanceTrendData,
  buildSpendingBreakdownData,
  SPENDING_BREAKDOWN_OPTIONS,
} from "../utils/chartBuilders";
import {
  buildExpenseByCategory,
  buildMonthlyNetByKey,
  calculateTotals,
  formatCurrency,
  getFinanceObservation,
  getHighestSpending,
  getMonthlyComparison,
  getVisibleTransactions,
  normalizeRoleLabel,
} from "../utils/financeSelectors";
import { getStoredJson, getStoredString } from "../utils/storage";
import { FinanceContext } from "./FinanceContextStore";

export function FinanceProvider({ children }) {
  const buildDefaultEditForm = () => ({ ...DEFAULT_EDIT_FORM });

  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = getStoredJson(
      STORAGE_KEYS.transactions,
      INITIAL_TRANSACTIONS,
    );

    return Array.isArray(storedTransactions)
      ? storedTransactions
      : INITIAL_TRANSACTIONS;
  });

  const [search, setSearch] = useState(() =>
    getStoredString(STORAGE_KEYS.search, ""),
  );

  const [typeFilter, setTypeFilter] = useState(() => {
    const storedTypeFilter = getStoredString(STORAGE_KEYS.typeFilter, "all");
    return TYPE_FILTER_VALUES.includes(storedTypeFilter)
      ? storedTypeFilter
      : "all";
  });

  const [sortBy, setSortBy] = useState(() => {
    const storedSortBy = getStoredString(STORAGE_KEYS.sortBy, "date-latest");
    return SORT_VALUES.includes(storedSortBy) ? storedSortBy : "date-latest";
  });

  const [selectedRole, setSelectedRole] = useState(() => {
    const storedRole = getStoredString(STORAGE_KEYS.selectedRole, "viewer");
    return ROLE_VALUES.includes(storedRole) ? storedRole : "viewer";
  });

  const [isLoading, setIsLoading] = useState(true);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [editForm, setEditForm] = useState(buildDefaultEditForm);
  const [editError, setEditError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const isAdmin = selectedRole === "admin";

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.transactions,
      JSON.stringify(transactions),
    );
    localStorage.setItem(STORAGE_KEYS.search, search);
    localStorage.setItem(STORAGE_KEYS.typeFilter, typeFilter);
    localStorage.setItem(STORAGE_KEYS.sortBy, sortBy);
    localStorage.setItem(STORAGE_KEYS.selectedRole, selectedRole);
  }, [transactions, search, typeFilter, sortBy, selectedRole]);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const toastTimeout = setTimeout(() => {
      setToastMessage("");
    }, 1600);

    return () => clearTimeout(toastTimeout);
  }, [toastMessage]);

  const { incomeTotal, expenseTotal, balance } = useMemo(
    () => calculateTotals(transactions),
    [transactions],
  );

  const expenseByCategory = useMemo(
    () => buildExpenseByCategory(transactions),
    [transactions],
  );

  const { highestSpendingCategory, highestSpendingAmount } = useMemo(
    () => getHighestSpending(expenseByCategory),
    [expenseByCategory],
  );

  const monthlyNetByKey = useMemo(
    () => buildMonthlyNetByKey(transactions),
    [transactions],
  );

  const { currentMonthNet, previousMonthNet, monthlyDifference } = useMemo(
    () => getMonthlyComparison(monthlyNetByKey),
    [monthlyNetByKey],
  );

  const financeObservation = useMemo(
    () => getFinanceObservation(incomeTotal, expenseTotal),
    [incomeTotal, expenseTotal],
  );

  const balanceTrendData = useMemo(
    () => buildBalanceTrendData(transactions),
    [transactions],
  );
  const balanceTrendOptions = BALANCE_TREND_OPTIONS;

  const spendingBreakdownData = useMemo(
    () => buildSpendingBreakdownData(expenseByCategory),
    [expenseByCategory],
  );
  const spendingBreakdownOptions = SPENDING_BREAKDOWN_OPTIONS;
  const spendingCategoryLabels = spendingBreakdownData.labels;

  const visibleTransactions = useMemo(
    () => getVisibleTransactions(transactions, search, typeFilter, sortBy),
    [transactions, search, typeFilter, sortBy],
  );

  const roleLabel = normalizeRoleLabel(selectedRole);

  const handleSearchChange = (event) => {
    const searchItem = event.target.value.toLowerCase();
    setSearch(searchItem);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleAddTransaction = () => {
    if (!isAdmin) {
      return;
    }

    const newTransactionId = Date.now();
    const todayDate = new Date().toISOString().slice(0, 10);

    const draftTransaction = {
      id: newTransactionId,
      title: "",
      amount: 1,
      category: "",
      type: "expense",
      date: todayDate,
    };

    setSearch("");
    setTypeFilter("all");
    setSortBy("date-latest");

    setTransactions((prevTransactions) => [
      draftTransaction,
      ...prevTransactions,
    ]);
    setEditingTransactionId(newTransactionId);
    setEditForm({
      title: "",
      amount: "1",
      category: "",
      type: "expense",
      date: todayDate,
    });
    setEditError("Fill details and click Save.");
    setToastMessage("New transaction row ready. Fill details and Save.");

    setTimeout(() => {
      const rowElement = document.querySelector(
        `[data-row-id="${newTransactionId}"]`,
      );
      const firstInput = document.getElementById(
        `title-input-${newTransactionId}`,
      );

      rowElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInput?.focus();
    }, 0);
  };

  const handleClearAllTransactions = () => {
    if (!isAdmin) {
      return;
    }

    setTransactions([]);
    setEditingTransactionId(null);
    setEditForm(buildDefaultEditForm());
    setToastMessage("All transactions cleared.");
  };

  const handleResetSampleData = () => {
    if (!isAdmin) {
      return;
    }

    setTransactions(INITIAL_TRANSACTIONS);
    setEditingTransactionId(null);
    setEditForm(buildDefaultEditForm());
    setToastMessage("Sample data restored.");
  };

  const handleStartEdit = (transaction) => {
    if (!isAdmin) {
      return;
    }

    setEditingTransactionId(transaction.id);
    setEditError("");
    setEditForm({
      title: transaction.title,
      amount: String(transaction.amount),
      category: transaction.category,
      type: transaction.type,
      date: transaction.date,
    });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelEdit = () => {
    setEditingTransactionId(null);
    setEditForm(buildDefaultEditForm());
    setEditError("");
  };

  const handleSaveEdit = (transactionId) => {
    if (!isAdmin) {
      return;
    }

    const parsedAmount = Number(editForm.amount);
    const safeTitle = editForm.title.trim();
    const safeCategory = editForm.category.trim();
    const safeType = editForm.type;
    const safeDate = editForm.date;

    const validType = safeType === "income" || safeType === "expense";

    if (
      !safeTitle ||
      !safeCategory ||
      !safeDate ||
      !validType ||
      Number.isNaN(parsedAmount) ||
      parsedAmount <= 0
    ) {
      setEditError(
        "Please enter title, category, date, type, and amount greater than 0.",
      );
      return;
    }

    setEditError("");

    setTransactions((prevTransactions) =>
      prevTransactions.map((item) => {
        if (item.id !== transactionId) {
          return item;
        }

        return {
          ...item,
          title: safeTitle,
          amount: parsedAmount,
          category: safeCategory,
          type: safeType,
          date: safeDate,
        };
      }),
    );

    setToastMessage("Transaction saved successfully.");
    handleCancelEdit();
  };

  const value = {
    transactions,
    search,
    typeFilter,
    sortBy,
    selectedRole,
    roleLabel,
    isAdmin,
    isLoading,
    toastMessage,
    incomeTotal,
    expenseTotal,
    balance,
    highestSpendingCategory,
    highestSpendingAmount,
    currentMonthNet,
    previousMonthNet,
    monthlyDifference,
    financeObservation,
    balanceTrendData,
    balanceTrendOptions,
    spendingCategoryLabels,
    spendingBreakdownData,
    spendingBreakdownOptions,
    visibleTransactions,
    editingTransactionId,
    editForm,
    editError,
    formatCurrency,
    handleSearchChange,
    handleTypeFilterChange,
    handleSortChange,
    handleRoleChange,
    handleAddTransaction,
    handleClearAllTransactions,
    handleResetSampleData,
    handleStartEdit,
    handleEditFormChange,
    handleCancelEdit,
    handleSaveEdit,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
}
