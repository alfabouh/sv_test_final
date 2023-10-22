import { onClickSubmit } from '../form/form_timer';
import { WriteIn, ReadFrom } from '../form/form_helper';
import { localStorage } from '../head/main';

export function buildForm(): JQuery<HTMLFormElement> {
let form: JQuery<HTMLFormElement> = $("<form>");
form.attr("id", "mainForm");

let personData: JQuery<HTMLElement> = $("<input>");
personData.addClass("my-1");
personData.attr("type", "text");
personData.attr("id", "personData");
personData.attr("placeholder", "ФИО");

let eMail: JQuery<HTMLElement> = $("<input>");
eMail.addClass("my-1");
eMail.attr("type", "email");
eMail.attr("id", "email");
eMail.attr("placeholder", "Почта");

let phone: JQuery<HTMLElement> = $("<input>");
phone.addClass("my-1");
phone.attr("type", "tel");
phone.attr("id", "phone");
phone.attr("placeholder", "Номер телефона");

let organization: JQuery<HTMLElement> = $("<input>");
organization.addClass("my-1");
organization.attr("type", "text");
organization.attr("id", "organization");
organization.attr("placeholder", "Организация");

let message: JQuery<HTMLElement> = $("<textarea>");
message.addClass("my-1");
message.attr("rows", "4");
message.attr("id", "msg");
message.attr("placeholder", "Сообщение...");
message.css({
    resize: "none"
});
let checkBox: JQuery<HTMLElement> = $("<input>");
checkBox.attr("type", "checkbox");
checkBox.addClass("my-1");
checkBox.attr("id", "checkbox1");

let checkBoxLabel: JQuery<HTMLElement> = $("<label>");
checkBoxLabel.text("Согласен с политикой конфиденциальности");
checkBoxLabel.addClass("px-2 my-1");
checkBoxLabel.attr("for", "checkbox1");

let submit: JQuery<HTMLElement> = $("<input>");
submit.attr("value", "Отправить");
submit.attr("type", "submit");
submit.addClass("my-1");
submit.attr("id", "submit1");

personData.appendTo(form);
eMail.appendTo(form);
phone.appendTo(form);
organization.appendTo(form);
message.appendTo(form);
checkBox.appendTo(form);
checkBoxLabel.appendTo(form);
form.append("<br>");
submit.appendTo(form);

form.on("submit", (e) => {
    e.preventDefault();
});

const array: JQuery<HTMLElement>[] = [personData, eMail, phone, organization, message];

submit.on("click", () => {
    let callback: Submit = onClickSubmit(personData, eMail, phone, organization, message, checkBox);
    let sclass: string = (callback.isSuccess ? Submit.SUCCESS_CLASS : Submit.UNSUCCESS_CLASS);

    const mainDiv: JQuery<HTMLElement> = $("<div>");
    mainDiv.addClass(sclass);
    mainDiv.attr("id", "ANCHOR");

    let getAch: JQuery<HTMLElement> = $("#ANCHOR");
    getAch.remove();
    if (callback.getMSG !== null) {
        let anchorMsg: JQuery<HTMLElement> = $("<h5>");
        anchorMsg.text(callback.getMSG);
        anchorMsg.appendTo(mainDiv);
        mainDiv.appendTo(form);
        if (callback.isSuccess) {
            clearStorage(array);
        }
    }
});

load(array);
saveEvent(array);

return form;
}

function clearStorage(array: JQuery<HTMLElement>[]): void {
    array.forEach((e: JQuery<HTMLElement>) => {
        localStorage.removeItem(e.attr("id") as string);
    });
}

function load(array: JQuery<HTMLElement>[]): void {
    array.forEach((e: JQuery<HTMLElement>) => {
        e.val(ReadFrom(localStorage, e.attr("id") as string));
    });
}

function saveEvent(array: JQuery<HTMLElement>[]): void {
    array.forEach((e: JQuery<HTMLElement>) => {
        e.on("change", () => {
            WriteIn(localStorage, e.attr("id") as string, e.val() as string);
        });
    });
}

export class Submit {
    public static SUCCESS_CLASS: string = "success";
    public static UNSUCCESS_CLASS: string = "warn";

    private success: boolean;
    private message: string | null;

    constructor(success: boolean, message: string | null) {
        this.message = message;
        this.success = success;
    }

    public static SUCCESS(msg: string | null): Submit {
        return new Submit(true, msg);
    }

    public static UNSUCCESS(msg: string | null): Submit {
        return new Submit(false, msg);
    }

    public get getMSG(): string | null {
        return this.message;
    }

    public get isSuccess(): boolean {
        return this.success;
    }
}