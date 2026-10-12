import { accordionListDom, skeletonDom } from "../constant/dom-elements.js";

export async function loadFaq() {
  const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
  await minDelay;
  skeletonDom.classList.add("hidden");
  accordionListDom.classList.remove("hidden");
}
