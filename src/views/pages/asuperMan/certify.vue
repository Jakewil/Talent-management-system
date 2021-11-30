<!--进行公司认证-->
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="secondtitle">公司认证</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
      <template v-for="item in UnCheckedData" :index="item.index" :key="item.index">
        <el-descriptions :title=" '公司:'+item.company.companyName " direction="vertical" :column="5" border>
          <el-descriptions-item label="信用代码">
            {{item.company.code}}
          </el-descriptions-item>
          <el-descriptions-item label="所在地">
            {{item.company.companyArea}}
          </el-descriptions-item>
          <el-descriptions-item label="地址" :span="2">
            {{item.company.companyAddress}}
          </el-descriptions-item>
          <el-descriptions-item label="联系电话">
            {{item.company.companyPhone}}
          </el-descriptions-item>
          <el-descriptions-item label="公司邮箱">
            {{item.company.email }}
          </el-descriptions-item>
          <el-descriptions-item label="公司法人">
            {{item.company.legalPerson }}
          </el-descriptions-item>

          <el-descriptions-item label="管理员姓名">
            {{item.user}}
          </el-descriptions-item>
<!--          <el-descriptions-item label="管理员电话(登陆账号)">-->
<!--            {{item.user.mobile}}-->
<!--          </el-descriptions-item>-->
          <el-descriptions-item label="操作">
           <el-button type="success" size="mini" @click="passCheck(item)">通过</el-button>
            <el-button type="danger" size="mini" >不通过</el-button>
          </el-descriptions-item>
        </el-descriptions>
        <br><br>
      </template>
      </div>
    </div>
  </div>
</template>

<script>
import {UnCheckedCompany} from "../../../service/superMan/company";
import {passCompany} from "../../../service/administration/companyAdministration";

export default {
  data() {
    return {
     UnCheckedData:[],
      inf:{
       companyId:'',
       userId:''
      }
    }
  },
  methods:{
      getAllUncheckedCompany(){
        UnCheckedCompany().then((res)=>{
          this.UnCheckedData=res.data.data.list

          console.log(res.data.list)
        }).catch()
      },
    passCheck(item){
        console.log(item)
      this.inf.companyId=item.company.id
      this.inf.userId=item.user.id
      console.log(this.inf)
      passCompany(this.inf).then((res)=>{
        if (res.data.success==true)
        {
          this.$message({
            type: 'success',
            message: '已通过!'
          });
          this.getAllUncheckedCompany()
        } else {
          this.$message.error('失败');
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
    this.getAllUncheckedCompany()
  }
}
</script>
<style>

</style>

