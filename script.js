const inputDescription = document.getElementById('input-description');
const inputDate = document.getElementById('input-date');
const inputValue = document.getElementById('input-value');
const addBtn = document.getElementById('add-btn');
const tBody = document.getElementsByTagName('tbody')[0];
const inputs = document.querySelectorAll('input');
const incomesCard = document.querySelector('#incomes');
const expensesCard = document.querySelector('#expenses');
const totalCard = document.querySelector('#total');
const months = document.querySelectorAll('#months li');
const saveBtn = document.getElementById('save-btn');

const verifyInputs = () => {
  let result = true;
  inputs.forEach((input) => {
    if (!input.value) result = false;
  });
  return result;
}

const createRow = (input) => {
  const td = document.createElement('td');
  if (input.id === 'input-value') {
    td.innerText = `${input.value}R$`;
    input.value < 0 ? td.classList.add('expenses') : td.classList.add('incomes');
  } else {
    td.innerText = `${input.value}`;
  }
  return td;
}

const updateIDValue = () => {
  const inputId = document.querySelector("#id");
  inputId.value = parseInt(inputId.value) + 1;
}

const addTransaction = () => {
  addBtn.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    if (!verifyInputs()) {
      alert('Type all the infos');
    }
    if (!selected) {
      alert('Selecione um mês');
      return;
    }
    const tr = document.createElement('tr');
    inputs.forEach((input) => {
      tr.appendChild(createRow(input));
    })
    tr.addEventListener('click', (event) => deleteRow(event.currentTarget));
    tBody.appendChild(tr);
    updateIDValue();
    // inputs.forEach((input) => input.value = '');
    updateAll();
  })
}

const updateAll = () => {
  updateIncomes();
  updateExpenses();
  updateTotal();
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

const deleteFromLocalStorage = (event) => {
  const children = event.childNodes;
  console.log(children[0].innerText);
  const selected = document.querySelector('.selected');
  const month = selected.innerText;
  localStorage.removeItem(`${month}-${children[0].innerText}`)
}

const deleteRow = (event) => {
  event.remove();
  deleteFromLocalStorage(event);
  updateAll();
}

const setSelectedMonth = (event) => {
  const selected = document.querySelector('.selected');
  const monthClass = event.target.classList;
  if (!selected) monthClass.add('selected');
  else {
    if (monthClass.contains('selected')) monthClass.toggle('selected');
  }
}

const monthsClicked = () => {
  months.forEach((month) => {
    month.addEventListener('click', setSelectedMonth);
    month.addEventListener('click', getLocalStorage);
  });
};

const saveOnLocalStorage = () => {
  saveBtn.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row) => {
      const tds = row.childNodes;
      const array = [];
      tds.forEach((td) => array.push(td.innerText))
      const JSONArray = JSON.stringify(array)
      localStorage.setItem(`${selected.innerText}-${JSON.parse(JSONArray)[0]}`, JSONArray);
    })
  });
}

const getLocalStorage = (event) => {
  const month = event.target.innerText;
  tBody.innerText = '';
  for (let index = 0; index < localStorage.length; index += 1) {
    if (localStorage.key(index).split('-')[0] === month) {
      const row = document.createElement('tr');
      const values = JSON.parse(localStorage.getItem(localStorage.key(index)));
      values.forEach((value, index) => {
        const td = document.createElement('td');
        if (index === 2) {
          const number = parseFloat(value.split('R')[0]);
          number < 0 ? td.classList.add('expenses') : td.classList.add('incomes');
        }
        td.innerText = value;
        row.appendChild(td);
        row.addEventListener('click', (event) => deleteRow(event.currentTarget));
      });
      tBody.appendChild(row);
      updateAll();
    }
  }
}

window.onload = () => {
  addTransaction();
  monthsClicked();
  saveOnLocalStorage();
}