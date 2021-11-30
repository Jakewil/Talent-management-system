<template>
  <div>
    <div>
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
// import VueCookies from "vue-cookies";
import Cookies from 'js-cookie'

export default {
  name: 'App',
  // mounted(){
  //   console.log('---------------')
  //   // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
  //   window.onbeforeunload = function () {
  //     console.log('---------------222')
  //     let loginState=this.$cookie.get('Authorization');
  //     console.log(loginState)
  //     if(loginState === undefined){
  //       // console.log('here')
  //       const storage = window.localStorage;
  //       storage.clear()
  //       this.$route.push('/LoginChart')
  //     }
  //   }
// },
  mounted: function () {
    //此方法刷新页面时也会执行
    window.addEventListener('onunload',()=>{
      console.log('clear')
      const storage = window.localStorage;
      storage.clear()
       Cookies.remove('JSESSIONID')
      console.log('clear')
    });
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  overflow: auto;
  height: 100%;

  background: linear-gradient(
      45deg, #4d4279, #43879b) no-repeat fixed center top;
  background-size: cover;
}
</style>
