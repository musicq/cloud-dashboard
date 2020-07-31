(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{136:function(e,t,n){e.exports=n(223)},222:function(e,t,n){},223:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),c=n(113),u=n.n(c),o=n(24),i=n(12),l=n(5),s=n(32),f=function(e){var t=e.redirectTo,n=void 0===t?"/login":t,c=e.guard,u=e.children,o=Object(s.a)(e,["redirectTo","guard","children"]),f=Object(a.useState)(!0),m=Object(l.a)(f,2),b=m[0],d=m[1],p=Object(a.useState)(!1),v=Object(l.a)(p,2),j=v[0],g=v[1];return Object(a.useEffect)((function(){var e,t=c();return"boolean"===typeof t?(g(t),d(!1)):t instanceof Promise?t.then((function(e){return g(e)})).catch((function(e){return g(!1)})).finally((function(){return d(!1)})):e=t.subscribe((function(e){g(e)}),(function(){return g(!1)}),(function(){return d(!1)})),function(){e&&e.unsubscribe()}}),[c]),b?null:r.a.createElement(i.b,Object.assign({},o,{render:function(e){var t=e.location;return j?u:r.a.createElement(i.a,{to:{pathname:n,state:{from:t}}})}}))},m=n(115),b=function(e){var t=e.className,n=["inline-flex",void 0===t?"":t].join(" ");return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:n,style:d.rotate},r.a.createElement(m.a,{className:"w-full h-full"})),r.a.createElement("style",null,"\n      @keyframes Spinner {\n        0 {\n          transform: rotate(0);\n        }\n        25% {\n          transform: rotate(80deg);\n        }\n        50% {\n          transform: rotate(160deg);\n        }\n        75% {\n          transform: rotate(240deg);\n        }\n        100% {\n          transform: rotate(360deg);\n        }\n      }\n      "))},d={rotate:{animationDuration:"1s",animationTimingFunction:"linear",animationIterationCount:"infinite",animationName:"Spinner"}},p=function(){return r.a.createElement("div",{className:"flex justify-center items-center h-full w-full"},r.a.createElement(b,{className:"w-20 h-20"}))},v=n(28),j=n(14),g=n.n(j),h=n(23),O=n(22),E=n(15),x=n(128),y=n(129),w=n(130),N=n(252),S=n(257),k=n(116),C=function e(t){Object(k.a)(this,e),this.e=t,console.error(t)};function I(e){return e.catch((function(e){return new C(e)}))}var P=n(249),L=n(250),U=n(256),R=n(63),A=n(251);var B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new P.a((function(e){return e})),n=t.pipe(Object(L.a)((function(e,t){return t(e)}),e),Object(U.a)(1)),a=function(e){t.next(e)},r=function(e){return function(t,n){if(void 0==t)throw new Error("missing 'predict' parameter in select' method!");var a=t;return"string"===typeof t&&(a=function(e){for(var a,r=t.split("."),c=e;null!==c&&void 0!==(a=r.shift());)if(void 0===(c=c[a]))return n;return c}),e.pipe(Object(R.a)(a),Object(A.a)())}},c=function(t){a((function(n){var a=Object(E.a)({},n);return t?(Reflect.deleteProperty(a,t),a):e}))};return{state$:n,select:r(n),createReducer:a,clear:c}}();B.state$.subscribe((function(e){console.group("Store"),console.log(e),console.groupEnd()}));var D=B,T="userInfo",F="session";function _(e){D.createReducer((function(t){return Object(E.a)({},t,Object(O.a)({},T,e))}))}function $(e){D.createReducer((function(t){return Object(E.a)({},t,Object(O.a)({},F,e))}))}function Q(){return(Q=Object(h.a)(g.a.mark((function e(t,n){var a,r,c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I(x.a.signIn({username:t,password:n}));case 2:if(!((a=e.sent)instanceof C)){e.next=7;break}return console.error("Login failed.\n",a.e),_(null),e.abrupt("return",null);case 7:return e.next=9,x.a.currentUserInfo();case 9:return r=e.sent,e.next=12,x.a.currentSession();case 12:return c=e.sent,_(r),$(c),e.abrupt("return",r);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(){return(W=Object(h.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I(x.a.signOut());case 2:if(!((t=e.sent)instanceof C)){e.next=6;break}return console.error("Logout failed.\n",t.e),e.abrupt("return",!1);case 6:return _(null),e.abrupt("return",!0);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function z(){return(z=Object(h.a)(g.a.mark((function e(t,n,a){var r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I(x.a.signUp({username:t,password:n,attributes:{email:a}}));case 2:if(!((r=e.sent)instanceof C)){e.next=6;break}return console.error("Sign up failed.\n",r.e),e.abrupt("return",!1);case 6:return e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function H(){return(H=Object(h.a)(g.a.mark((function e(t,n){var a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I(x.a.confirmSignUp(t,n));case 2:if(!((a=e.sent)instanceof C)){e.next=6;break}return console.error("Confirmed failed.\n",a.e),e.abrupt("return",!1);case 6:return e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var J={getSession:function(){return D.select(F).pipe(Object(N.a)((function(e){return e?Object(w.a)(e):Object(y.a)(x.a.currentSession().then((function(e){return e&&$(e),e})))})))},getUserInfo:function(){return D.select(T,null).pipe(Object(N.a)((function(e){return null===e?Object(y.a)(x.a.currentUserInfo()).pipe(Object(S.a)((function(e){null!==e&&_(e)}))):Object(w.a)(e)})))},signIn:function(e,t){return Q.apply(this,arguments)},signUp:function(e,t,n){return z.apply(this,arguments)},signOut:function(){return W.apply(this,arguments)},confirmSignUp:function(e,t){return H.apply(this,arguments)}};function M(){var e=Object(a.useState)(!0),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(null),u=Object(l.a)(c,2),o=u[0],i=u[1];return Object(a.useEffect)((function(){var e=J.getUserInfo().subscribe((function(e){i(e),r(!1)}));return function(){return e.unsubscribe()}}),[]),{loading:n,user:o}}var Y,G=n(255),V=n(71),X=n(62),q=n(253),K=n(258),Z=n(254),ee=n(11),te=n(117),ne={REGION:"ap-northeast-1",USER_POOL_ID:"ap-northeast-1_1ACiUyF1H",APP_CLIENT_ID:"1rt35ctopf84fbh47lllf0gg5k"},ae={REGION:"ap-northeast-1",URL:"https://cqto1p9g0j.execute-api.ap-northeast-1.amazonaws.com",ENV:"prod"};function re(e){return console.error(e),Object(w.a)(e instanceof C?e:new C(e))}function ce(e){return function(t){return console.error(t),Object(w.a)(e)}}function ue(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ae.ENV,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ae.URL;return new URL("".concat(t,"/").concat(e),n).href}function oe(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new ee.a((function(n){var a=new AbortController,r=!1,c=Object(E.a)({signal:a.signal},t);return Object(y.a)(fetch(e,c)).subscribe((function(e){console.log("responsed"),n.next(e)}),(function(e){return n.error(e)}),(function(){r=!0,n.complete()})),function(){r||a.abort()}}))}function ie(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=J.getSession().pipe(Object(R.a)((function(e){return e.getIdToken().getJwtToken()})),Object(K.a)(1)),a=n.pipe(Object(R.a)((function(n){var a=t.headers,r=Object(s.a)(t,["headers"]);return new Headers(a).append("Authorization",n),Object(E.a)({url:ue(e),headers:{Authorization:n}},r)})));return a.pipe(Object(N.a)((function(t){return oe(ue(e),t)})),Object(N.a)((function(e){return e.status>=400?Object(y.a)(e.json()).pipe(Object(N.a)((function(e){return Object(te.a)(new C(e))}))):Object(y.a)(e.json())})))}!function(e){e[e.Resource=0]="Resource",e[e.API=1]="API",e[e.SQL=2]="SQL",e[e.ProjectInfo=3]="ProjectInfo",e[e.News=4]="News",e[e.Status=5]="Status"}(Y||(Y={}));var le="Projects",se=J.getUserInfo().pipe(Object(q.a)("username")),fe={loading$:new P.a(!1),fetchProjects:function(){fe.loading$.next(!0),ie("projects").pipe(Object(R.a)((function(e){return e.Items})),Object(S.a)((function(e){e&&e.length>0&&fe.set(e)})),Object(Z.a)(ce([])),Object(S.a)((function(){return fe.loading$.next(!1)}))).subscribe()},get:function(){return D.select(le,[])},getById:function(e){var t={};return D.select(le,[]).pipe(Object(G.a)((function(){return Boolean(e)&&!me})),Object(N.a)((function(n){var a=n.find((function(t){return t.id===e}));return a&&a.resources?Object(w.a)(a):(fe.loading$.next(!0),me=!0,ie("projects/".concat(e)).pipe(Object(R.a)((function(e){return e.Item})),Object(S.a)((function(t){t&&fe.setById(e,t),fe.loading$.next(!1),me=!1})),Object(Z.a)(ce(t))))})))},setById:function(e,t){D.createReducer((function(n){var a=n[le]||[],r=[];return 0===a.length?r.push(t):r=a.map((function(n){return n.id===e?t:n})),Object(E.a)({},n,Object(O.a)({},le,r))}))},set:function(e){fe.get().pipe(Object(K.a)(1),Object(R.a)((function(t){return t&&0!==t.length?e.map((function(e){var n=t.find((function(t){return t.id===e.id}));return n?n.updatedAt===e.updatedAt?e.resources?e:n:n.updatedAt>e.updatedAt?n:e:e})):e})),Object(S.a)((function(e){return D.createReducer((function(t){return Object(E.a)({},t,Object(O.a)({},le,e))}))}))).subscribe()},create:function(e){return se.pipe(Object(K.a)(1),Object(R.a)((function(t){return JSON.stringify({username:t,projectName:e})})),Object(R.a)((function(e){return{method:"POST",body:e}})),Object(N.a)((function(e){return ie("projects",e)})),Object(S.a)((function(e){return function(e){D.createReducer((function(t){var n=t[le]||[],a=[].concat(Object(V.a)(n),[e]);return Object(E.a)({},t,Object(O.a)({},le,a))}))}(e)})),Object(Z.a)(re))},updateById:function(e,t){if(!e)return X.a;return ie("projects/".concat(e),{method:"PUT",body:JSON.stringify(t)}).pipe(Object(S.a)((function(n){fe.getById(e).pipe(Object(K.a)(1),Object(R.a)((function(e){return Object(E.a)({},e,{resources:t})})),Object(S.a)((function(t){return fe.setById(e,t)}))).subscribe()})),Object(Z.a)(re))}};var me=!1;function be(){var e=Object(a.useState)(),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(i.g)(),u=Object(i.h)();return Object(a.useEffect)((function(){var e=Object(w.a)(u).pipe(Object(G.a)((function(){return"/dashboard"===u.pathname})),Object(R.a)((function(e){return(t=e.search,t.startsWith("?")&&(t=t.substr(1)),t.split("&").reduce((function(e,t){var n=t.split("="),a=Object(l.a)(n,2),r=a[0],c=a[1];return Object(E.a)({},e,Object(O.a)({},r,c))}),{})).projectId;var t})),Object(N.a)((function(e){return e&&"undefined"!==e?Object(w.a)(e):fe.get().pipe(Object(R.a)((function(e){var t;return null===(t=e[0])||void 0===t?void 0:t.id})),Object(S.a)((function(e){e&&c.push("/dashboard?projectId="+e)})))}))).subscribe((function(e){return r(e)}));return function(){return e.unsubscribe()}}),[u,c]),n}var de=function(){},pe=function(e){var t=e.primary,n=void 0!==t&&t,a=e.block,c=void 0!==a&&a,u=e.className,o=void 0===u?"":u,i=e.loading,l=void 0!==i&&i,f=e.disabled,m=void 0!==f&&f,d=e.onClick,p=void 0===d?de:d,v=e.children,j=Object(s.a)(e,["primary","block","className","loading","disabled","onClick","children"]),g=["px-3","py-2","rounded","transition-colors","duration-300","ease-in-out","focus:outline-none"];c&&g.push("w-full");var h=m||l,O=n?["text-white",h?"bg-gray-400":"bg-blue-500",h?"":"hover:bg-blue-800"]:[h?"text-gray-400":"text-blue-500",h?"border-gray-400":"border-blue-500",h?"":"hover:border-blue-800",h?"":"hover:text-blue-800"];(m||l)&&O.push("cursor-not-allowed");var E=[].concat(g,O,[o]).join(" ");return r.a.createElement("button",Object.assign({className:E,disabled:h,onClick:p},j),r.a.createElement("div",{className:l?"flex items-center justify-center":""},r.a.createElement("span",{className:"flex mr-2"},l&&r.a.createElement(b,{className:"w-4 h-4"})),v))},ve=function(e){var t=e.user,n=Object(a.useState)(!1),c=Object(l.a)(n,2),u=c[0],o=c[1],i=function(){var e=Object(h.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",J.signOut());case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return t?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"border cursor-pointer p-2 rounded-full text-white hover:bg-blue-800",onClick:function(){return o(!u)}},r.a.createElement(v.d,{className:"text-xl"})),u&&r.a.createElement("div",{className:"absolute bg-white content-between mr-2 mt-12 right-0 shadow-md top-0 w-64"},r.a.createElement("div",{className:"flex p-3"},r.a.createElement(v.d,{className:"text-3xl text-6xl text-gray-800"}),r.a.createElement("div",{className:"ml-4"},r.a.createElement("h1",{className:"font-bold"},t.username),r.a.createElement("h2",{className:"text-base"},t.attributes.email))),r.a.createElement("div",{className:"bg-gray-200 border-t p-2 text-right"},r.a.createElement(pe,{primary:!0,onClick:i},"Logout")))):r.a.createElement("div",null,"Login")},je=n(126);function ge(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var a=Array.from(t),r=[];return he(a,r),r.join(" ")}function he(e,t){if(0!==e.length){var n=Object(je.a)(e),a=n[0],r=n.slice(1);if("string"===typeof a)t.push(a);else if(Array.isArray(a)){var c=a.filter(Boolean).join(" ");t.push(c)}else{var u=Object.entries(a).reduce((function(e,t){var n=Object(l.a)(t,2),a=n[0],r=n[1];return[].concat(Object(V.a)(e),[r?a:""])}),[]).filter(Boolean).join(" ");t.push(u)}he(r,t)}}var Oe=function(e){var t=e.reverse,n=void 0!==t&&t,a=e.className,c=ge("flex items-center text-3xl cursor-pointer",n?"text-white":"text-blue-500",void 0===a?"":a);return r.a.createElement(o.b,{to:"/"},r.a.createElement("h1",{className:c},r.a.createElement(v.c,{className:"mr-2"}),"Cloud dashboard"))};var Ee=function(e){var t=e.children,n=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){fe.fetchProjects()}),[]),Object(a.useEffect)((function(){var e=fe.get().subscribe((function(e){return r(e)}));return function(){return e.unsubscribe()}}),[]),n}(),c=be(),u=M().user,o=Object(i.g)(),s=null!==u,f="/new-project"===Object(i.i)().path;return r.a.createElement("div",null,r.a.createElement("div",{className:"py-1 px-4 shadow bg-blue-500 flex justify-between items-center fixed top-0 w-full"},r.a.createElement("div",{className:"flex items-center"},r.a.createElement(Oe,{reverse:!0}),s&&n.length>0&&r.a.createElement("select",{className:"ml-6 bg-blue-500 border h-8 px-2 rounded text-white w-48",value:c,onChange:function(e){e.target.value&&o.push("/dashboard?projectId="+e.target.value)}},n.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.projectName)})))),r.a.createElement("div",null,s&&r.a.createElement("div",{className:"flex items-center"},!f&&r.a.createElement(pe,{primary:!0,className:"mr-8 text-white",onClick:function(){return o.push("/new-project")}},r.a.createElement("div",{className:"flex items-center"},r.a.createElement(v.a,{className:"mr-1"}),"New project")),r.a.createElement(ve,{user:u})))),r.a.createElement("div",{className:"overflow-y-auto",style:xe.body},t))},xe={body:{height:"calc(100vh - 53px)",marginTop:53}};var ye=function(e){var t=e.link,n=e.children;return r.a.createElement("a",{href:t,className:"block border-t h-full w-full p-4 hover:bg-gray-100 transition-colors duration-300 ease-in-out",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("div",{className:"flex items-center"},r.a.createElement(v.b,{className:"mr-4 text-2xl"}),n))},we=function(){return r.a.createElement("div",{className:"border bg-white w-full h-16 shadow-inner mb-3"})},Ne=r.a.memo((function(e){var t=e.title,n=e.footer,c=e.isDragging,u=void 0!==c&&c,o=e.collapse,i=void 0!==o&&o,s=e.className,f=void 0===s?"":s,m=e.onPositionChange,b=void 0===m?de:m,d=e.onMouseDown,p=void 0===d?de:d,v=e.children,j=Object(a.useRef)(null),g=function(e,t){var n=Object(a.useState)([0,0]),r=Object(l.a)(n,2),c=r[0],u=r[1];return Object(a.useLayoutEffect)((function(){if(e.current&&t){var n=function(n){if(e.current&&t){var a=e.current,r=a.offsetWidth>>1,c=a.offsetHeight>>1;a.style.left=n.clientX-r+"px",a.style.top=n.clientY-c+"px",u([n.clientX,n.clientY])}};return document.addEventListener("mousemove",n),function(){return document.removeEventListener("mousemove",n)}}}),[e,t]),c}(j,u);return Object(a.useEffect)((function(){b(g)}),[g,b]),r.a.createElement(r.a.Fragment,null,u&&r.a.createElement(we,null),r.a.createElement("div",{ref:j,className:ge("bg-white duration-300 ease-in-out hover:shadow-lg overflow-hidden shadow-md transition-shadow select-none",f,{"absolute w-1/3 z-10 opacity-75":u})},r.a.createElement("div",{onMouseDown:p,className:ge("text-2xl p-4 h-16 overflow-hidden",u?"cursor-grabbing":"cursor-grab")},t),!i&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"px-4 pb-4"},v),n&&r.a.createElement(ye,{link:n.link},n.name))))}));function Se(e){var t=e.index,n=e.position,c=e.onChange,u=Object(a.useRef)(null),o=function(e,t){return Object(a.useMemo)((function(){if(!e.current)return!1;var n=Object(l.a)(t,2),a=n[0],r=n[1],c=e.current,u=c.offsetTop,o=c.offsetLeft,i=c.offsetWidth,s=c.offsetHeight;return o-8<=a&&a<o+i+8&&(u-44<=r&&r<u+s+44)}),[e,t])}(u,n);return Object(a.useEffect)((function(){o&&c(t)}),[o,t,c]),r.a.createElement("div",{ref:u,className:ge("w-full h-1 mb-3",o?"bg-blue-500":"bg-gray-200")})}function ke(e,t){return null!==e&&(e[0]===t[0]&&e[1]===t[1])}var Ce,Ie=function(e){var t=e.label,n=e.className,a=void 0===n?"":n,c=Object(s.a)(e,["label","className"]),u=["block w-full h-12 py-3 border-b text-gray-600 border-blue-500 outline-none focus:border-blue-800 transition-colors duration-300 ease-in-out",a].join(" ");return r.a.createElement("div",null,t&&r.a.createElement("label",{className:"text-blue-500 block"},t),r.a.createElement("input",Object.assign({className:u},c)))},Pe=function(e){var t=e.id,n=e.edit,a=e.data,c=e.onChange;if(!a)return r.a.createElement("div",{className:"text-gray-700"},"API is not available now.");return n?r.a.createElement(Ie,{label:"API Source",value:a.source,onChange:function(e){return c({id:t,data:{source:e.target.value}})}}):r.a.createElement("div",null,r.a.createElement("div",null,"API Source"),r.a.createElement("div",{className:"text-gray-700"},a.source))},Le=function(e){var t=e.data;return t?r.a.createElement("div",null,r.a.createElement("div",{className:"mb-3"},r.a.createElement("h3",null,"Project name"),r.a.createElement("div",{className:"text-gray-600"},t.projectName)),r.a.createElement("div",{className:"mb-3"},r.a.createElement("h3",null,"Project ID"),r.a.createElement("div",{className:"text-gray-600"},t.id)),r.a.createElement("div",null,r.a.createElement("h3",null,"Created at"),r.a.createElement("div",{className:"text-gray-600"},new Date(t.createdAt).toDateString()))):r.a.createElement("div",{className:"text-gray-700"},"Project info is not available now.")},Ue=function(e){return r.a.createElement("div",{className:"text-gray-600"},"No more resources for now.")},Re=function(e){var t=e.id,n=e.edit,a=void 0!==n&&n,c=e.data,u=e.onChange,o=void 0===u?de:u;if(!c)return r.a.createElement("div",{className:"text-gray-700"},"SQL is not available now.");return a?r.a.createElement(Ie,{label:"SQL Source",value:c.source,onChange:function(e){return o({id:t,data:{source:e.target.value}})}}):r.a.createElement("div",null,r.a.createElement("div",null,"SQL Source"),r.a.createElement("div",{className:"text-gray-700"},c.source))},Ae=function(e){var t=e.id,n=e.edit,a=e.type,c=e.data,u=e.onChange,o=null;switch(a){case Y.Resource:o=Ue;break;case Y.ProjectInfo:o=Le;break;case Y.API:o=Pe;break;case Y.SQL:o=Re;break;default:return null}return r.a.createElement(o,{id:t,edit:n,data:c,onChange:u})},Be=function(){var e,t=function(){var e=Object(a.useState)(!1),t=Object(l.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){var e=fe.loading$.subscribe((function(e){return r(e)}));return function(){return e.unsubscribe()}}),[]),n}(),n=be(),c=function(e){var t=Object(a.useState)(),n=Object(l.a)(t,2),r=n[0],c=n[1];return Object(a.useEffect)((function(){var t=fe.getById(e).subscribe((function(e){return c(e)}));return function(){return t.unsubscribe()}}),[e]),r}(n),u=function(e){var t=Object(a.useState)((null===e||void 0===e?void 0:e.resources)||[]),n=Object(l.a)(t,2),r=n[0],c=n[1];return Object(a.useEffect)((function(){c((null===e||void 0===e?void 0:e.resources)||[])}),[e]),[r,c]}(c),o=Object(l.a)(u,2),i=o[0],s=o[1],f=Object(a.useState)(!1),m=Object(l.a)(f,2),d=m[0],p=m[1],v=Object(a.useState)([0,0]),j=Object(l.a)(v,2),g=j[0],h=j[1],O=Object(a.useState)(!1),x=Object(l.a)(O,2),y=x[0],w=x[1],N=Object(a.useState)(null),S=Object(l.a)(N,2),k=S[0],C=S[1],I=Object(a.useState)(null),P=Object(l.a)(I,2),L=P[0],U=P[1],R=Object(a.useCallback)((function(){if(p(!1),L&&k){var e=function(e,t,n){if(!t||!n)return e;var a=e.slice(),r=Object(l.a)(t,2),c=r[0],u=r[1],o=Object(l.a)(n,2),i=o[0],s=o[1];if(c===i){var f=a[c].slice(),m=f[u];f.splice(u,1),f.splice(s,0,m),a[c]=f}else{var b=a[c].slice(),d=b[u],p=a[i].slice();b.splice(u,1),p.splice(s,0,d),a[c]=b,a[i]=p}return a}(i,L,k);s(e),U(null),C(null),fe.updateById(n,e).subscribe({error:function(e){return console.error("Update project resources failed.",e)}})}}),[L,k,n,i,p,s,U,C]);e=R,Object(a.useLayoutEffect)((function(){return document.addEventListener("mouseup",e),function(){return document.removeEventListener("mouseup",e)}}),[e]);var A=Object(a.useCallback)((function(e){return h(e)}),[h]),B=Object(a.useCallback)((function(e){ke(k,e)||C(e)}),[k,C]),D=function(e){var t=e.id,n=e.data,a=i.slice().map((function(e){return e.map((function(e){return e.id===t?Object(E.a)({},e,{data:n}):e}))}));s(a)};return r.a.createElement("div",null,t?r.a.createElement("div",{className:"flex justify-center mt-40 h-full w-full"},r.a.createElement(b,{className:"w-16 h-16"})):r.a.createElement(r.a.Fragment,null,(null===c||void 0===c?void 0:c.projectName)&&r.a.createElement("div",{className:"flex justify-between border-b p-4 "},r.a.createElement("div",{className:"text-3xl"},c.projectName),r.a.createElement(pe,{onClick:y?function(){w(!1),fe.updateById(n,i).subscribe((function(){return console.log("Saved successfully.")}),(function(e){return console.error("Save failed.")}))}:function(){return w(!0)}},y?"Save":"Customize")),r.a.createElement("div",{className:"px-8 py-6"},r.a.createElement("div",{className:"flex"},i.map((function(e,t){return r.a.createElement("div",{key:t,className:"flex-1 px-2"},d&&r.a.createElement(Se,{index:[t,0],position:g,onChange:B}),e.map((function(e,n){return r.a.createElement(a.Fragment,{key:e.id},r.a.createElement(Ne,{className:"mb-3",isDragging:d&&ke(L,[t,n]),collapse:d,title:e.title,footer:e.config,onMouseDown:function(e){return function(e,t){p(!0),U(t)}(0,[t,n])},onPositionChange:A},r.a.createElement(Ae,{id:e.id,edit:y,type:e.type,data:e.data,onChange:D})),d&&r.a.createElement(Se,{index:[t,n+1],position:g,onChange:B}))})))}))))))},De=function(e){var t=e.className,n=void 0===t?"":t,a=e.children,c=["p-4 border border-red-300 bg-red-200 text-red-700 rounded",n].join(" ");return r.a.createElement("div",{className:c},a)},Te=function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(!1),o=Object(l.a)(u,2),s=o[0],f=o[1],m=Object(a.useState)(!1),b=Object(l.a)(m,2),d=b[0],p=b[1],v=Object(a.useState)(""),j=Object(l.a)(v,2),g=j[0],h=j[1],O=Object(i.g)(),E=function(e){e.preventDefault(),n&&n.trim()&&(f(!0),fe.create(n).subscribe((function(e){if(f(!1),e instanceof C)return h(e.e.msg||"Create project failed!"),void p(!0);p(!1),h(""),O.push("/dashboard?projectId=".concat(e.id))})))};return r.a.createElement("div",null,r.a.createElement("h1",{className:"text-2xl border-b p-4"},"New project"),r.a.createElement("div",{className:"p-4"},d&&r.a.createElement(De,{className:"mb-4"},g),r.a.createElement("form",{onSubmit:E},r.a.createElement("div",{className:"w-1/3"},r.a.createElement(Ie,{label:"Project name",placeholder:"Project name",value:n,onChange:function(e){return c(e.target.value)}})),r.a.createElement("div",{className:"flex items-center mt-8"},r.a.createElement(pe,{type:"submit",className:"mr-4",primary:!0,loading:s,onClick:E},"Create"),r.a.createElement(pe,{onClick:O.goBack},"Cancel")))))},Fe=function(){return r.a.createElement(Ee,null,r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"/"},r.a.createElement(i.a,{to:"/dashboard"})),r.a.createElement(i.b,{path:"/dashboard"},r.a.createElement(Be,null)),r.a.createElement(i.b,{path:"/new-project"},r.a.createElement(Te,null))))};!function(e){e[e.Login=0]="Login",e[e.Register=1]="Register",e[e.ConfirmSingUp=2]="ConfirmSingUp"}(Ce||(Ce={}));var _e=function(){var e=Object(a.useState)(Ce.Login),t=Object(l.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(""),o=Object(l.a)(u,2),s=o[0],f=o[1],m=Object(a.useState)(""),b=Object(l.a)(m,2),d=b[0],p=b[1],v=Object(a.useState)(""),j=Object(l.a)(v,2),O=j[0],E=j[1],x=Object(a.useState)(!1),y=Object(l.a)(x,2),w=y[0],N=y[1],S=Object(a.useState)(""),k=Object(l.a)(S,2),C=k[0],I=k[1],P=Object(i.g)(),L=function(){var e=Object(h.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s&&O){e.next=2;break}return e.abrupt("return",alert("You haven't finished all the fields."));case 2:return N(!0),e.next=5,J.signIn(s,O);case 5:t=e.sent,N(!1),t&&P.push("/");case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),U=function(){var e=Object(h.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s&&O&&d){e.next=2;break}return e.abrupt("return",alert("You haven't finished all the fields."));case 2:return N(!0),e.next=5,J.signUp(s,O,d);case 5:if(t=e.sent,N(!1),t){e.next=9;break}return e.abrupt("return",alert("Sign-up failed, please try other username or try latter."));case 9:c(Ce.ConfirmSingUp);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=function(){var e=Object(h.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(C){e.next=2;break}return e.abrupt("return",alert("Please enter your verify code."));case 2:return N(!0),e.next=5,J.confirmSignUp(s,C);case 5:t=e.sent,N(!1),t||alert("Confirmed failed. Please check if you have input the right code."),alert("You have confirmed your account."),c(Ce.Login),f(""),E("");case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(e){switch(e.preventDefault(),n){case Ce.Login:return L();case Ce.Register:return U();case Ce.ConfirmSingUp:return R()}};return r.a.createElement("div",{className:"p-4"},r.a.createElement("form",{onSubmit:A},n!==Ce.ConfirmSingUp&&r.a.createElement(r.a.Fragment,null,r.a.createElement(Ie,{className:"block w-full mb-4",type:"username",placeholder:"Username",value:s,onChange:function(e){return f(e.target.value)}}),r.a.createElement(Ie,{className:"block w-full mb-4",placeholder:"Password",type:"password",value:O,onChange:function(e){return E(e.target.value)}}),n===Ce.Register&&r.a.createElement("div",{className:"text-gray-600 text-sm"},"Password pattern: Passw0rd!"),n===Ce.Register&&r.a.createElement(Ie,{className:"block w-full",placeholder:"Email",type:"email",value:d,onChange:function(e){return p(e.target.value)}})),n===Ce.ConfirmSingUp&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",{className:"font-hairline mb-8 text-2xl"},"Code has sent to your mailbox."),r.a.createElement(Ie,{className:"block w-full",placeholder:"Code",type:"text",value:C,onChange:function(e){return I(e.target.value)}}),r.a.createElement("div",{className:"text-gray-600 text-sm"},"If you cannot get the email, please check your junk.")),r.a.createElement(pe,{type:"submit",className:"mt-10",primary:!0,block:!0,loading:w,onClick:A},n===Ce.ConfirmSingUp?"Confirmed":n===Ce.Login?"Sign in":"Sign up")),r.a.createElement("div",{className:"text-right mt-8 text-gray-600"},n===Ce.Login?r.a.createElement("div",null,"Haven't got an account?",r.a.createElement(pe,{onClick:function(){return c(Ce.Register)}},"Sign Up")):r.a.createElement("div",null,"Click here to",r.a.createElement(pe,{onClick:function(){return c(Ce.Login)}},"Sign In"))))},$e=function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"px-4 py-1"},r.a.createElement(Oe,null)),r.a.createElement("div",{className:"lg:w-1/3 md:w-1/2 w-11/12 mt-48 mx-auto shadow"},r.a.createElement(_e,null)))},Qe=n(77);function We(){Object(a.useEffect)((function(){Qe.default.configure({Auth:{mandatorySignIn:!0,region:ne.REGION,userPoolId:ne.USER_POOL_ID,userPoolWebClientId:ne.APP_CLIENT_ID}})}),[]);var e=M(),t=e.user,n=e.loading,c=Object(a.useCallback)((function(){return Boolean(t)}),[t]);return n?r.a.createElement("div",{className:"absolute w-full h-full"},r.a.createElement(p,null)):r.a.createElement(o.a,null,r.a.createElement(i.d,null,r.a.createElement(i.b,{path:"/login"},r.a.createElement($e,null)),r.a.createElement(f,{guard:c,path:"/"},r.a.createElement(Fe,null))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(222);u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(We,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[136,1,2]]]);
//# sourceMappingURL=main.e02bc9a1.chunk.js.map