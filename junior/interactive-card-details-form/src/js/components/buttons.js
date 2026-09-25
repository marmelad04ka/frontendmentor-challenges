import {
  cardholderNameDom,
  cardNumberDom,
  dateMonthDom,
  dateYearDom,
  cvcCodeDom,
  confirmButtonDom,
  inputCardholderNameDom,
  errorCardholderNameDom,
  inputCardNumberDom,
  errorCardNumberDom,
  inputDateMonthDom,
  inputDateYearDom,
  errorDateInputDom,
  inputCvcCodeDom,
  errorCvcCodeDom,
  cardFormDom,
  successScreenContainerDom,
  continueButtonDom,
} from "../constants/dom-elements.js";

import { setErrorState, showSuccessScreen } from "../utils/utils.js";

export function initButtons() {
  initConfirmButton();
  initContinueButton();
}

function initConfirmButton() {
  confirmButtonDom.addEventListener("click", () => {
    let errorCount = 0;
    const inputElements = [
      inputCardholderNameDom,
      inputCardNumberDom,
      inputDateMonthDom,
      inputDateYearDom,
      inputCvcCodeDom,
    ];
    const errorLabels = [
      errorCardholderNameDom,
      errorCardNumberDom,
      errorDateInputDom,
      errorDateInputDom,
      errorCvcCodeDom,
    ];

    for (let i = 0; i < inputElements.length; i++) {
      const element = inputElements[i];
      if (element.value.length === 0) {
        setErrorState({
          errorText: "Can't be blank",
          inputList: [element],
          errorLabel: errorLabels[i],
        });
        errorCount++;
      }
    }

    for (const element of errorLabels) {
      if (element.textContent !== "") {
        errorCount++;
        break;
      }
    }

    if (errorCount === 0) {
      for (let i = 0; i < inputElements.length; i++) {
        const element = inputElements[i];
        element.value = "";
      }

      cardholderNameDom.textContent = "Jane Appleseed";
      cardNumberDom.textContent = "0000 0000 0000 0000";
      dateMonthDom.textContent = "00";
      dateYearDom.textContent = "00";
      cvcCodeDom.textContent = "000";

      cardFormDom.classList.add("hidden");
      showSuccessScreen();
    }
  });
}

function initContinueButton() {
  continueButtonDom.addEventListener("click", () => {
    cardFormDom.classList.remove("hidden");
    successScreenContainerDom.classList.add("hidden");
    inputCardholderNameDom.focus();
  });
}
