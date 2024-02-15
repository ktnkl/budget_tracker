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



/// View-Model
let outcomeCounter = 0;

let addCategory = (categoryId) => {
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

  renderCategory(state)
  renderRadio(categoryName, id)
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
  

  let $radios = document.getElementsByName("outcome");
  let checkedId;
  for (let i = 0; i < $radios.length; i++) {
    if ($radios[i].checked) {
      checkedId = $radios[i].classList[0]
      break
    }
  }
  
  state[checkedId].value.push(value)
  
  renderCategory(state)
  
}

function renderRadio(categoryName, id) {
  const $outcomeForm = document.getElementById("outcome-form")
  let outcomeRadioHTML = `
    <input type="radio" value="outcomeRadio${id}" name="outcome" class="${id}">
    <label for="outcomeRadio${id}">${categoryName}</label>
  `;
  $outcomeForm.insertAdjacentHTML("beforeend", outcomeRadioHTML)
}

function renderCategory(state) {
  const $categoriesList = document.getElementById("categories-outcome-list");
  $categoriesList.innerHTML = ''
  
  for (let i = 0; i < state.length; i ++) {
    let id = state[i].id
    let categoryName = state[i].categoryName
    let valueSum = 0
    for (let j = 0; j < state[i].value.length; j ++) {
      valueSum += Number(state[i].value[j])
    }
    const categoryHTML = `
    <div class="${id} categories-item">
      <p class="categories-item__key">${categoryName}</p>
      <p class="categories-item__value">${valueSum}</p>
    </div>`
    $categoriesList.insertAdjacentHTML("beforeend", categoryHTML)
  }
  // state.map(i => {
  //   let id = i.id
  //   let categoryName = i.categoryName
  //   let valueSum
  //   i.value.map(i => {
  //     valueSum += Number(i)
  //   })
  //   const categoryHTML = `
  //   <div class="${id} categories-item">
  //     <p class="categories-item__key">${categoryName}</p>
  //     <p class="categories-item__value">${valueSum}</p>
  //   </div>`
  // $categoriesList.insertAdjacentHTML("beforeend", categoryHTML)
  // })
  
}

let removeCategory = (categoryId) => {
  state.category.filter((item) => item.id !== categoryId)
  render()
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