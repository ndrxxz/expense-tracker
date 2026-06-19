const inputBudget = document.querySelector("#input-budget");
const inputDesc = document.querySelector("#input-desc");
const inputAmount = document.querySelector("#input-amount");
const inputCategory = document.querySelector("#input-category");
const inputDate = document.querySelector("#input-date");
const inputNotes = document.querySelector("#input-notes");

const btnSaveBudget = document.querySelector("#btn-save-budget");
const btnAddExpense = document.querySelector("#btn-add-expense");

const summaryBudget = document.querySelector("#summary-budget");
const summarySpent = document.querySelector("#summary-spent");
const summaryRemaining = document.querySelector("#summary-remaining");

const expenseList = document.querySelector("#expense-list");

const emptyState = document.querySelector("#empty-state");

let totalBudget = 0;
let totalAmount = 0;
let totalRemaining = 0;
let expenses = [];

btnSaveBudget.addEventListener("click", () => {
    const budgetValue = inputBudget.value.trim();

    if (!budgetValue) return;

    totalBudget = parseFloat(budgetValue);

    updateSummary();

    inputBudget.value = "";

    // saveExpenses();
});

btnAddExpense.addEventListener("click", () => {
    const descValue = inputDesc.value.trim();
    const amountValue = inputAmount.value.trim();
    const categoryValue = inputCategory.value.trim();
    const dateValue = inputDate.value.trim();
    const notesValue = inputNotes.value.trim();

    if (!amountValue) return;

    totalAmount += parseFloat(amountValue);

    updateSummary();

    const newExpense = {
        description: descValue,
        amount: parseFloat(amountValue),
        category: categoryValue,
        date: dateValue,
        notes: notesValue
    };

    expenses.push(newExpense);

    renderExpenses();

    inputDesc.value = "";
    inputAmount.value = "";
    inputCategory.value = "";
    inputDate.value = "";
    inputNotes.value = "";
});

expenseList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".btn-delete");
    const div = e.target.closest("div");

    if (!div) return;

    if (deleteBtn) {
        const expenseRow = deleteBtn.closest(".expense-row");
        const index = expenseRow.dataset.index;
        const expenseToDelete = expenses[index];

        if (index > -1) {
            totalAmount -= expenseToDelete.amount
            expenses.splice(index, 1);
        }

        updateSummary();
        renderExpenses();
        // saveExpenses();
        return;
    }
});

function updateSummary() {
    totalRemaining = totalBudget - totalAmount;

    summaryBudget.textContent = `₱${totalBudget}`;
    summarySpent.textContent = `₱${totalAmount}`;
    summaryRemaining.textContent = `₱${totalRemaining}`;

    summaryRemaining.style.color = totalRemaining < 0 ? "#D85A30" : "#1D9E75";

    // saveExpenses();
}

function renderExpenses() {
    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    expenses.forEach((expense, index) => {
        let div = document.createElement("div");
        div.classList.add("expense-row");
        div.dataset.index = index;

        div.innerHTML = `
            <div class="expense-icon">${categoryIcons[expense.category]}</div>

            <div class="expense-info">
                <div class="expense-name">${expense.description}</div>
                <div class="expense-meta">${expense.category} · ${formatDate(expense.date)}</div>
            </div>

            <div class="expense-amount">-₱${expense.amount}</div>

            <button class="btn-delete">🗑️</button>
        `;

        expenseList.appendChild(div);
    });
}

function formatDate(dateVal) {
    return new Date(dateVal).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric"
    });
}

const categoryIcons = {
    Food: "🍔",
    Transport: "🚌",
    Bills: "⚡",
    Shopping: "🛍️",
    Other: "📦"
};

// const saveExpenses = () => {
//     localStorage.setItem("expenses", expenseList.innerHTML);
// }

// const getExpenses = () => {
//     expenseList.innerHTML = localStorage.getItem("expenses") || "";

//     if (expenseList.children.length === 0) {
//         emptyState.style.display = "block";
//     } else {
//         emptyState.style.display = "none";
//     }
// }

// getExpenses();