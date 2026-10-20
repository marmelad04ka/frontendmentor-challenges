import { switcherContainerDom } from "../constants/dom-elements.js";
import { setTheme } from "../utils/theme.js";

export function initButtons() {
  initSwitcher();
}

function initSwitcher() {
  switcherContainerDom.addEventListener("click", () => {
    toggleSwitch();
  });

  switcherContainerDom.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    toggleSwitch();
  });

  function toggleSwitch() {
    const isPressed =
      switcherContainerDom.getAttribute("aria-checked") === "true";
    switcherContainerDom.setAttribute("aria-checked", !isPressed);

    if (localStorage.getItem("theme") === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }
}
