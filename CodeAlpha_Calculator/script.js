const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

let currentInput = "";
let resultDisplayed = false;

function updateDisplay() {
    display.innerText = currentInput || "0";
}

function addToHistory(expression, result) {
    const li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;
    historyList.prepend(li);
}

function clearHistory() {
    historyList.innerHTML = "";
}

function handleInput(value) {
    if (value === "C") {
        currentInput = "";
    }
    else if (value === "⌫") {
        currentInput = currentInput.slice(0, -1);
    }
    else if (value === "=") {
        try {
            const expression = currentInput;
            const result = eval(expression);
            currentInput = result.toString();
            addToHistory(expression, result);
            resultDisplayed = true;
        } catch {
            currentInput = "Error";
        }
    }
    else {
        if (resultDisplayed && !isNaN(value)) {
            currentInput = value;
            resultDisplayed = false;
        } else {
            currentInput += value;
        }
    }
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.dataset.value);
    });
});

clearHistoryBtn.addEventListener("click", clearHistory);

document.addEventListener("keydown", (e) => {
    if(!isNaN(e.key) || ["+","-","*","/","."].includes(e.key)){
        handleInput(e.key);
    }
    if(e.key === "Enter") handleInput("=");
    if(e.key === "Backspace") handleInput("⌫");
    if(e.key === "Escape") handleInput("C");
});