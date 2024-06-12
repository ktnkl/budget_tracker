function adminButton() {
  return `
    <li><a href="./admin.html" id="admBtn" class="nav-link px-2">Администрирование</a></li>
    `
}

function requireLogIn() {
  return `
    <div class="unauth"
      <h1>
        Вы не вошли в свой аккаунт.
      </h1>
      <p>
        Нажмите кнопку "Вход", чтобы авторизоваться.
      </p>
    </div>
  `
}

function authError() {
  return `
    <span class="error" id="error"></span>
  `
}

function loginButton(){
  return `
    <a class="site-header__login" href="auth.html">Вход</a>
    `
}

function loginStatus(user) {
  return `
    <p class="login-status__user">${user}</p>
    <p class="login-status__exit">
      <a href="auth.html">Выход</a>
    </p>
  `
}

function dropdownMainEmployees(name) {
  return `
    <li class="dropdown-item">${name}</li>
  `
}

function trJournal(dealNumber, employeeName, contragent, sum, date) {
  return `
  <tr>
    <th scope="col">${dealNumber}</th>
    <th scope="col">${employeeName}</th>
    <th scope="col">${contragent}</th>
    <th scope="col">${sum}</th>
    <th scope="col">${date}</th>
  </tr>
  `
}

function theadAdminEmployees() {
  return `
  <table class="table table-bordered table-hover">
  <thead>
    <tr>
      <th scope="col">Фамилия</th>
      <th scope="col">Имя</th>
      <th scope="col">Отчество</th>
      <th scope="col">Дата рождения</th>
      <th scope="col">Должность</th>
      <th scope="col">Оклад</th>
    </tr>
  </thead>
  <tbody id="table">

  </tbody>
  `
}

function trAdminEmployees(id, f, i, o, birth, position, salary) {
  return `
  <tr id="${id}">
  <th scope="col">${f}</th>
  <th scope="col">${i}</th>
  <th scope="col">${o}</th>
  <th scope="col">${birth}</th>
  <th scope="col">${position}</th>
  <th scope="col">${salary}</th>
  </tr>
  `
}

function buttonsAdminEmployees() {
  return `
  <div class="d-flex flex-row m-1">
    <button type="button" class="btn btn-primary" id="add">Добавить</button>
    <button type="button" class="btn btn-secondary" id="change">Изменить</button>
    <button type="button" class="btn btn-danger" id="delete">Удалить</button>
    <button type="button" class="btn btn-success" id="save">Сохранить</button>
  </div>
  `
}

function addingEmployeeForm() {
  return `
  <tr>
  <th scope="col"><input type="text" id="f"></th>
  <th scope="col"><input type="text" id="i"></th>
  <th scope="col"><input type="text" id="o"></th>
  <th scope="col"><input type="text" id="birth"></th>
  <th scope="col"><input type="text" id="position"></th>
  <th scope="col"><input type="number" id="salary"></th>
  </tr>
  `
}

function addingEmployeeFormOnlyInputs() {
  return `
  <th scope="col"><input type="text" id="f"></th>
  <th scope="col"><input type="text" id="i"></th>
  <th scope="col"><input type="text" id="o"></th>
  <th scope="col"><input type="text" id="birth"></th>
  <th scope="col"><input type="text" id="position"></th>
  <th scope="col"><input type="number" id="salary"></th>
  `
}

function salaryRules() {
  return `
    <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Cотрудник</th>
            <th scope="col">Оклад</th>
            <th scope="col">Премия (фикс.)</th>
            <th scope="col">Премия (%)</th>
            <th scope="col">Итого</th>
          </tr>
        </thead>
        <tbody id="table">

        </tbody>
      </table>
  `
}

function salaryBody(fullName, salary, fix, percent, all) {
  return `
    <tr scope="row">
      <th scope="col">${fullName}<th>
      <th scope="col">${salary}<th>
      <th scope="col">${fix}<th>
      <th scope="col">${percent}<th>
      <th scope="col">${all}<th>
    </tr>
  `
}

function periodStartTamplate() {
  return  `
  <div>Выберите дату начала отчетного периода (длится месяц)</div>
  <form>
    <div class="mb-3">
     <label for="period" class="form-label">Расчетный период</label>
     <input type="month" class="form-control" id="period" min="1" max="28" placeholder="1-28">
    </div>
  </form>
  <button type="button" class="btn btn-primary" id="addPeriod">Начать</button>
  `
}

function  periodEndTemplate(date) {
  return `
  <div>Отчетность ведется за  ${date}</div>
  <button type="button" class="btn btn-primary" id="endPeriod">Закрыть период</button>
  `
}

export {requireLogIn, authError, loginButton, loginStatus, adminButton, trJournal, theadAdminEmployees, trAdminEmployees, buttonsAdminEmployees, addingEmployeeForm, addingEmployeeFormOnlyInputs, dropdownMainEmployees, salaryRules, salaryBody, periodStartTamplate, periodEndTemplate}