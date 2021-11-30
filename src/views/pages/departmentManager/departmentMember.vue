
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="secondtitle">部门员工</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input
            placeholder="输入姓名关键字进行过滤"
            v-model="filterText">
        </el-input>
  <template v-for="item in selectData" :index="item.index" :key="item.index">
  <el-descriptions v-loading="loading"  class="margin-top"  :column="3" size="small" border>
    <template #extra></template>
    <el-descriptions-item width="80px">
      <template #label>
        <i class="el-icon-user"></i>
        姓名
      </template>
      {{item.username}}
    </el-descriptions-item>
    <el-descriptions-item width="100px">
      <template #label>
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      {{ item.mobile }}
    </el-descriptions-item>
    <el-descriptions-item width="150px">
      <template #label>
        <i class="el-icon-location-outline"></i>
        入职时间
      </template>
      {{ item.timeOfEntry }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <i class="el-icon-office-building"></i>
        员工id
      </template>
      {{ item.id }}
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
        操作
      </template>
      <el-button type="primary" size="mini" @click="addComment(item.id)" >添加评价</el-button>
      <el-button type="warning" size="mini" @click="LookComments(item.id)">查看评价</el-button>
    </el-descriptions-item>
  </el-descriptions>
</template>
        <el-dialog title="新增评价" v-model="dialogFormVisible">
          <el-form :model="inf" ref="inf">
            <el-form-item label="评价类别" :label-width="formLabelWidth" prop="city">

                <el-select v-model="value" placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="详情介绍" :label-width="formLabelWidth" prop="introduce">
              <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="inf.detail"
                  maxlength="30"
                  show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-form>
          <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary"  @click="confirmData">确 定</el-button>
    </span>
          </template>
        </el-dialog>

        <el-dialog
            width="70%"
            title="过往评价" v-model="dialogFormVisible2" >
          <el-collapse v-model="activeNames" >
        <template v-for="item in commentData" :index="item.index" :key="item.index">
            <el-collapse-item
                :title=item.companyName >
              <template v-for="items in item.list" :index="items.index" :key="items.index">
                <el-descriptions class="margin-top"  :column="5" size="small" border>
                    <el-descriptions-item width="90px">
                      <template #label>
                        <i class="el-icon-location-outline"></i>
                        评价时间
                      </template>
                      {{ items.writeTime }}
                    </el-descriptions-item>
                  <el-descriptions-item width="90px">
                    <template #label>
                      <i class="el-icon-user"></i>
                      评价类别
                    </template>
                    {{items.tagName}}
                  </el-descriptions-item>
                  <el-descriptions-item width="100px">
                    <template #label>
                      <i class="el-icon-mobile-phone"></i>
                      评价详情
                    </template>
                    {{ items.detail }}
                  </el-descriptions-item>


                  <el-descriptions-item width="80px">
                    <template #label>
                      <i class="el-icon-user"></i>
                      评价者
                    </template>
                    {{ items.writeBy }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-tickets"></i>
                      操作
                    </template>
                    <el-button type="danger" size="mini" @click="delComments(items.id,item,items)"
                    >删除评价</el-button>
                  </el-descriptions-item>
                </el-descriptions>
              </template>
            </el-collapse-item>
        </template>
          </el-collapse>
          <template #footer>

          </template>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
import {getMembers,add_A_Comment,LookComment,delComment} from '../../../service/departmentManager/members'
export default {
  data() {
    return {
      loading:true,
      formLabelWidth: '70px',
      options: [{
        value: 1,
        label: '绩效完成情况'
      }, {
        value: 2,
        label: '出勤情况'
      }, {
        value: 3,
        label: '重大违纪'
      }, {
        value: 4,
        label: '职业道德'
      }, {
        value: 5,
        label: '工作态度'
      },
        {
          value: 6,
          label: '职业能力'
        }],
      value:'',
      filterText:'',
      selectData:[],
      tableData:[],
      dialogFormVisible:false,
      inf:{
        userId:0,
        detail:'',
        tagId:''
      },
      //查看评价
      dialogFormVisible2:false,
      activeNames: ['1'],
      commentData:[]
    }
  },
  methods:{
    getAllMembers(){
        getMembers().then((res)=>{
          console.log(res.data.data)
          this.tableData=res.data.data
          this.selectData=this.tableData
          this.loading=false
        }).catch((err)=>{
          console.log(err)
        })
    },
    addComment(id){
      this.dialogFormVisible=true
      this.inf.userId=id
    },
    confirmData(){
      this.inf.tagId=this.value
        add_A_Comment(this.inf).then(((res)=>{
          this.inf.tagId=0
          this.inf.detail=''
          this.dialogFormVisible=false
          if(res.data.success==true){
            this.$message({
              type: 'success',
              message: '增添成功!'
            });
          }else {
            this.$message({
              type: 'warning',
              message: '出问题了请联系管理员!'
            });
          }
        })).catch((err)=>{
          console.log(err)
        })
    },
    // 查看评价
    // handleChange(val) {
    //   console.log(val);
    // },
    LookComments(id){
      this.dialogFormVisible2=true
      this.inf.userId=id
        LookComment(id).then((res)=>{
          this.commentData=res.data.data
          console.log(res.data.data)
        }).catch((err)=>{
          console.log(err)
        })
    },
    //删除
    delComments(id,item,items){
      console.log(item,items)
      delComment(id).then((res)=>{
        console.log(res.data)
        if(res.data.success==true){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.LookComments(this.inf.userId)
        }else {
          this.$message({
            type: 'warning',
            message: '出问题了请联系管理员!'
          });
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted() {
     this.getAllMembers()

  },
  watch:{
    filterText(val){
      if(val==''){
        this.selectData=this.tableData
      }else {
        this.selectData=this.tableData.filter(item => item.username.search(val)!= -1)
      }
    }
  }
}
</script>
<style>

</style>



