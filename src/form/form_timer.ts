import { buildPopup, PopupInfo, removePopup, showPopup } from './popup';
import { buildForm, Submit,  } from './form';

var popup: PopupInfo;

export function Up(): void {
    popup = buildPopup("main");
    buildForm().appendTo(popup.getHTML);
    showPopup(popup);
}

export function Down(): void {
    removePopup(popup);
}

export function onClickSubmit(personData: JQuery<HTMLElement>, eMail: JQuery<HTMLElement>, phone: JQuery<HTMLElement>, organization: JQuery<HTMLElement>, message: JQuery<HTMLElement>, checkBox: JQuery<HTMLElement>): Submit {
    let checkSubm: Submit | null = null;

    [personData, eMail, phone, organization, message, checkBox].forEach((e) => {
        if (e === undefined) {
            checkSubm = new Submit(false, "INNER ERROR"); 
            return;
        }
        if (isFieldEmpty(e.val() as string)) {
            checkSubm = new Submit(false, "Поле <" + (e as JQuery<HTMLElement>).attr("placeholder") + "> - пустое!");
            return;
        }
    });

    if (checkSubm !== null) {
        return checkSubm;
    }

    const mailInput: string = eMail.val() as string;
    if (!mailInput.includes(".") || !mailInput.includes("@")) {
        return new Submit(false, "Поле <" + eMail.attr("placeholder") + "> - заполнено неправильно!");
    }

    if (!checkBox.is(":checked")) {
        return new Submit(false, "Нужно согласие с политикой конфиденциальности!");
    }

    const formData: FormData = new FormData();
    formData.append("First last name: ", personData.val() as string);
    formData.append("Email: ", eMail.val() as string);
    formData.append("Phone: ", phone.val() as string);
    formData.append("Organization: ", organization.val() as string);
    formData.append("Message: ", message.val() as string);
    const jsonString: string = JSON.stringify(Object.fromEntries(formData));

    $.ajax({
        url: 'https://api.slapform.com/rbPLNYL9m',
        method: 'POST',
        data: jsonString,
        dataType: "json",
        success: (e) => {
            if (!e.success) {
                return new Submit(false, "Произошла ошибка при отправке формы на сервер!");
            }
        },
        error: (e) => {
            if (e.status === 403) {
                return new Submit(false, "Ошибка 403: Доступ запрещен при отправке формы на сервер!");
            } else {
                return new Submit(false, "Произошла ошибка при отправке формы на сервер!");
            }
        }
    });
    

    window.setTimeout(() => {
        Down();
    }, 1500);

    return new Submit(true, "Успешно отправлена форма");
}

function isFieldEmpty(field: string): boolean {
    return field.trim().length <= 0;
}