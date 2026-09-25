import {
  inputCardholderNameDom,
  cardholderNameDom,
  inputCardNumberDom,
  cardNumberDom,
  inputDateMonthDom,
  dateMonthDom,
  inputDateYearDom,
  dateYearDom,
  inputCvcCodeDom,
  cvcCodeDom,
  errorCardholderNameDom,
  errorCardNumberDom,
  errorDateInputDom,
  errorCvcCodeDom,
} from "../constants/dom-elements.js";
import {
  normalizedCardNumber,
  prohibitionOnInsertion,
  getMinimumDate,
  setCardItemPreview,
  removeError,
  setErrorState,
} from "../utils/utils.js";

export function initInputs() {
  initCardholderNameInput();
  initCardNumberInput();
  initDateMonthInput();
  initDateYearInput();
  initCvcCodeInput();
  prohibitionOnInsertion([
    inputCardholderNameDom,
    inputCardNumberDom,
    inputDateMonthDom,
    inputDateYearDom,
    inputCvcCodeDom,
  ]);
}

function initCardholderNameInput() {
  inputCardholderNameDom.addEventListener("input", () => {
    let inputValue = inputCardholderNameDom.value;
    const lastElement = inputValue[inputValue.length - 1];
    let spaceCount = inputValue.split(" ").length - 1;

    removeError({
      errorLabel: errorCardholderNameDom,
      errorInput: [inputCardholderNameDom],
    });

    if (inputValue[0] === " ") {
      inputCardholderNameDom.value = "";
      return;
    }

    if (lastElement === " ") {
      spaceCount++;
    }

    const isLetter = (char) => /^[a-zA-Z ]$/.test(char);

    if (!isLetter(lastElement) || spaceCount > 2) {
      inputCardholderNameDom.value = inputValue.slice(0, -1);
      inputValue = inputCardholderNameDom.value;
    }

    cardholderNameDom.textContent = setCardItemPreview({
      inputValue: inputValue,
      input: inputCardholderNameDom.value,
      cardElement: cardholderNameDom.textContent,
      defaultValue: "Jane Appleseed",
    });
  });

  inputCardholderNameDom.addEventListener("blur", () => {
    if (inputCardholderNameDom.value.length === 1) {
      setErrorState({
        errorText: "Incorrect length",
        inputList: [inputCardholderNameDom],
        errorLabel: errorCardholderNameDom,
      });
    }
  });
}

function initCardNumberInput() {
  inputCardNumberDom.addEventListener("input", () => {
    let inputValue = inputCardNumberDom.value;
    const lastElement = inputValue[inputValue.length - 1];

    removeError({
      errorLabel: errorCardNumberDom,
      errorInput: [inputCardNumberDom],
    });

    const isNumber = (char) => /^[0-9]$/.test(char);

    if (!isNumber(lastElement)) {
      inputCardNumberDom.value = inputValue.slice(0, -1);
      inputValue = inputCardNumberDom.value;
    }

    inputCardNumberDom.value = normalizedCardNumber(inputValue);

    cardNumberDom.textContent = setCardItemPreview({
      inputValue: inputValue,
      input: inputCardNumberDom.value,
      cardElement: cardNumberDom.textContent,
      defaultValue: "0000 0000 0000 0000",
    });
  });

  inputCardNumberDom.addEventListener("blur", () => {
    if (
      inputCardNumberDom.value.length > 0 &&
      inputCardNumberDom.value.length < 19
    ) {
      setErrorState({
        errorText: "Incorrect length",
        inputList: [inputCardNumberDom],
        errorLabel: errorCardNumberDom,
      });
    }
  });
}

