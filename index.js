const button = document.querySelector(".calc-buttons");
const screen = document.querySelector(".screen");

let buffer = "0";
let runningTotal = 0;
let previousOperator;

const handleSymbol = (value) => {
	switch (value) {
		case "C":
			buffer = "0";
			runningTotal = 0;
			break;
		case "=":
			if (previousOperator === null) {
				return;
			}
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = +runningTotal;
			runningTotal = 0;
			break;
		case "+":
		case "-":
		case "×":
		case "÷":
			handleMath(value);
			break;
	}
};

function rerender() {
	screen.innerText = buffer;
}
const handleMath = (value) => {
	if (buffer === "0") {
		return;
	}
	const intBuffer = parseInt(buffer);
	if (runningTotal === 0) {
		runningTotal = intBuffer;
	} else {
		flushOperation(intBuffer);
	}
	previousOperator = value;
	buffer = "0";
};

const flushOperation = (intBuffer) => {
	switch (previousOperator) {
		case "+":
			runningTotal += intBuffer;
			break;
		case "-":
			runningTotal -= intBuffer;
			break;
		case "×":
			runningTotal *= intBuffer;
			break;
		case "÷":
			runningTotal /= intBuffer;
			break;
	}
};

const handleNumber = (value) => {
	if (buffer === "0") {
		buffer = value;
	} else {
		buffer += value;
	}
};

button.addEventListener("click", (event) => {
	const value = event.target.innerHTML;
	if (isNaN(value)) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	rerender();
});
