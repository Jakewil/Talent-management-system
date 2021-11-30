<!--所有招聘信息-->
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="secondtitle">招聘信息管理(个人)</span>
        </el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="container">
      <div class="handle-box">
        <el-button style="text-align: right" type="primary" @click="open">新增招聘信息</el-button>

        <el-dialog title="新增招聘" v-model="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="行业" :label-width="formLabelWidth">
              <el-select v-model="form.industry"   placeholder="请选择行业">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item >
            <el-form-item label="职位" :label-width="formLabelWidth">
              <el-input  placeholder="请输入职位"
                         v-model="form.position"
                         ></el-input>
            </el-form-item>
            <el-form-item label="日薪" :label-width="formLabelWidth">
              <el-input  placeholder="请输入日薪"
                         v-model="form.salary"
                       ></el-input>
            </el-form-item>

            <el-form-item label="数量" :label-width="formLabelWidth">
              <el-input  placeholder="请输入招聘数量"
                         v-model="form.number"
                         s></el-input>
            </el-form-item>
            <el-form-item label="学位" :label-width="formLabelWidth">
              <el-input  placeholder="请输入学位要求"
                         v-model="form.education"
                         ></el-input>
            </el-form-item>
            <el-form-item label="城市" :label-width="formLabelWidth">
              <el-cascader
                  size="large"
                  :options="options2"
                  v-model="selectedOptions"
                  @change="handleChange"
                  placeholder="请选择城市"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="详情介绍" :label-width="formLabelWidth" prop="require">
              <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.requires"
                  maxlength="200"
                  show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-form>
          <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
          </template>
        </el-dialog>


        <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%">
          <el-table-column

              prop="id"
              label="信息编号"

          >
          </el-table-column>
          <el-table-column

              prop="companyName"
              label="公司名称"

          >
          </el-table-column>

          <el-table-column
              prop="position"
              label="需求职位"
              width="150">
          </el-table-column>

          <el-table-column
              prop="number"
              label="需求数量"
              width="120">
          </el-table-column>

          <el-table-column
              prop="city"
              label="城市"
              width="100" >
          </el-table-column>

          <el-table-column
              prop="education"
              :label="'学历要求 \n (及其以上）'"
              width="120">
          </el-table-column>

          <el-table-column
              prop="salary"
              label="日薪"
              width="120">
          </el-table-column>

          <el-table-column

              prop="requires"
              label="岗位要求"
              width="300"
              >
                        <template #default="scope">
                          <el-tooltip placement="top">
                            <template #content> <div v-html="ToBreak(scope.row.requires)"> </div></template>
                            <div class="oneLine" v-html="scope.row.requires"></div>
                          </el-tooltip>
                        </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button type=danger @click="delRecruit(scope.row)">删除</el-button>
            </template>

          </el-table-column>

        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="inf.currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size=this.inf.PageSize
            layout="total, sizes, prev, pager, next, jumper"
            :total=infLength>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>


import {addCompanyRecruit, delCompanyRecruit, selfCompanyRecruit} from "../../../service/allRecruit/Recruit";
import { regionDataPlus,CodeToText } from 'element-china-area-data'
export default {
  data() {
    return {
      options2: regionDataPlus,
      selectedOptions: [],
      form:{
        city:'',
        salary:'',
        education:'',
        number:'',
        industry:'',
        position:'',
        requires:''
      },
      formLabelWidth: '70px',
      dialogFormVisible:false,
      options: [{
        value: 'IT',
        label: 'IT'
      },
        {
          value: '餐饮',
          label: '餐饮'
        },
        {
          value: '人事',
          label: '人事'
        },
        {
          value: '行政',
          label: '行政'
        },
        {
          value: '销售',
          label: '销售'
        }],


      tableData:[],
      // 默认显示第一条
      inf:{
        currentPage:1,
        PageSize:5
      },
      infLength:0
    }
  },
  methods:{
    show(inf){
      console.log(inf)
    },
    // 将 \n 换为 <br/>标签
    ToBreak (val) {
      return val.replaceAll('\n', '<br />')
    },
    confirm(){
        console.log(this.form)
      addCompanyRecruit(this.form).then((res)=>{
        if(res.data.success==true){
          this.$message.success("发布成功")
          this.dialogFormVisible=false
          this.form={brand_right:0}
          this.getSelfRecruit()
        }else this.$message.error("发布失败")
      }).catch((err)=>{
        console.log(err)
        this.$message.warning("出错了请联系管理员")
      })
    },
    open(){
      this.dialogFormVisible=true
    },
    handleChange(value) {
      if(value==null)return
      this.form.city=CodeToText[value[0]] +
          "/" +
          CodeToText[value[1]] +
          "/" +
          CodeToText[value[2]]

    },
    //删除
    remove(item) {
      this.$confirm('此操作将使该招聘信息删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delRecruit(item)

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    delRecruit(data){
        delCompanyRecruit(data.id).then((res)=>{
          if(res.data.success==true){
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.getSelfRecruit()
          }else this.$message.error("删除失败")
        }).catch((err)=>{
          console.log(err)
          this.$message.warning("出错了请联系管理员")
        })
    },
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.inf.PageSize=val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.inf.currentPage=1
      this.getSelfRecruit()
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.inf.currentPage=val
      this.getSelfRecruit()
    },
    getSelfRecruit(){
      selfCompanyRecruit(this.inf).then((res)=>{
        console.log(res.data)
        this.infLength=res.data.data.total
        this.tableData=res.data.data.rows

      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted() {
    this.getSelfRecruit()
  }
}
</script>

<style>
/*.el-table .cell.el-tooltip{*/
/*  white-space:pre-line;*/
/*}*/
.oneLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}


</style>



