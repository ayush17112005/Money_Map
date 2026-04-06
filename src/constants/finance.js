export const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    title: "Salary",
    amount: 5000,
    category: "Salary",
    type: "income",
    date: "2026-04-01",
  },
  {
    id: 2,
    title: "Groceries",
    amount: 1200,
    category: "Food",
    type: "expense",
    date: "2026-04-02",
  },
  {
    id: 3,
    title: "Freelance",
    amount: 1500,
    category: "Freelance",
    type: "income",
    date: "2026-04-03",
  },
  {
    id: 4,
    title: "Rent",
    amount: 1800,
    category: "Housing",
    type: "expense",
    date: "2026-04-04",
  },
];

export const STORAGE_KEYS = {
  transactions: "finance_dashboard_transactions",
  search: "finance_dashboard_search",
  typeFilter: "finance_dashboard_type_filter",
  sortBy: "finance_dashboard_sort_by",
  selectedRole: "finance_dashboard_selected_role",
};

export const DEFAULT_EDIT_FORM = {
  title: "",
  amount: "",
  category: "",
  type: "expense",
  date: "",
};

export const ROLE_VALUES = ["viewer", "analyst", "admin"];
export const TYPE_FILTER_VALUES = ["all", "income", "expense"];
export const SORT_VALUES = [
  "date-latest",
  "date-oldest",
  "amount-high",
  "amount-low",
];
