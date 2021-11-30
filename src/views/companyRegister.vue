<template>
  <div class="registe1">
    <!--    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>-->
    <!-- 标题 -->
    <div class="title">
      跨企业人才管理系统


    </div>
    <div class="title2"> (企业认证)</div>
    <div class="each_info2" size="medium">

      <el-form class="apply-form first-form" :model="allData"   ref="allData"
               label-position="top" label-width="150px">
        <el-form :rules="rules1" ref="allData.companyRegist"  :model="allData.companyRegist">
        <el-form-item label="公司名称" prop="companyName" style="font-size: 15px">
          <el-input class="el-input" v-model="allData.companyRegist.companyName" clearable></el-input>
        </el-form-item>

        <el-form-item label="社会信用代码" prop="code">
          <el-input v-model="allData.companyRegist.code" clearable></el-input>
        </el-form-item>

        <el-form-item label="公司所在地" prop="companyArea">
          <el-input v-model="allData.companyRegist.companyArea" clearable></el-input>
        </el-form-item>

        <el-form-item label="公司地址" prop="companyAddress">
          <el-input v-model="allData.companyRegist.companyAddress" clearable></el-input>
        </el-form-item>

        <el-form-item label="公司联系电话" prop="companyPhone">
          <el-input v-model="allData.companyRegist.companyPhone" clearable></el-input>
        </el-form-item>

        <el-form-item label="公司法人" prop="legalPerson">
          <el-input v-model="allData.companyRegist.legalPerson" clearable></el-input>
        </el-form-item>

        <el-form-item label="公司创建日期" prop="legalPerson">
          <el-config-provider :locale="locale">
            <el-date-picker
                v-model="allData.companyRegist.createDate"
                type="date"
                placeholder="选择日期"
                value-format='YYYY-MM-DD'
            >
            </el-date-picker>
          </el-config-provider>
        </el-form-item>

        <el-form-item label="公司类别" prop="industry">
          <el-input v-model="allData.companyRegist.industry" clearable></el-input>
        </el-form-item>

        <el-form-item label="公司邮箱" prop="email">
          <el-input v-model="allData.companyRegist.email"></el-input>
        </el-form-item>
        </el-form>

        <el-form :rules="rules2" ref="allData.userRegist" :model="allData.userRegist">
        <el-form-item label="公司管理员姓名" prop="username">
          <el-input v-model="allData.userRegist.username" clearable></el-input>
        </el-form-item>

        <el-form-item label="公司管理员电话(账号)" prop="mobile">
          <el-input v-model="allData.userRegist.mobile" clearable></el-input>
        </el-form-item>


        <el-form-item label="密码" prop="password">
          <el-input v-model="allData.userRegist.password" :type="typePwd1" :maxlength="18" placeholder="请输入密码(6-18位)"
                    show-password clearable>
            <i class="el-icon-view" v-bind:class="{changethecolor1:changecolor1}" @click="showPwd1"/>
          </el-input>
        </el-form-item>
        <el-form :rules="again_passwordrule" :model="allData">
          <el-form-item label="再次输入密码" prop="again_password">
            <el-input v-model="allData.again_password" :type="typePwd2" :maxlength="18" placeholder="请再次输入密码"
                      show-password clearable>
              <i class="el-icon-view" v-bind:class="{changethecolor2:changecolor2}" @click="showPwd2"/>
            </el-input>
          </el-form-item>
        </el-form>
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="allData.userRegist.sex" fill="#ffff">
            <el-radio label="男" border>男</el-radio>
            <el-radio label="女" border>女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="管理员邮箱" prop="email">
          <el-input v-model="allData.userRegist.email" placeholder="请输入邮箱" clearable></el-input>
          <el-button type="primary" size="small" @click="sendCode" :disabled="send">发送验证码</el-button>
          <el-alert v-show="send" title="请一分钟后再重新发送" type="warning" />
        </el-form-item>
          <el-form :rules="again_passwordrule" :model="allData">
        <el-form-item label="邮箱验证码" prop="code">
          <el-input v-model="allData.code"  placeholder="请输入验证码" clearable></el-input>
        </el-form-item>
          </el-form>
        <el-form-item label="身份证号码" prop="identityCard">
          <el-input v-model="allData.userRegist.identityCard" clearable></el-input>
        </el-form-item>
        </el-form>
      </el-form>
      <el-row>

        <el-button round type="primary" style="width: 150px;left: 80px;position: relative;"
                   @click="submitForm('allData','allData.companyRegist','allData.userRegist')">注册
        </el-button>

        <router-link to="/LoginChart">
          <el-button round type="warning" style="width: 150px;left: 120px;position: relative;">返回</el-button>
        </router-link>
      </el-row>
    </div>
  </div>
</template>

<script>
import {GetCode, signUpNewCompanyAccount} from "../service/registe";
//忽略了校验的接口

