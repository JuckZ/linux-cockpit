(function(e){function t(t){for(var o,a,s=t[0],u=t[1],c=t[2],l=0,p=[];l<s.length;l++)a=s[l],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&p.push(r[a][0]),r[a]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);d&&d(t);while(p.length)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,a=1;a<n.length;a++){var s=n[a];0!==r[s]&&(o=!1)}o&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},a={app:0},r={app:0},i=[];function s(e){return u.p+"js/"+({about:"about"}[e]||e)+"."+{about:"ee0b9000"}[e]+".js"}function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={about:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var o="css/"+({about:"about"}[e]||e)+"."+{about:"01c088e8"}[e]+".css",r=u.p+o,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var c=i[s],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===o||l===r))return t()}var p=document.getElementsByTagName("style");for(s=0;s<p.length;s++){c=p[s],l=c.getAttribute("data-href");if(l===o||l===r)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var o=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=o,delete a[e],d.parentNode.removeChild(d),n(i)},d.href=r;var m=document.getElementsByTagName("head")[0];m.appendChild(d)})).then((function(){a[e]=0})));var o=r[e];if(0!==o)if(o)t.push(o[2]);else{var i=new Promise((function(t,n){o=r[e]=[t,n]}));t.push(o[2]=i);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=s(e);var p=new Error;c=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",p.name="ChunkLoadError",p.type=o,p.request=a,n[1](p)}r[e]=void 0}};var d=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)u.d(n,o,function(t){return e[t]}.bind(null,o));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var p=0;p<c.length;p++)t(c[p]);var d=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0f77":function(e,t,n){},1:function(e,t){},c805:function(e,t,n){"use strict";var o=n("0f77"),a=n.n(o);a.a},cd49:function(e,t,n){"use strict";n.r(t);n("eb14");var o=n("39ab"),a=(n("0032"),n("e32c")),r=(n("de6a"),n("9a63")),i=(n("fbd6"),n("160c")),s=(n("2ef0"),n("9839")),u=(n("d2a3"),n("4df5")),c=(n("ee00"),n("bb76")),l=(n("8fb1"),n("0c63")),p=(n("5704"),n("b558")),d=(n("f2ef"),n("3af3")),m=(n("6ba6"),n("5efb")),f=(n("3b18"),n("f64c")),h=(n("dc5a"),n("56cd")),g=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),v=n("bc3a"),b=n.n(v),y=n("a7fe"),w=n.n(y),k=n("522d"),$=n("2c82"),P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("keep-alive",[e.$route.meta.keepAlive?n("router-view"):e._e()],1),e.$route.meta.keepAlive?e._e():n("router-view")],1)},x=[],j=n("2877"),I={},L=Object(j["a"])(I,P,x,!1,null,null,null),S=L.exports,_=(n("d3b7"),n("8c4f")),N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-form",{staticClass:"login-form",attrs:{id:"components-form-demo-normal-login",form:e.form},on:{submit:e.handleSubmit}},[n("a-form-item",[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["IP",{rules:[{required:!0,message:"Please input your server's ip address or domain!"}]}],expression:"[\n        'IP',\n        {\n          rules: [\n            {\n              required: true,\n              message: 'Please input your server\\'s ip address or domain!',\n            },\n          ],\n        },\n      ]"}],attrs:{placeholder:"IP address or Domin"}},[n("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"laptop"},slot:"prefix"})],1)],1),n("a-form-item",[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["userName",{rules:[{required:!0,message:"Please input your username!"}]}],expression:"[\n        'userName',\n        {\n          rules: [{ required: true, message: 'Please input your username!' }],\n        },\n      ]"}],attrs:{placeholder:"Username"}},[n("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),n("a-form-item",[n("a-input-group",[n("a-row",{attrs:{gutter:0}},[n("a-col",{attrs:{span:4}},[n("a-switch",{attrs:{defaultChecked:"",checkedChildren:"密码",unCheckedChildren:"私钥"},on:{change:e.changeLoginType}})],1),n("a-col",{attrs:{span:20}},["password"===e.loginType?n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"Please input your Password!"}]}],expression:"[\n              'password',\n              {\n                rules: [\n                  { required: true, message: 'Please input your Password!' },\n                ],\n              },\n            ]"}],attrs:{type:"password",placeholder:"Password"}},[n("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"lock"},slot:"prefix"})],1):e._e(),"privateKey"==e.loginType?n("a-upload",{attrs:{name:"file",multiple:!0,action:"https://www.mocky.io/v2/5cc8019d300000980a055e76"},on:{change:e.uploadPrivateKey}},[n("a-button",[n("a-icon",{attrs:{type:"upload"}}),e._v("Click to Upload ")],1)],1):e._e()],1)],1)],1)],1),n("a-form-item",[n("a-checkbox",{directives:[{name:"decorator",rawName:"v-decorator",value:["remember",{valuePropName:"checked",initialValue:!0}],expression:"[\n        'remember',\n        {\n          valuePropName: 'checked',\n          initialValue: true,\n        },\n      ]"}]},[e._v("Remember me")]),n("a-button",{staticClass:"login-form-button",attrs:{type:"primary","html-type":"submit"}},[n("a-icon",{attrs:{type:"login"}}),e._v("Log in")],1),n("a-button",{attrs:{type:"default"},on:{click:e.skipLogin}},[e._v("Skip Login"),n("a-icon",{attrs:{type:"right"}})],1)],1)],1)},O=[],C=(n("b0c0"),n("96cf"),n("1da1")),T=n("8785"),E=n("9530"),q=n.n(E),A=n("8055"),M=n.n(A);function B(){var e=Object(T["a"])(["\n          mutation addBook($bookInput: BookInput) {\n            addBook(bookInput: $bookInput) {\n              title\n              author\n            }\n          }\n        "]);return B=function(){return e},e}function D(){var e=Object(T["a"])(["\n            mutation login($loginInput: LoginInput) {\n              login(loginInput: $loginInput) {\n                # 返回的数据格式为loginRes，字段如下\n                code\n                msg\n              }\n            }\n          "]);return D=function(){return e},e}function R(){var e=Object(T["a"])(["\n            mutation login($loginInput: LoginInput) {\n              login(loginInput: $loginInput) {\n                # 返回的数据格式为loginRes，字段如下\n                code\n                msg\n              }\n            }\n          "]);return R=function(){return e},e}function F(){var e=Object(T["a"])(["\n        query books {\n          books {\n            title\n            author\n          }\n        }\n      "]);return F=function(){return e},e}var K={name:"Comment",apollo:{books:{query:q()(F())}},data:function(){return{info:{books:[]},value:"lucy",loginType:"password"}},beforeCreate:function(){this.form=this.$form.createForm(this,{name:"normal_login"})},mounted:function(){this.$parent.$store.state.isLogined&&this.$parent.$router.push("/desktop"),this.form.setFieldsValue({IP:"juck.site",userName:"root",password:"Zc1998zc"})},methods:{changeLoginType:function(e){this.loginType=e?"password":"privateKey"},uploadPrivateKey:function(e){"uploading"!==e.file.status&&console.log(e.file,e.fileList),"done"===e.file.status?this.$message.success("".concat(e.file.name," file uploaded successfully")):"error"===e.file.status&&this.$message.error("".concat(e.file.name," file upload failed."))},createSocket:function(){var e=this;return Object(C["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={IP:"juck.site",userName:"root",password:"Zc1998zc",remember:!0},t.next=3,e.$apollo.mutate({mutation:q()(R()),variables:{loginInput:n}}).then((function(t){e.openNotification(t.data.login),console.log(n)}));case 3:case"end":return t.stop()}}),t)})))()},openNotification:function(e){var t=this.$createElement,n="",o="",a="";200===e.code?(n="登录成功",o="".concat(e.msg),a=t("a-icon",{attrs:{type:"smile"},style:"color: #108ee9"})):(n="登录失败",o="失败原因：".concat(e.msg),a=t("a-icon",{attrs:{type:"exclamation-circle"},style:"color: red"})),this.$notification.open({message:n,description:o,icon:a})},login:function(){var e=Object(C["a"])(regeneratorRuntime.mark((function e(t){var n=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.$parent.$store.state.isLogined){e.next=3;break}return this.$parent.$router.push("/desktop"),e.abrupt("return");case 3:return e.next=5,this.$apollo.mutate({mutation:q()(D()),variables:{loginInput:t}}).then((function(e){n.openNotification(e.data.login),200==e.data.login.code&&(n.$router.push("/desktop"),n.$parent.$store.state.isLogined=!0,n.$parent.$store.state.socket=M()("http://localhost"))}));case 5:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),addBook:function(){this.$apollo.mutate({mutation:q()(B()),variables:{bookInput:{title:"how to study",author:"juck"}}})},handleSubmit:function(e){var t=this;e.preventDefault(),this.form.validateFields((function(e,n){e||t.login(n)}))},skipLogin:function(){this.$router.push("/desktop")}}},U=K,V=(n("c805"),Object(j["a"])(U,N,O,!1,null,null,null)),z=V.exports;g["a"].use(_["a"]);var G=[{path:"/",name:"Desktop",component:function(){return n.e("about").then(n.bind(null,"7e07"))},meta:{keepAlive:!0}},{path:"/login",name:"Login",component:z,meta:{keepAlive:!0}},{path:"/desktop",name:"Desktop",component:function(){return n.e("about").then(n.bind(null,"7e07"))},meta:{keepAlive:!0}}],H=new _["a"]({mode:"hash",base:"",routes:G}),J=H,Z=n("2f62"),Q={token:"",isLogined:!1,socket:null,settings:{wallpaperUrl:"",wallpaperFolder:"",online:!1,autoSwitch:!1,duration:"3min",avatar:"@/assets/win7/avatar.svg",showMenu:!1}},W={toggleLogin:function(e){console.log("================="),console.log(e),e.isLogined=!e.isLogined},toggleShowMenu:function(e){e.settings.showMenu=!e.settings.showMenu}},X={},Y={state:{token:"",isLogined:!1,socket:null,settings:{wallpaperUrl:"",wallpaperFolder:"",online:!1,autoSwitch:!1,duration:"3min",avatar:"@/assets/win7/avatar.svg",showMenu:!1}}},ee={},te={},ne={},oe={moduleName:"Desktop",store:{namespaced:!0,state:Y,getters:ne,mutations:ee,actions:te}},ae={show:"none",apps:[{id:1,name:"今日天气",path:""},{id:2,name:"iClock",path:""}],avatar:{username:"juck",usergroup:"root",avatarSrc:"http://localhost:80/"},otherInfo:[{id:1,name:"admin",path:""},{id:2,name:"个人中心",path:""},{id:3,name:"我的应用",path:""},{id:4,name:"系统设置",path:""},{id:5,name:"GitHub",path:""}]},re={setShow:function(e){"block"==e.show?e.show="none":e.show="block"}},ie={toggleMenu:function(e){e.commit("setShow")}},se={},ue={moduleName:"Menu",store:{namespaced:!0,state:ae,getters:se,mutations:re,actions:ie}};g["a"].use(Z["a"]);var ce=new Z["a"].Store({state:Q,mutations:W,actions:X,modules:{desktop:oe.store,menu:ue.store}});g["a"].prototype.$notification=h["a"],g["a"].prototype.$message=f["a"],g["a"].use(k["a"]),g["a"].use(w.a,b.a),g["a"].use(m["a"],d["a"],p["a"],l["a"],d["a"],c["a"],u["b"],s["a"],i["a"],r["a"],a["a"],o["a"]),g["a"].component("a-input",p["a"]),g["a"].component("a-icon",l["a"]),g["a"].component("a-button",m["a"]),g["a"].component("a-form",d["a"]),g["a"].component("a-form-item",d["a"].Item),g["a"].component("a-checkbox",c["a"]),g["a"].component("a-config-provider",u["b"]),g["a"].component("a-select",s["a"]),g["a"].component("a-switch",i["a"]),g["a"].component("a-input-group",p["a"].Group),g["a"].component("a-row",r["a"]),g["a"].component("a-col",a["a"]),g["a"].component("a-upload",o["a"]),g["a"].config.productionTip=!1;var le=new $["a"]({uri:"http://localhost:80/graphql"}),pe=new k["a"]({defaultClient:le});new g["a"]({apolloProvider:pe,router:J,store:ce,render:function(e){return e(S)}}).$mount("#app")}});
//# sourceMappingURL=app.eaad4484.js.map