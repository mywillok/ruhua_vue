(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/wx_auth/xcx_auth"],{"203b":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=e("cdc3"),u={data:function(){return{login:!1}},props:["auth"],watch:{"auth.is_name":function(n){this.check_userAuth()},"auth.is_address":function(n){console.log("address:",n)},"auth.is_phone":function(n){console.log("phone:",n)}},methods:{check_userAuth:function(){console.log("授权开始");var t=this;n.getSetting({success:function(e){console.log("获取已授权列表",e),e.authSetting["scope.userInfo"]?(console.log("已授权过了"),n.getUserInfo({success:function(n){var e=n.userInfo;t.UpUser(e)}})):(console.log("弹出授权框"),t.login=!0)}})},updateUserInfo:function(n){this.login=!1;var t=this;if(n.detail.userInfo){var e=n.detail.userInfo;t.UpUser(e)}},UpUser:function(t){var e=this;n.request({url:o.Api_url+"auth/upinfo",method:"POST",data:{nickname:t.nickName,headpic:t.avatarUrl},header:{token:n.getStorageSync("token")},success:function(n){e.$emit("userinfo",t)}})}}};t.default=u}).call(this,e("543d")["default"])},"21c1":function(n,t,e){"use strict";var o=e("cdba"),u=e.n(o);u.a},"67a7":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement,o=(n._self._c,e("f9c7"));n.$mp.data=Object.assign({},{$root:{m0:o}})},u=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return u})},"6d61":function(n,t,e){"use strict";e.r(t);var o=e("67a7"),u=e("78b0");for(var a in u)"default"!==a&&function(n){e.d(t,n,function(){return u[n]})}(a);e("21c1");var c=e("2877"),s=Object(c["a"])(u["default"],o["a"],o["b"],!1,null,null,null);t["default"]=s.exports},"78b0":function(n,t,e){"use strict";e.r(t);var o=e("203b"),u=e.n(o);for(var a in o)"default"!==a&&function(n){e.d(t,n,function(){return o[n]})}(a);t["default"]=u.a},cdba:function(n,t,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/wx_auth/xcx_auth-create-component',
    {
        'components/wx_auth/xcx_auth-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6d61"))
        })
    },
    [['components/wx_auth/xcx_auth-create-component']]
]);
