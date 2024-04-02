const jokeDiv = document.querySelector(".joke");
const generateJoke = document.querySelector("#generate");

const xhr = new XMLHttpRequest();

function getJoke() {
  xhr.open("GET", "https://api.chucknorris.io/jokes/random");
  xhr.send();
}

xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const joke = JSON.parse(this.responseText);
      jokeDiv.textContent = joke.value;
    }
  };

generateJoke.addEventListener("click", getJoke);
document.addEventListener('DOMContentLoaded', getJoke);
