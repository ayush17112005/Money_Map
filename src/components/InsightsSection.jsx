import React from "react";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import { useFinance } from "../hooks/useFinance";

function InsightsSection() {
  const {
    highestSpendingCategory,
    highestSpendingAmount,
    currentMonthNet,
    previousMonthNet,
    monthlyDifference,
    financeObservation,
    formatCurrency,
  } = useFinance();

  return (
    <section className="insights-section">
      <h2 className="section-title">Insights</h2>
      <div className="insights-list">
        <article className="insight-item">
          <h3>
            <CategoryRoundedIcon fontSize="small" /> Highest Spending Category
          </h3>
          <p>
            {highestSpendingCategory} ({formatCurrency(highestSpendingAmount)})
          </p>
        </article>

        <article className="insight-item">
          <h3>
            <CalendarMonthRoundedIcon fontSize="small" /> Monthly Net Comparison
          </h3>
          <p>
            Current: {formatCurrency(currentMonthNet)} | Previous:{" "}
            {formatCurrency(previousMonthNet)}
          </p>
        </article>

        <article className="insight-item">
          <h3>
            <SwapVertRoundedIcon fontSize="small" /> Net Difference
          </h3>
          <p className={monthlyDifference >= 0 ? "positive" : "negative"}>
            {monthlyDifference > 0 ? "+" : ""}
            {formatCurrency(monthlyDifference)}
          </p>
        </article>

        <article className="insight-item">
          <h3>
            <TipsAndUpdatesRoundedIcon fontSize="small" /> Observation
          </h3>
          <p>{financeObservation}</p>
        </article>
      </div>
    </section>
  );
}

export default InsightsSection;
