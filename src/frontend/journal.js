import { response } from "express"
import { adminButton, trJournal } from "./templates.js"
import { formatDate } from "./utils.js"
const $userButton = document.getElementById("user")
const $buttonsList = document.getElementById("buttons-list")
function renderDeals() {
  let employees
  let $tbody = document.getElementById("table")
  fetch('~/src/backend/sdelka').then((response) => {
    employees = response
  })
  for (let i=0; i < employees.length; i ++) {
    let {dealNumber, employeeName, type, category, sum, date} = employees[i]
    $tbody.insertAdjacentHTML('beforeend', trJournal(dealNumber, employeeName, contragent, sum, formatDate(date)))
  }
}
renderDeals()