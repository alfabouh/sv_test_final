(()=>{"use strict";var t={884:(t,e,a)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Submit=e.buildForm=void 0;const o=a(492),r=a(728),n=a(694);e.buildForm=function(){let t=$("<form>");t.attr("id","mainForm");let e=$("<input>");e.addClass("my-1"),e.attr("type","text"),e.attr("id","personData"),e.attr("placeholder","ФИО");let a=$("<input>");a.addClass("my-1"),a.attr("type","email"),a.attr("id","email"),a.attr("placeholder","Почта");let s=$("<input>");s.addClass("my-1"),s.attr("type","tel"),s.attr("id","phone"),s.attr("placeholder","Номер телефона");let l=$("<input>");l.addClass("my-1"),l.attr("type","text"),l.attr("id","organization"),l.attr("placeholder","Организация");let c=$("<textarea>");c.addClass("my-1"),c.attr("rows","4"),c.attr("id","msg"),c.attr("placeholder","Сообщение..."),c.css({resize:"none"});let p=$("<input>");p.attr("type","checkbox"),p.addClass("my-1"),p.attr("id","checkbox1");let d=$("<label>");d.text("Согласен с политикой конфиденциальности"),d.addClass("px-2 my-1"),d.attr("for","checkbox1");let u=$("<input>");u.attr("value","Отправить"),u.attr("type","submit"),u.addClass("my-1"),u.attr("id","submit1"),e.appendTo(t),a.appendTo(t),s.appendTo(t),l.appendTo(t),c.appendTo(t),p.appendTo(t),d.appendTo(t),t.append("<br>"),u.appendTo(t),t.on("submit",(t=>{t.preventDefault()}));const m=[e,a,s,l,c];return u.on("click",(()=>{let r=(0,o.onClickSubmit)(e,a,s,l,c,p),d=r.isSuccess?i.SUCCESS_CLASS:i.UNSUCCESS_CLASS;const u=$("<div>");if(u.addClass(d),u.attr("id","ANCHOR"),$("#ANCHOR").remove(),null!==r.getMSG){let e=$("<h5>");e.text(r.getMSG),e.appendTo(u),u.appendTo(t),r.isSuccess&&function(t){t.forEach((t=>{n.localStorage.removeItem(t.attr("id"))}))}(m)}})),function(t){t.forEach((t=>{t.val((0,r.ReadFrom)(n.localStorage,t.attr("id")))}))}(m),function(t){t.forEach((t=>{t.on("change",(()=>{(0,r.WriteIn)(n.localStorage,t.attr("id"),t.val())}))}))}(m),t};class i{constructor(t,e){this.message=e,this.success=t}static SUCCESS(t){return new i(!0,t)}static UNSUCCESS(t){return new i(!1,t)}get getMSG(){return this.message}get isSuccess(){return this.success}}e.Submit=i,i.SUCCESS_CLASS="success",i.UNSUCCESS_CLASS="warn"},728:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ReadFrom=e.WriteIn=void 0,e.WriteIn=(t,e,a)=>{t.setItem(e,a),console.log("Saved: "+e+" - "+a)},e.ReadFrom=(t,e)=>{let a=t.getItem(e);return console.log("Read: "+e+" - "+a),a}},492:(t,e,a)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.onClickSubmit=e.Down=e.Up=void 0;const o=a(63),r=a(884);var n;function i(){(0,o.removePopup)(n)}e.Up=function(){n=(0,o.buildPopup)("main"),(0,r.buildForm)().appendTo(n.getHTML),(0,o.showPopup)(n)},e.Down=i,e.onClickSubmit=function(t,e,a,o,n,s){let l=null;if([t,e,a,o,n,s].forEach((t=>{void 0!==t?t.val().trim().length<=0&&(l=new r.Submit(!1,"Поле <"+t.attr("placeholder")+"> - пустое!")):l=new r.Submit(!1,"INNER ERROR")})),null!==l)return l;const c=e.val();if(!c.includes(".")||!c.includes("@"))return new r.Submit(!1,"Поле <"+e.attr("placeholder")+"> - заполнено неправильно!");if(!s.is(":checked"))return new r.Submit(!1,"Нужно согласие с политикой конфиденциальности!");const p=new FormData;p.append("First last name: ",t.val()),p.append("Email: ",e.val()),p.append("Phone: ",a.val()),p.append("Organization: ",o.val()),p.append("Message: ",n.val());const d=JSON.stringify(Object.fromEntries(p));return $.ajax({url:"https://api.slapform.com/rbPLNYL9m",method:"POST",data:d,dataType:"json",success:t=>{if(!t.success)return new r.Submit(!1,"Произошла ошибка при отправке формы на сервер!")},error:t=>403===t.status?new r.Submit(!1,"Ошибка 403: Доступ запрещен при отправке формы на сервер!"):new r.Submit(!1,"Произошла ошибка при отправке формы на сервер!")}),window.setTimeout((()=>{i()}),1500),new r.Submit(!0,"Успешно отправлена форма")}},63:(t,e,a)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.PopupInfo=e.buildPopup=e.showPopup=e.removePopup=e.idx=void 0;e.idx="_popup";const o=a(694);function r(t){if($(window).width()<=768)$(t).css({left:"0%",top:"0%",width:"100%",height:"100%"});else{$(t).css({width:"50%",height:"45%"});let e=t.width()/2,a=t.height()/2;$(t).css({left:"calc(50% - "+e+"px)",top:"calc(50% - "+a+"px)"})}}e.removePopup=function(t){!function(t){[t.getHTML,t.getOverlay].forEach((e=>{const a=$(e);let r=parseFloat(a.css("opacity")),n=setInterval((()=>{r-=.01025,a.css({opacity:r}),r<=0&&(window.setTimeout((()=>{t.getHTML.remove(),t.getOverlay.remove(),o.localHistory.replaceState(null,"",window.location.href)}),1500),clearInterval(n))}),1)}))}(t)},e.showPopup=function(t){!function(t){let e=0;t.forEach((t=>{let a=setInterval((()=>{e+=.0075*t.getTarget,$(t.getHTML).css({opacity:e}),e>=t.getTarget&&clearInterval(a)}),1)}))}([new i(t.getHTML,1),new i(t.getOverlay,.5)])},e.buildPopup=function(t){let a=$("<div>"),o=$("<div>");return a.attr("id",e.idx),a.addClass("popup"),a.addClass("p-2"),o.addClass("overlay"),$(a).css({opacity:0}),$(o).css({opacity:0}),o.appendTo(t),a.appendTo($("#popup_anchor")),r(a),$(window).on("resize",(()=>{r(a)})),new n(o,a,e.idx)};class n{constructor(t,e,a){this.overlay=t,this.html=e,this.idx=a}get getOverlay(){return this.overlay}get getHTML(){return this.html}get getIDX(){return this.idx}}e.PopupInfo=n;class i{constructor(t,e){this.html=t,this.target=e}get getHTML(){return this.html}get getTarget(){return this.target}}},694:(t,e,a)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.localStorage=e.localHistory=void 0;const o=a(492);var r=!0;$((()=>{e.localStorage=window.localStorage,e.localHistory=window.history,function(){let t=$("<input>");t.attr("type","submit"),t.val("Заполнить форму"),t.on("click",(()=>{r&&((0,o.Up)(),e.localHistory.pushState(null,"https://alfabouh.github.io/sv_test8_24gr/formpage/"),e.localHistory.forward(),r=!1)})),$(window).on("popstate",(()=>{r||(e.localHistory.replaceState(null,"",window.location.href),r=!0,(0,o.Down)())})),t.appendTo($("#greeting"))}()}))}},e={};!function a(o){var r=e[o];if(void 0!==r)return r.exports;var n=e[o]={exports:{}};return t[o](n,n.exports,a),n.exports}(694)})();