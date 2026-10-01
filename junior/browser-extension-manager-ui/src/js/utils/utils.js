import {
  skeletonMainContentDom,
  extensionsListDom,
} from "../constant/dom-element.js";

export async function getExtensionsListData() {
  const response = await fetch("data/data.json");
  const db = await response.json();

  return db;
}

export function getFocusTargetAfterDeletion(list, index) {
  const cards = [...list.querySelectorAll(".extensions-element")];
  return cards[index] ?? cards[index - 1] ?? null;
}

export function moveFocusAfterDeletion(list, index) {
  const nextCard = getFocusTargetAfterDeletion(list, index);
  if (nextCard) {
    nextCard.querySelector(".button-remove")?.focus();
  } else {
    const heading = document.querySelector(".list-name");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus();
  }
}

export async function loadAdvice() {
  const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
  await minDelay;
  skeletonMainContentDom.classList.add("hidden");
  extensionsListDom.classList.remove("hidden");
}
