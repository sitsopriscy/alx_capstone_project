const limitCategory = document.querySelector('#expenses-limit-category')
const limitAmount = document.querySelector('#expenses-limit-amount')
const addExpensesLimitBtn = document.querySelector('#add-expenses-limit-btn')
const expensesLimitTableBody = document.querySelector('#expenses-limit-table-body')
const totalLimitAmountDisplay = document.querySelector('#expenses-limit-total-amount')
let expensesLimit = JSON.parse(localStorage.getItem('expensesLimit')) || [] 

// Load saved expenses limit data when the page loads
window.addEventListener('load', function () {
    updateExpensesLimitTable()
})

addExpensesLimitBtn.addEventListener('click', function () {
    const limitCategoryValue = limitCategory.value.trim()
    const limitAmountValue = limitAmount.value.trim()

    // Check if both input fields are empty
    if (!limitCategoryValue || !limitAmountValue) {
        alert('Please enter both category and amount.')
        return
    }

    const addExpensesLimit = {
        limitCategory: limitCategoryValue,
        limitAmount: limitAmountValue
    }

    expensesLimit.push(addExpensesLimit)
    updateExpensesLimitTable()

    localStorage.setItem('expensesLimit', JSON.stringify(expensesLimit))

    limitCategory.value = ''
    limitAmount.value = ''

    console.log(expensesLimit)
})

// Function to update the expenses limit table
function updateExpensesLimitTable() {
    expensesLimitTableBody.innerHTML = ''

    const categoriesMap = new Map()

    // Iterate through the expensesLimit array and aggregate total amounts for each category
    expensesLimit.forEach(expense => {
        if (categoriesMap.has(expense.limitCategory)) {
            // If category already exists, add the amount to the existing amount
            categoriesMap.set(expense.limitCategory, parseFloat(categoriesMap.get(expense.limitCategory)) + parseFloat(expense.limitAmount))
        } else {
            // If category doesn't exist, add it to the map with the amount
            categoriesMap.set(expense.limitCategory, parseFloat(expense.limitAmount))
        }
    })

    // Iterate through the categoriesMap and create table rows for each category
    categoriesMap.forEach((amount, category) => {
        const limitRow = document.createElement('tr')
        const limitCategoryCell = document.createElement('td')
        const limitAmountCell = document.createElement('td')
        const limitActionCell = document.createElement('td')
        const limitEditButton = document.createElement('button')
        const limitDeleteButton = document.createElement('button')

        limitCategoryCell.textContent = category
        limitAmountCell.textContent = amount.toFixed(2)

        limitEditButton.textContent = 'Edit'
        limitEditButton.addEventListener('click', function () {
            limitCategory.value = category

            const limitAmountInput = document.createElement('input')
            limitAmountInput.type = 'number'
            limitAmountInput.value = amount
            limitAmountCell.textContent = ''
            limitAmountCell.appendChild(limitAmountInput)

            limitEditButton.textContent = 'Save'
            limitEditButton.addEventListener('click', function saveEdit() {
                const newAmount = parseFloat(limitAmountInput.value)
                if (!isNaN(newAmount)) {
                    // Update the expense with the new amount value
                    expensesLimit.forEach(expense => {
                        if (expense.limitCategory === category) {
                            expense.limitAmount = newAmount
                        }
                    })

                    updateExpensesLimitTable()

                    localStorage.setItem('expensesLimit', JSON.stringify(expensesLimit))

                    limitEditButton.textContent = 'Edit'

                    limitEditButton.removeEventListener('click', saveEdit)
                } else {
                    alert('Please enter a valid amount.')
                }
            })
        })

        limitDeleteButton.textContent = 'Delete'
        limitDeleteButton.addEventListener('click', function () {
            // Remove the category from the array and the table
            expensesLimit = expensesLimit.filter(expense => expense.limitCategory !== category)
            updateExpensesLimitTable()

            localStorage.setItem('expensesLimit', JSON.stringify(expensesLimit))
        })

        limitActionCell.appendChild(limitEditButton)
        limitActionCell.appendChild(limitDeleteButton)

        limitRow.appendChild(limitCategoryCell)
        limitRow.appendChild(limitAmountCell)
        limitRow.appendChild(limitActionCell)
        expensesLimitTableBody.appendChild(limitRow)
    })

    updateLimitTotalAmount()
}



