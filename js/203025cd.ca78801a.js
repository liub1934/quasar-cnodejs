(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["203025cd"],{"365c":function(t,e,n){"use strict";n.d(e,"f",function(){return i}),n.d(e,"e",function(){return a}),n.d(e,"a",function(){return r}),n.d(e,"g",function(){return c}),n.d(e,"i",function(){return s}),n.d(e,"b",function(){return u}),n.d(e,"h",function(){return l}),n.d(e,"c",function(){return p}),n.d(e,"d",function(){return f});n("551c"),n("f751");var o=n("be3b");function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e="/topics",n={page:1,limit:20,tab:"all",mdrender:!0},i=Object.assign({},n,t);return o["a"].get(e,{params:i}).then(function(t){return Promise.resolve(t.data)}).catch(function(t){return Promise.reject(t)})}function a(t,e){var n=e?"/topic/".concat(t,"?accesstoken=").concat(e):"/topic/".concat(t);return o["a"].get(n).then(function(t){return Promise.resolve(t.data)}).catch(function(t){return Promise.reject(t)})}function r(t){var e="/accesstoken";return o["a"].post(e,{accesstoken:t}).then(function(t){return Promise.resolve(t.data)}).catch(function(t){return Promise.reject(t)})}function c(t){var e="/user/".concat(t);return o["a"].get(e).then(function(t){return Promise.resolve(t.data)}).catch(function(t){return Promise.reject(t)})}function s(t){var e="/reply/".concat(t,"/ups");return o["a"].post(e).then(function(t){return Promise.resolve(t.data)}).catch(function(t){return Promise.reject(t)})}function u(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e="/topics";return o["a"].post(e,t).then(function(t){return Promise.resolve(t.data)}).catch(function(t){return Promise.reject(t)})}function l(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n="/topic/".concat(t,"/replies");return o["a"].post(n,e).then(function(t){return Promise.resolve(t.data)}).catch(function(t){return Promise.reject(t)})}function p(t){var e="/topic_collect/collect",n={topic_id:t};return o["a"].post(e,n).then(function(t){return Promise.resolve(t.data)}).catch(function(t){return Promise.reject(t)})}function f(t){var e="/topic_collect/".concat(t);return o["a"].get(e).then(function(t){return Promise.resolve(t.data)}).catch(function(t){return Promise.reject(t)})}},"3f33":function(t,e,n){"use strict";n.d(e,"a",function(){return o});var o=[{label:"全部",value:"all",icon:"icon-all"},{label:"精华",value:"good",icon:"icon-good"},{label:"分享",value:"share",icon:"icon-share"},{label:"问答",value:"ask",icon:"icon-ask"},{label:"招聘",value:"job",icon:"icon-job"},{label:"测试",value:"dev",icon:"icon-job"}]},5092:function(t,e,n){"use strict";var o=n("b89e"),i=n.n(o);i.a},8693:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"add-topic"},[n("q-list",{attrs:{"no-border":""}},[n("q-page-sticky",{staticStyle:{background:"#FFFFFF","z-index":"9"},attrs:{position:"top"}},[n("q-item",[n("q-item-side",[n("span",{staticClass:"topic-title"},[t._v("选择主题")])]),n("q-item-main",[n("q-select",{attrs:{options:t.options},model:{value:t.postData.tab,callback:function(e){t.$set(t.postData,"tab",e)},expression:"postData.tab"}})],1),n("q-item-side",{attrs:{right:""}},[n("q-btn",{attrs:{color:"primary"},on:{click:t.submit}},[t._v("发布")])],1)],1),n("q-item",[n("q-item-side",[n("span",{staticClass:"topic-title"},[t._v("主题名称")])]),n("q-item-main",[n("q-input",{attrs:{placeholder:"主题名称"},model:{value:t.postData.title,callback:function(e){t.$set(t.postData,"title",e)},expression:"postData.title"}})],1)],1)],1),n("q-item",{staticStyle:{"margin-top":"100px"}},[n("q-item-main",[n("q-field",{attrs:{helper:"回复支持Markdown语法,请注意标记代码"}},[n("q-input",{attrs:{type:"textarea",rows:"7",placeholder:"主题内容"},model:{value:t.postData.content,callback:function(e){t.$set(t.postData,"content",e)},expression:"postData.content"}})],1)],1)],1)],1)],1)},i=[];o._withStripped=!0;n("7f7f");var a=n("3156"),r=n.n(a),c=n("3f33"),s=n("2f62"),u=n("365c"),l={data:function(){return{options:[],postData:{tab:"dev",title:"",content:""}}},created:function(){this.SET_TITLE("发布主题"),this.isLogin(),this.filterMenus()},computed:r()({},Object(s["b"])(["userInfo"])),methods:r()({},Object(s["c"])(["SET_TITLE"]),{filterMenus:function(){var t=c["a"].filter(function(t){return"all"!==t.value&&"good"!==t.value}).map(function(t){return{label:t.label,value:t.value}});this.options=t},isLogin:function(){this.userInfo||this.$router.push({name:"Login",query:{redirect:this.$route.path}})},submit:function(){var t=this,e=this.validate(),n=e.valid,o=e.msg;n?(this.postData.accesstoken=this.userInfo.token,Object(u["b"])(this.postData).then(function(e){t.$q.dialog({message:"主题发布成功",ok:"查看主题",cancel:"取消"}).then(function(){t.$router.push({name:"Topic",params:{id:e.topic_id}})})})):this.$q.notify({message:o,type:"negative",position:"center",timeout:1e3})},validate:function(){var t=!0,e="";return this.postData.tab?this.postData.title?this.postData.content?{valid:t,msg:e}:{valid:!1,msg:"请填写主题内容"}:{valid:!1,msg:"请填写主题名称"}:{valid:!1,msg:"请选择主题类型"}}}),watch:{$route:function(t){"Add"===t.name&&this.SET_TITLE("发布主题")}}},p=l,f=(n("5092"),n("2877")),d=Object(f["a"])(p,o,i,!1,null,null,null);d.options.__file="add.vue";e["default"]=d.exports},b89e:function(t,e,n){}}]);