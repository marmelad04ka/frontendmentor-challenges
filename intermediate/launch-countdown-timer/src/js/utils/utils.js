import {
  staticCardDaysTopDom,
  staticCardDaysBottomDom,
  staticCardHoursTopDom,
  staticCardHoursBottomDom,
  staticCardMinutesTopDom,
  staticCardMinutesBottomDom,
  staticCardSecondsTopDom,
  staticCardSecondsBottomDom,
  flipCardDaysTopDom,
  flipCardDaysValueTopDom,
  flipCardDaysBottomDom,
  flipCardDaysValueBottomDom,
  flipCardHoursTopDom,
  flipCardHoursValueTopDom,
  flipCardHoursBottomDom,
  flipCardHoursValueBottomDom,
  flipCardMinutesTopDom,
  flipCardMinutesValueTopDom,
  flipCardMinutesBottomDom,
  flipCardMinutesValueBottomDom,
  flipCardSecondsTopDom,
  flipCardSecondsValueTopDom,
  flipCardSecondsBottomDom,
  flipCardSecondsValueBottomDom,
  cardSecondDom,
  cardMinuteDom,
  cardHourDom,
  cardDayDom,
} from "../constants/dom-elements.js";
let timerInterval = setInterval(updateClock, 1000);

function pad(n) {
  return String(n).padStart(2, "0");
}

function getFormatDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

const deadline = new Date(getFormatDate()).getTime();
let isInitialized = false;

export function updateClock() {
  const now = new Date().getTime();
  const t = deadline - now;

  if (t <= 0) {
    document.getElementById("timer-live-text").textContent =
      "Launch time reached";
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((t % (1000 * 60)) / 1000);

  if (seconds === 0) {
    document.getElementById("timer-live-text").textContent =
      `${days} days, ${hours} hours, ${minutes} minutes remaining`;
  }

  if (!isInitialized) {
    staticCardDaysTopDom.textContent = staticCardDaysBottomDom.textContent =
      pad(days);
    staticCardHoursTopDom.textContent = staticCardHoursBottomDom.textContent =
      pad(hours);
    staticCardMinutesTopDom.textContent =
      staticCardMinutesBottomDom.textContent = pad(minutes);
    staticCardSecondsTopDom.textContent =
      staticCardSecondsBottomDom.textContent = pad(seconds);
    isInitialized = true;
    return;
  }

  updateTimer({
    newValue: days,
    oldValueTop: staticCardDaysTopDom,
    oldValueBottom: staticCardDaysBottomDom,
    flipValueTop: flipCardDaysValueTopDom,
    flipValueBottom: flipCardDaysValueBottomDom,
    flipCardTop: flipCardDaysTopDom,
    flipCardBottom: flipCardDaysBottomDom,
    card: cardDayDom,
  });

  updateTimer({
    newValue: hours,
    oldValueTop: staticCardHoursTopDom,
    oldValueBottom: staticCardHoursBottomDom,
    flipValueTop: flipCardHoursValueTopDom,
    flipValueBottom: flipCardHoursValueBottomDom,
    flipCardTop: flipCardHoursTopDom,
    flipCardBottom: flipCardHoursBottomDom,
    card: cardHourDom,
  });

  updateTimer({
    newValue: minutes,
    oldValueTop: staticCardMinutesTopDom,
    oldValueBottom: staticCardMinutesBottomDom,
    flipValueTop: flipCardMinutesValueTopDom,
    flipValueBottom: flipCardMinutesValueBottomDom,
    flipCardTop: flipCardMinutesTopDom,
    flipCardBottom: flipCardMinutesBottomDom,
    card: cardMinuteDom,
  });

  updateTimer({
    newValue: seconds,
    oldValueTop: staticCardSecondsTopDom,
    oldValueBottom: staticCardSecondsBottomDom,
    flipValueTop: flipCardSecondsValueTopDom,
    flipValueBottom: flipCardSecondsValueBottomDom,
    flipCardTop: flipCardSecondsTopDom,
    flipCardBottom: flipCardSecondsBottomDom,
    card: cardSecondDom,
  });
}

function updateTimer({
  newValue,
  oldValueTop,
  oldValueBottom,
  flipValueTop,
  flipValueBottom,
  flipCardTop,
  flipCardBottom,
  card,
}) {
  if (newValue === undefined || +oldValueTop.textContent === +newValue) return;

  const next = String(newValue).padStart(2, "0");
  if (oldValueTop.textContent === next) return;

  if (card._flipTimeoutId) {
    clearTimeout(card._flipTimeoutId);
    card._flipTimeoutId = null;
  }

  const oldValue = String(+oldValueTop.textContent || 0).padStart(2, "0");

  oldValueTop.textContent = next;
  flipValueTop.textContent = oldValue;
  flipValueBottom.textContent = next;

  flipCardTop.classList.remove("hidden");
  flipCardBottom.classList.remove("hidden");
  card.classList.add("animating");

  card._flipTimeoutId = setTimeout(() => {
    card.classList.remove("animating");
    flipCardTop.classList.add("hidden");
    flipCardBottom.classList.add("hidden");
    oldValueBottom.textContent = next;
    card._flipTimeoutId = null;
  }, 600);
}
