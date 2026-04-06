import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContextStore";

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useFinance must be used inside a FinanceProvider");
  }

  return context;
}
