export const buildBalanceTrendData = (transactions) => {
  const timelineTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  let runningBalance = 0;
  const labels = [];
  const values = [];

  timelineTransactions.forEach((item) => {
    const signedAmount = item.type === "income" ? item.amount : -item.amount;
    runningBalance += signedAmount;
    labels.push(item.date);
    values.push(runningBalance);
  });

  return {
    labels,
    datasets: [
      {
        label: "Running Balance",
        data: values,
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };
};

export const BALANCE_TREND_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 5,
    },
  },
};

export const buildSpendingBreakdownData = (expenseByCategory) => {
  return {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        label: "Spending by Category",
        data: Object.values(expenseByCategory),
        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#eab308",
          "#22c55e",
          "#0ea5e9",
          "#8b5cf6",
        ],
      },
    ],
  };
};

export const SPENDING_BREAKDOWN_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "58%",
  plugins: {
    legend: { position: "bottom" },
  },
};
