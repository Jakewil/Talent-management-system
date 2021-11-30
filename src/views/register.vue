<template>
  <div class="registe1">
    <!-- 标题 -->
    <div class="title">
      跨企业人才管理系统
    </div>
    <div class="title2"> (用户注册)</div>
    <div class="each_info2" size="medium">

      <el-form class="apply-form first-form" :model="allData.formData" :rules="rules" ref="allData.formData">
        <el-form-item label="姓名" prop="username" >
          <el-input v-model="allData.formData.username" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>


        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="allData.formData.mobile" placeholder="请输入电话" clearable></el-input>
        </el-form-item>


        <el-form-item label="密码" prop="password">
          <el-input v-model="allData.formData.password"  :maxlength="18" placeholder="请输入密码(6-18位)" show-password clearable>
          </el-input>
        </el-form-item>
        <el-form :rules="again_passwordrule" :model="allData">
          <el-form-item label="再次输入密码" prop="again_password" >
            <el-input v-model="allData.again_password"  :maxlength="18" placeholder="请再次输入密码" show-password clearable>

            </el-input>
          </el-form-item>
        </el-form>
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="allData.formData.sex" fill="#ffff">
            <el-radio  label="男" border >男</el-radio>
            <el-radio  label="女" border>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号码" prop="identityCard">
          <el-input v-model="allData.formData.identityCard" placeholder="请输入身份证号码">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="allData.formData.email"  placeholder="请输入邮箱" style="width: 300px;padding-right: 10px" clearable></el-input>
          <el-button type="primary" size="small" @click="sendCode" :disabled="send">发送验证码</el-button>
          <el-alert v-show="send" title="请一分钟后再重新发送" type="warning" />
        </el-form-item>

          <el-form-item label="邮箱验证码" prop="code">
            <el-input v-model="allData.formData.code"  placeholder="请输入验证码" clearable></el-input>
          </el-form-item>

      </el-form>
      <el-row>

        <el-button round type="primary" style="width: 150px;left: 80px;position: relative;" @click="submitForm('allData.formData',)">注册</el-button>

        <router-link to="/LoginChart"><el-button round type="warning" style="width: 150px;left: 120px;position: relative;">返回</el-button></router-link>
      </el-row>
    </div>
  </div>
</template>

<script>
import {GetCode, signUpNewAccount} from "../service/registe";
import {ElMessage} from "element-plus";
//忽略了校验的接口
export default {

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
    };
    return {
      existCompany:'',

      send:false,
      allData:{
        again_password: '',
        formData: {
          email: null,
          identityCard: "",
          mobile: "",
          password: "",
          sex: "女",
          username: null,
          code:"",
        },
      },

      again_passwordrule:{
        again_password: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          // {  max: 18, message: '请填写最多18位密码', trigger: 'blur' },
          { required: true,
            validator: Pass2,
            trigger: 'blur'
          }
        ],
      },


      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '姓名不支持特殊字符',
            trigger: 'blur'
          }
        ],

        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '账户不支持特殊字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // {  max: 18, message: '请填写最多18位密码', trigger: 'blur' },
          {
            required: true,
            pattern: /^[a-zA-Z0-9]+$/,
            message: '请输入正确的字母或数字组合',
            trigger: 'blur'
          }
        ],


        identityCard:[
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          {
            required: true,
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: '请输入正确的身份证号格式',
            trigger: 'blur'
          }],
       sex:[
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            required: true,
            pattern: /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }],
        code: [
          { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
          {
            required: true,
            message: '请输入正确的邮箱验证码',
            trigger: 'blur'
          }]

      },
    }
  },
  methods:{
    //发送邮箱验证码
    sendCode(){

      if(this.allData.formData.email){
        this.send=true
        let _this=this
        setTimeout(function (){
          _this.send=false
        },60000)
        GetCode(this.allData.formData.email).then((res)=>{console.log(res.data)}).catch()
      }else {
        this.$message.error('请输入邮箱');
      }


},
submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.signUp()
        } else {
          alert('请输入要求的信息及其规定格式')
          return false
        }
      })
    },
    signUp(){
      let codes=this.allData.formData.code
      delete this.allData.formData.code
      signUpNewAccount(this.allData.formData,codes).then((res)=>{
        console.log(res.data)
        if (res.data.success===true){
          console.log(this.allData)
          this.allData.again_password=""
          // this.allData.formData={brand_right:0}
          // this.allData={brand_right:0}//不能用这种方法了
          this.$refs['allData.formData'].resetFields()
          ElMessage({
            message: '注册成功，等待验证',
            type: 'success',
          })
        }else {
          this.$message.error('注册失败');

        }
      }).catch((err)=>{
        console.log(err)
        this.$message.error('注册失败，请联系管理员');

      })
    }
  },
}
</script>

<style>
.title2 {
  display: flex;
  justify-content: center;
  align-self: center;
  margin-top: 10px;
  font-size: 50px;
  letter-spacing: 8px;
  color: #FFF;
  text-shadow: 5px 5px 10px black;
  z-index: 1;
}

.registe1 {
  width: 900px;
  height: 900px;
  margin: 60px auto 0;
  position: relative;
}
.each_info2 {
  justify-content: center;
  position: relative;
  top:50px;
  width: 500px;

  left: 150px;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 50px;
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
