/// Model

const defaultState = {
  income: [], // { id: 1, categoryId: 1, value: 100}
  outcome: [], // { id: 2, categoryId: 2, value: 100 }
  category: [] // { categoryId: 1, name: 'Развлечения' }
}

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

/// View-Model

let addCategory = (categoryId) => {
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
  name = document.getElementById(inputId).value
  state.category.push({ categoryId, name })
  document.getElementById(inputId).value = '' // обнуляем инпут
  render('outcome-form', state.category, 'categoryInput')
}

let removeCategory = (categoryId) => {
  state.category.filter((item) => item.id !== categoryId)
  render()
}

let addCategoryValue = (categoryId) => {
  let inputId
  switch (categoryId) {
    case 1:
      inputId = 'add-income'
      break;
    case 2:
      inputId = 'add-outcome'
    default:
      break;
  }
  const value = document.getElementById(inputId).value
  
}

const defaultCategoryType = [{ categoryId: 1, name: 'Доходы' }, { categoryId: 2, name: 'Расходы' }]

render = (elementId, model, blockType) => {
  let element = document.getElementById(elementId)
  model.forEach((item, index) => {
    element.insertAdjacentHTML('beforeend', blockType === 'categoryInput' ? categoryInput('category' + index, item.name) : null)
  })
  saveState()
}

/// Components

let categoryInput = (value, name) => {
  return `<input type="radio" value="${value}" name="outcome-catergory">
   <label for="${value}">${name}</label>`
}

render('outcome-form', state.category, 'categoryInput')

// function getSum() {
//   let sum = 0;
//   let elements = document.querySelectorAll('.outcome .categories-item__value')
//   elements.forEach((Element) => {
//     console.log(Element.innerHTML)
//     sum = sum + Number(Element.innerHTML)
//   })
//   document.getElementById('sum').innerHTML = sum
// }

// const addForm = document.getElementById('addForm');
// const addValue = document.getElementById('addValue');
// const outcomeForm = document.querySelector(".outcome-form");
// addForm.addEventListener('click', () => {
//   console.log('click')
//   addForm.classList.toggle('invisible');
//   outcomeForm.classList.toggle('invisible')
// })

// const stylesheet = document.styleSheets[0];
// const newRule = [...stylesheet.cssRules].find(
//   (r) => r.selectorText === ".outcome",
// );
// newRule.style.setProperty('--food', 'orangered')

// newRule.style.setProperty('--transport', 'blue')
// getSum()

// let sum = document.getElementById('sum').innerHTML
// console.log(sum)
// let foodPercent = document.querySelector('#food .categories-item__value').innerHTML * 360 / sum;
// let transportPercent = document.querySelector('#transport .categories-item__value').innerHTML * 360 / sum;
// let healthPercent = document.querySelector('#health .categories-item__value').innerHTML * 360 / sum;
// let homePercent = document.querySelector('#home .categories-item__value').innerHTML * 360 / sum;

// newRule.style.setProperty('--foodPercent', foodPercent + 'deg');
// newRule.style.setProperty('--transportPercent', transportPercent + 'deg');
// newRule.style.setProperty('--healthPercent', healthPercent + 'deg');
// newRule.style.setProperty('--homePercent', homePercent + 'deg');