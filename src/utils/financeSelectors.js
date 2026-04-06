export const calculateTotals = (transactions) => {
  const incomeTotal = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expenseTotal = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  return {
    incomeTotal,
    expenseTotal,
    balance: incomeTotal - expenseTotal,
  };
};

export const buildExpenseByCategory = (transactions) => {
  return transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});
};

export const getHighestSpending = (expenseByCategory) => {
  const highestSpendingEntry = Object.entries(expenseByCategory).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return {
    highestSpendingCategory: highestSpendingEntry
      ? highestSpendingEntry[0]
      : "No expense data",
    highestSpendingAmount: highestSpendingEntry ? highestSpendingEntry[1] : 0,
  };
};

export const buildMonthlyNetByKey = (transactions) => {
  return transactions.reduce((acc, item) => {
    const monthKey = item.date.slice(0, 7);
    const signedAmount = item.type === "income" ? item.amount : -item.amount;
    acc[monthKey] = (acc[monthKey] || 0) + signedAmount;
    return acc;
  }, {});
};

export const getMonthlyComparison = (
  monthlyNetByKey,
  referenceDate = new Date(),
) => {
  const currentMonthKey = `${referenceDate.getFullYear()}-${String(referenceDate.getMonth() + 1).padStart(2, "0")}`;

  const previousMonthDate = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth() - 1,
    1,
  );
  const previousMonthKey = `${previousMonthDate.getFullYear()}-${String(previousMonthDate.getMonth() + 1).padStart(2, "0")}`;

  const currentMonthNet = monthlyNetByKey[currentMonthKey] || 0;
  const previousMonthNet = monthlyNetByKey[previousMonthKey] || 0;

  return {
    currentMonthNet,
    previousMonthNet,
    monthlyDifference: currentMonthNet - previousMonthNet,
  };
};

export const getFinanceObservation = (incomeTotal, expenseTotal) => {
  if (expenseTotal > incomeTotal) {
    return "Spending is currently higher than income.";
  }

  return "Income is currently covering your spending.";
};

export const getVisibleTransactions = (
  transactions,
  search,
  typeFilter,
  sortBy,
) => {
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.title.toLowerCase().includes(search) ||
      transaction.category.toLowerCase().includes(search) ||
      transaction.type.toLowerCase().includes(search)
    );
  });

  const typeFilteredTransactions = filteredTransactions.filter(
    (transaction) => {
      if (typeFilter === "all") {
        return true;
      }

      return transaction.type === typeFilter;
    },
  );

  return [...typeFilteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (sortBy === "date-oldest") {
      return dateA - dateB;
    }

    if (sortBy === "amount-high") {
      return b.amount - a.amount;
    }

    if (sortBy === "amount-low") {
      return a.amount - b.amount;
    }

    return dateB - dateA;
  });
};

export const normalizeRoleLabel = (role) => {
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};
