const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-button');

// Global Vairables
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current Display value if firstValue is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current Display valiue is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;

    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}

// Function - to add the decimal to the numbner
function addDecimal() {
  // If operator pressed, dont add decimal
  if (awaitingNextValue) {
    return;
  }
  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// REset All values, Display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

// Calculate first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

// operator Function
function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign first Va;lue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log('currentValue', currentValue);
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for the next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Add Event Listeners for Number Operators, Decimal Buttons
inputBtns.forEach((btn) => {
  if (btn.classList.length === 0) {
    btn.addEventListener('click', () => sendNumberValue(btn.value));
  } else if (btn.classList.contains('operator')) {
    btn.addEventListener('click', () => useOperator(btn.value));
  } else if (btn.classList.contains('decimal')) {
    btn.addEventListener('click', () => addDecimal());
  }
});

clearBtn.addEventListener('click', () => resetAll());
