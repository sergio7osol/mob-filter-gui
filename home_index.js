
//function SetUpButton(buttonName, buttonNextName, buttonPrevName, bgContainerName) {
//    $("body").on("click", buttonName, function (e) {
//        e.preventDefault();
//        var page = $(this).data("page");
//        var maxPage = $(this).data("maxpage");
//        console.log(page + " " + maxPage);

//        var nextPage = page < maxPage ? page + 1 : 1;
//        var previousPage = page > 1 ? page - 1 : maxPage;

//        $(bgContainerName).css('opacity', '0');
//        $(bgContainerName + "[data-page='" + page + "']").css('opacity', '1');

//        $(bgContainerName).css('z-index', '-1');
//        $(bgContainerName + "[data-page='" + page + "']").css('z-index', '0');

//        $(buttonNextName).data("page", nextPage);
//        $(buttonPrevName).data("page", previousPage);
//    });
//}

document.addEventListener("DOMContentLoaded", function (e) {
    bunnerSlider(".landing-campaigns");
}, false);

function bunnerSlider(containerSel) {
    console.log("bunnerSlider");
    var container_list = null; // container DOM elements list
    var container_el = null; // container DOM element
    var slides_list = null; // slides list
    var slides_list_length = null; // slides list length
    var leadingSlide = null; // first slide to move all subsequent slides
    var activeSlide = null; // active slide
    var btnCtrl = null; // banner controll button next/prev
    var btn_list = null; // slider buttons list
    var btn_list_length = null; // slider buttons list length

    container_list = document.querySelectorAll(containerSel);
    console.log("container_list.length: ", container_list.length);

    for (var i = 0; i < container_list.length; i++) {
        container_el = container_list[i];
        console.log("container_el: ", container_el);
        slides_list = container_el.querySelectorAll(".banner-page");
        slides_list_length = slides_list.length;
        btn_list = container_el.querySelectorAll(".banner-control");
        btn_list_length = btn_list.length;
        console.log("btn_list: ", btn_list);

        if (slides_list_length && btn_list_length) {
            console.log("slides_list: ", slides_list);
            leadingSlide = container_el.querySelector("[data-page='1']");
            console.log("leadingSlide: ", leadingSlide);
            for (var j = 0; j < btn_list_length; j++) {
                (function btnPrevNext(el) {
                    el.addEventListener("click", function (e) {
                        var activeSlideNum = null; // the slide which is currently shown - i.e. is on top of the others
                        var futureSlideNum = null; // the slide number after click

                        activeSlideNum = (function () {
                            var curr_el = null; // current element
                            for (var i = 0; i < slides_list.length; i++) {
                                curr_el = slides_list[i];
                                if (curr_el.classList.contains("active")) {
                                    return parseInt(curr_el.dataset.page);
                                }
                            }
                        }());
                        console.log("activeSlideNum: ", activeSlideNum);
                        if (el.classList.contains("banner-previous")) {
                            console.log("banner-previous");
                            futureSlideNum = activeSlideNum - 1;
                            if (futureSlideNum <= 0) {
                                futureSlideNum = slides_list_length;
                            }
                        } else if (el.classList.contains("banner-next")) {
                            console.log("banner-next");
                            futureSlideNum = activeSlideNum + 1;
                            if (futureSlideNum > btn_list_length) {
                                futureSlideNum = 1;
                            }
                        }
                        container_el.querySelector(".active[data-page]").classList.remove("active");
                        leadingSlide.style.marginLeft = -(activeSlideNum * 100 - 100) + "%";
                        container_el.querySelector("[data-page='" + futureSlideNum + "']").classList.add("active");
                    }, false);
                }(btn_list[j]));
            }
        } else {
            console.log("Button DOM element for " + container_el + " .banner-next not found!");
        }
    }


    //btnCtrl = ".banner-next";
    //$("body").on("click", buttonName, function (e) {
    //    e.preventDefault();
    //    var page = $(this).data("page");
    //    var maxPage = $(this).data("maxpage");
    //    console.log(page + " " + maxPage);

    //    var nextPage = page < maxPage ? page + 1 : 1;
    //    var previousPage = page > 1 ? page - 1 : maxPage;

    //    $(bgContainerName).css('opacity', '0');
    //    $(bgContainerName + "[data-page='" + page + "']").css('opacity', '1');

    //    $(bgContainerName).css('z-index', '-1');
    //    $(bgContainerName + "[data-page='" + page + "']").css('z-index', '0');

    //    $(buttonNextName).data("page", nextPage);
    //    $(buttonPrevName).data("page", previousPage);
    //});
}

//SetUpButton(".js-banner-next", ".js-banner-next", ".js-banner-previous", ".js-banner-page");
//SetUpButton(".js-banner-previous", ".js-banner-next", ".js-banner-previous", ".js-banner-page");
//SetUpButton(".js-account-next", ".js-account-next", ".js-account-previous", ".js-account-page");
//SetUpButton(".js-account-previous", ".js-account-next", ".js-account-previous", ".js-account-page");

$(document).ready(function () {
    var i = $("#modal-buy-dialog-email-confirmation").data('period');

    $("#modal-buy-dialog-email-confirmation").modal('show');
    if ($("#modal-training-page").length > 0) {
        enableScroll(false);
        $("#modal-training-page").modal('show');
    }

    $('#btnClosePopup').on("click", function (e) {
        enableScroll(true);
    });    

    function timeout() {
        if (i > 0) {
            $("#btnClosePopup").text("Закрыть (" + i + " сек)");
            i = i - 1;
            setTimeout(timeout, 1000);
        } else {
            $("#modal-buy-dialog-email-confirmation").modal('hide');
        }
    };

    if (i > 0) {
        timeout();
    }

    bindMouseWheelForScroll();
    bindKeyDownForScroll();

    $("body").on("click", ".js-scroll-to-statistics", function () {
        scrollToStatistics();
    });

    $("body").on("click", ".js-scroll-to-banners", function () {
        scrollToBanners();
    });
});