import {ElConfigProvider} from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  data() {
    var Pass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
        // password 是表单上绑定的字段
      } else if (value !== this.allData.userRegist.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    };
    return {
      //日期语言
      locale: zhCn,

      //
      changethecolor1: false,
      changecolor1: false,
      changethecolor2: false,
      changecolor2: false,

      typePwd1: 'password',
      typePwd2: 'password',

      send:false,
      allData: {
        code:"",
        again_password: '',
        companyRegist: {
          code: "",
          companyAddress: "",
          companyArea: "",
          companyName: "",
          companyPhone: "",
          createDate: "",
          email: "",
          industry: "",
          legalPerson: ""
        },
        userRegist: {
          email: "",
          identityCard: "",
          mobile: "",
          password: "",
          sex: "",
          username: ""
        }
      },

      options: [{
        label: 'hr',
        value: 'hr'
      }, {
        label: '部门主管',
        value: '部门主管'
      }],
      again_passwordrule: {
        again_password: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          // {  max: 18, message: '请填写最多18位密码', trigger: 'blur' },
          {
            required: true,
            validator: Pass2,
            trigger: 'blur'
          }
        ],
        code:[
    {required: true, message: '请输入邮箱验证码', trigger: 'blur'},
        ]
      },


      rules1: {

        companyName: [
          {required: true, message: '请输入公司名称', trigger: 'blur'},
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '不支持特殊字符',
            trigger: 'blur'
          }
        ],
        code: [
          {required: true, message: '请输入信用代码', trigger: 'blur'},
          {
            required: true,
            pattern: /^[a-zA-Z0-9]+$/,
            message: '请输入正确的编号',
            trigger: 'blur'
          }
        ],
        companyPhone: [
          {required: true, message: '请输入公司联系电话', trigger: 'blur'},

        ],


        companyAddress: [
          {required: true, message: '请输入公司地址', trigger: 'blur'},
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '请输入正确的公司地址',
            trigger: 'blur'
          }
        ],
        companyArea: [
          {required: true, message: '请输入公司所在地', trigger: 'blur'},
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '请输入正确的公司所在地',
            trigger: 'blur'
          }
        ],

        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {
            required: true,
            pattern: /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }],
        industry: [
          {required: true, message: '请输入行业', trigger: 'blur'}
        ],
        legalPerson:[
          {required: true, message: '请输入法人', trigger: 'blur'}
        ],
    createDate: [
      {required: true, message: '请选择日期', trigger: 'blur'}
    ]
      },
    rules2:{
      email: [
        {required: true, message: '请输入邮箱', trigger: 'blur'},
        {
          required: true,
          pattern: /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
          message: '请输入正确的邮箱',
          trigger: 'blur'
        }],
      sex: [
        {required: true, message: '请选择性别', trigger: 'blur'},
      ],
      mobile: [
        {required: true, message: '请输入电话', trigger: 'blur'},
        {
          required: true,
          pattern: /^[a-zA-Z0-9]+$/,
          message: '请输入正确的数字组合',
          trigger: 'blur'
        }
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        // {  max: 18, message: '请填写最多18位密码', trigger: 'blur' },
        {
          required: true,
          pattern: /^[a-zA-Z0-9]+$/,
          message: '请输入正确的字母或数字组合',
          trigger: 'blur'
        }
      ],
      identityCard: [
        {required: true, message: '请输入身份证号', trigger: 'blur'},
        {
          required: true,
          pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
          message: '请输入正确的身份证号格式',
          trigger: 'blur'
        }],
      username: [
        {required: true, message: '请输入姓名', trigger: 'blur'},
        {
          required: true,
          pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
          message: '不支持特殊字符',
          trigger: 'blur'
        }
      ],
    }

    }
  },
  methods: {
    showPwd1() {
      this.typePwd1 = this.typePwd1 === 'password' ? 'text' : 'password';
      this.changecolor1 = !this.changecolor1
    },
    showPwd2() {
      this.typePwd2 = this.typePwd2 === 'password' ? 'text' : 'password';
      this.changecolor2 = !this.changecolor2
    },

    submitForm(formName1,name2,name3) {
      this.$refs[formName1].validate((valid) => {
        if (valid) {
          this.$refs[name2].validate((valid) => {
            if (valid) {
              this.$refs[name3].validate((valid) => {
                if (valid) {
                  this.signUp()
                } else {
                  alert('请输入要求的信息及其规定格式')
                  return false
                }
              })
            } else {
              alert('请输入要求的信息及其规定格式')
              return false
            }
          })
        } else {
          alert('请输入要求的信息及其规定格式')
          return false
        }
      })
    },
    //发送邮箱验证码
    sendCode() {

      if (this.allData.userRegist.email) {
        this.send = true
        let _this = this
        setTimeout(function () {
          _this.send = false
        }, 60000)
        GetCode(this.allData.userRegist.email).then((res) => {
          console.log(res.data)
        }).catch()
      } else {
        this.$message.error('请输入邮箱');
      }
    },

    signUp() {
      let codes=this.allData.code
      delete this.allData.code
      delete this.allData.again_password
      signUpNewCompanyAccount(this.allData,codes).then((res) => {
        if (res.data.success == true) {
          this.allData.again_password = ""
          // this.allData.formData={brand_right:0}
          // this.allData={brand_right:0}//不能用这种方法了
          this.$refs['allData'].resetFields()
          this.$refs['allData.companyRegist'].resetFields()
          this.$refs['allData.userRegist'].resetFields()

          this.$message({
            message: '注册成功，等待验证',
            type: 'success'
          })
        } else {
          this.$message.error('注册失败');
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('注册失败，请联系管理员');
      })
    }
  },
  watch: {
    showColoer1: function () {
      this.changethecolor1 = this.changecolor1
    },
    showColoer2: function () {
      this.changethecolor2 = this.changecolor2
    },
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
  height: 1400px;
  margin: 60px auto 0;
  position: relative;
}

.each_info2 {
  justify-content: center;
  position: relative;
  top: 50px;
  width: 500px;

  left: 150px;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 50px;
  box-shadow: 0 10px 40px 0 rgb(0 13 97);

}

.el-input {
  outline: none;
  border: none;
  background: none;
  color: #fff;
  font-size: 18px;
}

.el-form-item__label {
  font-size: 18px;
  color: black;
}
</style>
