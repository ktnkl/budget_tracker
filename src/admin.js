const defaultVars = {
  
}

let savedVars = localStorage.getItem('vars')

let vars = savedVars ? JSON.parse(savedVars) : defaultVars

let state = JSON.parse(localStorage.getItem('state'))

const $userButton = document.getElementById("user")
$userButton.innerHTML = state.userChoises.userName


