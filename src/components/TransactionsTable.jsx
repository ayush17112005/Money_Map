import React from "react";
import { useFinance } from "../hooks/useFinance";

function TransactionsTable() {
  const {
    visibleTransactions,
    editingTransactionId,
    editForm,
    selectedRole,
    editError,
    handleEditFormChange,
    handleSaveEdit,
    handleCancelEdit,
    handleStartEdit,
  } = useFinance();

  return (
    <div className="table-wrap">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleTransactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="table-empty-cell">
                No transactions found
              </td>
            </tr>
          ) : (
            visibleTransactions.map((transaction) => (
              <tr key={transaction.id} data-row-id={transaction.id}>
                <td>
                  {editingTransactionId === transaction.id ? (
                    <input
                      className="table-input"
                      type="date"
                      name="date"
                      value={editForm.date}
                      onChange={handleEditFormChange}
                    />
                  ) : (
                    transaction.date
                  )}
                </td>
                <td>
                  {editingTransactionId === transaction.id ? (
                    <input
                      id={`title-input-${transaction.id}`}
                      className="table-input"
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditFormChange}
                    />
                  ) : (
                    transaction.title
                  )}
                </td>
                <td>
                  {editingTransactionId === transaction.id ? (
                    <input
                      className="table-input"
                      type="text"
                      name="category"
                      value={editForm.category}
                      onChange={handleEditFormChange}
                      placeholder="e.g. Food, Rent, Travel"
                    />
                  ) : (
                    transaction.category || "Uncategorized"
                  )}
                </td>
                <td>
                  {editingTransactionId === transaction.id ? (
                    <select
                      className="table-select"
                      name="type"
                      value={editForm.type}
                      onChange={handleEditFormChange}
                    >
                      <option value="income">income</option>
                      <option value="expense">expense</option>
                    </select>
                  ) : (
                    <span className={`type-badge ${transaction.type}`}>
                      {transaction.type}
                    </span>
                  )}
                </td>
                <td>
                  {editingTransactionId === transaction.id ? (
                    <input
                      className="table-input"
                      type="number"
                      min="1"
                      name="amount"
                      value={editForm.amount}
                      onChange={handleEditFormChange}
                    />
                  ) : (
                    <span
                      className={
                        transaction.type === "income"
                          ? "amount-positive"
                          : "amount-negative"
                      }
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {transaction.amount}
                    </span>
                  )}
                </td>
                <td>
                  {selectedRole !== "admin" ? (
                    <span className="readonly-chip">Read Only</span>
                  ) : editingTransactionId === transaction.id ? (
                    <div className="table-actions">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => handleSaveEdit(transaction.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-muted"
                        type="button"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                      {editError && <p className="field-error">{editError}</p>}
                    </div>
                  ) : (
                    <button
                      className="btn btn-muted"
                      type="button"
                      onClick={() => handleStartEdit(transaction)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
