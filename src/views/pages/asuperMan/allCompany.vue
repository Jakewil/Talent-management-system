<!--所有认证公司-->
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
        <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%">
          <el-table-column
              fixed
              prop="companyName"
              label="公司名称"
              width="120"
             >
          </el-table-column>
          <el-table-column
              prop="id"
              label="公司编号"
              width="100" >
          </el-table-column>
          <el-table-column
              prop="legalPerson"
              label="公司法人"
              width="120">
          </el-table-column>
          <el-table-column
              prop="companyArea"
              label="公司所在地"
              width="120">
          </el-table-column>
          <el-table-column
              prop="companyAddress"
              label="详细地址"
              width="300">
          </el-table-column>
          <el-table-column
              prop="companyPhone"
              label="联系电话"
              width="120">
          </el-table-column>
          <el-table-column
              prop="email"
              label="联系邮箱"
              width="200">
          </el-table-column>
          <el-table-column
              prop="createDate"
              label="认证日期"
              width="150">
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
import {allCompany} from "../../../service/superMan/company";

export default {
  data() {
    return {
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
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.inf.PageSize=val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.inf.currentPage=1
      this.getAllCompany()
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.inf.currentPage=val
      this.getAllCompany()
    },
    getAllCompany(){
      allCompany(this.inf).then((res)=>{
        console.log(res.data)
        this.infLength=res.data.data.total
        this.tableData=res.data.data.list

      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted() {
    this.getAllCompany()
  }
}
</script>
<style>

</style>



