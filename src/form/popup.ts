const PHONE_BREAKPOINT: number = 768;
export const idx: string = "_popup";
import { localHistory } from '../head/main';

export function removePopup(popup: PopupInfo): void {
	smoothPopupClose(popup);
}

export function showPopup(popup: PopupInfo): void {
	smoothPopupShow([new FadeTarget(popup.getHTML, 1.0), new FadeTarget(popup.getOverlay, 0.5)]);
}

export function buildPopup(appendTo: string): PopupInfo {
	let _popup: any = $("<div>");
	let _overlay: any = $("<div>");

	_popup.attr("id", idx);
	_popup.addClass("popup");
	_popup.addClass("p-2");
	_overlay.addClass("overlay");

	$(_popup).css({
		opacity: 0.0
	});

	$(_overlay).css({
		opacity: 0.0
	});

	_overlay.appendTo(appendTo);
	_popup.appendTo($("#popup_anchor"));

	resetSize(_popup);
	$(window).on("resize", () => {
		resetSize(_popup);
	});

	return new PopupInfo(_overlay, _popup, idx);
}

function resetSize(html: any): void {
	const winW: any = $(window).width();
	if (winW <= PHONE_BREAKPOINT) {
		$(html).css({
			left: "0%",
			top: "0%",
			width: "100%",
			height: "100%"
		});
	} else {
		$(html).css({
			width: "50%",
			height: "45%"
		});
		let offsetX: number = html.width() / 2.0;
		let offsetY: number = html.height() / 2.0;
		$(html).css({
			left: "calc(50% - " + offsetX + "px)",
			top: "calc(50% - " + offsetY + "px)"
		});
	}
}

function smoothPopupShow(targets: FadeTarget[]) : void {
	let startOpacity: number = 0.0;
	const delta: number = 7.5e-3;
	targets.forEach((e) => {
		let localTimerId = setInterval(() => {
			startOpacity += delta * e.getTarget;
			$(e.getHTML).css({
				opacity: startOpacity
			});
			if (startOpacity >= e.getTarget) {
				clearInterval(localTimerId);
			}
		}, 1);
	});
}

function smoothPopupClose(popup: PopupInfo) : void {
	const delta: number = 10.25e-3;
	[popup.getHTML, popup.getOverlay].forEach((e: HTMLElement) => {
		const elem: JQuery<HTMLElement> = $(e);
		let startOpacity: number = parseFloat(elem.css("opacity"));
		let localTimerId = setInterval(() => {
			startOpacity -= delta;
			elem.css({
				opacity: startOpacity
			});
			if (startOpacity <= 0.0) {
				window.setTimeout(() => {
					popup.getHTML.remove();
					popup.getOverlay.remove();
					localHistory.replaceState(null, "", window.location.href);
				}, 1500);
				clearInterval(localTimerId);
			}
		}, 1);
	});
}

export class PopupInfo {
	private html: HTMLElement;
	private overlay: HTMLElement;
	private idx: string;

	constructor(overlay: HTMLElement, html: HTMLElement, idx: string) {
		this.overlay = overlay;
		this.html = html;
		this.idx = idx;
	}

	public get getOverlay(): HTMLElement {
		return this.overlay;
	}

	public get getHTML(): HTMLElement {
		return this.html;
	}

	public get getIDX(): string {
		return this.idx;
	}
}

class FadeTarget {
	private html: HTMLElement;
	private target: number;

	constructor(html: HTMLElement, target: number) {
		this.html = html;
		this.target = target;
	}

	public get getHTML(): HTMLElement {
		return this.html;
	}

	public get getTarget(): number {
		return this.target;
	}
}