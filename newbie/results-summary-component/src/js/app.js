import { getTestResultData,  viewLoadingData } from "./utils/utils.js";
import { setTestResultData, generalResult } from "../config/init-state.js";
import { renderTestResult } from "./utils/html-generator.js";
import { 
    resultValueDom, 
    skeletonResultViewBlockDom, 
    skeletonSummaryBlockDom, 
    buttonBlockDom, 
    summaryInfoBlockDom,
    whoseResultBlock,
    assessmentHigherThanBlockDom
} from "./constants/dom-elements.js";

async function init() {
    const testResultData = await getTestResultData();
    setTestResultData(testResultData);
    renderTestResult();

    resultValueDom.textContent = generalResult;

    viewLoadingData({
        skeleton: skeletonSummaryBlockDom,
        visibleContent: [summaryInfoBlockDom, buttonBlockDom]
    })

    viewLoadingData({
        skeleton: skeletonResultViewBlockDom,
        visibleContent: [whoseResultBlock, assessmentHigherThanBlockDom]
    })
}

init();