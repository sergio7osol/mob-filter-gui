import '../less/main.less';

import collapseExpand from './partials/collapse-expand';
import activeUnactiveLabel from './partials/check-uncheck-checkbox-inside-label';
import syncItemsWithTopMenuContainer from './partials/sync-items-with-top-menu-container.js';

window.collapseExpand = collapseExpand;

let toClick_list = document.querySelectorAll(".collapse-expand .collapse-expand__header");
let header_el = null; // __header DOM element from the toClick_list NodeList
let body_el = null; // __body DOM element from the toClick_list NodeList

for (var i = 0; i < toClick_list.length; i++) {
    header_el = toClick_list[i];
    body_el = header_el.parentNode.children[1];
    collapseExpand(header_el, body_el);
}

let categoryLabels = document.querySelectorAll(".collapse-expand--categories .multi-sel-item-type-1__label");
activeUnactiveLabel(categoryLabels, "multi-sel-item-type-1__label--active");

let topMenuContainer = document.querySelector(".top-menu-container .ul-reset");
let elsToSyncWithContainer = document.querySelectorAll(".collapse-expand--categories [data-category]");
syncItemsWithTopMenuContainer(topMenuContainer, elsToSyncWithContainer);

