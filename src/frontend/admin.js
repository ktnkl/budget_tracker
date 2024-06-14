import { theadAdminEmployees, trAdminEmployees, buttonsAdminEmployees, addingEmployeeForm,addingEmployeeFormOnlyInputs, periodStartTamplate, canvas, salaryRules} from "./templates.js"
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
  //получение списка сотрудников и 
  fetch('~/src/backend/sotrudnik').then((response) => {
    if (!response.ok) {
      throw new Error('error')
    }
    const allEmployees = response.json()
    for (let i = 0; i < allEmployees.length; i ++) {
      let {f, i, o, birth, position, salary} = allEmployees[i]
      document.getElementById("table").insertAdjacentHTML('beforeend', trAdminEmployees(f, i, o, birth, position, salary))
    }})
  }
function renderZPWindow() {
  $main.innerHTML = ''
  $main.insertAdjacentElement("afterbegin", salaryRules)
  percent = document.getElementById("percent").value
  document.getElementById("done").addEventListener('click')
  fetch('/zp', {method: 'post', body: JSON.stringify(percent)})
}


//загружает окно отчетов
function renderReportingWindow() {
  let dataObject 
  let reportType
  $main.innerHTML = ""
  $main.insertAdjacentHTML("afterbegin", periodStartTamplate())
  let addPeriod = document.getElementById("addPeriod")
  addPeriod.addEventListener("click", () => {
  period = document.getElementById("period").value
  })
  document.getElementById("type").addEventListener("click", (event) => {
    if (event.target.id == "obschiy") {
      fetch('~/src/backend/obschiy').then((response) => {
        reportType = 'line'
        dataObject =  response
      })
    }
    if (event.target.id == "poCategoriam") {
      fetch('~/src/backend/cat').then((response) => {
        reportType = 'line'
        dataObject =  response
      })
    }
    if (event.target.id == "eff") {
      fetch('~/src/backend/eff').then((response) => {
        reportType = 'bar'
        dataObject =  response
      })
    }
  })
  $main.insertAdjacentHTML("beforeend", canvas())

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
document.getElementById("zp").addEventListener("click", renderZPWindow)

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
  let telefon = document.getElementById("telefon").value
  let obr = document.getElementById("obr").value
  let position = document.getElementById("position").value
  let salary = document.getElementById("salary").value
  let newEmployee = {
    f,
    i,
    o,
    birth,
    telefon,
    obr,
    position,
    salary
  }
  let selectedRow = document.getElementById('f').parentNode.parentNode.id
  if (selectedRow == '') {
    employees.push(newEmployee)
    fetch('/sotrudnik', {
      method: 'post',
      body: JSON.stringify(newEmployee)
    })
  } else {
    fetch('/sotrudnik', {
      method: 'put',
      body: JSON.stringify(newEmployee)
    })
  }
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



