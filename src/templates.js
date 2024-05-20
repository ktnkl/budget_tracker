function adminButton() {
  return `
    <li><a href="./admin.html" id="admBtn" class="nav-link px-2">Администрирование</a></li>
    `
}

function tab(categoryType) {
  return `
    <article id="${categoryType}" class="${categoryType}">
      <section class="${categoryType}-form" id="${categoryType}-form" name="${categoryType}">
      <input type="number" id="add-${categoryType}-value">
      <button class="${categoryType}-form__add" id="add-${categoryType}" >Добавить значение</button>
      <section class="radios" id="${categoryType}-radios">
      </section>
      </section>
      <input type="text" placeholder="Введите название..." id="add-${categoryType}-category-name">
      <button class="${categoryType}__add" id="add-${categoryType}-category">Добавить категорию
      </button>
      <button class="${categoryType}__reset" id="reset">Сбросить состояние</button>
      <section class="categories" id="categories-${categoryType}-list">
      </section>
    </article>

    <section class="ct-chart" id="diagram">
    
    </section>
    
  `
}

function category(id, categoryName, valueSum) {
  return `
    <div class="${id} categories-item">
      <p class="categories-item__key">${categoryName}</p>
      <p class="categories-item__value">${valueSum}</p>
    </div>`
}

function radio(id, categoryName, radioName) {
  return `
    <input type="radio" value="${radioName}Radio${id}" name="${radioName}"  class="${id}">
    <label for="${radioName}Radio${id}">${categoryName}</label>
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

function trJournal(dealNumber, employeeName, contragent, description, date) {
  return `
  <tr>
    <th scope="col">${dealNumber}</th>
    <th scope="col">${employeeName}</th>
    <th scope="col">${contragent}</th>
    <th scope="col">${description}</th>
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
    </tr>
  </thead>
  <tbody id="table">

  </tbody>
  `
}

function trAdminEmployees(id, f, i, o, birth, position) {
  return `
  <tr id="${id}">
  <th scope="col">${f}</th>
  <th scope="col">${i}</th>
  <th scope="col">${o}</th>
  <th scope="col">${birth}</th>
  <th scope="col">${position}</th>
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
  `
}


export {tab, category, radio, requireLogIn, authError, loginButton, loginStatus, adminButton, trJournal, theadAdminEmployees, trAdminEmployees, buttonsAdminEmployees, addingEmployeeForm, addingEmployeeFormOnlyInputs, dropdownMainEmployees}