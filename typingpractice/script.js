let time = 5;
let score = 0;
let isPlaying;

const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

function init() {
  isPlaying = true;
  const promise = fetch("https://random-word-api.herokuapp.com/word");

  promise
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => {
      currentWord.textContent = data[0];
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  time = 6;
  wordInput.value = "";
}

function countDown() {
  if (currentWord.textContent !== "...") {
    if (time > 0) {
      time--;
    } else {
      isPlaying = false;
    }
    timeDisplay.textContent = time;
  }
}

function checkStatus() {
  if (!isPlaying) {
    message.textContent = "Game over!!!";
  }
}

function validateInput() {
  const systemValue = currentWord.textContent;
  const userInput = wordInput.value;

  if (systemValue === userInput) {
    if (isPlaying) {
      score++;
      scoreDisplay.textContent = score;
      message.textContent = "Correct!!!";
    } else {
      score = 0;
      scoreDisplay.textContent = score;
      message.textContent = "";
    }
    init();
  } else {
    if (isPlaying) {
      message.textContent = "";
    }
  }
}

window.addEventListener("load", init);
setInterval(countDown, 1000);
setInterval(checkStatus, 50);
wordInput.addEventListener("input", validateInput);
