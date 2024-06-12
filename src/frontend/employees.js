import { adminButton, salaryRules, salaryBody, theadAdminEmployees, trAdminEmployees } from "./templates.js"

let state = JSON.parse(localStorage.getItem('state'))

const defaultEmployees = [
  {
    f: 'Иванов',
    i: 'Алексей',
    o: 'Викторович',
    birth: '23.02.2003',
    position: 'кассир',
    salaty: 25000,
  }
]
let savedEmployees = localStorage.getItem('employees')
let employees = savedEmployees ? JSON.parse(savedEmployees) : defaultEmployees

let sidebarChoosen = document.getElementById("employees-list")

document.getElementById("user").innerHTML = state.userChoises.userName

const $userButton = document.getElementById("user")
const $buttonsList = document.getElementById("buttons-list")

$userButton.innerHTML = state.userChoises.userName

if (state.userChoises.userName == 'admin') {
  $buttonsList.innerHTML += adminButton()
}

//функционал сайдбара
document.getElementById("sidebar").addEventListener("click", (event) => {
  sidebarChoosen.classList.remove("active")
  sidebarChoosen = event.target
  sidebarChoosen.classList.add("active")
})
document.getElementById("employees-list").addEventListener("click", renderEmployeesList)
document.getElementById("salary").addEventListener("click", renderSalary)

function renderEmployeesList() {
  document.getElementById("employees-list").classList.add("active")
  document.getElementById("salary").classList.remove("active")
  document.getElementById("main").innerHTML = ""
  document.getElementById("main").insertAdjacentHTML("afterbegin", theadAdminEmployees())
  const $table = document.getElementById("table")
  employees.map((item, index) => {
    let {f, i, o, birth, position, salary} = item
    let id = index
    $table.insertAdjacentHTML('beforeend', trAdminEmployees(id, f, i, o, birth, position, salary))
  }
  )
}

function renderSalary() {
  document.getElementById("salary").classList.add("active")
  document.getElementById("employees-list").classList.remove("active")
  document.getElementById("main").innerHTML = salaryRules()
  const $table = document.getElementById("table")

  employees.map((item) => {
    let fullName = item.f + ' ' + item.i + ' ' + item.o
    let salary = Number(item.salary)
    let fix = 0
    let percent = 0
    let all = salary + fix + percent

    $table.insertAdjacentHTML("beforeend", salaryBody(fullName, salary, fix, percent, all))
  })
  
}
renderEmployeesList()

