import { buttonRandomGetAdviceDom } from "../constants/dom-elements.js"
import { loadAdvice } from "../utils/utils.js";

export function initButtons() {
    initGetAdviceButton();
}

function initGetAdviceButton() {
    buttonRandomGetAdviceDom.addEventListener('click', loadAdvice)
}