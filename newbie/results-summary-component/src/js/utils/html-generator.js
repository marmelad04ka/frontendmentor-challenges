import { summaryInfoBlockDom } from "../constants/dom-elements.js";
import { testResultData, setGeneralResult } from "../../config/init-state.js";
import { SET_REACTION_COLOR, SET_MEMORY_COLOR, SET_VERBAL_COLOR, SET_VISUAL_COLOR } from "../../config/css-classes.js";

export function renderTestResult() {
    summaryInfoBlockDom.innerHTML = getTestResultTemplate();
}

function getTestResultTemplate() {
    let testResultHtml = ``;
    let cssClass;
    let generalResult = 0;
    for (const element of testResultData) {
        switch(element.category) {
            case 'Reaction':
                cssClass = SET_REACTION_COLOR;
                break;
            case 'Memory':
                cssClass = SET_MEMORY_COLOR;
                break;
            case 'Verbal':
                cssClass = SET_VERBAL_COLOR;
                break;
            case 'Visual':
                cssClass = SET_VISUAL_COLOR;
                break;
        }
        
        testResultHtml += getTestResultInfoHtml({
            image: element.icon,
            name: element.category,
            result: element.score,
            cssClass: cssClass
        })

        generalResult += element.score;
    }

    setGeneralResult(Math.trunc(generalResult/testResultData.length));
    return testResultHtml;
}

function getTestResultInfoHtml({image, name, result, cssClass}) {
    return `
    <li class = "summary-info-block-element ${cssClass}">
        <div class = "summary-info-block-element-image">
            <img src="${image}" alt="">
        </div>
        <div class = "summary-info-block-element-name">
            ${name}
        </div>

        <div class = "summary-info-block-element-result">
            <strong class = "summary-info-block-element-value">
                ${result}
            </strong>
            
            <span class="summary-info-block-element-separator">
                /
            </span>

            <span class = "summary-info-block-element-maximum">
                100
            </span>
        </div>
    </li>
    `
}