function initDateMonthInput() {
  inputDateMonthDom.addEventListener("input", () => {
    let inputValue = inputDateMonthDom.value;
    const lastElement = inputValue[inputValue.length - 1];

    if (inputValue.length === 0) {
      removeError({
        errorLabel: errorDateInputDom,
        errorInput: [inputDateMonthDom, inputDateYearDom],
      });
      return;
    }

    const isNumber = (char) => /^[0-9]$/.test(char);

    if (!isNumber(lastElement)) {
      inputDateMonthDom.value = inputValue.slice(0, -1);
      inputValue = inputDateMonthDom.value;
    }

    if (inputValue > 12) {
      inputDateMonthDom.value = 12;
      inputValue = inputDateMonthDom.value;
    }

    if (
      +inputDateYearDom.value === getMinimumDate()[1] &&
      inputDateMonthDom.value < getMinimumDate()[0]
    ) {
      setErrorState({
        errorText: "Incorrect date",
        inputList: [inputDateMonthDom, inputDateYearDom],
        errorLabel: errorDateInputDom,
      });
    } else {
      removeError({
        errorLabel: errorDateInputDom,
        errorInput: [inputDateMonthDom, inputDateYearDom],
      });
    }

    dateMonthDom.textContent = setCardItemPreview({
      inputValue: inputValue,
      input: inputDateMonthDom.value,
      cardElement: dateMonthDom.textContent,
      defaultValue: "00",
    });
  });

  inputDateMonthDom.addEventListener("blur", () => {
    let inputValue = inputDateMonthDom.value;

    if (inputValue.length === 1 && inputValue !== 0) {
      inputDateMonthDom.value = "0" + inputValue;
    }

    if (inputValue.length === 1 && inputValue === "0") {
      inputDateMonthDom.value = "01";
    }

    dateMonthDom.textContent = setCardItemPreview({
      inputValue: inputValue,
      input: inputDateMonthDom.value,
      cardElement: dateMonthDom.textContent,
      defaultValue: "00",
    });
  });
}

function initDateYearInput() {
  inputDateYearDom.addEventListener("input", () => {
    let inputValue = inputDateYearDom.value;
    const lastElement = inputValue[inputValue.length - 1];

    if (inputValue.length === 0) {
      removeError({
        errorLabel: errorDateInputDom,
        errorInput: [inputDateMonthDom, inputDateYearDom],
      });
      return;
    }

    const isNumber = (char) => /^[0-9]$/.test(char);

    if (!isNumber(lastElement)) {
      inputDateYearDom.value = inputValue.slice(0, -1);
      inputValue = inputDateYearDom.value;
    }

    if (+`${inputValue[0]}${inputValue[1]}` < getMinimumDate()[1]) {
      inputDateYearDom.value = getMinimumDate()[1];
    }

    if (
      +inputDateYearDom.value === getMinimumDate()[1] &&
      +inputDateMonthDom.value < getMinimumDate()[0]
    ) {
      setErrorState({
        errorText: "Incorrect date",
        inputList: [inputDateMonthDom, inputDateYearDom],
        errorLabel: errorDateInputDom,
      });
    } else {
      removeError({
        errorLabel: errorDateInputDom,
        errorInput: [inputDateMonthDom, inputDateYearDom],
      });
    }

    dateYearDom.textContent = setCardItemPreview({
      inputValue: inputValue,
      input: inputDateYearDom.value,
      cardElement: dateYearDom.textContent,
      defaultValue: "00",
    });
  });

  inputDateYearDom.addEventListener("blur", () => {
    let inputValue = inputDateYearDom.value;

    if (+inputValue < getMinimumDate()[1] && inputValue != "") {
      inputDateYearDom.value = getMinimumDate()[1];
    }

    if (
      +inputDateYearDom.value === getMinimumDate()[1] &&
      +inputDateMonthDom.value < getMinimumDate()[0]
    ) {
      setErrorState({
        errorText: "Incorrect date",
        inputList: [inputDateMonthDom, inputDateYearDom],
        errorLabel: errorDateInputDom,
      });
    } else {
      removeError({
        errorLabel: errorDateInputDom,
        errorInput: [inputDateMonthDom, inputDateYearDom],
      });
    }

    dateYearDom.textContent = setCardItemPreview({
      inputValue: inputValue,
      input: inputDateYearDom.value,
      cardElement: dateYearDom.textContent,
      defaultValue: "00",
    });
  });
}

function initCvcCodeInput() {
  inputCvcCodeDom.addEventListener("input", () => {
    let inputValue = inputCvcCodeDom.value;
    const lastElement = inputValue[inputValue.length - 1];

    removeError({ errorLabel: errorCvcCodeDom, errorInput: [inputCvcCodeDom] });

    const isNumber = (char) => /^[0-9]$/.test(char);

    if (!isNumber(lastElement)) {
      inputCvcCodeDom.value = inputValue.slice(0, -1);
      inputValue = inputCvcCodeDom.value;
    }

    cvcCodeDom.textContent = setCardItemPreview({
      inputValue: inputValue,
      input: inputCvcCodeDom.value,
      cardElement: cvcCodeDom.textContent,
      defaultValue: "000",
    });
  });

  inputCvcCodeDom.addEventListener("blur", () => {
    if (inputCvcCodeDom.value.length > 0 && inputCvcCodeDom.value.length < 3) {
      setErrorState({
        errorText: "Incorrect length",
        inputList: [inputCvcCodeDom],
        errorLabel: errorCvcCodeDom,
      });
    }
  });
}
