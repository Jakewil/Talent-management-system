webpackJsonp([3],{J2Ug:function(e,t,s){"use strict";s.d(t,"a",function(){return n});var a=s("2CGT"),n=function(e){return Object(a.a)("/Reward_Punishment/addReward_Punishment",{method:"post",data:e})}},qBki:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("mvHQ"),n=s.n(a),o=s("fZjL"),i=s.n(o),r=s("2CGT"),l=s("wtEF"),c=s("mtWM"),m=s.n(c),d=s("J2Ug"),u={data:function(){return{isThisInf:!0,isComments:!1,isAddComments:!1,loading:!0,tableData:[],infData:[],search:"",saveSearch:"",commentFrom:{worker_id:"",staff_id:"",symbol:"1",detail:""},cm_rules:{staff_id:[{required:!0,message:"请输入hrid",trigger:"blur"}],symbol:[{required:!0,message:"请选择奖惩",trigger:"blur"}],detail:[{required:!0,message:"请输入详情",trigger:"blur"}]}}},mounted:function(){this.gettableData()},computed:{tables:function(){var e=this.search;return e?this.tableData.filter(function(t){return i()(t).some(function(s){return String(t[s]).toLowerCase().indexOf(e)>-1})}):this.tableData}},methods:{showDate:function(e){return-1!==(e+="").indexOf(this.search)&&""!==this.search?e.replace(this.search,'<span style="color: red; ">'+this.search+"</span>"):e},gettableData:function(){var e=this;Object(r.a)("/worker/findAll/",{method:"post",data:{company_id:"114073711"}}).then(function(t){e.tableData=t.data.worker,e.loading=!1,console.log(e.tableData)}).catch(function(t){return e.$message.error(t.message)})},changeToComments:function(e){var t=this;this.isComments=!0,this.loading=!0,this.isThisInf=!1;var s=e.id;m.a.post("/Reward_Punishment/findByWorker_id",{worker_id:s}).then(function(e){t.infData=e.data.reward_punishments,console.log(t.infData);for(var s=0;s<t.infData.length;s++)1==t.infData[s].symbol?t.infData[s].symbol="惩罚":t.infData[s].symbol="奖励";t.loading=!1,t.saveSearch=t.search,t.search=""}).catch(function(e){return t.$message.error(e.message)})},backPageInf:function(){this.isThisInf=!0,this.isComments=!1,this.isAddComments=!1,this.commentFrom={brand_right:0},this.search=this.saveSearch},showDetail:function(e){this.$alert(e.detail,"评价详情",{confirmButtonText:"确定"})},changeToAddComments:function(e){this.worker_id=l.a,this.staff_id=e.id,this.isThisInf=!1,this.isAddComments=!0,this.commentFrom.worker_id=e.id},submitForm:function(){var e=this,t=localStorage.getItem("worker_id");t=t.replace('"',"").replace('"',""),this.commentFrom.staff_id=t,Object(d.a)(this.commentFrom).then(function(t){console.log(n()(t.data.msg));var s=n()(t.data.msg);console.log(s),s.trim()==s.trim()?(console.log("ok"),e.commentFrom={brand_right:0},e.$message({message:"添加成功",type:"success"})):(e.commentFrom={brand_right:0},e.$message({message:"添加失败",type:"danger"}))}).catch(function(t){console.log(t),e.$message.error("添加失败，请联系管理员")})}}},h={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"crumbs"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",[s("span",{directives:[{name:"show",rawName:"v-show",value:e.isThisInf,expression:"isThisInf"}],staticClass:"secondtitle"},[e._v("员工信息查询")]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.isComments,expression:"isComments"}],staticClass:"secondtitle"},[e._v("员工评价详情")]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.isAddComments,expression:"isAddComments"}],staticClass:"secondtitle"},[e._v("员工评价录入")])])],1)],1),e._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"handle-box"},[s("div",{staticStyle:{display:"block",width:"inherit",height:"inherit"}},[s("span",{directives:[{name:"show",rawName:"v-show",value:!e.isAddComments,expression:"!isAddComments"}],staticStyle:{left:"200px",position:"relative",color:"mediumblue","font-size":"20px"}},[s("i",{staticClass:"el-icon-search"},[e._v("筛选")])]),e._v(" "),s("el-input",{directives:[{name:"show",rawName:"v-show",value:!e.isAddComments,expression:"!isAddComments"}],staticStyle:{left:"200px",position:"relative",width:"200px"},attrs:{type:"search",placeholder:"请输入信息"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:e.isComments,expression:"isComments"}],staticStyle:{left:"200px",position:"relative"},attrs:{type:"danger"},on:{click:e.backPageInf}},[e._v("返回")]),e._v(" "),s("br"),s("br"),e._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"},{name:"show",rawName:"v-show",value:e.isThisInf,expression:"isThisInf"}],staticStyle:{width:"800px",left:"200px"},attrs:{data:e.tables,"max-height":"700"}},[s("el-table-column",{attrs:{label:"员工id"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.id))}})]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"姓名"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.name))}})]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"性别"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.gender))}})]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"电话"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.phone_number))}})]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"邮件"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.email))}})]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作",width:"250px"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v("      ")]),e._v(" "),s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(s){return e.changeToComments(t.row)}}},[e._v("评价详情")]),e._v(" "),s("span",[e._v("   ")]),e._v(" "),s("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(s){return e.changeToAddComments(t.row)}}},[e._v("添加评价")])]}}])})],1),e._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"},{name:"show",rawName:"v-show",value:e.isComments,expression:"isComments"}],staticStyle:{width:"800px",left:"200px",position:"relative"},attrs:{data:e.infData,"max-height":"500"}},[s("el-table-column",{attrs:{label:"姓名"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.name))}})]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"奖惩"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.symbol))}})]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"详情"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{type:"primary",plain:""},on:{click:function(s){return e.showDetail(t.row)}}},[e._v("详情")])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.time))}})]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"公司名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.company_name))}})]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"评价人"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticClass:"col-cont",domProps:{innerHTML:e._s(e.showDate(t.row.staff_name))}})]}}])})],1),e._v(" "),s("el-form",{directives:[{name:"show",rawName:"v-show",value:e.isAddComments,expression:"isAddComments"}],ref:"commentFrom",staticClass:"padding",attrs:{rules:e.cm_rules,model:e.commentFrom,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"奖惩",prop:"symbol"}},[s("el-radio-group",{staticClass:"radio_s",model:{value:e.commentFrom.symbol,callback:function(t){e.$set(e.commentFrom,"symbol",t)},expression:"commentFrom.symbol"}},[s("el-radio",{attrs:{label:"0"}},[e._v("奖励")]),e._v(" "),s("el-radio",{attrs:{label:"1"}},[e._v("惩罚")])],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"详情",prop:"detail"}},[s("el-input",{attrs:{type:"textarea"},model:{value:e.commentFrom.detail,callback:function(t){e.$set(e.commentFrom,"detail",t)},expression:"commentFrom.detail"}})],1),e._v(" "),s("el-form-item",[s("el-button",{staticStyle:{width:"150px"},attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("提交")]),e._v(" "),s("el-button",{attrs:{type:"warning"}},[e._v("取消")]),e._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:e.isAddComments,expression:"isAddComments"}],attrs:{type:"danger"},on:{click:e.backPageInf}},[e._v("返回")])],1)],1)],1)])])])},staticRenderFns:[]};var f=s("VU/8")(u,h,!1,function(e){s("xe98")},null,null);t.default=f.exports},xe98:function(e,t){}});
//# sourceMappingURL=3.78d30bbb642e2e5fdc3d.js.map