import { theadAdminEmployees, trAdminEmployees, buttonsAdminEmployees, addingEmployeeForm,addingEmployeeFormOnlyInputs, periodStartTamplate, periodEndTemplate } from "./templates.js"

const defaultReporting = {
  periodStart: 0,
  end: false,
}
let savedReporting = localStorage.getItem("reporting")
let reporting = savedReporting ? JSON.parse(savedReporting) : defaultReporting
function saveReporting() {
  localStorage.setItem("reporting", JSON.stringify(reporting))
}

const defaultEmployees = [
  {
    f: 'Иванов',
    i: 'Алексей',
    o: 'Викторович',
    birth: '23.02.2003',
    position: 'кассир',
    salary: 25000,
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

const $main = document.getElementById("main")

 // хранит ссылку на выбранную строку таблицы сотрудников
let lastActive = null
let sidebarChoosen = document.getElementById("employees")


const $userButton = document.getElementById("user")
$userButton.innerHTML = state.userChoises.userName


function renderEmployeesWindow() {
  $main.innerHTML = ""
  $main.insertAdjacentHTML('afterbegin', theadAdminEmployees())
  $main.insertAdjacentHTML('beforeend', buttonsAdminEmployees())

  employees.map((item, index) => {
    let {f, i, o, birth, position, salary} = item
    let id = index
    document.getElementById("table").insertAdjacentHTML('beforeend', trAdminEmployees(id, f, i, o, birth, position, salary))

  })
}

function renderReportingWindow() {
  if (reporting.periodStart == 0){
    $main.innerHTML = ""
    $main.insertAdjacentHTML("afterbegin", periodStartTamplate())
    
    try {
      let addPeriod = document.getElementById("addPeriod")
      addPeriod.addEventListener("click", () => {
        reporting.periodStart = document.getElementById("period").value
        saveReporting()
        window.location.reload()
    })
  } catch(err) {
    console.log(err)
  }
  } else {
    $main.innerHTML = periodEndTemplate(reporting.periodStart)
    document.getElementById("endPeriod").addEventListener("click", () => {
      reporting.end = true
      saveReporting()
    }) 
    
  }
}

function renderDealsWindow() {
  $main.innerHTML = ""
  $main.innerHTML = "deals"
}

renderEmployeesWindow() 


//функционал сайдбара
document.getElementById("sidebar").addEventListener("click", (event) => {
  sidebarChoosen.classList.remove("active")
  sidebarChoosen = event.target
  sidebarChoosen.classList.add("active")
})
document.getElementById("employees").addEventListener("click", renderEmployeesWindow)
document.getElementById("reporting").addEventListener("click", renderReportingWindow)
document.getElementById("deals").addEventListener("click", renderDealsWindow)

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

//функционал кнопок вкладки сотрудники
document.getElementById("save").addEventListener("click", () => {
  let f = document.getElementById("f").value
  let i = document.getElementById("i").value
  let o = document.getElementById("o").value
  let birth = document.getElementById("birth").value
  let position = document.getElementById("position").value
  let salary = document.getElementById("salary").value

  let newEmployee = {
    f,
    i,
    o,
    birth,
    position,
    salary
  }
  let selectedRow = document.getElementById('f').parentNode.parentNode.id
  if (selectedRow == '') {
    employees.push(newEmployee)
  } else {
    employees.splice(selectedRow, 1, newEmployee)
  }
  saveEmployees()
  window.location.reload()
})

document.getElementById("add").addEventListener("click", () => {
  document.getElementById("table").insertAdjacentHTML("beforeend", addingEmployeeForm())
})

document.getElementById("change").addEventListener("click", () => {
  let selectedRow = document.querySelector(".table-active").id
  document.getElementById(selectedRow).innerHTML = addingEmployeeFormOnlyInputs()
  let {f,i, o, birth, position, salary} = employees[selectedRow]
  document.getElementById("f").value = f
  document.getElementById("i").value = i
  document.getElementById("o").value = o
  document.getElementById("birth").value = birth
  document.getElementById("position").value = position
  document.getElementById("salary").value = salary
})

document.getElementById("delete").addEventListener("click", () => {
  let selectedRow = document.querySelector(".table-active").id
  employees.splice(selectedRow, 1)
  saveEmployees()
  location.reload()
  renderEmployeesWindow()
})



