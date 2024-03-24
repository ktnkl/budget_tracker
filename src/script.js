// state = {
//  categories:[
  //   {id: 0..n 
  //   name: food,
  //   type: 1 or 2, 1 - income, 2 - outcome
  //   value: [12, 2323], при добавлении категории ничего не добавляем
  //   data: [new Date], так же как и со значением},
  //   {},
  //   ]
  // userChoises: {
  //   categoryID,
  //   theme: dark or light,
  // }
  // budget: all money
// }

import {tab, category, radio, requireLogIn} from "./templates.js"
import {cat} from "./utils.js"

/// Model
const defaultState = {
  categories: [

  ],
  userChoises: {
    categoryId: 1,
    theme: 'light',
    userName: "demo",
  },
  budget: 0
}

let savedState = localStorage.getItem('state')

let state = savedState ? JSON.parse(savedState) : defaultState

let resetState = () => {
  state = defaultState
  localStorage.clear()
  location.reload()
}

// Presenter

let saveState = () => {
  localStorage.setItem('state', JSON.stringify(state))
}

document.getElementById('outcome-chooser').addEventListener('click', () => {
  renderPage(2)
})

document.getElementById('income-chooser').addEventListener('click', () => renderPage(1))

function getBudget(state) {
  let budget = 0
  for (item of state.categories) {
    if (item.categoryId == 1) {
      for (let v = 0; v < item.value.length; v++) {
        budget += Number(item.value[v])
      }
    }
    else if (item.categoryId == 2) {
      for (let v = 0; v < item.value.length; v++) {
        budget -= Number(item.value[v])
      }
    }
  }

  state.budget = budget
  saveState()
  renderBudget(state)

  return state.budget
}

function addCategory(categoryId) {
  let id = state.categories.length

  const inputId = `add-${cat(categoryId)}-category-name`
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

  state.categories.push(obj)

  renderCategory(categoryId)
  renderRadio(categoryId)
  saveState()
}

function addCategoryValue(categoryId) {
  const inputId = `add-${cat(categoryId)}-value`
  const radioName = `${cat(categoryId)}`
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

  state.categories[checkedId].value.push(value)

  let date = new Date()
  state.categories[checkedId].date.push(date)
  
  renderCategory(categoryId)
  renderDiagramm(categoryId)
  getBudget(state)
  saveState()

  console.log(state)
}

function renderPage(categoryId) {
  const categoryType = `${cat(categoryId)}`
  const $mainWrapper = document.getElementById("main")
  $mainWrapper.innerHTML = ""
  $mainWrapper.insertAdjacentHTML("beforeend", tab(categoryType))

  state.userChoises.categoryId = categoryId
  saveState()

  document.getElementById(`add-${categoryType}`).addEventListener('click', () => addCategoryValue(categoryId))
  document.getElementById(`add-${categoryType}-category`).addEventListener('click', () => addCategory(categoryId))
  document.getElementById(`reset`).addEventListener('click', () => resetState())
  
  const catChooser = document.querySelector('.big-category-chooser').children
  for (let i=0; i < catChooser.length; i ++) {
    if (catChooser[i].id == `${categoryType}-chooser`) {
      catChooser[i].classList.add('choosed')
    } else {
      if (catChooser[i].classList.contains('choosed')){
        catChooser[i].classList.remove('choosed')
      }
    }
  }
  renderRadio(categoryId)
  renderCategory(categoryId)
  renderBudget(state)
  renderDiagramm(categoryId)

}

function renderDiagramm(categoryId) {
  const labels = state.categories.filter(item => {
    return item.categoryId == categoryId
  }).map(item => {
    return item.categoryName
  })
  
  const series = []
  for (let i = 0; i < state.categories.length; i++) {
    if (state.categories[i].categoryId == categoryId) {
      let sum = 0
      for (let j = 0; j < state.categories[i].value.length; j++) {
        sum += Number(state.categories[i].value[j])
      }
      series.push(sum)
    }
  }
  
  const data = {
    labels,
    series,
  };

  const options = {
    width: 500,
    height: 300,
  };
  
  const responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 80,
      chartPadding: 20
    }]
  ];
  
  new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
}

function renderRadio(categoryId) {
  const radioName = `${cat(categoryId)}`
  const inputId = `${cat(categoryId)}-radios`
  const $radios = document.getElementById(inputId)
  $radios.innerHTML = ''
  for (let i = 0; i < state.categories.length; i ++) {
    if (state.categories[i].categoryId == categoryId) {
      let {id, categoryName} = state.categories[i]
      $radios.insertAdjacentHTML("beforeend", radio(id, categoryName, radioName))
  }}
}

function renderCategory(categoryId) {
  const radioName = `${cat(categoryId)}`
  const categoriesListId = `categories-${cat(categoryId)}-list`
  const $categoriesList = document.getElementById(categoriesListId);
  $categoriesList.innerHTML = ''
  
  for (let i = 0; i < state.categories.length; i ++) {
    if (state.categories[i].categoryId == categoryId) {
      let {id, categoryName, value} = state.categories[i]
      let valueSum = 0
      for (let j = 0; j < value.length; j ++) {
        valueSum += Number(value[j])
      }
      $categoriesList.insertAdjacentHTML("beforeend", category(id, categoryName, valueSum))
  }}
  
}

function renderBudget(state) {
  const $budgetValue = document.getElementById("budget-value")
  $budgetValue.innerHTML = state.budget
}


//View
let catId = state.userChoises.categoryId
if (state.userChoises.userName == "demo") {
  document.getElementById("main").innerHTML = requireLogIn()
} else {
  renderPage(catId)
}


const burger = document.getElementById("burger")
burger.addEventListener("click", (event) => {
  document.getElementById("burger-menu").classList.toggle("invisible")
})

console.log(state.userChoises.userName)

