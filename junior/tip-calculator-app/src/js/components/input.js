import { normalaizedValue } from "../utils.js/utils.js";
import { setBill, setTip, setNumberOfPeople } from "../../config/init-state.js";
import { calculationAll, activateResetButton } from "../utils.js/utils.js";
import {
  billInputDom,
  billSectionPDom,
  numberOfPeopleSectionDom,
  numberOfPeopleSectionPDom,
  customInputDom,
  tipRadios,
  customInput,
  selectTipSectionPDom,
} from "../constants/dom-elements.js";

export function initInputs() {
  initBillInput();
  initNumberOfPeopleInput();
  initCustomInput();
}

function initBillInput() {
  billInputDom.addEventListener("input", () => {
    billSectionPDom.classList.add("hidden");
    billInputDom.classList.remove("error-input");

    const correctValue = normalaizedValue({ value: billInputDom.value });
    billInputDom.value = correctValue;
    billInputDom.textContent = correctValue;

    if (billInputDom.value.length > 16) {
      billInputDom.value = billInputDom.value.slice(0, -1);
      billInputDom.textContent = billInputDom.value.slice(0, -1);
    }

    setBill(billInputDom.value);
    calculationAll();
    activateResetButton();
  });

  billInputDom.addEventListener("blur", () => {
    if (billInputDom.value[billInputDom.value.length - 1] === ".") {
      billInputDom.value = billInputDom.value.slice(0, -1);
      billInputDom.textContent = billInputDom.value.slice(0, -1);
    }

    if (billInputDom.value === "0") {
      billSectionPDom.classList.remove("hidden");
      billInputDom.classList.add("error-input");
    }

    setBill(billInputDom.value);
    calculationAll();
  });
}

function initNumberOfPeopleInput() {
  numberOfPeopleSectionDom.addEventListener("input", () => {
    numberOfPeopleSectionPDom.classList.add("hidden");
    numberOfPeopleSectionDom.classList.remove("error-input");

    const correctValue = normalaizedValue({
      value: numberOfPeopleSectionDom.value,
      isIntact: true,
    });

    numberOfPeopleSectionDom.value = correctValue;
    numberOfPeopleSectionDom.textContent = correctValue;

    if (numberOfPeopleSectionDom.value.length > 9) {
      numberOfPeopleSectionDom.value = numberOfPeopleSectionDom.value.slice(
        0,
        -1,
      );
      numberOfPeopleSectionDom.textContent =
        numberOfPeopleSectionDom.value.slice(0, -1);
    }

    setNumberOfPeople(numberOfPeopleSectionDom.value);

    calculationAll();
    activateResetButton();
  });

  numberOfPeopleSectionDom.addEventListener("blur", () => {
    if (numberOfPeopleSectionDom.value === "0") {
      numberOfPeopleSectionPDom.classList.remove("hidden");
      numberOfPeopleSectionDom.classList.add("error-input");
    }

    setNumberOfPeople(numberOfPeopleSectionDom.value);
    calculationAll();
  });
}

function initCustomInput() {
  customInputDom.addEventListener("input", () => {
    tipRadios.forEach((r) => (r.checked = false));

    selectTipSectionPDom.classList.add("hidden");
    customInputDom.classList.remove("error-input");

    const correctValue = normalaizedValue({
      value: customInputDom.value,
    });
    customInputDom.value = correctValue;
    customInputDom.textContent = correctValue;

    if (customInputDom.value.length > 5) {
      customInputDom.value = customInputDom.value.slice(0, -1);
      customInputDom.textContent = customInputDom.value.slice(0, -1);
    }

    setTip(customInputDom.value);
    calculationAll();
    activateResetButton();
  });

  tipRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      customInput.value = "";
      selectTipSectionPDom.classList.add("hidden");
      customInputDom.classList.remove("error-input");

      setTip(radio.value);
      calculationAll();
      activateResetButton();
    });
  });

  customInputDom.addEventListener("blur", () => {
    if (customInputDom.value[customInputDom.value.length - 1] === ".") {
      customInputDom.value = customInputDom.value.slice(0, -1);
      customInputDom.textContent = customInputDom.value.slice(0, -1);
    }

    if (customInputDom.value === "0") {
      selectTipSectionPDom.classList.remove("hidden");
      customInputDom.classList.add("error-input");
    }

    if (customInputDom.value !== "") {
      setTip(customInputDom.value);
    }

    calculationAll();
  });
}
