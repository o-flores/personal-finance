const inputDescription = document.getElementById('input-description');
const inputDate = document.getElementById('input-date');
const inputValue = document.getElementById('input-value');
const addBtn = document.getElementById('add-btn');
const tBody = document.getElementsByTagName('tbody')[0];
const inputs = document.querySelectorAll('input');
const incomesCard = document.querySelector('#incomes');
const expensesCard = document.querySelector('#expenses');
const totalCard = document.querySelector('#total');

const verifyInputs = () => {
  let result = true;
  inputs.forEach((input) => {
    if (!input.value) result = false;
  });
  return result;
}

const addExpense = () => {
  addBtn.addEventListener('click', () => {
    if(!verifyInputs()) {
      alert('Type all the infos');
      return;
    } 
    const tr = document.createElement('tr');
    inputs.forEach((input) => {
      const td = document.createElement('td');
      if (input.id === 'input-value') {
        td.innerText = `${input.value} R$`;
        input.value < 0 ? td.classList.add('expenses') : td.classList.add('incomes');
      } else {
        td.innerText = `${input.value}`;
      }
      tr.appendChild(td);
    })
    tr.addEventListener('click', (event) => deleteRow(event.currentTarget));
    tBody.appendChild(tr);
    inputs.forEach((input) => input.value = '');
    updateIncomes();
    updateExpenses();
    updateTotal();
  })
}

const updateExpenses = () => {
  const expenses = document.querySelectorAll('.expenses');
  let sum = 0;
  expenses.forEach((expense) => {
    const value = parseFloat(expense.innerText.split(' ')[0])
    sum += value;
  });
  expensesCard.innerText = `${sum.toFixed(2)} R$`;
  return sum;
}

const updateIncomes = () => {
  const incomes = document.querySelectorAll('.incomes');
  let sum = 0;
  incomes.forEach((income) => {
    const value = parseFloat(income.innerText.split(' ')[0])
    sum += value;
  });
  incomesCard.innerText = `${sum.toFixed(2)} R$`;
  return sum;
}

const updateTotal = () => {
  const income = updateIncomes();
  const expense = updateExpenses();
  const total = income + expense;
  totalCard.innerText = `${total.toFixed(2)} R$`
}

const deleteRow = (event) => {
  event.remove();
  updateExpenses();
  updateIncomes();
  updateTotal();
}

window.onload = () => {
  addExpense();
}