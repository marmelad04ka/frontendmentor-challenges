import {
  setProductList,
  setProductById,
  productListData,
  cartListData,
} from "../../config/init-state.js";
import { renderProductList, renderCartList } from "./html-generator.js";
import {
  totalPriceDom,
  skeletonProductListDom,
  skeletonCartDom,
  cartEmptyStateDom,
  productCardListDom,
} from "../constant/dom-elements.js";

async function getProductList() {
  const response = await fetch("data/data.json");
  const db = await response.json();

  for (const element of db) {
    element.id = createIDFromName(element.name);
  }
  return db;
}

export async function loadProductListData() {
  const minDelay = new Promise((resolve) => setTimeout(resolve, 700));
  setProductList(await getProductList());
  setProductById(productListData);
  renderProductList();
  renderCartList();
  await minDelay;
  skeletonProductListDom.classList.add("hidden");
  skeletonCartDom.classList.add("hidden");
  cartEmptyStateDom.classList.remove("hidden");
  productCardListDom.classList.remove("hidden");
}

export function createIDFromName(name) {
  const normalizedName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  let result = [];

  for (const element of normalizedName) {
    result.push(element);
  }

  return result.join("-");
}

export function setVisualPrice(value) {
  let valueRight = value.toString().split(".")[1];

  return valueRight === undefined
    ? value.toString() + ".00"
    : value.toString() + "0";
}

export function setTotalCartCount() {
  let result = 0;
  for (const key in cartListData) {
    if (!Object.hasOwn(cartListData, key)) continue;

    const element = cartListData[key];
    result += element.count;
  }
  return result;
}

export function setOrderTotal() {
  let result = 0;
  for (const key in cartListData) {
    if (!Object.hasOwn(cartListData, key)) continue;

    const element = cartListData[key];
    result += element.count * element.price;
  }
  setOrderTotalVisual(result);
  return result;
}

function setOrderTotalVisual(value) {
  totalPriceDom.textContent = "$" + setVisualPrice(value);
  totalPriceDom.value = value;
}

export function setVisualPriceCart({ item, product }) {
  const countItemDom = item.querySelector(".count-item");
  const countItemDataDom = item.querySelector(".count-item data");
  const totalItemPriceDataDom = item.querySelector(".total-item-price data");
  const totalItemPrice =
    cartListData[product.id].count * cartListData[product.id].price;

  countItemDom.ariaLabel = "Quantity: " + cartListData[product.id].count;
  countItemDataDom.textContent = cartListData[product.id].count + "x";
  countItemDataDom.value = cartListData[product.id].count;

  totalItemPriceDataDom.textContent = "$" + setVisualPrice(totalItemPrice);
  totalItemPriceDataDom.value = totalItemPrice;
}

export function changeCardButtonBottom({ item, setChangeItem }) {
  const changeCountItem = item.querySelector(".change-count-item");
  const addToCartButton = item.querySelector(".add-to-cart-button");
  if (setChangeItem) {
    changeCountItem.classList.remove("hidden");
    addToCartButton.classList.add("hidden");
  } else {
    changeCountItem.classList.add("hidden");
    addToCartButton.classList.remove("hidden");
  }
}

export function getFocusTargetAfterDeletion(list, index) {
  const items = [...list.querySelectorAll(".selected-item")];
  return items[index] ?? items[index - 1] ?? null;
}

export function moveFocusAfterDeletion({ list, index, firstListElement }) {
  const nextItem = getFocusTargetAfterDeletion(list, index);

  if (nextItem) {
    nextItem.querySelector(".remove-button")?.focus();
  } else {
    firstListElement
      .querySelector(".add-to-cart-button")
      ?.focus({ preventScroll: true });
  }
}

export function isObject(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}
