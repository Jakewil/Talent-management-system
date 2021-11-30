<!--所有招聘信息-->
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="secondtitle">所有已认证公司</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-form :inline="true" :model="selectData">
          <el-form-item >
            <el-input  placeholder="请输入公司"
                      v-model="selectData.companyName"
                      style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input  placeholder="请输入职位"
                      v-model="selectData.position"
                      style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input  placeholder="请输入期望薪水"
                      v-model="selectData.salary"
                      style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item>

            <el-cascader
                size="large"
                :options="options2"
                v-model="selectedOptions"
                @change="handleChange"
                placeholder="请选择城市"
                >
            </el-cascader>

          </el-form-item>
          <el-form-item>
            <el-select v-model="selectData.industry" style="width: 120px;padding-right: 10px"  placeholder="请选择行业">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-button type="success" @click="rice">筛选</el-button>
          <el-button type="primary" @click="back">重置</el-button>
        </el-form>


            <el-table
                :data="tableData"
                border
                stripe
                style="width: 100%">
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

    import {allCompanyRecruit, selectCompanyRecruit} from "../../../service/allRecruit/companyRecruit";
      import { regionDataPlus,CodeToText } from 'element-china-area-data'
      export default {
        data() {
          return {
            options2: regionDataPlus,
            selectedOptions: [],
            selectData:{
              companyName: null,
              salary:null,
              city:null,
              industry:null,
              position:null,

            },
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
          // 将 \n 换为 <br/>标签
          ToBreak (val) {
            return val.replaceAll('\n', '<br />')
          },
          //重置
          back(){
            this.selectData={brand_right:0}
            this.getAllRecruit()
          },
          //筛选
          rice(){
            console.log(this.selectData)
            selectCompanyRecruit(this.selectData,this.inf).then((res)=>{
              if(res.data.success==true){
                this.$message.success("筛选成功")
                this.tableData=res.data.data.rows
                this.infLength=this.tableData.length
              }else this.$message.error("筛选失败")
            }).catch((err)=>{
              console.log(err)
              this.$message.warning("出错了请联系管理员")
            })
          },
          handleChange(value) {
            if(value==null)return
            this.selectData.city=CodeToText[value[0]] +
                "/" +
                CodeToText[value[1]] +
                "/" +
                CodeToText[value[2]]

          },
          // 每页显示的条数
          handleSizeChange(val) {
            // 改变每页显示的条数
            this.inf.PageSize=val
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.inf.currentPage=1
            this.getAllRecruit()
          },
          // 显示第几页
          handleCurrentChange(val) {
            // 改变默认的页数
            this.inf.currentPage=val
            this.getAllRecruit()
          },
          getAllRecruit(){
            allCompanyRecruit(this.inf).then((res)=>{
              console.log(res.data)
              this.infLength=res.data.data.total
              this.tableData=res.data.data.rows

            }).catch((err)=>{
              console.log(err)
            })
          }
        },
        mounted() {
          this.getAllRecruit()
        }
      }
    </script>

    <style>
    .oneLine {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    </style>



