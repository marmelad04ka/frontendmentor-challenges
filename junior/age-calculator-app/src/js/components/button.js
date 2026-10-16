import {
  buttonConfrim,
  dayInputDom,
  monthInputDom,
  yearInputDom,
  dayInputErrorDom,
  monthInputErrorDom,
  yearInputErrorDom,
  dayInputLabel,
  monthInputLabel,
  yearInputLabel,
  resultDayDom,
  resultMonthDom,
  resultYearDom,
} from "../constants/dom-elements.js";
import {
  checkForMinimumDate,
  checkForEmptyValue,
  setErrorState,
} from "../utils/utils.js";

export function initButtons() {
  initButton();
}

function initButton() {
  buttonConfrim.addEventListener("click", () => {
    setErrorState({
      isError: false,
      inputs: [dayInputDom, monthInputDom, yearInputDom],
      errors: [dayInputErrorDom, monthInputErrorDom, yearInputErrorDom],
      labels: [dayInputLabel, monthInputLabel, yearInputLabel],
    });

    if (checkForEmptyValue()) {
      resultDayDom.textContent = "- -";
      resultMonthDom.textContent = "- -";
      resultYearDom.textContent = "- -";
      return;
    }

    if (!checkForMinimumDate()) {
      resultDayDom.textContent = "- -";
      resultMonthDom.textContent = "- -";
      resultYearDom.textContent = "- -";
      return;
    }

    const start = luxon.DateTime.fromObject({
      year: Number(yearInputDom.value),
      month: Number(monthInputDom.value),
      day: Number(dayInputDom.value),
    });
    const end = luxon.DateTime.now();
    const diff = end.diff(start, ["years", "months", "days"]);

    resultDayDom.textContent = Math.trunc(diff.days);
    resultMonthDom.textContent = diff.months;
    resultYearDom.textContent = diff.years;
  });
}
