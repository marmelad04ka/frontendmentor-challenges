import { emailInputDom } from "../constants/dom-elements.js";
import { setErrorState } from "../utils/utils.js";

export function initInputs() {
  initEmailInput();
}

function initEmailInput() {
  emailInputDom.addEventListener("input", () => {
    setErrorState(false);
    emailInputDom.setAttribute("aria-invalid", "false");
  });
}
