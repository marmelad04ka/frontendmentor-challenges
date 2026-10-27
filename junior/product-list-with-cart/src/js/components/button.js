import {
  productCardListDom,
  cartCountDom,
  cartEmptyStateDom,
  cartSelectedStateDom,
  selectedItemsContainer,
  confirmOrderDom,
  orderDialog,
  orderTotalPriceDom,
  newOrderButtonDom,
} from "../constant/dom-elements.js";
import {
  productById,
  cartListData,
  setCartListData,
  setOrderData,
  orderData,
} from "../../config/init-state.js";
import {
  setTotalCartCount,
  setOrderTotal,
  setVisualPrice,
  setVisualPriceCart,
  changeCardButtonBottom,
  moveFocusAfterDeletion,
  isObject,
} from "../utils/utils.js";
import { renderCartList, renderOrderList } from "../utils/html-generator.js";

export function initButtons() {
  initAddToCartButton();
  initIncreaseCountItemButton();
  initDecreaseCountItemButton();
  initDeleteItem();
  initConfirmOrder();
  initNewOrderButton();
}

function initAddToCartButton() {
  productCardListDom.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart-button");

    if (!button) return;

    const card = button.closest(".card");
    const changeCountItem = card.querySelector(".change-count-item");

    const productId = card.dataset.productId;

    const product = productById.get(productId);

    if (!product) {
      return;
    }

    setCartListData({ value: product, add: true });
    changeCountItem.classList.remove("hidden");
    button.classList.add("hidden");
    cartCountDom.textContent = setTotalCartCount();

    if (Object.keys(cartListData).length === 1) {
      cartEmptyStateDom.classList.add("hidden");
      cartSelectedStateDom.classList.remove("hidden");
    }
    renderCartList();
    setOrderTotal();

    const cardTop = event.target.closest(`.card-top`);
    const decrementButton = cardTop.querySelector(".decrement-button");
    decrementButton.focus();

    card.querySelector(".card-top").classList.add("active-card");
  });
}

function initIncreaseCountItemButton() {
  productCardListDom.addEventListener("click", (event) => {
    const button = event.target.closest(".increment-button");
    if (!button) return;

    const card = button.closest(".card");
    const itemCount = card.querySelector(".item-count");

    const productId = card.dataset.productId;

    const product = productById.get(productId);

    if (!product) {
      return;
    }

    setCartListData({ value: product, increase: true });
    itemCount.textContent = cartListData[product.id].count;
    cartCountDom.textContent = setTotalCartCount();

    setOrderTotal();

    const cartItem = selectedItemsContainer.querySelector(
      `.selected-item[data-product-id="${product.id}"]`,
    );

    if (cartItem) {
      setVisualPriceCart({ item: cartItem, product: product });
    }
  });
}

function initDecreaseCountItemButton() {
  productCardListDom.addEventListener("click", (event) => {
    const button = event.target.closest(".decrement-button");
    if (!button) return;

    const card = button.closest(".card");
    const itemCount = card.querySelector(".item-count");

    const productId = card.dataset.productId;

    const product = productById.get(productId);

    if (!product) {
      return;
    }

    setCartListData({ value: product, decrease: true });

    setOrderTotal();

    if (cartListData[product.id].count < 1) {
      setCartListData({ value: product, remove: true });
      card.querySelector(".card-top").classList.remove("active-card");

      if (Object.keys(cartListData).length === 0) {
        cartEmptyStateDom.classList.remove("hidden");
        cartSelectedStateDom.classList.add("hidden");
      }
      changeCardButtonBottom({ item: card, setChangeItem: false });

      cartCountDom.textContent = setTotalCartCount();

      renderCartList();

      const cardTop = event.target.closest(`.card-top`);
      const addButton = cardTop.querySelector(".add-to-cart-button");
      addButton.focus();
      return;
    }

    itemCount.textContent = cartListData[product.id].count;
    cartCountDom.textContent = setTotalCartCount();

    const cartItem = selectedItemsContainer.querySelector(
      `.selected-item[data-product-id="${product.id}"]`,
    );
    if (cartItem) {
      setVisualPriceCart({ item: cartItem, product: product });
    }
  });
}

function initDeleteItem() {
  selectedItemsContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".remove-button");
    if (!button) return;
    const item = event.target.closest(".selected-item");
    const list = selectedItemsContainer.closest(".selected-items-container");
    const items = [...list.querySelectorAll(".selected-item")];
    const index = items.indexOf(item);

    const cartItem = productCardListDom.querySelector(
      `.card[data-product-id="${item.dataset.productId}"]`,
    );
    cartItem.querySelector(".card-top").classList.remove("active-card");
    const itemCount = cartItem.querySelector(".item-count");

    changeCardButtonBottom({ item: cartItem, setChangeItem: false });
    itemCount.textContent = 1;

    setCartListData({ value: { id: item.dataset.productId }, remove: true });
    renderCartList();
    cartCountDom.textContent = setTotalCartCount();
    setOrderTotal();

    if (Object.keys(cartListData).length === 0) {
      cartEmptyStateDom.classList.remove("hidden");
      cartSelectedStateDom.classList.add("hidden");
    }

    const stillThere = list.querySelector(
      `.selected-item[data-product-id="${CSS.escape(item.dataset.productId)}"]`,
    );
    const firstCardItem = productCardListDom.querySelectorAll(".card");

    if (!stillThere) {
      moveFocusAfterDeletion({
        list: list,
        index: index,
        firstListElement: firstCardItem[0],
      });
    }
  });
}

function initConfirmOrder() {
  confirmOrderDom.addEventListener("click", () => {
    setOrderData({ clear: true });
    for (const key in cartListData) {
      if (!Object.hasOwn(cartListData, key)) continue;

      const element = cartListData[key];
      setOrderData({ value: element, add: true });
    }
    setOrderData({ total: true });
    renderOrderList();
    orderTotalPriceDom.textContent = "$" + setVisualPrice(orderData.orderTotal);
    orderTotalPriceDom.value = orderData.orderTotal;
    orderDialog.showModal();
  });
}

function initNewOrderButton() {
  orderDialog.addEventListener("click", (event) => {
    if (event.target === orderDialog) {
      closeOrderDialog();
    }
  });

  newOrderButtonDom.addEventListener("click", () => {
    newOrderButtonDom.addEventListener("click", closeOrderDialog);
  });

  orderDialog.addEventListener("cancel", closeOrderDialog);
}

function closeOrderDialog() {
  orderDialog.close();
  for (const key in orderData) {
    if (!Object.hasOwn(orderData, key)) continue;

    const element = orderData[key];

    if (!isObject(element)) {
      continue;
    }

    let cardItem = productCardListDom.querySelector(
      `.card[data-product-id="${element.id}"]`,
    );
    if (!cardItem) continue;

    let cardTop = cardItem.querySelector(".card-top");
    if (!cardTop) continue;

    cardTop.classList.remove("active-card");
    changeCardButtonBottom({ item: cardTop, setChangeItem: false });
    cardTop.querySelector(".item-count").textContent = "1";
  }
  setCartListData({ clear: true });
  setOrderTotal({ clear: true });
  cartEmptyStateDom.classList.remove("hidden");
  cartSelectedStateDom.classList.add("hidden");
  cartCountDom.textContent = 0;
}
