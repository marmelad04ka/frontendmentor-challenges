import { bill, tip, numberOfPeople } from "../../config/init-state.js";
import {
  totalValueDom,
  tipAmountDom,
  resetButtonDom,
} from "../constants/dom-elements.js";

export function normalaizedValue({ value, isIntact }) {
  let result = "";
  let count = 0;
  value = value.replace(",", ".");
  if (value.length === 1 && value === "0") {
    return "0";
  }
  if (isIntact) count = 1;

  for (let i = 0; i < value.length; i++) {
    const element = value[i];

    if (i === 0 && (element === "." || element === "0") && value[1] !== ".") {
      continue;
    }

    if (element === "." && count === 0) {
      result += element;
      count++;
      continue;
    }

    if (Number.isFinite(+element)) {
      result += element;
    }
  }

  return result;
}

export function calculationAll() {
  const tipAmount = (+bill * (+tip * 0.01)) / +numberOfPeople;
  const total = (+bill * (+tip * 0.01 + 1)) / +numberOfPeople;

  setValue({ value: tipAmount, tipAmount: tipAmount });
  setValue({ value: total, total: total });
}

function setValue({ value, tipAmount, total }) {
  const valueArr = [bill, tip, numberOfPeople];

  for (const element of valueArr) {
    if (element === "0" || element === "") {
      totalValueDom.textContent = "$0.00";
      tipAmountDom.textContent = "$0.00";
      return;
    }
  }

  let calculatedValue;
  let domElement;

  if (tipAmount) {
    calculatedValue = (Math.floor(value * 100) / 100).toFixed(2);
    domElement = tipAmountDom;
  }

  if (total) {
    calculatedValue = value.toFixed(2);
    domElement = totalValueDom;
  }

  if (Number.isFinite(value)) {
    domElement.textContent = `$${calculatedValue}`;
  } else {
    domElement.textContent = "$0.00";
  }
}

export function activateResetButton() {
  if (bill === "" && tip === "" && numberOfPeople === "") {
    resetButtonDom.disabled = true;
    return;
  }
  resetButtonDom.disabled = false;
}
