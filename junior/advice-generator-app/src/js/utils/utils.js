import { adviceIdTextDom, advicePhraseContainerDom, adviceIdSkeletonDom, advicePhraseSkeletonDom, buttonSkeletonDom, buttonRandomGetAdviceDom } from "../constants/dom-elements.js";

export async function getAdvice() {
    const res = await fetch(`https://api.adviceslip.com/advice?t=${Date.now()}`, {
        signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    let data;

    try {
        data = await res.json();
    } catch {
        throw new Error('Response is not valid JSON');
    }

    if (!data?.slip?.id || typeof data.slip.advice !== 'string' || !data.slip.advice) {
        throw new Error('Malformed response shape');
    }
    
    return data;
}

function setHidden(elements, hidden) {
    for (const element of elements) {
        element.classList.toggle('hidden', hidden);
    }
}

const skeletonElements = [adviceIdSkeletonDom, advicePhraseSkeletonDom, buttonSkeletonDom];
const dataElements = [buttonRandomGetAdviceDom, adviceIdTextDom, advicePhraseContainerDom];

function showLoading() {
    setHidden(skeletonElements, false);
    setHidden(dataElements, true);
}

function showData() {
    setHidden(skeletonElements, true);
    setHidden(dataElements, false);
}

export async function loadAdvice() {
    showLoading();
    const minDelay = new Promise(resolve => setTimeout(resolve, 1000));
    try {
        const data = await getAdvice();
        adviceIdTextDom.textContent = data.slip.id;
        advicePhraseContainerDom.textContent = `“${data.slip.advice}”`
        await minDelay;
        showData();
    } catch (e) {
        await minDelay;
        showError();
    }
}

function showError() {
    adviceIdTextDom.textContent = '0'
    advicePhraseContainerDom.textContent = 'Error loading data. Please try again later.';
    showData();

}