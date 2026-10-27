import { isObject } from "../js/utils/utils.js";

export let productListData = null;

export function setProductList(value) {
  productListData = value;
}

export let productById = new Map();

export function setProductById(value) {
  for (const item of value) {
    productById.set(item.id, item);
  }
}

export let cartListData = {};

export function setCartListData({
  value,
  add,
  increase,
  decrease,
  remove,
  clear,
}) {
  if (add) {
    cartListData[value.id] = {
      id: value.id,
      name: value.name,
      image: value.image.thumbnail,
      price: value.price,
      count: 1,
    };
    return;
  }
  if (increase) {
    cartListData[value.id].count += 1;
  }
  if (decrease) {
    cartListData[value.id].count -= 1;
  }
  if (remove) {
    delete cartListData[value.id];
  }

  if (clear) {
    cartListData = {};
  }
}

export let orderData = {};

export function setOrderData({ value, add, clear, total }) {
  if (add) {
    orderData[value.id] = {
      id: value.id,
      name: value.name,
      image: value.image,
      total: value.price * value.count,
      count: value.count,
      price: value.price,
    };
  }

  if (clear) {
    orderData = {};
  }

  if (total) {
    let totalValue = 0;
    let orderTotal = "orderTotal";
    for (const key in orderData) {
      if (!Object.hasOwn(orderData, key)) continue;

      const element = orderData[key];
      if (!isObject(element)) {
        continue;
      }
      totalValue += element.total;
    }
    orderData[orderTotal] = +totalValue;
  }
}
