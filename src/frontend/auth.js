document.getElementById("button").addEventListener('click', () => {
  checkUser()
})
function checkUser() {
  let login = document.getElementById("login").value
  let password = document.getElementById("password").value
  fetch('../backend/login', {
    username: login,
    password: password
})}
