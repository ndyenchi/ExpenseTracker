# Expense Tracker

A modern web application to help you track and manage your income and expenses easily and intuitively.

## Key Features

### Transaction Management

- Record **income** and **expenses**
- Categorize by type (Food & Drinks, Living, Salary, Entertainment...)
- Add, edit, and delete transactions easily
- Add notes to each transaction

### Search and Filter

- Search by title
- Filter by transaction type (Income/Expense/All)
- Filter by category
- Filter by **month** or **custom date range**

### Statistics and Reports

- **Dashboard Overview** with:
- Total income
- Total expenses
- Current balance
- Current month statistics
- **Pie charts** showing expense/income distribution by category
- **Trend chart** for the last 6 months
- **Top categories** for expenses and income
- **Export data** to CSV file

### User Interface

- Friendly, modern interface with **Mantine UI**
- **Dark Mode** support
- Responsive - compatible with all devices
- Intuitive colors (green for income, red for expenses)

### Data Storage

- Automatically saves to **localStorage**
- Data persists when browser is closed

## Technology Stack

- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **Mantine UI** - Component library
- **Mantine Charts** - Beautiful charts
- **React Router** - Routing
- **Day.js** - Date manipulation
- **LocalStorage** - Data persistence

## Installation and Setup

### Requirements

- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>

# Navigate to project directory
cd ExpenseTracker

# Install dependencies
npm install
```

### Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open your browser at: **http://localhost:5173/**
