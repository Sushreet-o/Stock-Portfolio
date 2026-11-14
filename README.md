# 📊 NEPSE Market Terminal, Share Calculator & Portfolio Ledger

A professional-grade, institutional-style web application built for tracking Nepal Stock Exchange (NEPSE) live data, calculating exact buy/sell transaction fees, and managing multi-fiscal-year portfolio ledgers with real-time valuation and sector allocation. Originally developed to solve local trading calculation complexities, this project features a clean, clutter-free interface free of unnecessary watchlists or star features.

---

## ✨ Key Features

### 📈 Live Market Terminal
* Real-time exchange feed fetching live JSON data
* Live macro market indices bar (NEPSE Index and Sensitive Index)
* Summary KPI strip tracking Total Turnover, Total Volume, and Total Transactions
* Interactive multi-column sorting (Symbol, LTP, Point Change, % Change, Qty, Txns)
* Instant search filter by scrip symbol or company name

### 🧮 Smart Share Calculator
* Dedicated calculation engine for both **Buy** and **Sell** operations
* Multi-fiscal-year and custom date selection (`YYYY-MM-DD`)
* Automated regulatory fee deductions:
  * SEBON Commission (0.015%)
  * Tiered Broker Commission based on transaction volume brackets
  * Depository Participant (DP) Fee (Rs 25)
  * Capital Gain Tax (CGT) calculation brackets (3%, 5%, 7.5%, 10%, 15%) for sales
* Effective per-share cost basis and net payout calculation

### 📊 Tabbed Portfolio Ledger & Valuation
* **Holding Summary & Valuation:** Tracks remaining shares (kitta), weighted average cost per share, total investment, live LTP market value, and unrealized profit/loss
* **Sector Allocation:** Visual progress bars displaying capital distribution across sectors (Commercial Banks, Hydropower, Life/Non-Life Insurance, Microfinance, Hotels & Tourism, Finance)
* **Purchase Records:** Chronological ledger of all buy transactions with edit and delete capabilities
* **Sell Records:** Chronological ledger of all sell transactions with net profit tracking

---

## 🔒 Architecture & Data Storage
* **Client-Side Persistence:** Secure local data storage managed via browser `localStorage` isolated by Nepalese Fiscal Year keys (e.g., `FY 2083/084`)
* **Chronological Sorting:** Automated serial sorting of all transaction logs by date (`YYYY-MM-DD`)
* **Responsive Layout:** Optimized dark-themed institutional terminal interface for desktop and mobile displays

---

## 🛠️ Technology Used
* **Frontend:** HTML5, CSS3, Modern Vanilla JavaScript (ES6+)
* **Data Persistence:** Browser `localStorage`
* **Data Feed:** Real-time GitHub JSON exchange API
* **Version Control:** Git and GitHub (`Sushreet-o`)

---

## 📷 Screenshots

![Live Market Terminal](Screenshot%202026-11-14%20102649.png)

![Share Calculator](Screenshot%202026-11-14%20102656.png)

![Holding Summary](Screenshot%202026-11-14%20102710.png)

![Sector Allocation](Screenshot%202026-11-14%20102717.png)

![Purchase Records](Screenshot%202026-11-14%20102724.png)
