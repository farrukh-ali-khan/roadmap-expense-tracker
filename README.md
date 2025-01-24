# Expense Tracker CLI

A simple command-line application to manage your finances. This expense tracker allows users to add, update, delete, and view expenses. Additionally, users can view a summary of their expenses.

## Features

- Add an expense with a description and amount.
- Update an expense.
- Delete an expense.
- View all expenses.
- View a summary of all expenses.
- View a summary of expenses for a specific month (of the current year).

## Requirements

- Node.js

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/expense-tracker-cli.git
   cd expense-tracker-cli
   ```
2. Install the dependencies:

   ```sh
   npm install
   ```

## Usage

Add an Expense

   ```sh
      node index.js add --description "Lunch" --amount 20
   ```

# Expense added successfully (ID: 1)

List All Expenses

   ```sh
      node index.js list
   ```

ID Date Description Amount
1 2024-08-06 Lunch $20

# Delete an Expense

   ```sh
      node index.js delete --id 1
   ```

# Expense deleted successfully

Show Summary of All Expenses

   ```sh
       node index.js summary
   ```

Total expenses: $20

For more details, visit the project page: [Expense Tracker Project](https://roadmap.sh/projects/expense-tracker)
