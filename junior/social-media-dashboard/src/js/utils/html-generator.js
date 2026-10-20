import {
  overviewMainDom,
  overviewTodayListDom,
} from "../constants/dom-elements.js";
import { socialMediaData } from "../../config/init-state.js";
import { setBorderTopCls, reductionNumber, setUnit } from "./utils.js";

export function renderOverviewMain() {
  overviewMainDom.innerHTML = getOverviewMainTemplate();
}

export function renderOverviewToday() {
  overviewTodayListDom.innerHTML = getOverviewTodayTemplate();
}

function getOverviewMainTemplate() {
  let overviewMainHtml = ``;
  let arrowType;
  const order = ["facebook", "twitter", "instagram", "youtube"];

  order.forEach((key) => {
    const element = socialMediaData[key];

    arrowType =
      element.audience.change.type === "increase"
        ? "images/icon-up.svg"
        : "images/icon-down.svg";
    overviewMainHtml += getOverviewMainHtml({
      borderTopCss: setBorderTopCls({ value: element.title }),
      imageMedia: element.img,
      socialMediaTitle: element.title,
      login: element.login,
      mainCount: reductionNumber(element.audience.today),
      mainType: element.audience.title,
      change: element.audience.change.type,
      changeCountValue: setUnit({
        value: element.audience.change.value,
        unit: element.audience.change.unit,
      }),
      arrowImage: arrowType,
    });
  });
  return overviewMainHtml;
}

function getOverviewTodayTemplate() {
  let overviewTodayHtml = ``;
  const platformsOrder = ["facebook", "instagram", "twitter", "youtube"];
  const innerOrder = {
    facebook: ["page_views", "likes"],
    instagram: ["likes", "profile_views"],
    twitter: ["retweets", "likes"],
    youtube: ["likes", "total_views"],
  };

  platformsOrder.forEach((platformKey) => {
    const platformData = socialMediaData[platformKey];

    innerOrder[platformKey].forEach((innerKey) => {
      const cardData = platformData[innerKey];

      overviewTodayHtml += getOverviewTodayHtml({
        type: cardData.title,
        image: platformData.img,
        socialMediaTitle: platformData.title,
        count: reductionNumber(cardData.today),
        change: cardData.change.type,
        overviewTodayPercent: setUnit({
          value: cardData.change.value,
          unit: cardData.change.unit,
        }),
        arrowImage:
          cardData.change.type === "increase"
            ? "images/icon-up.svg"
            : "images/icon-down.svg",
      });
    });
  });
  return overviewTodayHtml;
}

function getOverviewMainHtml({
  borderTopCss,
  imageMedia,
  socialMediaTitle,
  login,
  mainCount,
  mainType,
  change,
  changeCountValue,
  arrowImage,
}) {
  return `
    <li class="main-card smooth-change-of-theme ${borderTopCss}">
        <div class="social-network-info">
            <img src="${imageMedia}" alt="${socialMediaTitle}">
            <span class="login smooth-change-of-theme">${login}</span>
        </div>

        <div class="main-info-card" aria-label="${mainCount} ${mainType}">
            <span class="main-count smooth-change-of-theme">${mainCount}</span>
            <span class="main-type smooth-change-of-theme">${mainType}</span>
        </div>

        <div class="change-count smooth-change-of-theme ${change}">
            <img src="${arrowImage}" alt="">
            <span class="change-count-value">${changeCountValue}</span>
            <span class="change-count-time">Today</span>
            <span class="visually-hidden">${change}</span>
        </div>
    </li>
    `;
}

function getOverviewTodayHtml({
  type,
  image,
  socialMediaTitle,
  count,
  change,
  overviewTodayPercent,
  arrowImage,
}) {
  return `
    <li class="overview-today-card smooth-change-of-theme">
        <div class="overview-today-header">
        <span class="overview-today-type smooth-change-of-theme">${type}</span>

        <img src="${image}" alt="${socialMediaTitle}">
        </div>

        <dl class="overview-today-main" aria-label="${type}">
        <dt class="visually-hidden">Count</dt>
        <dd class="overview-today-count smooth-change-of-theme">${count}</dd>

        <dt class="visually-hidden">Change</dt>
        <dd class="overview-today-percent ${change}">
            <img src="${arrowImage}" alt=''>
            <span>${overviewTodayPercent}</span>
            <span class="visually-hidden">${change}</span>
        </dd>
        </dl>
    </li>
    `;
}
