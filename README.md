# Finance Dashboard

A frontend-only finance dashboard built for assignment evaluation, focused on clean UX, role-based interaction, and modular React architecture.

## Overview

This dashboard helps users track financial activity through:

- Summary cards (balance, income, expense, transaction count)
- Search, filtering, and sorting for transactions
- Role-based UI behavior (Viewer, Analyst, Admin)
- Insights panel (category, monthly comparison, observations)
- Time-based and category-based chart visualizations

## Tech Stack

- React + Vite
- Context API + custom hooks
- Chart.js (via react-chartjs-2)
- Material UI Icons
- LocalStorage for persistence

## Architecture

The codebase is structured with separation of concerns:

- `src/context` handles state orchestration and provider wiring
- `src/hooks` exposes reusable app-level hooks
- `src/utils` contains selectors, chart builders, and storage helpers
- `src/components` contains presentational and interaction components

## Run Locally

```bash
npm install
npm run dev
```

For production build:

```bash
npm run build
npm run preview
```

## Requirement Coverage (Brief)

- Dashboard Overview: summary cards + 2 chart types
- Transactions Section: list, search, type filter, sorting, inline edit/add
- Basic Role Based UI: role switch + admin-only mutation actions
- Insights Section: highest category, monthly comparison, net observation
- State Management: centralized Context API with modular selectors
- UI/UX: responsive layout, loading state, empty states, toast feedback

## Assumptions and Scope

- Frontend role simulation only (no backend auth enforcement)
- Mock data with local persistence (no external API dependency)
- Focused on clarity, maintainability, and assignment-readiness

## Demo in 60 Seconds

1. Open the app and review summary cards (balance, income, expense, count).
2. Switch role to `Admin` from the controls.
3. Click `Add Transaction` and verify auto-scroll + auto-focus on editable row.
4. Fill title, category, type, date, and amount, then click `Save`.
5. Use search, type filter, and sorting to verify transaction exploration.
6. Confirm charts and insights update based on transaction data changes.
7. Refresh the page to confirm localStorage persistence of state.

## Author

Ayushman Saxena  
NIT Rourkela
