import { faqList } from "../../config/init-state.js";
import { accordionListDom } from "../constant/dom-elements.js";

export async function renderFaqList() {
  accordionListDom.innerHTML = getFaqListTemplate();
}

function getFaqListTemplate() {
  let faqListHtml = ``;
  let isOpen = false;
  Object.values(faqList).forEach((element) => {
    if (element.number === 1) {
      isOpen = true;
    }

    faqListHtml += getFaqListHtml({
      number: element.number,
      question: element.question,
      answer: element.answer,
      isOpen: isOpen,
    });

    isOpen = false;
  });

  return faqListHtml;
}

function getFaqListHtml({ number, question, answer, isOpen }) {
  const openAttribute = isOpen ? "open" : "";

  return `
    <details class="accordion-item" ${openAttribute}>
        <summary class="accordion-item-question">
            <h3 class="accordion-item-heading">
                <span class="accordion-item-question-text">${question}</span>
            </h3>
            <img src="images/icon-plus.svg" alt="" class="img-switches">
        </summary>
        <div class="accordion-item-answer" id="answer-${number}">
            <p>${answer}</p>
        </div>
    </details>
    `;
}
