<template>
  <div class="registe">
    <!-- 标题 -->
    <div class="title">
      跨企业人才管理系统
    </div>
    <div class="each_info" >
      <br><br><br>
      <router-link to="/normalRegister"><el-button type="success" round
        style="font-size: 40px;left:120px;position: relative;width: 300px;height: 70px">普通用户</el-button>
      </router-link>
      <br><br><br>
      <router-link to="/register"> <el-button type="warning" round
       style="font-size: 40px;left: 120px;position: relative;width: 300px;height: 70px">公司职员</el-button>
      </router-link>
      <br><br><br>
      <router-link to="/LoginChart"> <el-button type="danger" round
       style="font-size: 20px;left: 195px;position: relative;width: 150px">返回</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style>
.changethecolor{
  color: red;
}
.title {
  display: flex;
  justify-content: center;
  align-self: center;
  margin-top: 150px;
  font-size: 70px;
  letter-spacing:8px;
  color: #FFF;
  text-shadow: 5px 5px 10px black;
  z-index: 1;
}
.registe {
  width: 900px;
  height: 400px;
  margin: 60px auto 0;
  position: relative;
}
.each_info {
  justify-content: center;
  margin: 60px auto 0;
  position: relative;
  margin-left: 15px;
  width: 550px;
  height: 330px;
  left: 130px;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 10px 40px 0 rgb(0 13 97);

}
.el-input{
  outline: none;
  border: none;
  background: none;
  color: #fff;
  font-size: 18px;
}
.el-form-item__content{
  font-size: 20px;
  color: black;
}
</style>
