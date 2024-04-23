const result = document.getElementById("result");
const copy = document.getElementById("copy");
const range = document.getElementById("scroll");
const rangeValue = document.querySelector("span");
const lowerCase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const number = document.getElementById("number");
const special = document.getElementById("special");
const generate = document.getElementById("submit");

function generatePassword() {
  if (customErrorHandler()) {
    return;
  }

  let selection = [];
  if (lowerCase.checked === true) selection.push(generateLowercase);
  if (uppercase.checked === true) selection.push(generateUppercase);
  if (number.checked === true) selection.push(generateNumber);
  if (special.checked === true) selection.push(generateSpecial);

  result.value = combinePassword(selection);
}

function combinePassword(selection) {
  let use = [...selection];
  let count = 0;
  let result = "";

  while (count != range.value) {
    if (use.length === 0) {
      use = [...selection];
    }
    const randomIndex = Math.floor((Math.random() * 100) % use.length);
    result = result.concat(use[randomIndex]());
    use.splice(randomIndex, 1);
    count++;
  }

  return result;
}

function customErrorHandler() {
  if (
    lowerCase.checked === false &&
    uppercase.checked === false &&
    special.checked === false &&
    number.checked === false
  ) {
    alert("Please select at least one option");
    return true;
  }
}

function copyResult() {
  const resultValue = result.value;
  console.log(resultValue);
  window.navigator.clipboard
    .writeText(resultValue)
    .then(() => console.log("Successfully copied to clipboard"))
    .catch(() => console.log("Error occure during copying"));
}

function generateLowercase() {
  const allowedChar = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = (Math.random() * 100) % 26;

  return allowedChar.charAt(randomIndex);
}
function generateUppercase() {
  return generateLowercase().toUpperCase();
}
function generateNumber() {
  const allowedChar = "0123456789";
  const randomIndex = (Math.random() * 100) % 10;

  return allowedChar.charAt(randomIndex);
}
function generateSpecial() {
  const allowedChar = "!@#$%";
  const randomIndex = (Math.random() * 100) % 5;

  return allowedChar.charAt(randomIndex);
}
[...document.querySelectorAll('input[type="checkbox"]'), generate].map(
  (element) => element.addEventListener("click", generatePassword)
);
range.addEventListener("change", () => (rangeValue.textContent = range.value));
copy.addEventListener("click", copyResult);
