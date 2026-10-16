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

export function normalaizedValue({ value }) {
  let result = "";

  for (let i = 0; i < value.length; i++) {
    const element = value[i];
    if (!Number.isFinite(+element) || element === " ") {
      continue;
    }
    result += element;
  }
  return result;
}

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function setMaxValueDay() {
  const largeMonth = [-1, 0, 2, 4, 6, 7, 9, 11];
  const shortMonth = [3, 5, 8, 10];

  if (
    +dayInputDom.value > 31 &&
    largeMonth.includes(+monthInputDom.value - 1)
  ) {
    dayInputDom.value = 31;
  }

  if (
    +dayInputDom.value > 30 &&
    shortMonth.includes(+monthInputDom.value - 1)
  ) {
    dayInputDom.value = 30;
  }

  if (
    isLeapYear(+yearInputDom.value) &&
    +monthInputDom.value === 2 &&
    +dayInputDom.value > 29
  ) {
    dayInputDom.value = 29;
  }

  if (
    !isLeapYear(+yearInputDom.value) &&
    +dayInputDom.value > 28 &&
    +monthInputDom.value === 2
  ) {
    dayInputDom.value = 28;
  }
}

export function addZeroToShortValue({ input }) {
  const inputLength = input.value.length;
  if (input === yearInputDom && inputLength > 0 && inputLength < 4) {
    input.value = input.value.padStart(4, "0");
    return;
  }

  if (inputLength === 1 && input !== yearInputDom) {
    input.value = input.value.padStart(2, "0");
  }
}

export function removeOnlyZero({ input }) {
  if (
    input === yearInputDom &&
    +input.value === 0 &&
    input.value.length !== 0
  ) {
    input.value = "0001";
    return;
  }

  if (+input.value === 0 && input.value.length !== 0) {
    input.value = "01";
  }
}

export function removeErrorFromInput() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if (+yearInputDom.value < year) {
    setErrorState({
      isError: false,
      inputs: [dayInputDom, monthInputDom, yearInputDom],
      errors: [dayInputErrorDom, monthInputErrorDom, yearInputErrorDom],
      labels: [dayInputLabel, monthInputLabel, yearInputLabel],
    });
  }

  if (+yearInputDom.value === year && +monthInputDom.value < month) {
    setErrorState({
      isError: false,
      inputs: [dayInputDom, monthInputDom],
      errors: [dayInputErrorDom, monthInputErrorDom],
      labels: [dayInputLabel, monthInputLabel],
    });
  }

  if (
    +yearInputDom.value === year &&
    +monthInputDom.value === month &&
    +dayInputDom.value < day
  ) {
    setErrorState({
      isError: false,
      inputs: [dayInputDom],
      errors: [dayInputErrorDom],
      labels: [dayInputLabel],
    });
  }
}

export function checkForMinimumDate() {
  if (
    dayInputDom.value.length < 2 ||
    monthInputDom.value.length < 2 ||
    yearInputDom.value.length < 2
  ) {
    return false;
  }
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if (+yearInputDom.value > year) {
    setErrorState({
      isError: true,
      inputs: [dayInputDom, monthInputDom, yearInputDom],
      errors: [dayInputErrorDom, monthInputErrorDom, yearInputErrorDom],
      labels: [dayInputLabel, monthInputLabel, yearInputLabel],
      textErrors: [
        "Must be a valid day",
        "Must be a valid month",
        "Must be in the past",
      ],
    });
    return false;
  }

  if (+yearInputDom.value === year && +monthInputDom.value > month) {
    setErrorState({
      isError: true,
      inputs: [dayInputDom, monthInputDom],
      errors: [dayInputErrorDom, monthInputErrorDom],
      labels: [dayInputLabel, monthInputLabel],
      textErrors: ["Must be a valid day", "Must be a valid month"],
    });
    return false;
  }

  if (
    +dayInputDom.value > day &&
    +monthInputDom.value >= month &&
    +yearInputDom.value === year
  ) {
    setErrorState({
      isError: true,
      inputs: [dayInputDom],
      errors: [dayInputErrorDom],
      labels: [dayInputLabel],
      textErrors: ["Must be a valid day"],
    });
    return false;
  }

  return true;
}

export function checkForEmptyValue() {
  const domList = [
    [dayInputLabel, dayInputDom, dayInputErrorDom],
    [monthInputLabel, monthInputDom, monthInputErrorDom],
    [yearInputLabel, yearInputDom, yearInputErrorDom],
  ];
  let isError = false;

  for (let i = 0; i < domList.length; i++) {
    const element = domList[i];

    if (element[1].value === "") {
      setErrorState({
        isError: true,
        labels: [element[0]],
        inputs: [element[1]],
        errors: [element[2]],
        textErrors: ["This field is required"],
      });
      isError = true;
    }
  }

  return isError;
}

export function setErrorState({ isError, inputs, errors, labels, textErrors }) {
  if (isError) {
    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i];
      element.classList.add("error-input");
      labels[i].classList.add("error-state");
      errors[i].classList.remove("hidden");
      errors[i].textContent = textErrors[i];
      element.setAttribute("aria-invalid", "true");
    }
  } else {
    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i];
      element.classList.remove("error-input");
      labels[i].classList.remove("error-state");
      errors[i].classList.add("hidden");
      errors[i].textContent = "";
      element.setAttribute("aria-invalid", "false");
    }
  }
}
