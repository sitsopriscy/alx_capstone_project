const totalIncome = parseFloat(totalIncomeDisplay.textContent)
const totalExpenses = parseFloat(totalExpensesDisplay.textContent)


// Get the canvas element
const ctx = document.getElementById("incomeVsExpensesChart").getContext("2d")

// Create the chart for income verses expense
const incomeExpenseChart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: ["Income", "Expenses"],
        datasets: [
            {
                label: "Income",
                data: [totalIncome, totalExpenses],
                backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
                borderWidth: 0,
            },
        ],
    },
})

// Get the canvas element
const intx = document
    .getElementById("expensesLimitVsActualExpensesChart")
    .getContext("2d")

// Create a chart for expenses limit verse actual expenses
const expenseLimitData =
    JSON.parse(localStorage.getItem("expensesLimit")) || []
// console.log({ expenseLimitData })

const labels = []
const limitAmountData = []
expenseLimitData.forEach((element) => {
    labels.push(element.limitCategory)
    limitAmountData.push(element.limitAmount)

    // console.log(limitAmountData)
})

const expenseData =
    JSON.parse(localStorage.getItem("expenses")) || []
// console.log({expenseData})

const expenseAmount = []
expenseData.forEach((element) => {
    expenseAmount.push(element.amount)
    // console.log(element)
})


// console.log({ labels })

const config = {
    type: "bar",
    data: {
        labels: labels,
        datasets: [
            {
                label: "limit Amount",
                data: limitAmountData,
                backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue color with opacity
                borderColor: "rgba(54, 162, 235, 1)", // Blue color
                borderWidth: 1,
            },
            {
                label: "Expenses",
                data: expenseAmount,
                backgroundColor: "rgba(255, 99, 132, 0.5)", // Red color with opacity
                borderColor: "rgba(255, 99, 132, 1)", // Red color
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
}
// Create the chart for income verses expense
const expenseLimitChart = new Chart(intx, config)





// Making it a function

// const totalIncome = parseFloat(totalIncomeDisplay.textContent)
// const totalExpenses = parseFloat(totalExpensesDisplay.textContent)


// const ctxIncomeExpense = document.getElementById("incomeVsExpensesChart").getContext("2d")
// function createIncomeExpenseChart(ctx, totalIncome, totalExpenses) {
//     return new Chart(ctx, {
//         type: "pie",
//         data: {
//             labels: ["Income", "Expenses"],
//             datasets: [
//                 {
//                     label: "Income",
//                     data: [totalIncome, totalExpenses],
//                     backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
//                     borderWidth: 0,
//                 },
//             ],
//         },
//     })
// }

// const incomeExpenseChart = createIncomeExpenseChart(ctxIncomeExpense, totalIncome, totalExpenses)


// // Get the canvas element
// const intx = document
//     .getElementById("expensesLimitVsActualExpensesChart")
//     .getContext("2d")

// // Create a chart for expenses limit verse actual expenses
// const expenseLimitData =
//     JSON.parse(localStorage.getItem("expensesLimit")) || []
// // console.log({ expenseLimitData })

// const labels = []
// const limitAmountData = []
// expenseLimitData.forEach((element) => {
//     labels.push(element.limitCategory)
//     limitAmountData.push(element.limitAmount)

//     // console.log(limitAmountData)
// })

// const expenseData =
//     JSON.parse(localStorage.getItem("expenses")) || []
// // console.log({ expenseData })

// const expenseAmount = []
// expenseData.forEach((element) => {
//     expenseAmount.push(element.amount)
//     // console.log(element)
// })


// // console.log({ labels })

// const intxExpenseLimit = document.getElementById("expensesLimitVsActualExpensesChart").getContext("2d")

// function createExpenseLimitChart(ctx, labels, limitAmountData, expenseAmount) {
//     const config = {
//         type: "bar",
//         data: {
//             labels: labels,
//             datasets: [
//                 {
//                     label: "Limit Amount",
//                     data: limitAmountData,
//                     backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue color with opacity
//                     borderColor: "rgba(54, 162, 235, 1)", // Blue color
//                     borderWidth: 1,
//                 },
//                 {
//                     label: "Expenses",
//                     data: expenseAmount,
//                     backgroundColor: "rgba(255, 99, 132, 0.5)", // Red color with opacity
//                     borderColor: "rgba(255, 99, 132, 1)", // Red color
//                     borderWidth: 1,
//                 },
//             ],
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                 },
//             },
//         },
//     }
//     return new Chart(ctx, config)
// }
// const expenseLimitChart = createExpenseLimitChart(intxExpenseLimit, labels, limitAmountData, expenseAmount)




