(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[4],{100:function(e,t,a){"use strict";a.r(t);var n=a(46),r=a.n(n),c=a(47),i=a(52),l=a(10),o=a(0),u=a.n(o),s=a(51),p=a(59),d=a(15),f=a(54),m=a(16),v=a(62),b=a(55),O=a(61),E=a(49),h=a(11);a(97);t.default=function(){var e=Object(o.useContext)(h.a),t=Object(o.useState)(!0),a=Object(l.a)(t,2),n=a[0],j=a[1],y=Object(E.a)(),g=y.isLoading,w=y.error,I=y.sendRequest,N=y.clearError,T=Object(O.a)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),C=Object(l.a)(T,3),S=C[0],k=C[1],P=C[2],V=function(){var t=Object(c.a)(r.a.mark((function t(a){var c,i,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),!n){t.next=13;break}return t.prev=2,t.next=5,I("".concat("https://places-application.herokuapp.com","/api/users/login"),"POST",{email:S.inputs.email.value,password:S.inputs.password.value},{"content-Type":"application/json"});case 5:c=t.sent,e.login(c.data.userId,c.data.token),t.next=11;break;case 9:t.prev=9,t.t0=t.catch(2);case 11:t.next=27;break;case 13:return t.prev=13,(i=new FormData).append("name",S.inputs.name.value),i.append("email",S.inputs.email.value),i.append("password",S.inputs.password.value),i.append("image",S.inputs.image.value),t.next=21,I("".concat("https://places-application.herokuapp.com","/api/users/signup"),"POST",i);case 21:l=t.sent,e.login(l.data.user,l.data.token),t.next=27;break;case 25:t.prev=25,t.t1=t.catch(13);case 27:case"end":return t.stop()}}),t,null,[[2,9],[13,25]])})));return function(e){return t.apply(this,arguments)}}();return u.a.createElement(u.a.Fragment,null,u.a.createElement(f.a,{error:w,onClear:N}),u.a.createElement(s.a,{className:"authentication"},g&&u.a.createElement(m.a,{asOverlay:!0}),n?u.a.createElement("h2",null,"LOGIN"):u.a.createElement("h2",null,"SIGN UP"),u.a.createElement("hr",null),u.a.createElement("form",{onSubmit:V},!n&&u.a.createElement(p.a,{id:"name",element:"input",type:"text",validators:[Object(b.c)()],label:"Name",onInput:k,errorText:"Please enter a name."}),!n&&u.a.createElement(v.a,{center:!0,id:"image",onInput:k,errorText:"Please provide an image"}),u.a.createElement(p.a,{id:"email",element:"input",type:"email",validators:[Object(b.a)()],label:"Email",onInput:k,errorText:"Please enter a valid email."}),u.a.createElement(p.a,{id:"password",element:"input",label:"Password",type:"password",validators:[Object(b.b)(5)],onInput:k,errorText:"Please enter a valid password (min. 5 characters)."}),u.a.createElement(d.a,{type:"submit",disabled:!S.isValid},n?"LOGIN":" SIGNUP")),u.a.createElement(d.a,{inverse:!0,onClick:function(){n?P(Object(i.a)(Object(i.a)({},S.inputs),{},{name:{value:"",isValid:!1},image:{value:null,isValid:!1}}),!1):P(Object(i.a)(Object(i.a)({},S.inputs),{},{name:void 0,image:void 0}),S.inputs.email.isValid&&S.inputs.password.isValid),j((function(e){return!e}))}},"SWITCH TO ",n?"SIGNUP":"LOGIN")))}},48:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(8),i=a.n(c),l=a(44),o=a(17),u=(a(50),function(e){var t=r.a.createElement("div",{className:"modal ".concat(e.className),style:e.style},r.a.createElement("header",{className:"modal__header ".concat(e.headerClass)},r.a.createElement("h2",null,e.header)),r.a.createElement("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()}},r.a.createElement("div",{className:"modal__content ".concat(e.contentClass)},e.children),r.a.createElement("footer",{className:"modal__footer ".concat(e.footerClass)},e.footer)));return i.a.createPortal(t,document.getElementById("modal-hook"))});t.a=function(e){return r.a.createElement(r.a.Fragment,null,e.show&&r.a.createElement(o.a,{onClick:e.onCancel}),r.a.createElement(l.a,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal"},r.a.createElement(u,e)))}},49:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(46),r=a.n(n),c=a(47),i=a(10),l=a(0),o=a(58),u=a.n(o),s=function(){var e=Object(l.useState)(!1),t=Object(i.a)(e,2),a=t[0],n=t[1],o=Object(l.useState)(),s=Object(i.a)(o,2),p=s[0],d=s[1],f=Object(l.useRef)([]),m=Object(l.useCallback)(function(){var e=Object(c.a)(r.a.mark((function e(t){var a,c,i,l,o,s=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=s.length>1&&void 0!==s[1]?s[1]:"GET",c=s.length>2&&void 0!==s[2]?s[2]:null,i=s.length>3&&void 0!==s[3]?s[3]:{},n(!0),l=new AbortController,f.current.push(l),e.prev=6,e.next=9,u()({url:t,method:a,data:c,headers:i,signal:l.signal});case 9:if(o=e.sent,f.current=f.current.filter((function(e){return e!==l})),console.log(o.statusText),o.statusText){e.next=14;break}throw new Error(o.data.message);case 14:return n(!1),e.abrupt("return",o);case 18:throw e.prev=18,e.t0=e.catch(6),d(e.t0.response.data.message),console.log(e.t0.response.data.message),n(!1),new Error(e.t0.response.data.message);case 24:case"end":return e.stop()}}),e,null,[[6,18]])})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(l.useEffect)((function(){return function(){f.current.forEach((function(e){return e.abort()}))}}),[]),{isLoading:a,error:p,sendRequest:m,clearError:function(){d(null)}}}},50:function(e,t,a){},51:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(56);t.a=function(e){return r.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},52:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(53);function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},53:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return n}))},54:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(48),i=a(15);a(57);t.a=function(e){return r.a.createElement(c.a,{className:"errorCenter",onCancel:e.onClear,header:"An Error Occurred!",show:!!e.error,footer:r.a.createElement(i.a,{onClick:e.onClear},"Okay")},r.a.createElement("p",null,e.error))}},55:function(e,t,a){"use strict";var n=a(18);a.d(t,"c",(function(){return r})),a.d(t,"b",(function(){return c})),a.d(t,"a",(function(){return i})),a.d(t,"d",(function(){return l}));var r=function(){return{type:"REQUIRE"}},c=function(e){return{type:"MINLENGTH",val:e}},i=function(){return{type:"EMAIL"}},l=function(e,t){var a,r=!0,c=function(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=Object(n.a)(e))){var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,c,i=!0,l=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return i=e.done,e},e:function(e){l=!0,c=e},f:function(){try{i||null==r.return||r.return()}finally{if(l)throw c}}}}(t);try{for(c.s();!(a=c.n()).done;){var i=a.value;"REQUIRE"===i.type&&(r=r&&e.trim().length>0),"MINLENGTH"===i.type&&(r=r&&e.trim().length>=i.val),"MAXLENGTH"===i.type&&(r=r&&e.trim().length<=i.val),"MIN"===i.type&&(r=r&&+e>=i.val),"MAX"===i.type&&(r=r&&+e<=i.val),"EMAIL"===i.type&&(r=r&&/^\S+@\S+\.\S+$/.test(e))}}catch(l){c.e(l)}finally{c.f()}return r}},56:function(e,t,a){},57:function(e,t,a){},59:function(e,t,a){"use strict";var n=a(10),r=a(52),c=a(0),i=a.n(c),l=a(55),o=(a(60),function(e,t){switch(t.type){case"CHANGE":return Object(r.a)(Object(r.a)({},e),{},{value:t.val,isValid:Object(l.d)(t.val,t.validators)});case"TOUCH":return Object(r.a)(Object(r.a)({},e),{},{isTouched:!0});default:return e}});t.a=function(e){var t=Object(c.useReducer)(o,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),a=Object(n.a)(t,2),r=a[0],l=a[1],u=e.id,s=e.onInput,p=r.value,d=r.isValid;Object(c.useEffect)((function(){s(u,p,d)}),[u,p,d,s]);var f=function(t){l({type:"CHANGE",val:t.target.value,validators:e.validators})},m=function(){return[l({type:"TOUCH"})]},v="input"===e.element?i.a.createElement("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:f,onBlur:m,value:r.value}):i.a.createElement("textarea",{id:e.id,rows:e.rows||3,onChange:f,onBlur:m,value:r.value});return i.a.createElement("div",{className:"form-control ".concat(!r.isValid&&r.isTouched&&"form-control--invalid")},i.a.createElement("label",{htmlFor:e.id},e.label),v,!r.isValid&&r.isTouched&&i.a.createElement("p",null,e.errorText))}},60:function(e,t,a){},61:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(10),r=a(53),c=a(52),i=a(0),l=function(e,t){switch(t.type){case"INPUT_CHANGE":var a=!0;for(var n in e.inputs)e.inputs[n]&&(a=n===t.inputId?a&&t.isValid:a&&e.inputs[n].isValid);return Object(c.a)(Object(c.a)({},e),{},{inputs:Object(c.a)(Object(c.a)({},e.inputs),{},Object(r.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:a});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},o=function(e,t){var a=Object(i.useReducer)(l,{inputs:e,isValid:t}),r=Object(n.a)(a,2),c=r[0],o=r[1];return[c,Object(i.useCallback)((function(e,t,a){o({type:"INPUT_CHANGE",value:t,isValid:a,inputId:e})}),[]),Object(i.useCallback)((function(e,t){o({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},62:function(e,t,a){"use strict";var n=a(10),r=a(0),c=a.n(r),i=a(15);a(63);t.a=function(e){var t=Object(r.useState)(),a=Object(n.a)(t,2),l=a[0],o=a[1],u=Object(r.useState)(),s=Object(n.a)(u,2),p=s[0],d=s[1],f=Object(r.useState)(!1),m=Object(n.a)(f,2),v=m[0],b=m[1],O=Object(r.useRef)();Object(r.useEffect)((function(){if(l){var e=new FileReader;e.onload=function(){d(e.result)},e.readAsDataURL(l)}}),[l]);return c.a.createElement("div",{className:"form-control"},c.a.createElement("input",{id:e.id,ref:O,style:{display:"none"},type:"file",accept:".jpg,.png,.jpeg",onChange:function(t){var a,n=v;t.target.files&&1===t.target.files.length?(a=t.target.files[0],o(a),b(!0),n=!0):(b(!1),n=!1),e.onInput(e.id,a,n)}}),c.a.createElement("div",{className:"image-upload ".concat(e.center&&"center")},c.a.createElement("div",{className:"image-upload__preview"},p&&c.a.createElement("img",{src:p,alt:"Preview"}),!p&&c.a.createElement("p",null,"Please pick an image.")),c.a.createElement(i.a,{type:"button",onClick:function(){O.current.click()}},"PICK IMAGE")),!v&&c.a.createElement("p",null,e.errorText))}},63:function(e,t,a){},97:function(e,t,a){}}]);
//# sourceMappingURL=4.03dda076.chunk.js.map