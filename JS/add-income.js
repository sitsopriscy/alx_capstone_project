const dateInput = document.querySelector('#income-date')
const categoryInput = document.querySelector('#income-category')
const amountInput = document.querySelector('#income-amount')
const completeButton = document.querySelector('#complete-button')
const incomeListTableBody = document.querySelector('#income-list-table-body')
const incomeTotalAmountDisplay = document.querySelector('#income-total-amount')
let incomeList = JSON.parse(localStorage.getItem('incomeList')) || []

window.addEventListener('load', function () {
    updateIncomeTable()
})

completeButton.addEventListener('click', function () {
    const date = dateInput.value.trim()
    const category = categoryInput.value.trim()
    const amount = amountInput.value.trim()

    if (!date || !category || !amount) {
        alert('Please enter all fields.')
        return
    }

    // Check if category already exists
    const existingIncomeIndex = incomeList.findIndex(income => income.category === category)
    if (existingIncomeIndex !== -1) {
        // If the category already exists, update the amount
        incomeList[existingIncomeIndex].amount = (parseFloat(incomeList[existingIncomeIndex].amount) + parseFloat(amount)).toFixed(2)
    } else {
        incomeList.push({
            date: date,
            category: category,
            amount: amount
        })
    }
    updateIncomeTable()

    localStorage.setItem('incomeList', JSON.stringify(incomeList))

    dateInput.value = ''
    categoryInput.value = ''
    amountInput.value = ''
})

// Function to update the income table
function updateIncomeTable() {
    incomeListTableBody.innerHTML = ''

    // Iterate through the income list and create table rows for each income
    incomeList.forEach((income, index) => {
        const incomeRow = document.createElement('tr')
        const dateCell = document.createElement('td')
        const categoryCell = document.createElement('td')
        const amountCell = document.createElement('td')
        const actionCell = document.createElement('td')
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        dateCell.textContent = income.date
        categoryCell.textContent = income.category
        amountCell.textContent = income.amount

        editButton.textContent = 'Edit'
        editButton.addEventListener('click', function () {
            dateInput.value = income.date
            categoryInput.value = income.category

            // Create an input element for the amount with the current value
            const amountInput = document.createElement('input')
            amountInput.type = 'number'
            amountInput.value = income.amount

            // Replace the text content of the amount cell with the input field
            amountCell.textContent = ''
            amountCell.appendChild(amountInput)

            const incomeEditIndex = index

            editButton.textContent = 'Save'
            editButton.addEventListener('click', function saveEdit() {
                // Update the income with the new date, category, and amount values
                incomeList[incomeEditIndex].date = dateInput.value
                incomeList[incomeEditIndex].category = categoryInput.value
                incomeList[incomeEditIndex].amount = amountInput.value

                editButton.textContent = 'Edit'

                updateIncomeTable()

                localStorage.setItem('incomeList', JSON.stringify(incomeList))

                editButton.removeEventListener('click', saveEdit)
            })
        })


        deleteButton.textContent = 'Delete'
        deleteButton.addEventListener('click', function () {
            // Remove the income from the income list
            incomeList.splice(index, 1)

            updateIncomeTable()

            localStorage.setItem('incomeList', JSON.stringify(incomeList))
        })

        actionCell.appendChild(editButton)
        actionCell.appendChild(deleteButton)

        incomeRow.appendChild(dateCell)
        incomeRow.appendChild(categoryCell)
        incomeRow.appendChild(amountCell)
        incomeRow.appendChild(actionCell)

        incomeListTableBody.appendChild(incomeRow)
    })

    updateTotalAmount()
}

function updateTotalAmount() {
    let totalAmount = 0
    incomeList.forEach(income => {
        totalAmount += parseFloat(income.amount)
    })
    incomeTotalAmountDisplay.textContent = totalAmount.toFixed(2)
}

updateIncomeTable()
