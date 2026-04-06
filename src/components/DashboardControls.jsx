import React from "react";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { useFinance } from "../hooks/useFinance";

function DashboardControls() {
  const {
    selectedRole,
    search,
    typeFilter,
    sortBy,
    isAdmin,
    handleRoleChange,
    handleSearchChange,
    handleTypeFilterChange,
    handleSortChange,
    handleAddTransaction,
    handleClearAllTransactions,
    handleResetSampleData,
  } = useFinance();

  return (
    <div className="controls-wrap">
      <label className="control-group">
        <span className="control-label">
          <ManageAccountsRoundedIcon fontSize="small" /> Role
        </span>
        <select value={selectedRole} onChange={handleRoleChange}>
          <option value="viewer">Viewer</option>
          <option value="analyst">Analyst</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <label className="control-group control-group-wide">
        <span className="control-label">
          <SearchRoundedIcon fontSize="small" /> Search
        </span>
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search by title, category, or type..."
        />
      </label>

      <label className="control-group">
        <span className="control-label">
          <FilterAltRoundedIcon fontSize="small" /> Type
        </span>
        <select value={typeFilter} onChange={handleTypeFilterChange}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label className="control-group">
        <span className="control-label">
          <SortRoundedIcon fontSize="small" /> Sort
        </span>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="date-latest">Date: Latest to Oldest</option>
          <option value="date-oldest">Date: Oldest to Latest</option>
          <option value="amount-high">Amount: High to Low</option>
          <option value="amount-low">Amount: Low to High</option>
        </select>
      </label>

      {/* Keep admin actions grouped in one place for clear RBAC demo. */}
      {isAdmin && (
        <div className="admin-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddTransaction}
          >
            <AddCircleOutlineRoundedIcon fontSize="small" /> Add Transaction
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClearAllTransactions}
          >
            <DeleteSweepRoundedIcon fontSize="small" /> Clear All
          </button>
          <button
            type="button"
            className="btn btn-muted"
            onClick={handleResetSampleData}
          >
            <RestartAltRoundedIcon fontSize="small" /> Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardControls;
