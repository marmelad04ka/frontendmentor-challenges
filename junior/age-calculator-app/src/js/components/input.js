import {
  dayInputDom,
  monthInputDom,
  yearInputDom,
  dayInputErrorDom,
  monthInputErrorDom,
  yearInputErrorDom,
  dayInputLabel,
  monthInputLabel,
  yearInputLabel,
} from "../constants/dom-elements.js";
import {
  normalaizedValue,
  setMaxValueDay,
  addZeroToShortValue,
  removeOnlyZero,
  setErrorState,
  removeErrorFromInput,
} from "../utils/utils.js";

export function initInputs() {
  initDayInput();
  initMonthInput();
  initYearInput();
}

function initDayInput() {
  dayInputDom.addEventListener("input", () => {
    if (dayInputErrorDom.textContent === "This field is required") {
      setErrorState({
        isError: false,
        inputs: [dayInputDom],
        labels: [dayInputLabel],
        errors: [dayInputErrorDom],
      });
    }

    removeErrorFromInput();
    dayInputDom.value = normalaizedValue({
      value: dayInputDom.value,
    });
    dayInputDom.textContent = normalaizedValue({
      value: dayInputDom.value,
    });

    setMaxValueDay();
  });

  dayInputDom.addEventListener("blur", () => {
    addZeroToShortValue({ input: dayInputDom });
    removeOnlyZero({ input: dayInputDom });
  });
}

function initMonthInput() {
  monthInputDom.addEventListener("input", () => {
    if (monthInputErrorDom.textContent === "This field is required") {
      setErrorState({
        isError: false,
        inputs: [monthInputDom],
        labels: [monthInputLabel],
        errors: [monthInputErrorDom],
      });
    }

    removeErrorFromInput();
    monthInputDom.value = normalaizedValue({
      value: monthInputDom.value,
    });
    monthInputDom.textContent = normalaizedValue({
      value: monthInputDom.value,
    });

    if (+monthInputDom.value > 12) {
      monthInputDom.value = "12";
    }
    setMaxValueDay();
  });

  monthInputDom.addEventListener("blur", () => {
    addZeroToShortValue({ input: monthInputDom });
    removeOnlyZero({ input: monthInputDom });
  });
}

function initYearInput() {
  yearInputDom.addEventListener("input", () => {
    if (yearInputErrorDom.textContent === "This field is required") {
      setErrorState({
        isError: false,
        inputs: [yearInputDom],
        labels: [yearInputLabel],
        errors: [yearInputErrorDom],
      });
    }

    removeErrorFromInput();
    yearInputDom.value = normalaizedValue({
      value: yearInputDom.value,
    });
    yearInputDom.textContent = normalaizedValue({
      value: yearInputDom.value,
    });
    setMaxValueDay();
  });
  yearInputDom.addEventListener("blur", () => {
    addZeroToShortValue({ input: yearInputDom });
    removeOnlyZero({ input: yearInputDom });
  });
}
