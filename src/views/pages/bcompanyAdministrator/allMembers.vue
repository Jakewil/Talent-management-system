<!--所有员工-->
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="secondtitle">所有员工</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-cascader :options="tableData" :show-all-levels="false"
                     v-model="department"
                     @change="selectAllData"
                     placeholder="请选择部门进行筛选"
                     :clearable="true" :props="defaultProps" >
          <template #default="{data}">
            <span>{{ data.name }}</span>
            <span v-if="data.children!=undefined"> ({{ data.children.length }}) </span>
          </template>

        </el-cascader>
        <template v-for="item in selectData" :index="item.index" :key="item.index">
          <el-descriptions class="margin-top" direction="vertical" :column="5" size="small" border>
            <template #extra></template>
            <el-descriptions-item width="180px">
              <template #label>
                <i class="el-icon-office-building"></i>
                员工id
              </template>
              {{ item.id }}
            </el-descriptions-item>
            <el-descriptions-item  width="180px">
              <template #label>
                <i class="el-icon-user"></i>
                姓名
              </template>
              {{item.username}}
            </el-descriptions-item>
            <el-descriptions-item width="120px">
              <template #label>
                <i class="el-icon-tickets" ></i>
                所属部门
              </template>
              {{item.departmentName}}
            </el-descriptions-item>

            <el-descriptions-item width="120px">
              <template #label>
                <i class="el-icon-tickets"></i>
                身份
              </template>
              <a v-if="item.level==1">程序管理员</a>
              <a v-if="item.level==2">HR</a>
              <a v-if="item.level==3">部门主管</a>
              <a v-if="item.level==5">职员</a>
            </el-descriptions-item>

            <el-descriptions-item width="200px">
              <template #label>
                <i class="el-icon-mobile-phone"></i>
                手机号/账号
              </template>
              {{ item.mobile }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <i class="el-icon-tickets"></i>
                个人邮箱
              </template>
              {{item.email}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <i class="el-icon-tickets"></i>
                身份证号
              </template>
              {{item.email}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <i class="el-icon-tickets"></i>
               入职时间
              </template>
              {{item.timeOfEntry}}
            </el-descriptions-item>

            <el-descriptions-item >
              <template #label>
                <i class="el-icon-location-outline"></i>
                状态
              </template>
              <a v-if=" item.enabled==0">离职</a>
              <a v-if=" item.enabled==1">在职</a>

            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-tickets"></i>
                操作
              </template>
              <el-button type="primary" size="mini" @click="changeLevel(item)" v-if="item.level!=1">更改身份</el-button>
              <el-button type="warning" size="mini" @click="remove(item)"  >离职处理</el-button>
            </el-descriptions-item>
          </el-descriptions>
        </template>

        <el-dialog
            title="更改身份"
            v-model="dialogVisible"
            width="30%"
        >
          <el-radio-group v-model="inf.level" >
          <el-radio  label="5" border v-if="oldLevel!=5" >职员</el-radio>
          <el-radio  label="2" border v-if="oldLevel!=2">HR</el-radio>
          <el-radio  label="3" border v-if="oldLevel!=3">部门主管</el-radio>
          </el-radio-group>
          <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmLevel">确 定</el-button>
    </span>
          </template>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>


import {getAllDepartment} from "../../../service/HR/depatment";
import {
  changeMemberLevel,
  changeMemberStatus,
  getAllCompanyMembers
} from "../../../service/administration/companyAdministration";

export default {
  data() {
    return {
      dialogVisible: false,

      department:'',
      defaultProps:{
        label:'name',
        value:'name'
      },
      tableData:[],
      // 筛选
      selectData:[],
      allData:[],
      inf:{
        level:'',
        userId:''
      },
      oldLevel:'',
    }
  },

  methods:{
    //离职
    remove(item) {
      this.$confirm('此操作将使该员工离职, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(item)

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消离职'
        });
      });
    },
    del(item){
      console.log(item)
      changeMemberStatus(item.id).then((res) =>
      {
        if(res.data.success==true){
          this.$message({
            type: 'success',
            message: '离职成功!'
          });
          this.getAllMembers()
        }else {
          this.$message({
            type: 'danger',
            message: '离职失败'
          });
        }
      }).catch((err) =>
      {
        console.log(err)
        this.$message({
          type: 'warning',
          message: '出错了!请联系管理员'
        })
      });
    },
    //更改身份
    changeLevel(item){
          this.inf.userId=item.id
      this.oldLevel=item.level
      this.dialogVisible=true
    },
    confirmLevel(){
      console.log(this.inf)
        changeMemberLevel(this.inf).then((res)=>{
          if (res.data.success==true)
          {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.department=""
            this.getAllMembers()
          } else {
            this.$message.error('修改失败');
          }

        }).catch((err)=>{
          this.$message({
            type: 'error',
            message: '出错啦，请联系管理员!'
          });
          console.log(err);
        })
        this.dialogVisible=false
    },

    selectAllData(val){
      console.log(val)
      if(val==null){

        this.selectData=this.allData
      }
      else {
        this.selectData=this.allData.filter(item =>item.departmentName==val[val.length-1])
      }
    },
    getDepartment(){
      getAllDepartment().then((res)=>{
        console.log(res.data)
        this.tableData= this.getTreeData(res.data.data);
      }).catch((err)=>{
        console.log(err)
      })
    },
    getAllMembers(){
      getAllCompanyMembers().then((res)=>{
        console.log(res.data)
         this.allData= res.data.data;
        this.selectData=this.allData
      }).catch((err)=>{
        console.log(err)
      })
    },
    // 递归判断列表，把最后的children设为undefined
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
    }
  },
  mounted() {
    this.getDepartment()
    this.getAllMembers()
  }

}
</script>
<style>

</style>



