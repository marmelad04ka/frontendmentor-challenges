import {
  choiceButtonsDom,
  submitButtonDom,
  choiseRatingContainerDom,
  thankYouContainerDom,
  selectedRatingDom,
} from "../constant/dom-components.js";

export function initButtons() {
  initRatingButtons();
  initSubmitButton();
}
let selectedRating = "";
function initRatingButtons() {
  choiceButtonsDom.forEach((button) => {
    button.addEventListener("click", () => {
      choiceButtonsDom.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      selectedRating = button.textContent.trim();
      submitButtonDom.disabled = false;
    });
  });
}

function initSubmitButton() {
  submitButtonDom.addEventListener("click", () => {
    if (!selectedRating) return;

    choiseRatingContainerDom.classList.add("hidden");
    thankYouContainerDom.classList.remove("hidden");
    selectedRatingDom.textContent = `You selected ${selectedRating} out of 5`;
  });
}
