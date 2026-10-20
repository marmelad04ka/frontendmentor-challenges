import { switcherContainerDom } from "../constants/dom-elements.js";

export async function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.remove("theme-light");
    document.documentElement.classList.add("theme-dark");

    localStorage.setItem("theme", theme);

    switcherContainerDom.classList.add("align-start");
    switcherContainerDom.classList.remove("align-end");
  } else {
    document.documentElement.classList.remove("theme-dark");
    document.documentElement.classList.add("theme-light");

    localStorage.setItem("theme", theme);

    switcherContainerDom.classList.remove("align-start");
    switcherContainerDom.classList.add("align-end");
  }
}
