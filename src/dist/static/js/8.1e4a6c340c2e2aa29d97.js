webpackJsonp([8],{"+re3":function(t,e){},nFAI:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("fZjL"),s=a.n(n),c=a("2CGT"),i=function(){return Object(c.a)("/check_staff/findNoCheckedCheck_Staff",{method:"post"})},o={data:function(){return{loading:!0,UncheckData:[],ckeckedData:{staff_id:"",ispass:1},search:""}},mounted:function(){this.getUncheckData()},computed:{tables:function(){var t=this.search;return t?this.UncheckData.filter(function(e){return s()(e).some(function(a){return String(e[a]).toLowerCase().indexOf(t)>-1})}):this.UncheckData}},methods:{showDate:function(t){return-1!==(t+="").indexOf(this.search)&&""!==this.search?t.replace(this.search,'<span style="color: red; ">'+this.search+"</span>"):t},getUncheckData:function(){var t=this;i().then(function(e){t.UncheckData=e.data.staffs,t.loading=!1,console.log(t.UncheckData)}).catch(function(e){return t.$message.error(e.message)})},passCheck:function(t){var e,a=this;this.ckeckedData.staff_id=t.staff_id,this.ckeckedData.ispass=1,(e=this.ckeckedData,Object(c.a)("/check_staff/updateCheck_Staff",{method:"post",data:e})).then(function(t){a.loading=!0,i().then(function(t){a.UncheckData=t.data.staffs,a.loading=!1,console.log(a.UncheckData)}).catch(function(t){return a.$message.error(t.message)})}).catch(function(t){})},UnpassCheck:function(t){var e,a=this;this.ckeckedData.staff_id=t.staff_id,this.ckeckedData.ispass=0,(e=this.ckeckedData,Object(c.a)("/check_staff/updateCheck_Staff",{method:"post",data:e})).then(function(t){a.loading=!0,i().then(function(t){a.UncheckData=t.data.staffs,a.loading=!1,console.log(a.UncheckData)}).catch(function(t){return a.$message.error(t.message)})}).catch(function(t){})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("span",{staticClass:"secondtitle"},[t._v("用户审核")])])],1)],1),t._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("el-input",{staticStyle:{left:"300px",position:"relative",width:"200px"},attrs:{placeholder:"请输入被审核者姓名"}}),t._v(" "),a("el-button",{staticStyle:{left:"300px",position:"relative"},attrs:{icon:"el-icon-search",type:"primary"}},[t._v("搜索")]),t._v(" "),a("br"),a("br"),t._v(" "),a("el-row",{staticClass:"ep_info"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"600px",left:"300px",position:"relative"},attrs:{data:t.UncheckData}},[a("el-table-column",{attrs:{label:"注册者id",width:"130px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"col-cont",staticStyle:{left:"30px",position:"relative"},domProps:{innerHTML:t._s(t.showDate(e.row.staff_id))}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"注册者姓名"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"col-cont",staticStyle:{left:"30px",position:"relative"},domProps:{innerHTML:t._s(t.showDate(e.row.staff.name))}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{left:"50px",position:"relative"},attrs:{type:"success"},on:{click:function(a){return t.passCheck(e.row)}}},[t._v("通过")]),t._v(" "),a("el-button",{staticStyle:{left:"50px",position:"relative"},attrs:{type:"warning"},on:{click:function(a){return t.UnpassCheck(e.row)}}},[t._v("不通过")])]}}])})],1)],1)],1)])])},staticRenderFns:[]};var l=a("VU/8")(o,r,!1,function(t){a("+re3")},null,null);e.default=l.exports}});
//# sourceMappingURL=8.1e4a6c340c2e2aa29d97.js.map