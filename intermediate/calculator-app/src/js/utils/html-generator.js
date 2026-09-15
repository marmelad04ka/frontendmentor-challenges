import { calculatorButtons } from "../../config/init-state.js"
import { buttonContainerDom } from "../constants/dom-elements.js";
import { 
    BTN_CONTROL,
    BTN_EQUALS
} from "../constants/css-classes.js";

export function renderCalcualtorButtons() {
    buttonContainerDom.innerHTML = getCalculatorButtonsTemplate();
}

function getCalculatorButtonsTemplate() {
    let calculatorButtonsHtml = ``;

    for (const element of calculatorButtons) {
        let cssClass;

        if (element === 'DEL' || element === 'RESET') {
            cssClass = BTN_CONTROL;
        } 

        if (element === '=') {
            cssClass = BTN_EQUALS
        } 

        calculatorButtonsHtml += getCalculatorButtonHtml({value: element, cssClass: cssClass})
    }
    
    return calculatorButtonsHtml;
}

function getCalculatorButtonHtml({value, cssClass}) {
    let cssClassAdd = ``;

    if (cssClass) {
        cssClassAdd = `class="${cssClass}"`;
    }

    return `
    <button ${cssClassAdd} type="button" data-button-value="${value}">
        ${value}
    </button>
    `
}