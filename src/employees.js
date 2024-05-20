import { adminButton, theadAdminEmployees, trAdminEmployees } from "./templates.js"

let state = JSON.parse(localStorage.getItem('state'))

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

document.getElementById("user").innerHTML = state.userChoises.userName

const $userButton = document.getElementById("user")
const $buttonsList = document.getElementById("buttons-list")

$userButton.innerHTML = state.userChoises.userName

if (state.userChoises.userName == 'admin') {
  $buttonsList.innerHTML += adminButton()
}

document.getElementById("main").insertAdjacentHTML("afterbegin", theadAdminEmployees())
employees.map(item => {
  let {f, i, o, birth, position} = item
  document.getElementById("table").insertAdjacentHTML('beforeend', trAdminEmployees(f, i, o, birth, position))
}
)