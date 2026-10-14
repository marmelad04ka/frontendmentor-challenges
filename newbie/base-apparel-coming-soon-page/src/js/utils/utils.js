import {
  emailInputDom,
  errorImgDom,
  errorTextDom,
} from "../constants/dom-elements.js";

export function validationEmail(value) {
  if (!value || value.trim() === "") {
    return false;
  }

  if (value.length > 254) {
    return false;
  }

  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!re.test(value)) {
    return false;
  }

  const [emailName, domain] = value.split("@");

  if (emailName.includes("..") || domain.includes("..")) {
    return false;
  }

  if (
    emailName.startsWith(".") ||
    emailName.endsWith(".") ||
    domain.startsWith(".") ||
    domain.endsWith(".")
  ) {
    return false;
  }

  if (emailName.length > 64 || domain.length > 255) {
    return false;
  }

  return true;
}

export function setErrorState(isError) {
  if (isError) {
    errorImgDom.classList.remove("hidden");
    errorTextDom.classList.remove("hidden");
    emailInputDom.classList.add("error-input");
  } else {
    errorImgDom.classList.add("hidden");
    errorTextDom.classList.add("hidden");
    emailInputDom.classList.remove("error-input");
  }
}
