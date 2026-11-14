# 📊 NEPSE Market Terminal, Share Calculator & Portfolio Ledger

A clean, institutional-grade web application built for tracking Nepal Stock Exchange (NEPSE) live data, calculating exact secondary and IPO buy/sell transaction fees, and managing multi-fiscal-year portfolio ledgers with real-time valuation and sector allocation.

## ✨ Features

### Market Terminal & Feed
* Live exchange feed fetching real-time market data
* Index summary KPIs showing market indices and total turnover
* Search filtering by scrip symbol or company name
* Multi-column sorting for Last Traded Price (LTP), percentage change, open, high, low, and volume

### Smart Share Calculator
* Accurate fee computation for **Buy** and **Sell** operations
* Incorporates official regulatory structures:
  * SEBON Commission (0.015%)
  * Tiered Broker Commissions
  * Flat DP Fee (Rs 25)
  * Capital Gains Tax (CGT) brackets for short-term and long-term holdings

### Tabbed Portfolio Ledger
* **Holding Summary & Valuation:** Tracks remaining units (kitta), average cost, total investment, live LTP valuation, and unrealized profit/loss
* **Sector Allocation:** Visual capital distribution breakdown across sectors (Commercial Banks, Life Insurance, Hydropower, Microfinance, Hotels, etc.)
* **Purchase & Sell Records:** Chronological transaction ledgers automatically sorted serially by date (`YYYY-MM-DD`) with edit and delete capabilities

### Fiscal Year & Storage Management
* Isolates local storage data organized by Nepalese Fiscal Years (e.g., `FY 2083/084`)
* Runs completely client-side using browser `localStorage` for complete data privacy and offline persistence

## 🛠️ Technology Used
* HTML5 & CSS3
* Modern Vanilla JavaScript (ES6+)
* Browser `localStorage` API
* Git and GitHub

## 🚀 Local Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/Sushreet-o/nepse-terminal.git](https://github.com/Sushreet-o/nepse-terminal.git)
