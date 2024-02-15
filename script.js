/// Model

const defaultState = {
  income: [], // { categoryId: 1, value: 100}
  outcome: [], // { categoryId: 2, value: 100 }
  category: [], // { categoryId: 1, name: 'Развлечения' }
  id: 0 //счетчик айди категории, общий для расходов и доходов
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
let outcomeCounter = 0;

let addCategory = (categoryId) => {
  let id = state.id

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
  
  renderCategory(categoryName, id)
  renderRadio(categoryName, id)

  state.category.push({id, categoryId,categoryName})
  state.id += 1
}

function renderRadio(categoryName, id) {
  const $outcomeForm = document.getElementById("outcome-form")
  let outcomeRadioHTML = `
    <input type="radio" value="outcomeRadio${id}" name="outcome" class="${id}">
    <label for="outcomeRadio${id}">${categoryName}</label>
  `;
  $outcomeForm.insertAdjacentHTML("beforeend", outcomeRadioHTML)
}

function renderCategory(categoryName, id) {
  const $categoriesList = document.getElementById("categories-outcome-list");
  const categoryHTML = `
    <div class="${id} categories-item">
      <p class="categories-item__key">${categoryName}</p>
      <p class="categories-item__value">0</p>
    </div>`
  $categoriesList.insertAdjacentHTML("beforeend", categoryHTML)
}

let removeCategory = (categoryId) => {
  state.category.filter((item) => item.id !== categoryId)
  render()
}

let addCategoryValue = (categoryId) => {
  let inputId
  switch (categoryId) {
    case 1:
      inputId = 'add-income-value'
      break;
    case 2:
      inputId = 'add-outcome-value'
    default:
      break;
  }
  const value = document.getElementById(inputId).value
  document.getElementById(inputId).value = ''

  let $radios = document.getElementsByName("outcome");
  let checkedId;
  for (let i = 0; i < $radios.length; i++) {
    if ($radios[i].checked) {
      checkedId = $radios[i].classList[0]
      break
    }
  }
  
  state.outcome.push({checkedId, value})
  
  for (key in state.outcome) {
    console.log(state.outcome[key])
  }
}

const defaultCategoryType = [{ categoryId: 1, name: 'Доходы' }, { categoryId: 2, name: 'Расходы' }]



// render = (elementId, model, blockType) => {
//   let element = document.getElementById(elementId)
//   model.forEach((item, index) => {
//     element.insertAdjacentHTML('beforeend', blockType === 'categoryInput' ? categoryInput('category' + index, item.name) : null)
//   })
//   saveState()
// }

/// Components



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