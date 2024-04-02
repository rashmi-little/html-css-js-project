let currentResult = 0;

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiplication);
divideBtn.addEventListener('click', division);

function add() {
    if(userInput.value != "") {
        currentResult = currentResult + Number.parseInt(userInput.value);
        outputResult(currentResult, "Current result value is " + currentResult);
        userInput.value = "";
    }   
}
function subtract() {
    if(userInput.value != "") {
        currentResult = currentResult - Number.parseInt(userInput.value);
        outputResult(currentResult, "Current result value is " + currentResult);
        userInput.value = "";
    }   
}
function multiplication() {
    if(userInput.value != "") {
        currentResult = currentResult * Number.parseInt(userInput.value);
        outputResult(currentResult, "Current result value is " + currentResult);
        userInput.value = "";
    }   
}
function division() {
    if(userInput.value != "") {
        currentResult = currentResult / Number.parseInt(userInput.value);
        outputResult(currentResult, "Current result value is " + currentResult);
        userInput.value = "";
    }   
}



