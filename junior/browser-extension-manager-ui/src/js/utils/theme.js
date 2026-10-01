import {
  logoLightDom,
  logoDarkDom,
  buttonDarkSwitchDom,
  buttonLightSwitchDom,
  skeletonLogoDom,
  logoDom,
  skeletonButtonThemeSwitcherDom,
  themeSwitcherButton,
} from "../constant/dom-element.js";

export async function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.remove("theme-light");
    document.documentElement.classList.add("theme-dark");

    localStorage.setItem("theme", theme);

    logoLightDom.classList.add("hidden");
    logoDarkDom.classList.remove("hidden");

    buttonDarkSwitchDom.classList.add("hidden");
    buttonLightSwitchDom.classList.remove("hidden");

    const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
    await minDelay;

    skeletonLogoDom.classList.add("hidden");
    logoDom.classList.remove("hidden");

    skeletonButtonThemeSwitcherDom.classList.add("hidden");
    themeSwitcherButton.classList.remove("hidden");
  } else {
    document.documentElement.classList.remove("theme-dark");
    document.documentElement.classList.add("theme-light");

    localStorage.setItem("theme", theme);

    logoLightDom.classList.remove("hidden");
    logoDarkDom.classList.add("hidden");

    buttonDarkSwitchDom.classList.remove("hidden");
    buttonLightSwitchDom.classList.add("hidden");

    const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
    await minDelay;

    skeletonLogoDom.classList.add("hidden");
    logoDom.classList.remove("hidden");

    skeletonButtonThemeSwitcherDom.classList.add("hidden");
    themeSwitcherButton.classList.remove("hidden");
  }
}
