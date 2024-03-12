// expensesLimit.js

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

        // Create delete button
        limitDeleteButton.textContent = 'Delete'
        limitDeleteButton.addEventListener('click', function () {
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
