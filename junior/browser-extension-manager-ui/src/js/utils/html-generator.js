import { extensionsListDom } from "../constant/dom-element.js";
import { extensionsListData } from "../../config/init-state.js";

export function renderExtensionsList() {
  extensionsListDom.innerHTML = getExtensionsListTemplate();
}

function getExtensionsListTemplate() {
  let extensionsListHtml = ``;
  const activeTab = localStorage.getItem("tabActive") || "all";
  for (let i = 0; i < extensionsListData.length; i++) {
    const element = extensionsListData[i];
    const matches =
      activeTab === "all" ||
      (activeTab === "active" && element.isActive === true) ||
      (activeTab === "inactive" && element.isActive === false);

    if (!matches) continue;

    extensionsListHtml += getExtensionElementInfoHtml({
      id: i,
      image: element.logo,
      name: element.name,
      description: element.description,
      isActive: element.isActive,
    });
  }

  if (extensionsListHtml === "") {
    extensionsListHtml += `
    <div class='empty-list'>
      Empty list
    </div>
    `;
  }
  return extensionsListHtml;
}

function getExtensionElementInfoHtml({
  id,
  image,
  name,
  description,
  isActive,
}) {
  let switcherPosition = "align-start";

  if (isActive) {
    switcherPosition = "align-end";
  }

  return `
    <li class="extensions-element">
  
      <header class="extensions-element-header">

        <div class="extensions-element-image">
            <img src="${image}" alt="" aria-hidden="true">
        </div>

        <div class="extensions-element-info">
          <h2 class="element-name" id="ext-name-${id}">${name}</h2>

          <p class="element-description">
            ${description}
          </p>
        </div>

      </header>

      <footer class="extensions-element-footer">
        <button type="button" class="button-remove" aria-labelledby="ext-name-${id}" data-remove-btn-value="${name}">Remove</button>

        <div 
          class="switcher-container ${switcherPosition}" 
          data-extensions-value="${name}" 
          tabindex="0"
          role="switch"
          aria-checked="${isActive}"
          aria-labelledby="ext-name-${id}"
          aria-label="Enable or disable the extension">
            <button 
            type="button"
            class="move-circle-switcher-container"
            tabindex="-1"
            aria-hidden="true">
            </button>
        </div>
      </footer>
    

      <div 
        class="deletion-confirmation hidden"
        role="alertdialog"
        aria-labelledby="delete-question-${id}"
        aria-modal="true">
          <div class="header-delete-question" id="delete-question-${id}">
            Delete extensions ${name} ?
          </div>

          <div class="delete-button-question">
            <button class="button-delete-yes" aria-label="Yes, delete ${name}" data-button-delete-yes="${name}">Yes</button>
            <button class="button-delete-no" aria-label="No, keep ${name}" data-button-delete-no="${name}">No</button>
          </div>
      </div>
    </li>
    `;
}
