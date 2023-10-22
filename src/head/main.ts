import { Up, Down } from '../form/form_timer';

export var localHistory: History;
export var localStorage: Storage;
var isReady: boolean = true;

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
        if (isReady) {
            Up();
            localHistory.pushState(null, "https://alfabouh.github.io/sv_test8_24gr/formpage/");
            localHistory.forward();
            isReady = false;
        }
    });

    $(window).on("popstate", () => {
        if (!isReady) {
            localHistory.replaceState(null, "", window.location.href);
            isReady = true;
            Down();
        }
    });

    _popupButton.appendTo($("#greeting"));
}