// Function to update the total amount display
function updateLimitTotalAmount() {
    let totalAmount = 0
    expensesLimit.forEach(expense => {
        totalAmount += parseFloat(expense.limitAmount)
    })
    totalLimitAmountDisplay.textContent = totalAmount.toFixed(2)
}



// Expeneses section

const expensesCategoryInput = document.querySelector('#expenses-category')
const expensesAmountInput = document.querySelector('#expenses-amount')
const addExpensesBtn = document.querySelector('#add-expenses-btn')
const expensesTableBody = document.querySelector('#expenses-table-body')
const totalAmountDisplay = document.querySelector('#expenses-total-amount')
let expenses = JSON.parse(localStorage.getItem('expenses')) || []

window.addEventListener('load', function () {
    updateExpensesTable()
})

addExpensesBtn.addEventListener('click', function () {
    const category = expensesCategoryInput.value.trim()
    const amount = expensesAmountInput.value.trim()

    if (!category || !amount) {
        alert('Please enter both category and amount.')
        return
    }

    const newExpense = {
        category: category,
        amount: amount
    }

    expenses.push(newExpense)
    updateExpensesTable()

    localStorage.setItem('expenses', JSON.stringify(expenses))

    expensesCategoryInput.value = ''
    expensesAmountInput.value = ''
})

function updateExpensesTable() {
    expensesTableBody.innerHTML = ''

    const categoriesMap = new Map()

    expenses.forEach(expense => {
        if (categoriesMap.has(expense.category)) {
            // If category already exists, add the amount to the existing amount
            categoriesMap.set(expense.category, parseFloat(categoriesMap.get(expense.category)) + parseFloat(expense.amount))
        } else {
            // If category doesn't exist, add it to the map with the amount
            categoriesMap.set(expense.category, parseFloat(expense.amount))
        }
    })

    // Iterate through the categories map and create table rows for each category
    categoriesMap.forEach((amount, category) => {
        const expensesRow = document.createElement('tr')
        const expensesCategoryCell = document.createElement('td')
        const expensesAmountCell = document.createElement('td')
        const expensesActionCell = document.createElement('td')
        const expensesEditButton = document.createElement('button')
        const expensesDeleteButton = document.createElement('button')

        expensesCategoryCell.textContent = category
        expensesAmountCell.textContent = amount.toFixed(2)

        expensesEditButton.textContent = 'Edit'
        expensesEditButton.addEventListener('click', function () {
            expensesCategoryInput.value = expenses.category

            const expensesAmountInput = document.createElement('input')
            expensesAmountInput.type = 'number'
            expensesAmountInput.value = expenses.amount
            expensesAmountCell.textContent = ''
            expensesAmountCell.appendChild(expensesAmountInput)

            expensesEditButton.textContent = 'Save'
            expensesEditButton.addEventListener('click', function saveEdit() {
                expenses.category = expensesCategoryInput.value
                expenses.amount = expensesAmountInput.value

                expensesEditButton.textContent = 'Edit'

                updateExpensesTable()

                localStorage.setItem('expenses', JSON.stringify(expenses))

                expensesEditButton.removeEventListener('click', saveEdit)
            })
        })

        expensesDeleteButton.textContent = 'Delete'
        expensesDeleteButton.addEventListener('click', function () {
            expenses.splice(index, 1)
            updateExpensesTable()

            localStorage.setItem('expenses', JSON.stringify(expenses))
        })

        expensesActionCell.appendChild(expensesEditButton)
        expensesActionCell.appendChild(expensesDeleteButton)

        expensesRow.appendChild(expensesCategoryCell)
        expensesRow.appendChild(expensesAmountCell)
        expensesRow.appendChild(expensesActionCell)
        expensesTableBody.appendChild(expensesRow)
    })

    updateTotalAmount()
}


function updateTotalAmount() {
    let totalAmount = 0
    expenses.forEach(expense => {
        totalAmount += parseFloat(expense.amount)
    })
    totalAmountDisplay.textContent = totalAmount.toFixed(2)
}