<!--所有认证公司-->
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="secondtitle">员工添加</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-form ref="form"  :model="form" label-width="80px"  >
          <el-form-item label="姓名" prop="username">
            <el-input v-model="form.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex" fill="#ffff">
              <el-radio  label="男" border >男</el-radio>
              <el-radio  label="女" border>女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号" prop="identityCard">
            <el-input v-model="form.identityCard"  clearable></el-input>
          </el-form-item>
          <el-form-item label="电话/账号" prop="mobile">
            <el-input v-model="form.mobile" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" clearable></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="departmentId">
            <el-cascader :options="tableData" :show-all-levels="false"
                         placeholder="请选择部门进行筛选"
                         v-model="allDepartmentId"
                         :clearable="true" :props="defaultProps" >
              <template #default="{data}">
                <span>{{ data.name }}</span>
                <span v-if="data.children!=undefined"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
          <el-form-item label="入职日期" prop="timeOfEntry">
            <el-config-provider :locale="locale">
            <el-date-picker
                v-model="form.timeOfEntry"
                type="date"
                placeholder="选择日期"

                value-format='YYYY-MM-DD'
            >
            </el-date-picker>
            </el-config-provider>
          </el-form-item>

          <el-form-item label="生日" prop="birthday">
            <el-date-picker

                v-model="form.birthday"
                type="date"
                placeholder="选择日期"
                value-format='YYYY-MM-DD'
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>


import {getAllDepartment} from "../../../service/HR/depatment";
 import {addNewMember} from "../../../service/administration/companyAdministration";
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  data() {
    return {
      //日期语言
      locale: zhCn,

      defaultProps:{
        label:'name',
        value:'id'
      },
      allDepartmentId:'',
      tableData: [],
      // 默认显示第一条
      form: {
        birthday: "",
        departmentId: "",
        email: "",
        identityCard: "",
        level: 5,
        mobile: "",
        sex: "",
        timeOfEntry: "",
        username: ""
      }
    }
  },
  methods:{
    getDepartment(){
      getAllDepartment().then((res)=>{
        console.log(res.data)
        this.tableData= this.getTreeData(res.data.data);
      }).catch((err)=>{
        console.log(err)
      })
    },
    getTreeData(data){
      for(var i=0;i<data.length;i++){
        if(data[i].children.length==0){
          // children若为空数组，则将children设为undefined
          data[i].children=undefined;
        }else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }

      return data;
    },
    onSubmit(){
      this.form.departmentId=this.allDepartmentId[this.allDepartmentId.length-1]
      addNewMember(this.form).then((res)=>{
        if (res.data.success===true)
        {
          this.$refs["form"].resetFields()
          this.allDepartmentId=""
          this.$message({
            type: 'success',
            message: '增添成功!',
          });
        }
      }).catch((err)=>{
        this.$message({
          type: 'error',
          message: '出错啦，请联系管理员!'
        });
        console.log(err);
      })
    }
  },
  mounted() {
    this.getDepartment()
  }

}
</script>
<style>

</style>



