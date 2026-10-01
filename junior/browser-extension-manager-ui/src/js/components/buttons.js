import {
  filterButtons,
  extensionsListDom,
  themeSwitcherButtonDom,
} from "../constant/dom-element.js";
import { renderExtensionsList } from "../utils/html-generator.js";
import { setExtensionsListData } from "../../config/init-state.js";
import { setTheme } from "../utils/theme.js";
import { moveFocusAfterDeletion } from "../utils/utils.js";

export function initButtons() {
  initFilterButtons();
  initSwitchExtensionStateButton();
  initRemoveExtensionButton();
  initThemeSwitcherButton();
}

function initFilterButtons() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      const filterValue = button.textContent.trim().toLowerCase();
      localStorage.setItem("tabActive", filterValue);
      renderExtensionsList();
    });
  });
}

function initSwitchExtensionStateButton() {
  extensionsListDom.addEventListener("click", (event) => {
    const switchContainer = event.target.closest(".switcher-container");
    if (!switchContainer) return;
    toggleSwitch(switchContainer);
  });

  extensionsListDom.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const switchContainer = event.target.closest(".switcher-container");
    if (!switchContainer) return;

    event.preventDefault();
    toggleSwitch(switchContainer);
  });

  function toggleSwitch(switchContainer) {
    const name = switchContainer.dataset.extensionsValue;

    let isActive;

    const isPressed = switchContainer.getAttribute("aria-checked") === "true";
    switchContainer.setAttribute("aria-checked", !isPressed);

    if (switchContainer.classList.contains("align-start")) {
      switchContainer.classList.remove("align-start");
      switchContainer.classList.add("align-end");
      isActive = true;
    } else {
      switchContainer.classList.add("align-start");
      switchContainer.classList.remove("align-end");
      isActive = false;
    }

    setExtensionsListData({
      newValue: isActive,
      field: switchContainer.dataset.extensionsValue,
      action: "change",
    });

    if (localStorage.getItem("tabActive") !== "all") {
      const list = switchContainer.closest(".extensions-list");
      const cards = [...list.querySelectorAll(".extensions-element")];
      const card = switchContainer.closest(".extensions-element");
      const index = cards.indexOf(card);

      renderExtensionsList();

      const stillThere = list.querySelector(
        `.switcher-container[data-extensions-value="${CSS.escape(name)}"]`,
      );

      if (!stillThere) {
        moveFocusAfterDeletion(list, index);
      }
    }
  }
}

function initRemoveExtensionButton() {
  function closeCard(card) {
    card.querySelector(".extensions-element-header").classList.remove("hidden");
    card.querySelector(".extensions-element-footer").classList.remove("hidden");
    card.querySelector(".deletion-confirmation").classList.add("hidden");

    card.querySelector(".button-remove")?.focus();
  }

  function isOpen(card) {
    return !card
      .querySelector(".deletion-confirmation")
      .classList.contains("hidden");
  }

  function openCard(card) {
    card.querySelector(".extensions-element-header").classList.add("hidden");
    card.querySelector(".extensions-element-footer").classList.add("hidden");
    card.querySelector(".deletion-confirmation").classList.remove("hidden");

    const yesBtn = card.querySelector(".button-delete-yes");
    yesBtn?.focus();
  }

  extensionsListDom.addEventListener("click", (event) => {
    const yesBtn = event.target.closest(".button-delete-yes");
    if (yesBtn) {
      const card = yesBtn.closest(".extensions-element");
      const list = card.closest(".extensions-list");
      const index = [...list.querySelectorAll(".extensions-element")].indexOf(
        card,
      );

      setExtensionsListData({
        field: yesBtn.dataset.buttonDeleteYes,
        action: "delete",
      });
      renderExtensionsList();
      moveFocusAfterDeletion(list, index);
      return;
    }

    const noBtn = event.target.closest(".button-delete-no");
    if (noBtn) {
      const card = noBtn.closest(".extensions-element");
      closeCard(card);
      return;
    }

    const removeBtn = event.target.closest(".button-remove");
    if (!removeBtn) {
      return;
    }
    const card = removeBtn.closest(".extensions-element");
    extensionsListDom.querySelectorAll(".extensions-element").forEach((c) => {
      if (isOpen(c)) {
        closeCard(c);
      }
    });

    openCard(card);
  });

  document.addEventListener("click", (event) => {
    extensionsListDom
      .querySelectorAll(".extensions-element")
      .forEach((card) => {
        if (!isOpen(card)) {
          return;
        }
        if (card.contains(event.target)) {
          return;
        }
        closeCard(card);
      });
  });
}

function initThemeSwitcherButton() {
  themeSwitcherButtonDom.addEventListener("click", () => {
    if (localStorage.getItem("theme") === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  });
}
