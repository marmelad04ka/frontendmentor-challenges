import { loadDashbordData } from "./utils/utils.js";
import { initButtons } from "./components/buttons.js";
import { setTheme } from "./utils/theme.js";

setTheme(localStorage.getItem("theme") || "dark");
loadDashbordData();
initButtons();
