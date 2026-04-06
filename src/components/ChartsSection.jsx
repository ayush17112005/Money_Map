import React from "react";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import { useFinance } from "../hooks/useFinance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

function ChartsSection() {
  const {
    transactions,
    balanceTrendData,
    balanceTrendOptions,
    spendingCategoryLabels,
    spendingBreakdownData,
    spendingBreakdownOptions,
  } = useFinance();

  return (
    <section className="charts-section">
      <h2 className="section-title">Charts</h2>
      {transactions.length === 0 ? (
        <p className="empty-state">No transaction data available for charts.</p>
      ) : (
        <div className="charts-grid">
          <article className="chart-card">
            <h3>
              <ShowChartRoundedIcon fontSize="small" /> Balance Trend (Time
              Based)
            </h3>
            <div className="chart-canvas">
              <Line data={balanceTrendData} options={balanceTrendOptions} />
            </div>
          </article>

          <article className="chart-card chart-card-compact">
            <h3>
              <DonutLargeRoundedIcon fontSize="small" /> Spending Breakdown
            </h3>
            {spendingCategoryLabels.length === 0 ? (
              <p className="empty-state">
                No expense data available for category breakdown.
              </p>
            ) : (
              <div className="chart-canvas chart-canvas-doughnut">
                <Doughnut
                  data={spendingBreakdownData}
                  options={spendingBreakdownOptions}
                />
              </div>
            )}
          </article>
        </div>
      )}
    </section>
  );
}

export default ChartsSection;
