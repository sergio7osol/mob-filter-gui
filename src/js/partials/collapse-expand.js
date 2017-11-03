let collapseExpand = (click_el, collapseExpand_el) => {
    click_el.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        let clickElBaseClass = click_el.classList.item(0);
        let collapseExpandElbaseClass = collapseExpand_el.classList.item(0);
        let insideContainerHeight = collapseExpand_el.children[0].offsetHeight;
        console.log("insideContainerHeight: ", insideContainerHeight);
        if (click_el.classList.contains(clickElBaseClass + "--up")) {
            click_el.classList.remove(clickElBaseClass + "--up");
        } else {
            click_el.classList.add(clickElBaseClass + "--up");
        }
        if (collapseExpand_el.classList.contains(collapseExpandElbaseClass + "--show")) {
            collapseExpand_el.classList.remove(collapseExpandElbaseClass + "--show");
            collapseExpand_el.style.height = "0";
        } else {
            collapseExpand_el.classList.add(collapseExpandElbaseClass + "--show");
            collapseExpand_el.style.height = insideContainerHeight + "px";
        }
    });
}

export default collapseExpand;