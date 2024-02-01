function getSum() {
  let sum = 0;
  let elements = document.querySelectorAll('.outcome .categories-item__value')
  elements.forEach((Element) => {
    console.log(Element.innerHTML)
    sum = sum + Number(Element.innerHTML)
  })
  document.getElementById('sum').innerHTML = sum

}

const stylesheet = document.styleSheets[0];
const newRule = [...stylesheet.cssRules].find(
  (r) => r.selectorText === ".outcome",
);
newRule.style.setProperty('--food', 'orangered')

newRule.style.setProperty('--transport', 'blue')
getSum()

let sum = document.getElementById('sum').innerHTML
console.log(sum)
let foodPercent = document.querySelector('#food .categories-item__value').innerHTML * 360 / sum;
let transportPercent = document.querySelector('#transport .categories-item__value').innerHTML * 360 / sum;
let healthPercent = document.querySelector('#health .categories-item__value').innerHTML * 360 / sum;
let homePercent = document.querySelector('#home .categories-item__value').innerHTML * 360 / sum;

newRule.style.setProperty('--foodPercent', foodPercent + 'deg');
newRule.style.setProperty('--transportPercent', transportPercent + 'deg');
newRule.style.setProperty('--healthPercent', healthPercent + 'deg');
newRule.style.setProperty('--homePercent', homePercent + 'deg');