import { initAccordions } from "./components/accordion.js";
import { renderFaqList } from "./utils/html-generator.js";
import { loadFaq } from "./utils/utils.js";

renderFaqList();
initAccordions();
loadFaq();
