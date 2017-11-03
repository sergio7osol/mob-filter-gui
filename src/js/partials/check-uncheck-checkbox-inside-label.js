let checkUncheckCheckboxInsideLabel = function(label_list, labelActiveClass_str) {
    let checkbox = null;
    let label = null;
    console.log("label_list: ", label_list);
    for (let i = 0; i < label_list.length; i++) {
        let child = null;
        label = label_list[i];
        child = label.firstElementChild;
        while (child) {
            if (child.tagName === "INPUT" && child.type === "checkbox") {
                child.addEventListener("change", function(e){
                    e.stopPropagation();
                    let input = e.target;
                    let parentLabel = input.parentElement;
                    if (input.checked) {
                        parentLabel.classList.add(labelActiveClass_str);
                    } else {
                        parentLabel.classList.remove(labelActiveClass_str);
                    }
                }, false);
                break;
            }
            child = label.nextElementSibling;
        }
    }
}

export default checkUncheckCheckboxInsideLabel;