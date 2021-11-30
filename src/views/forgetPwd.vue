<template>
  <div class="registe2">

    <!-- 标题 -->
    <div class="title">
      跨企业人才管理系统
    </div>
    <div class="each_info3" size="medium">
      <div style="text-align: center;font-size: 30px">忘记密码</div>
      <el-form class="apply-form first-form" :model="formData"  ref="form">

        <el-form-item label="用户id" prop="id">
          <el-input v-model="formData.id" placeholder="请输入id" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="account_number">
          <el-input v-model="formData.account_number" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>

        <el-form-item label="公司id" prop="company_id">
          <el-input v-model="formData.company_id" placeholder="请输入公司名称" clearable></el-input>
        </el-form-item>

        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" clearable></el-input>
        </el-form-item>

      </el-form>
      <el-row>

        <el-button round type="primary" style="left: 80px;width: 150px;position: relative" @click="submit">提交</el-button>

        <router-link to="/LoginChart"><el-button round type="warning" style="left: 120px;width: 150px;position: relative">
          返回</el-button></router-link>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: "forgetPwd",
  data() {
    return{
      formData: {
        id:'',
        name: '',
        account_number:'',
        company_id:'',
        email:'',
      },
    }
  },
  methods: {
    submit(){

      this.axios(
        {
          method:"post",
          data:this.formData,
          url:'/staff/updateStaff'

        }).then((res)=>{
        console.log(res.data)//msg字段：密码/error
        if (res.data.msg==='error'){
          this.$message.error('查询失败')
        }else{
          this.$message({
            type:'success',
            message:res.data.msg
          })
          this.formData={brand_right:0}
        }
      }).catch(()=>{
        this.$message.error('查询失败,请联系管理员')
      })

    }
  }
}
</script>

<style>
.changethecolor1{
  color: red;
}
.changethecolor2{
  color: red;
}
.title {
  display: flex;
  justify-content: center;
  align-self: center;
  margin-top: 150px;
  font-size: 70px;

  color: #FFF;
  text-shadow: 5px 5px 10px black;
  z-index: 1;
}
.registe2 {
  width: 900px;
  height: 700px;
  margin: 60px auto 0;
  position: relative;
}
.each_info3 {
  justify-content: center;
  position: relative;
  top:50px;
  width: 500px;

  left: 160px;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 10px 40px 0 rgb(0 13 97);
}
.el-input{
  outline: none;
  border: none;
  background: none;
  color: #fff;
  font-size: 18px;
}

.el-form-item__label{
  font-size: 20px;
  color: black;
}
</style>
>
