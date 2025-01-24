const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

const program = new Command();
const dataFile = path.join(__dirname, "expenses.json");

// Utility function to read data from JSON file
const readData = () => {
  try {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Utility function to write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// Add an expense
program
  .command("add")
  .description("Add a new expense")
  .requiredOption("--description <description>", "Expense description")
  .requiredOption("--amount <amount>", "Expense amount")
  .action((cmd) => {
    const expenses = readData();
    const newExpense = {
      id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
      date: new Date().toISOString().split("T")[0],
      description: cmd.description,
      amount: parseFloat(cmd.amount),
    };
    expenses.push(newExpense);
    writeData(expenses);
    console.log(`Expense added successfully (ID: ${newExpense.id})`);
  });

// List all expenses
program
  .command("list")
  .description("List all expenses")
  .action(() => {
    const expenses = readData();
    console.log("ID  Date       Description  Amount");
    expenses.forEach((exp) =>
      console.log(`${exp.id}  ${exp.date}  ${exp.description}  $${exp.amount}`)
    );
  });

// Delete an expense
program
  .command("delete")
  .description("Delete an expense")
  .requiredOption("--id <id>", "Expense ID")
  .action((cmd) => {
    let expenses = readData();
    expenses = expenses.filter((exp) => exp.id !== parseInt(cmd.id));
    writeData(expenses);
    console.log("Expense deleted successfully");
  });

// Show summary of all expenses
program
  .command("summary")
  .description("Show summary of expenses")
  .option("--month <month>", "Filter by month (1-12)")
  .action((cmd) => {
    const expenses = readData();
    let total = 0;
    if (cmd.month) {
      const month = parseInt(cmd.month);
      const filtered = expenses.filter(
        (exp) => new Date(exp.date).getMonth() + 1 === month
      );
      total = filtered.reduce((sum, exp) => sum + exp.amount, 0);
      console.log(`Total expenses for month ${month}: $${total}`);
    } else {
      total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      console.log(`Total expenses: $${total}`);
    }
  });

program.parse(process.argv);
