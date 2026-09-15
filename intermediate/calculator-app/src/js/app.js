import { renderCalcualtorButtons } from "./utils/html-generator.js";
import { initButtons } from "./components/buttons.js";
import { initThemeSwitcher } from "./components/theme-switcher.js";
import { setTheme } from "./utils/theme.js";
import { viewLoadingData } from "./utils/utils.js";
import { skeletonButtonContainerDom, skeletonSwitcherDom, buttonContainerDom, switcherContainerDom } from "./constants/dom-elements.js";
import { autoTest } from "./test/test.js";

renderCalcualtorButtons();
initButtons();

setTheme(localStorage.getItem('theme') || 'dark');
initThemeSwitcher();

viewLoadingData({
    skeleton: skeletonButtonContainerDom,
    visibleContent: [buttonContainerDom]
})

viewLoadingData({
    skeleton: skeletonSwitcherDom,
    visibleContent: [switcherContainerDom]
})

//autoTest();