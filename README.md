# 📊 NEPSE Terminal & Portfolio Ledger

A clean, institutional-style web application for tracking Nepal Stock Exchange (NEPSE) scrips, calculating buy/sell fees, and managing multi-fiscal-year portfolio ledgers with real-time exchange feeds.

## ✨ Key Features
- **Live Exchange Terminal:** Real-time market feed with index summary KPIs, search filtering, and multi-column sorting.
- **Smart Share Calculator:** Calculates buy/sell operations with NEPSE-specific fee structures (Broker Commission, SEBON Commission, DP Fee, and CGT).
- **Tabbed Portfolio Ledger:** Displays holdings, live market valuation, unrealized profit/loss, purchase history, and sell ledgers.
- **Chronological Sorting:** Automatically sorts all transaction records serially by date (`YYYY-MM-DD`).
- **Fiscal Year Management:** Isolates local storage data organized by Nepalese fiscal years (e.g., `2083_084`).
- **Sector Allocation:** Visual breakdown of capital distribution across market sectors.

## 📁 Tech Stack
- **Frontend:** HTML5, CSS3, Modern Vanilla JavaScript (ES6+)
- **Data Persistence:** Browser `localStorage`
- **Data Source:** Live JSON API Feed

## 🚀 Local Setup & Running
1. Clone or download this repository:
   ```bash
   git clone [https://github.com/Sushreet-o/nepse-terminal.git](https://github.com/Sushreet-o/nepse-terminal.git)
