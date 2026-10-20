import {
  setSocialMediaData,
  socialMediaData,
} from "../../config/init-state.js";
import { renderOverviewMain, renderOverviewToday } from "./html-generator.js";
import {
  totalFollowersCountDom,
  totalFollowersCountSkeletonDom,
  switcherContainerDom,
  switcherContainerSkeletonDom,
  overviewMainDom,
  overviewMainSkeletonDom,
  overviewTodayListDom,
  overviewTodaySkeletonDom,
} from "../constants/dom-elements.js";

export async function getSocialMediaData() {
  const response = await fetch("data/data.json");
  const db = await response.json();

  return db;
}

function showData() {
  totalFollowersCountDom.classList.remove("hidden");
  switcherContainerDom.classList.remove("hidden");
  totalFollowersCountSkeletonDom.classList.add("hidden");
  switcherContainerSkeletonDom.classList.add("hidden");
  overviewMainDom.classList.remove("hidden");
  overviewMainSkeletonDom.classList.add("hidden");
  overviewTodayListDom.classList.remove("hidden");
  overviewTodaySkeletonDom.classList.add("hidden");
}

export async function loadDashbordData() {
  const minDelay = new Promise((resolve) => setTimeout(resolve, 700));
  setSocialMediaData(await getSocialMediaData());
  renderOverviewMain();
  renderOverviewToday();
  totalFollowersCountDom.textContent = addCommaInResult(
    calculationTotalFollowers(),
  );
  await minDelay;
  showData();
}

export function setBorderTopCls({ value }) {
  if (value === "facebook") {
    return "facebook";
  }

  if (value === "twitter") {
    return "twitter";
  }

  if (value === "youtube") {
    return "youtube";
  }

  if (value === "instagram") {
    return "instagram";
  }
}

export function reductionNumber(value) {
  if (value.toString().length < 5) {
    return value;
  }
  let result;
  if (value.toString().length === 5) {
    result = value.toString().slice(0, 2) + "k";
  }
  return result;
}

export function setUnit({ value, unit }) {
  if (unit === "percent") {
    return value + "%";
  }

  return value;
}

function calculationTotalFollowers() {
  let result = 0;
  for (const key in socialMediaData) {
    if (!Object.hasOwn(socialMediaData, key)) continue;

    const element = socialMediaData[key];

    result += element.audience.today;
  }
  return result;
}

function addCommaInResult(value) {
  let count = 0;
  let result = [];
  for (let i = value.toString().length - 1; i >= 0; i--) {
    const element = value.toString()[i];

    if (count === 3) {
      result.push(",");
      count = 0;
    }

    result.push(element);
    count++;
  }

  return result.reverse().join("");
}
