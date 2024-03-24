import { authError } from "./templates.js"

const defaultUsers = {
  admin: "adminpassword",
  user: "userpassword",
  demo: "demo"
}

const userNames = []
for (let userName in defaultUsers) {
  userNames.push(userName)
}


let savedUsers = localStorage.getItem('users')

let users = savedUsers ? JSON.parse(savedUsers) : defaultUsers



document.getElementById("button").addEventListener('click', () => {
  checkUser()
})

function checkUser() {
  let login = document.getElementById("login").value
  let password = document.getElementById("password").value

  for (let user in users) {
    if (login == user) {
      if (password == users[user]) {
        giveAccess(login)
        break
      } else {
        renderError("password")
        break
      }
    } else {renderError("login")}
  }
}

function giveAccess(login) {
  let savedState = localStorage.getItem('state')
  let state = savedState ? JSON.parse(savedState) : defaultState
  state.userChoises.userName = login
  localStorage.setItem('state', JSON.stringify(state))

  window.location.href = "index.html"

}

function renderError(cause) {
  document.getElementById("auth").insertAdjacentHTML("afterend", authError)
  const $errorField = document.getElementById("error")
  let message = ''
  switch (cause) {
    case "login":
      message = "Нет такого пользователя"
      break
    case "password":
      message = "Неверный пароль"
      break
    default:
      message = "something went wrong"
      break
  }
  $errorField.innerHTML = message
}

