const STONE = "STONE";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";

function getComputerMove() {
  const random = Math.random();

  return random < 0.35 ? STONE : random < 0.68 ? PAPER : SCISSORS;
}

function calculateResult(pChoice, cChoice) {
  if (pChoice === cChoice) return "Draw";

  if (pChoice === STONE) {
    return cChoice === PAPER ? "Computer wins" : "Player wins";
  } else if (pChoice === PAPER) {
    return cChoice === SCISSORS ? "Computer wins" : "Player wins";
  } else {
    return cChoice === STONE ? "Computer wins" : "Player wins";
  }
}
