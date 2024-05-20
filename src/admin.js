import { theadAdminEmployees, trAdminEmployees, buttonsAdminEmployees, addingEmployeeForm,addingEmployeeFormOnlyInputs } from "./templates.js"

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

let state = JSON.parse(localStorage.getItem('state'))

let saveState = () => {
  localStorage.setItem('state', JSON.stringify(state))
}
let saveEmployees = () => {
  localStorage.setItem('employees', JSON.stringify(employees))
}
 // хранит ссылку на выбранную строку таблицы сотрудников
let lastActive = null


const $userButton = document.getElementById("user")
$userButton.innerHTML = state.userChoises.userName


function renderEmployeesWindow() {
  document.getElementById("main").insertAdjacentHTML('afterbegin', theadAdminEmployees())
  document.getElementById('main').insertAdjacentHTML('beforeend', buttonsAdminEmployees())

  employees.map((item, index) => {
    let {f, i, o, birth, position} = item
    let id = index
    document.getElementById("table").insertAdjacentHTML('beforeend', trAdminEmployees(id, f, i, o, birth, position))

  })
}

renderEmployeesWindow()

document.getElementById("add").addEventListener("click", () => {
  document.getElementById("table").insertAdjacentHTML("beforeend", addingEmployeeForm())
})

document.getElementById("save").addEventListener("click", () => {
  let f = document.getElementById("f").value
  let i = document.getElementById("i").value
  let o = document.getElementById("o").value
  let birth = document.getElementById("birth").value
  let position = document.getElementById("position").value

  let newEmployee = {
    f,
    i,
    o,
    birth,
    position
  }
  let selectedRow = document.getElementById('f').parentNode.parentNode.id
  if (selectedRow == '') {
    employees.push(newEmployee)
    console.log('case push')
  } else {
    employees.splice(selectedRow, 1, newEmployee)
    console.log("case splice")
  }
  
  saveEmployees()
  window.location.reload()
})

//подсветка выбранной стоки таблицы, переменная хранит
//ссылку на последнюю нажатую строку, чтобы не проверять всю табл.
document.getElementById("table").addEventListener("click", (event) => {
  if (lastActive) {
    lastActive.classList.remove("table-active")
    event.target.parentNode.classList.add("table-active")
    lastActive = event.target.parentNode
  } else {
    lastActive = event.target.parentNode
    lastActive.classList.add("table-active")
  }
  
})


document.getElementById("change").addEventListener("click", () => {
  let selectedRow = document.querySelector(".table-active").id
  document.getElementById(selectedRow).innerHTML = addingEmployeeFormOnlyInputs()
  let {f,i, o, birth, position} = employees[selectedRow]
  document.getElementById("f").value = f
  document.getElementById("i").value = i
  document.getElementById("o").value = o
  document.getElementById("birth").value = birth
  document.getElementById("position").value = position


})

document.getElementById("delete").addEventListener("click", () => {
  let selectedRow = document.querySelector(".table-active").id
  employees.splice(selectedRow, 1)
  saveEmployees()
  location.reload()
  renderEmployeesWindow()
})

console.log(employees)