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

import {requireLogIn, loginButton, adminButton, dropdownMainEmployees} from "./templates.js"


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

let defaultDeals = []
let savedDeals = localStorage.getItem('deals')
let deals = savedDeals ? JSON.parse(savedDeals) : defaultDeals

const defaultEmployees = [
  {
    f: 'Иванов',
    i: 'Алексей',
    o: 'Викторович',
    birth: '23.02.2003',
    position: 'кассир'
  }
]
let savedEmployees = localStorage.getItem('employees')
let employees = savedEmployees ? JSON.parse(savedEmployees) : defaultEmployees

function save(object) {
  localStorage.setItem(object, JSON.stringify(object))
}

let resetState = () => {
  state = defaultState
  localStorage.clear()
  location.reload()
}

let saveState = () => {
  localStorage.setItem('state', JSON.stringify(state))
}
// Presenter

// сбор данных из формы
document.getElementById("submit").addEventListener("click", () => {
  let $dealNumber = document.getElementById("deal-number")
  let $employeeName = document.getElementById("employee-name")
  let $contragent = document.getElementById("contragent")
  let $description = document.getElementById("description")
  let $date = document.getElementById("date")

  let newDeal = {
    dealNumber: $dealNumber.value,
    employeeName: $employeeName.innerHTML,
    contragent: $contragent.value,
    description: $description.value,
    date: $date.value,
  }

  deals.push(newDeal)
  localStorage.setItem('deals', JSON.stringify(deals))

  $dealNumber.value = ""
  $employeeName.innerHTML = "Сотрудник"
  $contragent.value = ""
  $description.value = ""
  $date.value = ""
})





//View
let lastActive = null

const $logout = document.getElementById("log-status")
const $userButton = document.getElementById("user")

// перенести потом это все в рендер

if (state.userChoises.userName == "demo") {
  $logout.innerHTML = "Войти"
  $userButton.style.display = "none"
  document.getElementById("main").innerHTML = requireLogIn()
  document.getElementById("login-status").innerHTML = loginButton()
} else {
  if (state.userChoises.userName == 'admin') {
    document.getElementById("buttons-list").innerHTML += adminButton()
  }
  $logout.innerHTML = "Выйти"
  $userButton.innerHTML = state.userChoises.userName
  
}


// const burger = document.getElementById("burger")
// burger.addEventListener("click", (event) => {
//   document.getElementById("burger-menu").classList.toggle("invisible")
// })

$logout.addEventListener("click", () => {
  state.userChoises.userName = "demo"
  saveState()
  window.location.href = "auth.html"
})

document.getElementById("admBtn").addEventListener("click", () => {
  window.location.href = "./admin.html"
})

let $dropdown = document.getElementById('dropdown')
employees.map(item => {
  let name = item.f + ' ' + item.i + ' ' + item.o
  $dropdown.insertAdjacentHTML('beforeend', dropdownMainEmployees(name))
})

document.getElementById("dropdown").addEventListener("click", (event) => {
  if (lastActive) {
    lastActive.classList.remove("active")
    event.target.classList.add("active")
    lastActive = event.target
  } else {
    lastActive = event.target
    lastActive.classList.add("active")
  }
  
  document.getElementById("employee-name").innerHTML = lastActive.innerHTML
})
