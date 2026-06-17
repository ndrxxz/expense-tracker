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

let totalBudget = 0;
let totalAmount = 0;
let totalRemaining = 0;
let expense = [];

btnSaveBudget.addEventListener("click", () => {
    const budgetValue = inputBudget.value.trim();

    if (budgetValue === "") return;

    totalBudget = parseFloat(budgetValue);

    updateSummary();

    inputBudget.value = "";
});

btnAddExpense.addEventListener("click", () => {
    const amountValue = inputAmount.value.trim();

    if (amountValue === "") return;

    totalAmount += parseFloat(amountValue);

    updateSummary();

    inputAmount.value = "";
});

function updateSummary() {
    totalRemaining = totalBudget - totalAmount;

    summaryBudget.textContent = `₱${totalBudget}`;
    summarySpent.textContent = `₱${totalAmount}`;
    summaryRemaining.textContent = `₱${totalRemaining}`;

    summaryRemaining.style.color = totalRemaining < 0 ? "#D85A30" : "#1D9E75";
}