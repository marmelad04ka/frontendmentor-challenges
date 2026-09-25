import { successScreenContainerDom } from "../constants/dom-elements.js";

export function normalizedCardNumber(str) {
  const strWithoutSpace = str.replaceAll(" ", "");
  let result = [];

  for (let i = 0; i < strWithoutSpace.length; i++) {
    const element = strWithoutSpace[i];
    if ((i + 1) % 4 === 0 && i !== strWithoutSpace.length - 1) {
      result.push(element);
      result.push(" ");
      continue;
    }
    result.push(element);
  }
  return result.join("");
}

export function prohibitionOnInsertion(elementList) {
  for (let i = 0; i < elementList.length; i++) {
    const element = elementList[i];

    element.addEventListener("paste", function (event) {
      event.preventDefault();
    });
  }
}

export function getMinimumDate() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear() % 100;

  let result = [0, 0];

  if (month === 12) {
    result[0] = 1;
    result[1] = (year + 1) % 100;
    return result;
  }
  result[0] = month + 1;
  result[1] = year;
  return result;
}

export function setCardItemPreview({
  inputValue,
  input,
  cardElement,
  defaultValue,
}) {
  if (inputValue !== "") {
    return input;
  } else {
    return defaultValue;
  }
}

export function removeError({ errorLabel, errorInput }) {
  for (let i = 0; i < errorInput.length; i++) {
    const element = errorInput[i];
    element.classList.remove("error-input");
  }
  errorLabel.textContent = "";
  errorLabel.classList.add("hidden");
}

export function setErrorState({ errorText, inputList, errorLabel }) {
  for (let i = 0; i < inputList.length; i++) {
    const element = inputList[i];
    element.classList.add("error-input");
  }
  errorLabel.textContent = errorText;
  errorLabel.classList.remove("hidden");
}

export function showSuccessScreen() {
  successScreenContainerDom.classList.remove("hidden");
  successScreenContainerDom.querySelector("#success-title").focus();
}
