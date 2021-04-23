const inputExpense = document.getElementById('input-expense');
const inputDate = document.getElementById('input-date');
const inputValue = document.getElementById('input-value');
const addBtn = document.getElementById('add-btn');
const tBody = document.getElementsByTagName('tbody')[0];
const inputs = document.querySelectorAll('input');

const verifyInputs = () => {
  let result = true;
  inputs.forEach((input) => {
    if (!input.value) result = false;
  });
  return result;
}

const addExpense = () => {
  addBtn.addEventListener('click', () => {
    if(!verifyInputs()) alert('Type all the infos');
    const tr = document.createElement('tr');
    inputs.forEach((input) => {
      const td = document.createElement('td');
      td.innerText = input.value;
      tr.appendChild(td);
    })
    tBody.appendChild(tr);
    inputs.forEach((input) => input.value = '');
  })
}

// const updateIncomes

window.onload = () => {
  addExpense();
}