const totalIncomeDisplay = document.getElementById('total-income')
const totalExpensesDisplay = document.getElementById('total-expenses')
const balanceDisplay = document.getElementById('balance')
const currentExpensesTableBody = document.getElementById('current-expenses-body')

let incomeList = JSON.parse(localStorage.getItem('incomeList')) || []
let expensesList = JSON.parse(localStorage.getItem('expenses')) || []

// Update total income, total expenses, and balance
function updateSummary() {
    let totalIncome = 0
    incomeList.forEach(income => {
        totalIncome += parseFloat(income.amount)
    })
    totalIncomeDisplay.textContent = totalIncome.toFixed(2)

    let totalExpenses = 0
    expensesList.forEach(expense => {
        totalExpenses += parseFloat(expense.amount)
    })
    totalExpensesDisplay.textContent = totalExpenses.toFixed(2)

    balanceDisplay.textContent = (totalIncome - totalExpenses).toFixed(2)
}

// Update the current expenses table
function updateCurrentExpensesTable() {
    currentExpensesTableBody.innerHTML = ''
    expensesList.forEach(expense => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
        `
        currentExpensesTableBody.appendChild(row)
    })
}

updateSummary()
updateCurrentExpensesTable()
