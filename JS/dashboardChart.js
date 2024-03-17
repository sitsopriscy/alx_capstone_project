// Retrieve data for the charts
const totalIncome = parseFloat(document.getElementById('total-income').textContent);
const totalExpenses = parseFloat(document.getElementById('total-expenses').textContent);
const balance = parseFloat(document.getElementById('balance').textContent);
const expensesLimit = parseFloat(document.getElementById('expenses-limit-total-amount').textContent);
const actualExpenses = parseFloat(document.getElementById('expenses-total-amount').textContent);

// Create chart for income vs expenses
const incomeVsExpensesCtx = document.getElementById('incomeVsExpensesChart').getContext('2d');
const incomeVsExpensesChart = new Chart(incomeVsExpensesCtx, {
    type: 'bar',
    data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
            label: 'Amount',
            data: [totalIncome, totalExpenses],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)', // Blue for Income
                'rgba(255, 99, 132, 0.2)' // Red for Expenses
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// Create chart for expenses limit vs actual expenses
const expensesLimitVsActualExpensesCtx = document.getElementById('expensesLimitVsActualExpensesChart').getContext('2d');
const expensesLimitVsActualExpensesChart = new Chart(expensesLimitVsActualExpensesCtx, {
    type: 'bar',
    data: {
        labels: ['Expenses Limit', 'Actual Expenses'],
        datasets: [{
            label: 'Amount',
            data: [expensesLimit, actualExpenses],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)', // Blue for Expenses Limit
                'rgba(255, 99, 132, 0.2)' // Red for Actual Expenses
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
