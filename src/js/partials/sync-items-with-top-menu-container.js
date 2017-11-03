let syncItemsWithTopMenuContainer = function(containerToPutInto_el, elsToPutToFilter_list) {
    console.log("containerToPutInto_el: ", containerToPutInto_el);
    console.log("elsToPutToFilter_list: ", elsToPutToFilter_list);
    for (let i = 0; i < elsToPutToFilter_list.length; i++) {
        let checkbox_el = null;
        checkbox_el = elsToPutToFilter_list[i].querySelector("[type='checkbox']");
        checkbox_el.addEventListener("change", function(e){
            let checkbox = e.target;
            let elToClone_el = null;
            elToClone_el = e.target.parentElement.parentElement;
            if (checkbox.checked) {
                let dupNode = null;
                let dupNodeCheckbox = null;
                let elToPutIntoContainer = null;
                dupNode = elToClone_el.cloneNode(true);
                dupNode.addEventListener("click", function(e){
                    e.preventDefault();
                    let item = e.target;
                    let categoryNum = item.getAttribute("data-category");
                    let clickEvent = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    });
                    checkbox.dispatchEvent(clickEvent);
                });
                elToPutIntoContainer = document.createElement("li");
                elToPutIntoContainer.classList.add("top-menu-container__item");
                elToPutIntoContainer.appendChild(dupNode);
                containerToPutInto_el.appendChild(elToPutIntoContainer);
            } else {
                let dataCategory = elToClone_el.getAttribute("data-category");
                let topContainerItem_el = containerToPutInto_el.querySelector(`[data-category="${dataCategory}"]`);
                topContainerItem_el.parentElement.remove();
            }
        });
    }
}

export default syncItemsWithTopMenuContainer;