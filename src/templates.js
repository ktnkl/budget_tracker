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

export {tab, category, radio, requireLogIn, authError}