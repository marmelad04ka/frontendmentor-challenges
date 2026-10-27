import {
  productCardListDom,
  selectedItemsContainer,
  orderListDom,
} from "../constant/dom-elements.js";
import {
  productListData,
  cartListData,
  orderData,
} from "../../config/init-state.js";
import { createIDFromName, setVisualPrice, isObject } from "./utils.js";

export function renderProductList() {
  productCardListDom.innerHTML = getProductListTemplate();
}

function getProductListTemplate() {
  let productListHtml = ``;
  for (const key in productListData) {
    if (!Object.hasOwn(productListData, key)) continue;

    const element = productListData[key];
    createIDFromName(element.name);
    productListHtml += getProductListHtml({
      productId: createIDFromName(element.name),
      imageMobile: element.image.mobile,
      imageDesktop: element.image.desktop,
      productName: element.name,
      itemCategory: element.category,
      price: setVisualPrice(element.price),
    });
  }

  return productListHtml;
}

function getProductListHtml({
  productId,
  imageMobile,
  imageDesktop,
  productName,
  itemCategory,
  price,
}) {
  return `
    <li>
        <article class="card" data-product-id="${productId}">
            <div class="card-top">
                <div class="card-image">
                    <picture>
                        <source media="(max-width: 768px)" srcset="${imageMobile}">
                        <img src="${imageDesktop}" alt="Waffle with berries" width="400" height="300" loading="lazy">
                    </picture>
                </div>
                <button class="add-to-cart-button " type="button" aria-label="Add ${productName} to cart">
                    <img src="images/icon-add-to-cart.svg" alt="" aria-hidden="true">
                    <span>Add to Cart</span>
                </button>

                <div class="change-count-item hidden" role="group" aria-label="Quantity for ${productName}">
                    <button class="decrement-button" type="button" aria-label="Decrease quantity">
                        <img src="images/icon-decrement-quantity.svg" alt="" aria-hidden="true">
                    </button>
                    <span class="item-count" aria-live="polite">1</span>
                    <button class="increment-button" type="button" aria-label="Increase quantity">
                        <img src="images/icon-increment-quantity.svg" alt="" aria-hidden="true">
                    </button>
                </div>
            </div>

            <div class="card-middle">
                <p class="card-item-category">${itemCategory}</p>
                <h2 class="card-item-name">${productName}</h2>
            </div>

            <div class="card-bottom">
                <p class="card-item-price"><data value="${price}">$${price}</data></p>
            </div>
        </article>
    </li> 
    `;
}

export function renderCartList() {
  selectedItemsContainer.innerHTML = getCartListTemplate();
}

function getCartListTemplate() {
  let cartListHtml = ``;

  for (const key in cartListData) {
    if (!Object.hasOwn(cartListData, key)) continue;

    const element = cartListData[key];

    cartListHtml += getCartListHtml({
      productId: element.id,
      name: element.name,
      quantity: element.count,
      primaryPrice: setVisualPrice(element.price),
      totalPrice: setVisualPrice(element.count * element.price),
    });
  }

  return cartListHtml;
}

function getCartListHtml({
  productId,
  name,
  quantity,
  primaryPrice,
  totalPrice,
}) {
  return `
        <li class="selected-item" data-product-id="${productId}">
            <div class="selected-item-info">
              <p class="item-name">${name}</p>
              <div class="selected-item-bottom">
                <span class="count-item" aria-label="Quantity: ${quantity}">
                  <data value="${quantity}" aria-hidden="true">${quantity}x</data>
                </span>
                <div class="price-block">
                  <div class="primary-price-block">
                    <span class="badge" aria-hidden="true">@</span>
                    <span class="primary-price"><data value="${primaryPrice}">$${primaryPrice}</data></span>
                  </div>
                  <p class="total-item-price">
                    <data value="${totalPrice}">$${totalPrice}</data>
                  </p>
                </div>
              </div>
            </div>

            <button class="remove-button" type="button"
              aria-label="Remove ${name} from cart">
              <img src="images/icon-remove-item.svg" alt="" aria-hidden="true">
            </button>
        </li>
    `;
}

export function renderOrderList() {
  orderListDom.innerHTML = getOrderListTemplate();
}

function getOrderListTemplate() {
  let orderListHtml = ``;
  for (const key in orderData) {
    if (!Object.hasOwn(orderData, key)) continue;

    const element = orderData[key];
    if (!isObject(element)) {
      continue;
    }

    orderListHtml += getOrderListHtml({
      image: element.image,
      name: element.name,
      quantity: element.count,
      primaryPrice: setVisualPrice(element.price),
      total: setVisualPrice(element.total),
    });
  }
  return orderListHtml;
}

function getOrderListHtml({ image, name, quantity, primaryPrice, total }) {
  return `
  <li>
    <img src="${image}" alt="" aria-hidden="true" width="64" height="64" loading="lazy">
    <div class="order-item-info">
      <p class="order-item-name">${name}</p>
      <div class="order-item-info-bottom">
        <span class="order-item-count" aria-label="Quantity: ${quantity}">
          <data value="${quantity}" aria-hidden="true">${quantity}x</data>
        </span>
        <div class="order-item-price-block">
          <span class="badge" aria-hidden="true">@</span>
          <span class="primary-price"><data value="${primaryPrice}">$${primaryPrice}</data></span>
        </div>
      </div>
    </div>
    <p class="total-price-item"><data value="${total}">$${total}</data></p>
  </li>
  `;
}
