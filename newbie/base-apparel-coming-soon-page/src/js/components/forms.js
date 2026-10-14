import { emailInputDom, fromDom } from "../constants/dom-elements.js";
import { validationEmail, setErrorState } from "../utils/utils.js";

export function initForms() {
  initConfirmForm();
}

function initConfirmForm() {
  fromDom.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailValue = emailInputDom.value.trim();

    if (!validationEmail(emailValue)) {
      setErrorState(true);
      emailInputDom.setAttribute("aria-invalid", "true");
      return;
    }

    setErrorState(false);
    emailInputDom.setAttribute("aria-invalid", "false");
  });
}
