/// Model

// state = [
//   {
//   id: 0..n 
//   name: food,
//   type: 1 or 2, 1 - income, 2 - outcome
//   values: [12, 2323], при добавлении категории ничего не добавляем
//   data: [new Date], так же как и со значением
//   }
// ]
// мне кажеся более удобным рендер новых значений такой структурой

const defaultState = [

]

let savedState = localStorage.getItem('state')

let state = savedState ? JSON.parse(savedState) : defaultState

let resetState = () => {
  state = defaultState
  localStorage.clear()
  location.reload()
}

let saveState = () => {
  localStorage.setItem('state', JSON.stringify(state))
}

renderCategory(1)
renderRadio(1)

renderCategory(2)
renderRadio(2)

/// View-Model
function addCategory(categoryId) {
  let id = state.length

  let inputId
  switch (categoryId) {
    case 1:
      inputId = 'add-income-category-name'
      break;
    case 2:
      inputId = 'add-outcome-category-name'
    default:
      break;
  }
  let $categoryInput = document.getElementById(inputId)
  let categoryName = $categoryInput.value
  $categoryInput.value = '' // обнуляем инпут

  const obj = {
    id,
    categoryName,
    categoryId,
    value: [],
    date: []
  }

  state.push(obj)

  renderCategory(categoryId)
  renderRadio(categoryId)
  saveState()
}

function addCategoryValue(categoryId) {
  let inputId
  let radioName
  switch (categoryId) {
    case 1:
      inputId = 'add-income-value'
      radioName = 'income'
      break;
    case 2:
      inputId = 'add-outcome-value'
      radioName = 'outcome'
    default:
      break;
  }
  const $categoryValueInput = document.getElementById(inputId)
  let value = $categoryValueInput.value
  $categoryValueInput.value = ''

  let $radios = document.getElementsByName(radioName);
  let checkedId;
  for (let i = 0; i < $radios.length; i++) {
    if ($radios[i].checked) {
      checkedId = $radios[i].classList[0]
      break
    }
  }
  
  state[checkedId].value.push(value)
  
  renderCategory(categoryId)
  saveState()
}

function renderRadio(categoryId) {
  let radioName
  switch (categoryId) {
    case 1:
      inputId = 'income-radios'
      radioName = 'income'
      break;
    case 2:
      inputId = 'outcome-radios'
      radioName = 'outcome'
    default:
      break;
  }
  const $radios = document.getElementById(inputId)
  $radios.innerHTML = ''
  for (let i = 0; i < state.length; i ++) {
    if (state[i].categoryId == categoryId) {
      let {id, categoryName} = state[i]
      let radioHTML = `
      <input type="radio" value="${radioName}Radio${id}" name="${radioName}"  class="${id}">
      <label for="${radioName}Radio${id}">${categoryName}</label>
      `;
      $radios.insertAdjacentHTML("beforeend", radioHTML)
  }}
}

function renderCategory(categoryId) {
  let categoriesListId
  switch (categoryId) {
    case 1:
      categoriesListId = "categories-income-list"
      radioName = 'income'
      break;
    case 2:
      categoriesListId = "categories-outcome-list"
      radioName = 'outcome'
    default:
      break;
  }
  const $categoriesList = document.getElementById(categoriesListId);
  $categoriesList.innerHTML = ''
  
  for (let i = 0; i < state.length; i ++) {
    if (state[i].categoryId == categoryId) {
      let {id, categoryName, value} = state[i]
      let valueSum = 0
      for (let j = 0; j < value.length; j ++) {
        valueSum += Number(value[j])
      }
      const categoryHTML = `
      <div class="${id} categories-item">
        <p class="categories-item__key">${categoryName}</p>
        <p class="categories-item__value">${valueSum}</p>
      </div>`
      $categoriesList.insertAdjacentHTML("beforeend", categoryHTML)
  }}
  
}

