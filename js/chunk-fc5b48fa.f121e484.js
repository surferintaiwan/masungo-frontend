(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fc5b48fa"],{"06c5":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));r("a630"),r("fb6a"),r("b0c0"),r("d3b7"),r("25f0"),r("3ca3");var n=r("6b75");function a(e,t){if(e){if("string"===typeof e)return Object(n["a"])(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n["a"])(e,t):void 0}}},"6b75":function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},"852e":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",{staticClass:"nav nav-tabs"},[r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"nav-link",attrs:{to:"/member/orders"}},[e._v("查詢訂單")])],1),r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"nav-link",attrs:{to:"/member/edit"}},[e._v("會員資料")])],1),r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"nav-link",attrs:{to:"/member/followings"}},[e._v("追蹤清單")])],1),r("li",{staticClass:"nav-item",on:{click:e.logout}},[r("router-link",{staticClass:"nav-link",attrs:{to:"#"}},[e._v("登出")])],1)])},a=[],i={methods:{logout:function(){console.log(123),this.$store.commit("revokeAuthentication"),this.$router.push("/signin")}}},o=i,s=r("2877"),c=Object(s["a"])(o,n,a,!1,null,null,null);t["a"]=c.exports},a630:function(e,t,r){var n=r("23e7"),a=r("4df4"),i=r("1c7e"),o=!i((function(e){Array.from(e)}));n({target:"Array",stat:!0,forced:o},{from:a})},d28b:function(e,t,r){var n=r("746f");n("iterator")},da9f:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container py-5"},[r("MemberTabs"),r("form",{staticClass:"w-100",on:{submit:function(t){return t.preventDefault(),t.stopPropagation(),e.handleSubmit(t)}}},[r("div",{staticClass:"form-label-group mb-2"},[r("label",{attrs:{for:"name"}},[e._v("姓名")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{id:"name",name:"name",type:"text",placeholder:"name",required:"",autofocus:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),r("div",{staticClass:"form-label-group mb-3"},[r("label",{attrs:{for:"email"}},[e._v("email")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{id:"email",name:"email",type:"email",placeholder:"email",required:"",disabled:""},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),r("div",{staticClass:"form-label-group mb-3"},[r("div",[e._v("性別")]),r("div",{staticClass:"form-check form-check-inline"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.gender,expression:"gender"}],staticClass:"form-check-input",attrs:{type:"radio",name:"gender",id:"male",value:"1"},domProps:{checked:e._q(e.gender,"1")},on:{change:function(t){e.gender="1"}}}),r("label",{staticClass:"form-check-label",attrs:{for:"male"}},[e._v("男")])]),r("div",{staticClass:"form-check form-check-inline"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.gender,expression:"gender"}],staticClass:"form-check-input",attrs:{type:"radio",name:"gender",id:"female",value:"2"},domProps:{checked:e._q(e.gender,"2")},on:{change:function(t){e.gender="2"}}}),r("label",{staticClass:"form-check-label",attrs:{for:"female"}},[e._v("女")])])]),r("div",{staticClass:"form-label-group mb-3"},[r("label",{attrs:{for:"birthday"}},[e._v("生日")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.birthday,expression:"birthday"}],staticClass:"form-control hasDatepicker",attrs:{id:"birthday",name:"birthday",type:"date",placeholder:"birthday",required:""},domProps:{value:e.birthday},on:{input:function(t){t.target.composing||(e.birthday=t.target.value)}}})]),r("button",{staticClass:"btn btn-lg btn-primary btn-block mb-3",attrs:{disabled:e.isProcessing,type:"submit"}},[e._v("Submit")])])],1)},a=[];r("b0c0"),r("d3b7"),r("ddb0");function i(e){if(Array.isArray(e))return e}r("a4d3"),r("e01a"),r("d28b"),r("e260"),r("3ca3");function o(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done);n=!0)if(r.push(o.value),t&&r.length===t)break}catch(c){a=!0,i=c}finally{try{n||null==s["return"]||s["return"]()}finally{if(a)throw i}}return r}}var s=r("06c5");function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e,t){return i(e)||o(e,t)||Object(s["a"])(e,t)||c()}function u(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=Object(s["a"])(e))){var t=0,r=function(){};return{s:r,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,a,i=!0,o=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){o=!0,a=e},f:function(){try{i||null==n["return"]||n["return"]()}finally{if(o)throw a}}}}r("96cf");var d=r("1da1"),m=r("4cce"),f=r("852e"),v=r("2fa3"),b={components:{MemberTabs:f["a"]},data:function(){return{name:"",email:"",gender:"",birthday:"",isProcessing:!1}},created:function(){this.getCurrentUser()},methods:{getCurrentUser:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m["a"].getCurrentUser();case 3:if(r=t.sent,n=r.data,a=r.statusText,console.log(r),"OK"===a){t.next=8;break}throw new Error(a);case 8:e.name=n.user.name,e.email=n.user.email,e.gender=n.user.gender,e.birthday=n.user.birthday,t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](0),console.log(t.t0),v["a"].fire({icon:"error",title:"無法獲取會員資料"});case 18:case"end":return t.stop()}}),t,null,[[0,14]])})))()},handleSubmit:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var r,n,a,i,o,s,c,d,f,b;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:t.prev=0,e.isProcessing=!0,r=event.target,n=new FormData(r),a=u(n.entries());try{for(a.s();!(i=a.n()).done;)o=l(i.value,2),s=o[0],c=o[1],console.log(s+": "+c)}catch(p){a.e(p)}finally{a.f()}return t.next=8,m["a"].updateUser(n);case 8:if(d=t.sent,f=d.data,b=d.statusText,console.log(f,b),"OK"===b&&"success"===f.status){t.next=13;break}throw new Error(b);case 13:v["a"].fire({icon:"success",title:"個人資料更新成功"}),e.isProcessing=!1,t.next=22;break;case 17:t.prev=17,t.t0=t["catch"](0),console.log(t.t0),v["a"].fire({icon:"error",title:"個人資料更新失敗"}),e.isProcessing=!1;case 22:case"end":return t.stop()}}),t,null,[[0,17]])})))()}}},p=b,h=r("2877"),g=Object(h["a"])(p,n,a,!1,null,null,null);t["default"]=g.exports},e01a:function(e,t,r){"use strict";var n=r("23e7"),a=r("83ab"),i=r("da84"),o=r("5135"),s=r("861d"),c=r("9bf2").f,l=r("e893"),u=i.Symbol;if(a&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},m=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof m?new u(e):void 0===e?u():u(e);return""===e&&(d[t]=!0),t};l(m,u);var f=m.prototype=u.prototype;f.constructor=m;var v=f.toString,b="Symbol(test)"==String(u("test")),p=/^Symbol\((.*)\)[^)]+$/;c(f,"description",{configurable:!0,get:function(){var e=s(this)?this.valueOf():this,t=v.call(e);if(o(d,e))return"";var r=b?t.slice(7,-1):t.replace(p,"$1");return""===r?void 0:r}}),n({global:!0,forced:!0},{Symbol:m})}},fb6a:function(e,t,r){"use strict";var n=r("23e7"),a=r("861d"),i=r("e8b5"),o=r("23cb"),s=r("50c4"),c=r("fc6a"),l=r("8418"),u=r("b622"),d=r("1dde"),m=r("ae40"),f=d("slice"),v=m("slice",{ACCESSORS:!0,0:0,1:2}),b=u("species"),p=[].slice,h=Math.max;n({target:"Array",proto:!0,forced:!f||!v},{slice:function(e,t){var r,n,u,d=c(this),m=s(d.length),f=o(e,m),v=o(void 0===t?m:t,m);if(i(d)&&(r=d.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)?a(r)&&(r=r[b],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return p.call(d,f,v);for(n=new(void 0===r?Array:r)(h(v-f,0)),u=0;f<v;f++,u++)f in d&&l(n,u,d[f]);return n.length=u,n}})}}]);
//# sourceMappingURL=chunk-fc5b48fa.f121e484.js.map