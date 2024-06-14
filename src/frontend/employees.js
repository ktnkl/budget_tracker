import { adminButton, salaryRules, salaryBody, theadAdminEmployees, trAdminEmployees } from "./templates.js"
let sidebarChoosen = document.getElementById("employees-list")

document.getElementById("user").innerHTML = state.userChoises.userName

const $userButton = document.getElementById("user")
const $buttonsList = document.getElementById("buttons-list")
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
renderEmployeesList()

