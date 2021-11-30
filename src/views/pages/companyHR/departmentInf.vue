<!--所有认证公司-->
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="secondtitle">部门信息</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
<span class="custom-tree-node">
  <a></a>
 <span><a><el-button type="success" size="small" style="margin-right: 10px"  @click="dialogFormVisible = true">新增</el-button></a>
  </span> </span>
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </el-input>

        <el-tree
            class="filter-tree"
            v-loading="loading"
            :data="data"
            :props="defaultProps"
            node-key="id"
            highlight-current
            :expand-on-click-node="false"
            :default-expanded-keys="defaultShowNodes"
            @node-expand="handleNodeExpand"
            @node-collapse="handleNodeCollapse"
            :filter-node-method="filterNode"
            ref="tree">
          <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <a
                @click="append(data)">
              <el-button size="small" type="text"  style="color: #67C23A;" >增加</el-button>
            </a>
            <a
                @click="open(node, data)">
              <el-button size="small" type="text" style="color: #F56C6C;">删除</el-button>
            </a>
             <a
                 @click="updateInf(data)">
              <el-button size="small" type="text" style="color: #E6A23C;">更新</el-button>
            </a>
          </span>
        </span>
          </template>

        </el-tree>

        <el-dialog title="新增详情" v-model="dialogFormVisible">
          <el-form :model="form" ref="form">
            <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门代号" :label-width="formLabelWidth" prop="code">
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="经理id" :label-width="formLabelWidth" prop="managerId">
              <el-input v-model="form.managerId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所在城市" :label-width="formLabelWidth" prop="city">
              <el-cascader
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange1">
              </el-cascader>
            </el-form-item>
            <el-form-item label="详情介绍" :label-width="formLabelWidth" prop="introduce">
            <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="textarea"
                maxlength="30"
                show-word-limit
            >
            </el-input>
            </el-form-item>
          </el-form>
          <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary"  @click="confirmData(0)">确 定</el-button>
    </span>
          </template>
        </el-dialog>

<!--        更新-->
        <el-dialog title="更新详情" v-model="dialogFormVisible2">
          <el-form :model="form2" ref="form2">
            <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form2.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门代号" :label-width="formLabelWidth" prop="code">
              <el-input v-model="form2.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="经理id" :label-width="formLabelWidth" prop="managerId">
              <el-input v-model="form2.managerId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所在城市" :label-width="formLabelWidth" prop="city">
              <el-cascader
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange2">
              </el-cascader>
            </el-form-item>
            <el-form-item label="详情介绍" :label-width="formLabelWidth" prop="introduce">
              <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="textarea"
                  maxlength="30"
                  show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-form>
          <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible2 = false">取 消</el-button>
      <el-button type="primary"  @click="updateData">确 定</el-button>
    </span>
          </template>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
import {getAllDepartment,addDepartment,delDepartment,updateDepartment} from "../../../service/HR/depatment";
import { regionDataPlus,CodeToText } from 'element-china-area-data'



export default {
  data() {
    return {
      loading:false,
      options: regionDataPlus,
      selectedOptions: [],
      filterText: '',
      textarea:'',
      data: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      parentid:'',
      id:'',
      form: {
        name: '',
        code: '',
        managerId: null,
        city:'',
        introduce: '',
        parentId:0
      },
      form2: {
        name: '',
        code: '',
        managerId: null,
        city:'',
        introduce: '',
      },
      formLabelWidth: '70px',
      defaultShowNodes:[],
      defaultProps: {
        children: 'children',
        label: 'name'
        // label: 'label'
      }
    };
  },


  methods: {
    //删除
    delNode(data){
      delDepartment(data.id).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
    remove(node, data) {

      delDepartment(data.id).then((res)=>{
        console.log(res)
        this.getDepartment()
      }).catch((err)=>{
        console.log(err)
      })
    },
    //增添
    handleChange1(value) {
      this.form.city=CodeToText[value[0]] +
      "/" +
      CodeToText[value[1]] +
      "/" +
      CodeToText[value[2]]

    },
    confirmData(){
      this.form.introduce=this.textarea
      this.form.parentId=this.parentid
      addDepartment(this.form).then((res)=>{
        console.log(res)
        if(res.data.success==true){
          this.$message({
            type: 'success',
            message: '增添成功!'
          });
          this.form={brand_right:0}
        }else {
          this.$message({
            type: 'warning',
            message: '出问题了请联系管理员!'
          });
        }
        this.getDepartment()
        this.$refs['form'].resetFields();
        this.selectedOptions=[]
        this.textarea=''



      }).catch((err)=>{
        console.log(err)
        this.$refs['form'].resetFields();
        this.selectedOptions=[]
        this.textarea=''
      })
      this.dialogFormVisible=false
    },
    append(data) {
      this.dialogFormVisible=true
      this.parentid=data.id
      console.log(this.parentid)
    },
    open(node, data) {
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.remove(node, data)

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //更新
    handleChange2(value) {
      this.form2.city=CodeToText[value[0]] +
          "/" +
          CodeToText[value[1]] +
          "/" +
          CodeToText[value[2]]

    },
    updateInf(data){
      this.dialogFormVisible2=true
      this.id=data.id
    },
    updateData(){
      this.form2.introduce=this.textarea
      updateDepartment(this.form2,this.id).then((res)=>{
        console.log(res)
        if(res.data.success==true){
          this.$message({
            type: 'success',
            message: '更新成功!'
          });

        }else {
          this.$message({
            type: 'warning',
            message: '更新失败'
          });
        }
        this.form2={brand_right:0}
        this.getDepartment()
        // this.$refs['form2'].resetFields();
        // this.selectedOptions=[]
        // this.textarea=''



      }).catch((err)=>{
        console.log(err)
        this.$message({
          type: 'danger',
          message: '出错了！请联系管理员'
        });
        this.form2={brand_right:0}
        // this.$refs['form2'].resetFields();
        // this.selectedOptions=[]
        // this.textarea=''
      })
      this.dialogFormVisible2=false

    },



    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    filterNode(value, data) {
      console.log(value)
      console.log(data)
      if (!value) return true
      console.log(data.name.indexOf(value) !== -1)
      return data.name.indexOf(value) !== -1
    },
    getDepartment(){
      getAllDepartment().then((res)=>{
        console.log(res.data)
        this.data=res.data.data
      }).catch((err)=>{
        console.log(err)
      })
    },
    handleNodeExpand(data) {
      let isAdd = this.defaultShowNodes.find(val => val == data.id)
      if (!isAdd) this.defaultShowNodes.push(data.id)
      console.log(this.defaultShowNodes)
    },
    // 树节点关闭
    handleNodeCollapse(data) {
      this.defaultShowNodes = this.defaultShowNodes.filter(val => val != data.id)
      console.log(this.defaultShowNodes)
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
      this.getDepartment()
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 5px;
  padding-right: 20px;
}
.el-button--text {
  padding-right: 10px;
}
</style>



