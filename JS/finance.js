/* ========================================== 
   FINANCE MANAGEMENT PAGE JAVASCRIPT
   Financial Records, Fees, Expenses & Reports
   ========================================== */

// Sample Financial Data
let transactions = [
    {
        id: 1,
        date: '2024-01-15',
        description: 'Spring Semester Tuition',
        type: 'fee',
        amount: 5000,
        status: 'completed',
        reference: 'TRX-001',
        notes: 'Full semester payment'
    },
    {
        id: 2,
        date: '2024-02-10',
        description: 'Merit Scholarship',
        type: 'scholarship',
        amount: 1500,
        status: 'completed',
        reference: 'SCH-2024-001',
        notes: 'Academic excellence award'
    },
    {
        id: 3,
        date: '2024-03-05',
        description: 'Course Materials Fee',
        type: 'fee',
        amount: 250,
        status: 'completed',
        reference: 'TRX-002',
        notes: 'Textbooks and online access'
    },
    {
        id: 4,
        date: '2024-03-20',
        description: 'Lab Equipment Refund',
        type: 'refund',
        amount: 100,
        status: 'pending',
        reference: 'REF-001',
        notes: 'Returned unused equipment'
    },
    {
        id: 5,
        date: '2024-04-01',
        description: 'Summer Tuition Deposit',
        type: 'fee',
        amount: 3000,
        status: 'completed',
        reference: 'TRX-003',
        notes: 'Summer session advance payment'
    },
    {
        id: 6,
        date: '2024-04-15',
        description: 'Campus Card Top-up',
        type: 'other',
        amount: 500,
        status: 'completed',
        reference: 'CARD-001',
        notes: 'Campus card balance'
    }
];

let expenses = [
    {
        id: 1,
        description: 'Spring & Summer Tuition',
        category: 'tuition',
        amount: 8000,
        period: '2024'
    },
    {
        id: 2,
        description: 'Dorm Housing',
        category: 'accommodation',
        amount: 4500,
        period: '2024'
    },
    {
        id: 3,
        description: 'Textbooks & Course Materials',
        category: 'materials',
        amount: 800,
        period: '2024'
    },
    {
        id: 4,
        description: 'Campus Transportation Pass',
        category: 'transportation',
        amount: 300,
        period: '2024'
    },
    {
        id: 5,
        description: 'Miscellaneous Fees',
        category: 'other',
        amount: 400,
        period: '2024'
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupTabHandlers();
    updateFinanceStatistics();
    loadTransactions();
    loadExpenses();
    generateReports();
    setupFormListener();
});

/* ========================================== 
   TAB MANAGEMENT
   ========================================== */

function setupTabHandlers() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Hide all tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Remove active class from buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to button
    event.target.classList.add('active');

    // Reload tab-specific data
    if (tabName === 'transactions') {
        loadTransactions();
    } else if (tabName === 'expenses') {
        loadExpenses();
    } else if (tabName === 'reports') {
        generateReports();
    }
}

/* ========================================== 
   STATISTICS CALCULATION
   ========================================== */

function updateFinanceStatistics() {
    const totalFees = transactions
        .filter(t => t.type === 'fee' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalScholarship = transactions
        .filter(t => t.type === 'scholarship' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalPaid = totalFees + totalScholarship;
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const outstanding = totalExpenses - totalPaid;
    const paymentPercentage = Math.round((totalPaid / totalExpenses) * 100);

    document.getElementById('totalFees').textContent = '$' + totalExpenses.toLocaleString();
    document.getElementById('totalPaid').textContent = '$' + totalPaid.toLocaleString();
    document.getElementById('outstanding').textContent = '$' + Math.max(0, outstanding).toLocaleString();
    document.getElementById('paymentPercentage').textContent = paymentPercentage + '%';
}

/* ========================================== 
   TRANSACTIONS MANAGEMENT
   ========================================== */

function loadTransactions() {
    const typeFilter = document.getElementById('transactionTypeFilter').value;
    let filteredData = transactions;

    if (typeFilter) {
        filteredData = transactions.filter(t => t.type === typeFilter);
    }

    const tbody = document.getElementById('transactionsTableBody');
    tbody.innerHTML = filteredData.map(txn => `
        <tr>
            <td>${formatDate(txn.date)}</td>
            <td>${txn.description}</td>
            <td>${capitalizeText(txn.type)}</td>
            <td>$${txn.amount.toLocaleString()}</td>
            <td><span class="status-badge status-${txn.status}">${capitalizeText(txn.status)}</span></td>
            <td>${txn.reference}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-small btn-view" onclick="viewTransaction(${txn.id})">👁️ View</button>
                    <button class="action-btn-small btn-delete" onclick="deleteTransaction(${txn.id})">🗑️ Delete</button>
                </div>
            </td>
        </tr>
    `).join('');

    // Add filter listener
    document.getElementById('transactionTypeFilter').removeEventListener('change', loadTransactions);
    document.getElementById('transactionTypeFilter').addEventListener('change', loadTransactions);
}

function viewTransaction(id) {
    const txn = transactions.find(t => t.id === id);
    if (txn) {
        alert(`Transaction: ${txn.description}\nAmount: $${txn.amount}\nStatus: ${capitalizeText(txn.status)}\nDate: ${formatDate(txn.date)}\nNotes: ${txn.notes}`);
    }
}

function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        transactions = transactions.filter(t => t.id !== id);
        loadTransactions();
        updateFinanceStatistics();
        showNotification('Transaction deleted successfully!');
    }
}

