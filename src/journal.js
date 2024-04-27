import { adminButton } from "./templates.js"

let state = JSON.parse(localStorage.getItem('state'))

document.getElementById("user").innerHTML = state.userChoises.userName

const $userButton = document.getElementById("user")
const $buttonsList = document.getElementById("buttons-list")

$userButton.innerHTML = state.userChoises.userName

if (state.userChoises.userName == 'admin') {
  $buttonsList.innerHTML += adminButton()
}

