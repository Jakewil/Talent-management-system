webpackJsonp([7],{DFvH:function(e,a){},aqeL:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"registe"},[t("el-backtop",{attrs:{target:".page-component__scroll .el-scrollbar__wrap"}}),e._v(" "),t("div",{staticClass:"title"},[e._v("\n    跨企业人才管理系统\n  ")]),e._v(" "),t("div",{staticClass:"each_info4",attrs:{size:"medium"}},[t("div",{staticStyle:{"text-align":"center","font-size":"30px"}},[e._v("忘记账号")]),e._v(" "),t("el-form",{ref:"form",staticClass:"apply-form first-form",attrs:{model:e.formData,rules:e.rules}},[t("el-form-item",{staticStyle:{"font-size":"15px"},attrs:{label:"真实姓名",prop:"formData.name"}},[t("el-input",{staticClass:"el-input",attrs:{placeholder:"请输入姓名",clearable:""},model:{value:e.formData.name,callback:function(a){e.$set(e.formData,"name",a)},expression:"formData.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"个人编号",prop:"formData.id"}},[t("el-input",{attrs:{placeholder:"请输入编号",clearable:""},model:{value:e.formData.id,callback:function(a){e.$set(e.formData,"id",a)},expression:"formData.id"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"公司编号",prop:"formData.company_id"}},[t("el-input",{attrs:{placeholder:"请输入编号",clearable:""},model:{value:e.formData.company_id,callback:function(a){e.$set(e.formData,"company_id",a)},expression:"formData.company_id"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"性别:",prop:"formData.gender"}},[t("el-radio-group",{attrs:{fill:"#ffff"},model:{value:e.formData.gender,callback:function(a){e.$set(e.formData,"gender",a)},expression:"formData.gender"}},[t("el-radio",{attrs:{label:"男",border:""}},[e._v("男")]),e._v(" "),t("el-radio",{attrs:{label:"女",border:""}},[e._v("女")])],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"身份选择",prop:"formData.identity"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formData.identity,callback:function(a){e.$set(e.formData,"identity",a)},expression:"formData.identity"}},e._l(e.options,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"邮箱",prop:"formData.email"}},[t("el-input",{attrs:{placeholder:"请输入邮箱",clearable:""},model:{value:e.formData.email,callback:function(a){e.$set(e.formData,"email",a)},expression:"formData.email"}})],1)],1),e._v(" "),t("el-row",[t("span",[e._v("    ")]),e._v(" "),t("span",[e._v("    ")]),e._v(" "),t("el-button",{staticStyle:{left:"40px",width:"150px",position:"relative"},attrs:{round:"",type:"primary"},on:{click:e.submit}},[e._v("提交")]),e._v(" "),t("span",[e._v("    ")]),e._v(" "),t("router-link",{attrs:{to:"/LoginChart"}},[t("el-button",{staticStyle:{left:"40px",width:"150px",position:"relative"},attrs:{round:"",type:"warning"}},[e._v("\n        返回")])],1)],1)],1)],1)},staticRenderFns:[]};var l=t("VU/8")({name:"forgetAccount",data:function(){return{formData:{id:"",name:"",company_id:"",email:"",gender:"男",identity:"hr"},options:[{label:"hr",value:"hr"},{label:"部门主管",value:"部门主管"}],rules:{name:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"},{required:!0,pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,message:"姓名不支持特殊字符",trigger:"blur"}],id:[{required:!0,message:"请输入编号",trigger:"blur"},{required:!0,pattern:/^[a-zA-Z0-9]+$/,message:"请输入正确的编号",trigger:"blur"}],company_id:[{required:!0,message:"请输入公司名称",trigger:"blur"},{required:!0,pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,message:"请输入正确的公司名称",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{required:!0,pattern:/^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,message:"请输入正确的邮箱",trigger:"blur"}]}}},methods:{submit:function(){var e=this;this.axios({method:"post",data:this.formData,url:"/staff/updateStaff"}).then(function(a){"error"==a.data.msg?e.$message.error("查询失败"):(e.$message({type:"success",message:a.data.msg.account_number}),e.formData={brand_right:0})}).catch(function(a){e.$message.error("查询失败,请联系管理员")})}}},r,!1,function(e){t("DFvH")},null,null);a.default=l.exports}});
//# sourceMappingURL=7.8e8e326d7a6c6febc74a.js.map