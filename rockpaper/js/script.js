const stoneBtn = document.getElementById("stone");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const playerResult = document.getElementById("player");
const computerResult = document.getElementById("computer");
const result = document.getElementById("result");

stoneBtn.addEventListener("click", () => {
    const playerChoice = "STONE";
    const computerChocice = getComputerMove();
    let result = calculateResult(playerChoice, computerChocice);
    printResult(playerChoice, computerChocice, result);
});
paperBtn.addEventListener("click", () => {
    const playerChoice = "PAPER";
    const computerChocice = getComputerMove();
    let result = calculateResult(playerChoice, computerChocice);
    printResult(playerChoice, computerChocice, result);
});
scissorsBtn.addEventListener("click", () => {
    const playerChoice = "SCISSORS";
    const computerChocice = getComputerMove();
    let result = calculateResult(playerChoice, computerChocice);
    printResult(playerChoice, computerChocice, result);
});

function printResult(playerChoice, computerChoice, message) {
    playerResult.textContent=`Player: ${playerChoice}`;
    computerResult.textContent=`Computer: ${computerChoice}`;
    result.textContent=`result: ${message}`;
}   