/* ========================================== 
   EXPENSES MANAGEMENT
   ========================================== */

function loadExpenses() {
    const categoryFilter = document.getElementById('expenseCategoryFilter').value;
    let filteredExpenses = expenses;

    if (categoryFilter) {
        filteredExpenses = expenses.filter(e => e.category === categoryFilter);
    }

    const grid = document.getElementById('expensesGrid');
    grid.innerHTML = filteredExpenses.map(expense => `
        <div class="expense-card">
            <div class="expense-header">
                <span class="expense-category">${expense.category.toUpperCase()}</span>
                <span class="expense-badge badge-${expense.category}">Expense</span>
            </div>
            <div class="expense-amount">$${expense.amount.toLocaleString()}</div>
            <div class="expense-description">${expense.description}</div>
            <div class="expense-period">Period: ${expense.period}</div>
        </div>
    `).join('');

    // Add filter listener
    document.getElementById('expenseCategoryFilter').removeEventListener('change', loadExpenses);
    document.getElementById('expenseCategoryFilter').addEventListener('change', loadExpenses);
}

/* ========================================== 
   REPORTS GENERATION
   ========================================== */

function generateReports() {
    generatePaymentStatusChart();
    generateExpenseCategoryChart();
    generateMonthlySummary();
}

function generatePaymentStatusChart() {
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const paidAmount = transactions
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);
    const pendingAmount = totalExpenses - paidAmount;

    // Simple canvas pie chart simulation
    const canvas = document.getElementById('paymentStatusChart');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        const radius = Math.min(canvas.width, canvas.height) / 2;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw paid section (green)
        const paidAngle = (paidAmount / totalExpenses) * Math.PI * 2;
        ctx.fillStyle = '#27ae60';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius - 20, 0, paidAngle);
        ctx.closePath();
        ctx.fill();

        // Draw pending section (orange)
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius - 20, paidAngle, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        // Draw center circle for donut effect
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 40, 0, Math.PI * 2);
        ctx.fill();
    }
}

function generateExpenseCategoryChart() {
    const categoryTotals = {};
    expenses.forEach(e => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    const maxAmount = Math.max(...Object.values(categoryTotals));
    const chartHtml = Object.entries(categoryTotals).map(([category, amount]) => {
        const percentage = (amount / maxAmount) * 100;
        return `
            <div class="category-item">
                <div class="category-label">${capitalizeText(category)}</div>
                <div class="category-bar-container">
                    <div class="category-bar" style="width: ${percentage}%"></div>
                </div>
                <div class="category-amount">$${amount.toLocaleString()}</div>
            </div>
        `;
    }).join('');

    document.getElementById('expenseCategoryChart').innerHTML = chartHtml;
}

function generateMonthlySummary() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June'];
    const monthlyData = months.map(month => {
        const income = Math.floor(Math.random() * 2000) + 1000;
        const expenses = Math.floor(Math.random() * 1500) + 500;
        const net = income - expenses;

        return `
            <tr>
                <td><strong>${month}</strong></td>
                <td class="amount-positive">$${income.toLocaleString()}</td>
                <td class="amount-negative">$${expenses.toLocaleString()}</td>
                <td class="${net > 0 ? 'amount-positive' : 'amount-negative'}">$${net.toLocaleString()}</td>
            </tr>
        `;
    }).join('');

    document.getElementById('monthlySummaryBody').innerHTML = monthlyData;
}

/* ========================================== 
   MODAL FUNCTIONS
   ========================================== */

function openAddTransactionModal() {
    document.getElementById('transactionForm').reset();
    document.getElementById('addTransactionModal').classList.add('active');
}

function closeAddTransactionModal() {
    document.getElementById('addTransactionModal').classList.remove('active');
}

/* ========================================== 
   FORM HANDLING
   ========================================== */

function setupFormListener() {
    document.getElementById('transactionForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveTransaction();
    });
}

function saveTransaction() {
    const description = document.getElementById('description').value;
    const type = document.getElementById('transactionType').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('transactionDate').value;
    const status = document.getElementById('transactionStatus').value;
    const reference = document.getElementById('reference').value;
    const notes = document.getElementById('notes').value;

    if (!description || !type || !amount || !date) {
        alert('Please fill all required fields!');
        return;
    }

    const newTransaction = {
        id: Math.max(...transactions.map(t => t.id), 0) + 1,
        date,
        description,
        type,
        amount,
        status,
        reference: reference || 'TRX-' + Math.random().toString(36).substr(2, 9),
        notes
    };

    transactions.push(newTransaction);
    closeAddTransactionModal();
    loadTransactions();
    updateFinanceStatistics();
    showNotification('Transaction added successfully!');
}

/* ========================================== 
   UTILITY FUNCTIONS
   ========================================== */

function capitalizeText(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function showNotification(message) {
    alert(message);
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('addTransactionModal');
    if (e.target === modal) {
        closeAddTransactionModal();
    }
});

// Keyboard shortcut: Escape to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAddTransactionModal();
    }
});

console.log('Finance management dashboard loaded successfully!');
