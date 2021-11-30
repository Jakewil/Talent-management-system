<template>
  <Head></Head>
  <side-bar></side-bar>
<!--  <Tags></Tags>-->
  <div class="content-box" :class="{'content-collapse':iscollapse}">
  <div class="content">

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"  :key="$route.path" v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component"  v-if="!$route.meta.keepAlive"/>
    </router-view>

  </div>
  </div>

</template>
<script>
import bus from "./bus";
import sideBar from "./sideBar";
import Head from "./Head";
import store from "../../store";
// import Tags from "./Tags";

export default {
  name: "Home",
  components:{
    sideBar,
    Head,
    // Tags
    },
  data() {
    return {
      tagsList: [],
      iscollapse: false
    };
  },
  mounted(){
      let levels=store.getters.getLevel
    console.log(levels)
  },
created() {

    bus.on('iscollapse', msg=> {
      this.iscollapse = msg;

    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.on('tags', msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  },
}
</script>

<style scoped>

</style>
