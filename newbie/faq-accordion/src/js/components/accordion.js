import { accordionListDom } from "../constant/dom-elements.js";

export function initAccordions() {
  accordionListDom.addEventListener(
    "toggle",
    (e) => {
      const details = e.target.closest(".accordion-item");
      if (!details) return;

      const img = details.querySelector(".img-switches");
      if (!img) return;

      if (details.open) {
        img.src = "images/icon-minus.svg";
      } else {
        img.src = "images/icon-plus.svg";
      }
    },
    true,
  );
}
