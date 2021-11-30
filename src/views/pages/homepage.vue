<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="secondtitle">系统首页</span>

        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-carousel :interval="3500" type="card" height="400px">
          <el-carousel-item v-for="(item,index) in chart" :key="index">
<!--            <div id="newAndOldStaffs"></div>-->
<!--            <h3 class="medium">{{ item }}</h3>-->
            <img :src="item.src" height=100% width="100%">
<!--            <div :id="item.id" style="width: 600px;height: 400px"></div>-->
          </el-carousel-item>
        </el-carousel>
<!--        <img src="http://localhost:8081/static/img/header.6f53ed4.jpg">-->
<!--        <img src="../project/src/assets/img/header.jpg" width="100%" height="100%">-->
<!--            <div id="newAndOldStaffs" style="width: 500px;height: 300px"></div>-->
      </div>
    </div>
  </div>

</template>

<script>
// import * as echarts from 'echarts'
// import store from "../../store";
// import axios from "axios";
export default {
  data(){
    return{
      chart:[{
        // id:'newAndOldStaffs',
         src:'https://tse2-mm.cn.bing.net/th/id/OIP.BZDkvPBz5xy90Tl10TAzhQHaEN?w=331&h=188&c=7&o=5&dpr=1.24&pid=1.7'
      },{
        src: 'https://tse4-mm.cn.bing.net/th/id/OIP.dLX6qv8UFNAF9wsXB2OzvwHaFd?w=256&h=188&c=7&o=5&dpr=1.24&pid=1.7'
      },{
        src:'https://tse2-mm.cn.bing.net/th/id/OIP.tOFNDbIdRdDo0gknwLiBhwHaEo?w=302&h=188&c=7&o=5&dpr=1.24&pid=1.7'
      },{
        src:'https://tse1-mm.cn.bing.net/th/id/OIP.VYwiDYJffdvkI1C7yU3ElQHaFQ?w=264&h=188&c=7&o=5&dpr=1.24&pid=1.7'
      }]
    }
  },
name: "homepage",
  // mounted() {
  // this.anewAndOldStaffs()
  // },
  // methods:{
  //   anewAndOldStaffs() {
  //      let mychart = echarts.init(document.getElementById('newAndOldStaffs'))
  //     // let mychart = echarts.init(this.$refs.newAndOldStaffs)
  //     let option = {
  //       xAxis: {
  //         type: 'category',
  //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [{
  //         data: [120, 200, 150, 80, 70, 110, 130],
  //         type: 'bar',
  //         showBackground: true,
  //         backgroundStyle: {
  //           color: 'rgba(180, 180, 180, 0.2)'
  //         }
  //       }
  //       ]
  //     }
  //     mychart.setOption(option)
  //   }
  //   }

}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 500px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
