import { setTheme } from "../utils/theme.js";
import { switcherContainerDom, moveCircleSwitcherContainerDom } from "../constants/dom-elements.js";
import { ALIGN_START, ALIGN_CENTER, ALIGN_END } from "../constants/css-classes.js";

export function initThemeSwitcher() {
    themeSwitcher();
}

function themeSwitcher() {
    moveCircleSwitcherContainerDom.addEventListener('click', () => {

        if (switcherContainerDom.classList.contains(ALIGN_START)) {
            setTheme('light')
            return
        }

        if (switcherContainerDom.classList.contains(ALIGN_CENTER)) {
            setTheme('custom')
            return
        }

        if (switcherContainerDom.classList.contains(ALIGN_END)) {
            setTheme('dark')
            return
        }
    })
}