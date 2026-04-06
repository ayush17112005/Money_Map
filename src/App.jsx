import React from "react";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DashboardControls from "./components/DashboardControls";
import TransactionsTable from "./components/TransactionsTable";
import ChartsSection from "./components/ChartsSection";
import InsightsSection from "./components/InsightsSection";
import { useFinance } from "./hooks/useFinance";

function App() {
  const {
    isLoading,
    roleLabel,
    balance,
    incomeTotal,
    expenseTotal,
    transactions,
    formatCurrency,
    toastMessage,
  } = useFinance();

  if (isLoading) {
    return (
      <main className="app-shell">
        <div className="app-background" aria-hidden="true" />
        <div className="loading-panel">
          <DashboardRoundedIcon className="loading-icon" />
          <h1>Finance Dashboard</h1>
          <p>Loading dashboard data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <div className="app-background" aria-hidden="true" />
      <div className="dashboard-container">
        <header className="panel app-header">
          <div className="header-title-wrap">
            <DashboardRoundedIcon className="header-icon" />
            <div>
              <h1>Finance Dashboard</h1>
              <p>
                Clean tracking of balance, spending patterns, and transaction
                activity.
              </p>
            </div>
          </div>
          <span className="role-chip">Role: {roleLabel}</span>
        </header>

        <section className="panel">
          <DashboardControls />
        </section>

        <section className="summary-grid">
          <article className="panel stat-card">
            <div className="stat-head">
              <AccountBalanceWalletRoundedIcon />
              <h3>Total Balance</h3>
            </div>
            <p
              className={
                balance >= 0 ? "stat-value positive" : "stat-value negative"
              }
            >
              {formatCurrency(balance)}
            </p>
          </article>

          <article className="panel stat-card">
            <div className="stat-head">
              <TrendingUpRoundedIcon />
              <h3>Total Income</h3>
            </div>
            <p className="stat-value positive">{formatCurrency(incomeTotal)}</p>
          </article>

          <article className="panel stat-card">
            <div className="stat-head">
              <TrendingDownRoundedIcon />
              <h3>Total Expense</h3>
            </div>
            <p className="stat-value negative">
              {formatCurrency(expenseTotal)}
            </p>
          </article>

          <article className="panel stat-card">
            <div className="stat-head">
              <AnalyticsRoundedIcon />
              <h3>Transactions</h3>
            </div>
            <p className="stat-value neutral">{transactions.length}</p>
          </article>
        </section>

        <section className="panel">
          <h2 className="section-title">Transactions</h2>
          <TransactionsTable />
        </section>

        <section className="content-grid">
          <div className="panel">
            <ChartsSection />
          </div>

          <div className="panel">
            <InsightsSection />
          </div>
        </section>
      </div>
      {toastMessage && (
        <div className="app-toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </main>
  );
}

export default App;
