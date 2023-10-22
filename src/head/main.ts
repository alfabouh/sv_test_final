import { Up, Down } from '../form/form_timer';
export var localHistory: History;
export var localStorage: Storage;

$(() => {
    localStorage = window.localStorage;
    localHistory = window.history;
    showPopupButton();
});

function showPopupButton(): void {
    let _popupButton: JQuery<HTMLElement> = $("<input>");
    _popupButton.attr('type', 'submit');
    _popupButton.val("Заполнить форму");

    _popupButton.on("click", () => {
        if (Up()) {
            localHistory.pushState(null, "./formpage/");
            localHistory.forward();
        }
    });

    $(window).on("popstate", () => {
        Down();
    });

    _popupButton.appendTo($("#greeting"));
}