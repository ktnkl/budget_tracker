import 'jwt'
import {requireLogIn, loginButton, adminButton, dropdownMainEmployees} from "./templates.js"
// сбор данных из формы
document.getElementById("submit").addEventListener("click", (event) => {
  let $employeeName = document.getElementById("employee-name")
  let $type = document.getElementById("type")
  let $category = document.getElementById("category")
  let $sum = document.getElementById("sum")
  let $date = document.getElementById("date")
  let newDeal = {
    employeeName: $employeeName.innerHTML,
    type: $type.value,
    category: $category.value,
    sum: $sum.value,
    date: new Date($date.value),
  }
  fetch("~/src/backend/sdelka", {
    method: "POST",
    body: JSON.stringify(newDeal)})
  
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

//автонумерация сделок
document.getElementById("deal-number").value = deals.length + 1

//ограничение сделок по периоду. придумать
document.getElementById("date").min = `${reporting.periodStart}-01`
document.getElementById("date").max = getMaxDate(reporting.periodStart)

function getMaxDate(string) {
  let month = string.split("-")[1]
  if (month == "01" || 
      month == "03" || 
      month == "05" || 
      month == "07" || 
      month == "08" || 
      month == "10" || 
      month == "12"
  ) {
    return `${string}-31`
  } if (month == "02") {
    return `${string}-28`
  } else {
    return `${string}-30`
  }
}