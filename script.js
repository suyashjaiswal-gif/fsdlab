const prevDisplay = document.getElementById("prevDisplay");
const currDisplay = document.getElementById("currDisplay");

let current = "0";
let previous = "";
let operator = null;
let justEvaluated = false;

function updateDisplay() {
  currDisplay.textContent = current;
  prevDisplay.textContent = previous + (operator ? ` ${operator}` : "");
}

function clearAll() {
  current = "0";
  previous = "";
  operator = null;
  justEvaluated = false;
  updateDisplay();
}

function deleteOne() {
  if (justEvaluated) return; // prevent weird deletes after =
  if (current.length <= 1) current = "0";
  else current = current.slice(0, -1);
  updateDisplay();
}

function addDot() {
  if (justEvaluated) {
    current = "0";
    justEvaluated = false;
  }
  if (!current.includes(".")) current += ".";
  updateDisplay();
}

function appendNumber(num) {
  if (justEvaluated) {
    current = "0";
    previous = "";
    operator = null;
    justEvaluated = false;
  }
  if (current === "0") current = num;
  else current += num;
  updateDisplay();
}

function toNumber(str) {
  return Number(str);
}

function compute(a, op, b) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "×") return a * b;
  if (op === "÷") return b === 0 ? "Error" : a / b;
  return b;
}

function chooseOperator(op) {
  if (justEvaluated) justEvaluated = false;

  // If operator exists and user has typed a new current, compute chain
  if (operator && previous !== "" && current !== "0") {
    equals();
    operator = op;
    previous = current === "Error" ? "" : current;
    current = "0";
    updateDisplay();
    return;
  }

  // Move current into previous if previous is empty
  if (previous === "") {
    previous = current;
    current = "0";
  }
  operator = op;
  updateDisplay();
}

function equals() {
  if (!operator || previous === "") return;

  const a = toNumber(previous);
  const b = toNumber(current);

  const result = compute(a, operator, b);

  if (result === "Error") {
    current = "Error";
    previous = "";
    operator = null;
    justEvaluated = true;
    updateDisplay();
    return;
  }

  // Limit floating noise
  const fixed = Number.isInteger(result) ? String(result) : String(parseFloat(result.toFixed(10)));

  current = fixed;
  previous = "";
  operator = null;
  justEvaluated = true;
  updateDisplay();
}

document.querySelector(".keys").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const num = btn.dataset.num;
  const op = btn.dataset.op;
  const action = btn.dataset.action;

  if (num !== undefined) appendNumber(num);
  else if (op) chooseOperator(op);
  else if (action === "clear") clearAll();
  else if (action === "delete") deleteOne();
  else if (action === "dot") addDot();
  else if (action === "equals") equals();
});

document.addEventListener("keydown", (e) => {
  const k = e.key;

  if (k >= "0" && k <= "9") appendNumber(k);
  else if (k === ".") addDot();
  else if (k === "+" || k === "-") chooseOperator(k);
  else if (k === "*" ) chooseOperator("×");
  else if (k === "/" ) chooseOperator("÷");
  else if (k === "Enter" || k === "=") {
    e.preventDefault();
    equals();
  }
  else if (k === "Backspace") deleteOne();
  else if (k === "Escape") clearAll();
});

// init
updateDisplay();
