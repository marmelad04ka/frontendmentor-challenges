export async function getTestResultData() {
    const response = await fetch('data/data.json'); 
    const db = await response.json();

    return db;
}

export function viewLoadingData({skeleton, visibleContent}) {
    skeleton.classList.add('hidden')

    for (const element of visibleContent) {
        element.classList.remove('hidden')
    }
}