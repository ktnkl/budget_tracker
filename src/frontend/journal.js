import { adminButton, trJournal } from "./templates.js"
import { formatDate } from "./utils.js"

let state = JSON.parse(localStorage.getItem('state'))
let deals = JSON.parse(localStorage.getItem('deals'))

// deals = [{}, {}, {}]

document.getElementById("user").innerHTML = state.userChoises.userName

const $userButton = document.getElementById("user")
const $buttonsList = document.getElementById("buttons-list")

$userButton.innerHTML = state.userChoises.userName

if (state.userChoises.userName == 'admin') {
  $buttonsList.innerHTML += adminButton()
}

function renderDeals() {
  let $tbody = document.getElementById("table")
  deals.map((item) => {
    let {dealNumber, employeeName, contragent, sum, date} = item
    $tbody.insertAdjacentHTML('beforeend', trJournal(dealNumber, employeeName, contragent, sum, formatDate(date)))
  })
}

renderDeals()