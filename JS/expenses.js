// Expeneses section

const expensesCategoryInput = document.querySelector("#expenses-category");
const expensesAmountInput = document.querySelector("#expenses-amount");
const addExpensesBtn = document.querySelector("#add-expenses-btn");
const expensesTableBody = document.querySelector("#expenses-table-body");
const totalAmountDisplay = document.querySelector("#expenses-total-amount");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

window.addEventListener("load", function () {
  updateExpensesTable();
});

addExpensesBtn.addEventListener("click", function () {
  const category = expensesCategoryInput.value.trim();
  const amount = expensesAmountInput.value.trim();

  if (!category || !amount) {
    alert("Please enter both category and amount.");
    return;
  }

  const newExpense = {
    category: category,
    amount: amount,
  };

  expenses.push(newExpense);
  updateExpensesTable();

  localStorage.setItem("expenses", JSON.stringify(expenses));

  expensesCategoryInput.value = "";
  expensesAmountInput.value = "";
});

function updateExpensesTable() {
  const categoriesObj = {};

  expensesTableBody.innerHTML = "";

  expenses.forEach((expense) => {
    if (categoriesObj.hasOwnProperty(expense.category)) {
      categoriesObj[expense.category] += parseFloat(expense.amount);
    } else {
      categoriesObj[expense.category] = parseFloat(expense.amount);
    }
  });

  // Iterate through the categories object and update table rows for each category
  for (const category in categoriesObj) {
    if (categoriesObj.hasOwnProperty(category)) {
      const amount = categoriesObj[category];
      const expensesRow = document.createElement("tr");
      const expensesCategoryCell = document.createElement("td");
      const expensesAmountCell = document.createElement("td");
      const expensesActionCell = document.createElement("td");
      const expensesEditButton = document.createElement("button");
      const expensesDeleteButton = document.createElement("button");

      expensesCategoryCell.textContent = category;
      expensesAmountCell.textContent = amount.toFixed(2);

      expensesEditButton.textContent = "Edit";
      expensesEditButton.addEventListener("click", function () {
        expensesCategoryInput.value = category;

        const expensesAmountInput = document.createElement("input");
        expensesAmountInput.type = "number";
        expensesAmountInput.value = amount;
        expensesAmountCell.textContent = "";
        expensesAmountCell.appendChild(expensesAmountInput);

        expensesEditButton.textContent = "Save";
        expensesEditButton.addEventListener("click", function saveEdit() {
          const newAmount = parseFloat(expensesAmountInput.value);
          expenses.forEach((expense) => {
            if (expense.category === category) {
              expense.amount = newAmount;
            }
          });

          updateExpensesTable();

          localStorage.setItem("expenses", JSON.stringify(expenses));

          expensesEditButton.textContent = "Edit";

          expensesEditButton.removeEventListener("click", saveEdit);
        });
      });

      expensesDeleteButton.textContent = "Delete";
      expensesDeleteButton.addEventListener("click", function () {
        expenses = expenses.filter((expense) => expense.category !== category);
        updateExpensesTable();

        localStorage.setItem("expenses", JSON.stringify(expenses));
      });

      expensesActionCell.appendChild(expensesEditButton);
      expensesActionCell.appendChild(expensesDeleteButton);

      expensesRow.appendChild(expensesCategoryCell);
      expensesRow.appendChild(expensesAmountCell);
      expensesRow.appendChild(expensesActionCell);
      expensesTableBody.appendChild(expensesRow);
    }
  }

  updateTotalAmount();
}

function updateTotalAmount() {
  let totalAmount = 0;
  expenses.forEach((expense) => {
    totalAmount += parseFloat(expense.amount);
  });
  totalAmountDisplay.textContent = totalAmount.toFixed(2);
}

//
//
//

function convertArrayOfObjectsToCSV(array) {
  if (array.length < 1) {
    return [];
  }
  const header = Object.keys(array[0]).join(",");
  const csv = array.map((obj) => Object.values(obj).join(",")).join("\n");
  return header + "\n" + csv;
}

function downloadCSV(csvData, filename) {
  const csvBlob = new Blob([csvData], { type: "text/csv" });

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(csvBlob, filename);
  } else {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvBlob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function downloadRecord(record) {
  let data = JSON.parse(localStorage.getItem(record)) || [];
  const csvData = convertArrayOfObjectsToCSV(data);
  downloadCSV(csvData, record);
}

//
