import {
  billInputDom,
  billSectionPDom,
  numberOfPeopleSectionDom,
  numberOfPeopleSectionPDom,
  customInputDom,
  tipRadios,
  selectTipSectionPDom,
  resetButtonDom,
  totalValueDom,
  tipAmountDom,
} from "../constants/dom-elements.js";
import { setBill, setTip, setNumberOfPeople } from "../../config/init-state.js";

export function initButtons() {
  initResetButton();
}

function initResetButton() {
  resetButtonDom.addEventListener("click", () => {
    const inputArr = [billInputDom, customInputDom, numberOfPeopleSectionDom];
    const errorSpan = [
      billSectionPDom,
      selectTipSectionPDom,
      numberOfPeopleSectionPDom,
    ];

    for (const element of inputArr) {
      element.textContent = "";
      element.value = "";
      element.classList.remove("error-input");
    }

    for (const element of errorSpan) {
      element.classList.add("hidden");
    }

    tipAmountDom.textContent = "$0.00";
    totalValueDom.textContent = "$0.00";

    tipRadios.forEach((r) => (r.checked = false));

    setBill("");
    setTip("");
    setNumberOfPeople("");

    resetButtonDom.disabled = true;
    billInputDom.focus();
  });
}
