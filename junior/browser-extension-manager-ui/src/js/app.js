import { getExtensionsListData, loadAdvice } from "./utils/utils.js";
import { setExtensionsListData } from "../config/init-state.js";
import { renderExtensionsList } from "./utils/html-generator.js";
import { initButtons } from "./components/buttons.js";
import { setTheme } from "./utils/theme.js";

localStorage.setItem("tabActive", "all");
async function init() {
  const extensionsListData = await getExtensionsListData();

  setExtensionsListData({ newValue: extensionsListData, action: "set" });
  renderExtensionsList();

  initButtons();
  loadAdvice();
}

setTheme(localStorage.getItem("theme") || "dark");

init();
