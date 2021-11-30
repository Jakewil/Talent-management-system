<template>
  <div class="registe">
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    <!-- 标题 -->
    <div class="title">
      跨企业人才管理系统
    </div>
    <div class="each_info6" size="medium">
      <div style="text-align: center;font-size: 30px">修改密码</div>
      <el-form class="apply-form first-form" :model="allData.formData" :rules="rules" ref="form">

        <el-form-item label="用户账号" prop="account_number">
          <el-input v-model="allData.formData.account_number" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="原密码">
          <el-input v-model="allData.formData.oldPassword" :type="typePwd" :maxlength="18" placeholder="请输入密码(6-18位)" clearable>
            <i slot="suffix" class="el-icon-view" v-bind:class="{changethecolor:changecolor}" @click="showPwd"/>
          </el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="password">
          <el-input v-model="allData.formData.password" :type="typePwd1" :maxlength="18" placeholder="请输入密码(6-18位)" clearable>
            <i slot="suffix" class="el-icon-view" v-bind:class="{changethecolor1:changecolor1}" @click="showPwd1"/>
          </el-input>
        </el-form-item>
        <el-form :model="allData" :rules="againpasswordrule">
        <el-form-item label="再次输入新密码" prop="again_password">
          <el-input v-model="allData.again_password" :type="typePwd2" :maxlength="18" placeholder="请再次输入密码" clearable>
            <i slot="suffix" class="el-icon-view" v-bind:class="{changethecolor2:changecolor2}" @click="showPwd2"/>
          </el-input>
        </el-form-item>
        </el-form>
      </el-form>
      <el-row>
        <span>&nbsp&nbsp&nbsp&nbsp</span>
        <span>&nbsp&nbsp&nbsp&nbsp</span>
        <el-button round type="primary" style="left: 40px;width: 150px;position: relative" @click="submit">提交</el-button>
        <span>&nbsp&nbsp&nbsp&nbsp</span>
        <router-link to="/homepage"><el-button round type="warning" style="left: 40px;width: 150px;position: relative">
          返回</el-button></router-link>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
name: "changePwd",
  data() {
    var Pass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
        // password 是表单上绑定的字段
      } else if (value !== this.allData.formData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      changethecolor: false,
      changecolor:false,
      changethecolor1: false,
      changecolor1:false,
      changethecolor2: false,
      changecolor2:false,
      typePwd:'password',
      typePwd1:'password',
      typePwd2:'password',
      allData:{
        againpassword: '',
        formData: {
          account_number: '',
          oldPassword:'',
          password: '',
        },
      },
      againpasswordrule:{
        again_password: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          // {min: 6, max: 18, message: '请填写6-18位密码', trigger: 'blur'},
          {
            required: true,
            validator: Pass2,
            trigger: 'blur'
          }
        ]

      },
      rules: {
        account_number: [
          {required: true, message: '请输入账户', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '账户不支持特殊字符',
            trigger: 'blur'
          }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          // {min: 6, max: 18, message: '请填写6-18位密码', trigger: 'blur'},
          {
            required: true,
            pattern: /^[a-zA-Z0-9]+$/,
            message: '请输入正确的字母或数字组合',
            trigger: 'blur'
          }
        ],

      }
    }
  },
  computed:{
    showColoer: function (){
      this.changethecolor=this.changecolor
    },
    showColoer1: function (){
      this.changethecolor1=this.changecolor1
    },
    showColoer2: function (){
      this.changethecolor2=this.changecolor2
    },
  },
  methods: {
    submit() {
      this.axios(
        {
          method: "post",
          data: this.allData.formData,
          url: '/staff/updateStaff'

        }).then((res) => {
          console.log(res.data)//msg字段：success/wrong_password
        if (res.data.msg=='success'){
          this.$message.success('修改成功')
          this.$router.push('/LoginChart')
        }else{
          this.$message.error('修改失败')
        }

      }).catch((err) => {
        this.$message.error('修改失败，请联系管理员')

      })
    },
    showPwd (){
      this.typePwd = this.typePwd === 'password' ? 'text' : 'password';
      this.changecolor=!this.changecolor
    },
    showPwd1 (){
      this.typePwd1 = this.typePwd1 === 'password' ? 'text' : 'password';
      this.changecolor1=!this.changecolor1
    },
    showPwd2 (){
      this.typePwd2 = this.typePwd2 === 'password' ? 'text' : 'password';
      this.changecolor2=!this.changecolor2
    },
  }
}
</script>

<style>
.changethecolor{
  color: red;
}
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
  /*font-family: 'SimSun';*/
  color: #FFF;
  text-shadow: 5px 5px 10px black;
  z-index: 1;
}
.registe {
  width: 900px;
  height: 400px;
  margin: 60px auto 0;
  position: relative;
}
.each_info6 {
  justify-content: center;
  position: relative;
  top:50px;
  width: 500px;
  height: 500px;
  left: 180px;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 30px;
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
