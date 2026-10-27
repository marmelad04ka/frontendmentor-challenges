import { loadProductListData } from "./utils/utils.js";
import { initButtons } from "./components/button.js";

async function init() {
  await loadProductListData();
  initButtons();
}

init();
