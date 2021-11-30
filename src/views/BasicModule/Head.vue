<template>
  <div style="background-color: whitesmoke">
    <div class="header">
      <div class="collapse-btn" @click="collapseChage">
        <i v-if="!iscollapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
      </div>
      <div class="logo" >跨组织人才管理系统</div>
      <div class="header-right">
        <div class="header-user-con">
          <!-- 全屏显示 -->
          <div class="btn-fullscreen" @click="handleFullScreen">
            <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
              <i class="el-icon-rank"></i>
            </el-tooltip>
          </div>
          <!-- 消息中心 -->
          <!--          :content="message?`有${message}条未读消息`:`消息中心`"-->
          <div class="btn-bell">
            <el-tooltip class="item" effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
              <i class="el-icon-bell"></i>
            </el-tooltip>

            <span class="btn-bell-badge" v-if="message"></span>
          </div>
          <!-- 用户头像 -->
          <div class="user-avator">
            <img src="../../assets/img/header.jpg" />
          </div>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="user-name">
              {{username}}
              菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
<!--                <el-dropdown-item>-->
<!--                  <el-popover-->
<!--                      placement="left"-->

<!--                      :width="250"-->
<!--                      trigger="click"-->
<!--                  >-->
<!--                    <el-table :data="infData" width="100px">-->
<!--                      <el-table-column width="150" prop="worker_id" label="id"></el-table-column>-->
<!--                      <el-table-column width="100" prop="role" label="身份"></el-table-column>-->
<!--                    </el-table>-->

<!--                    <template #reference>-->
<!--                      <span >个人信息</span>-->
<!--                    </template>-->

<!--                  </el-popover>-->
<!--                </el-dropdown-item>-->




<!--                <el-dropdown-item divided command="changePwd">修改密码</el-dropdown-item>-->
                <el-dropdown-item divided command="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- 用户名下拉菜单 -->

        </div>
      </div>
    </div>

  </div>
</template>
<script>
import bus from './bus';
import { Logout } from "../../service/login";

export default {
  data() {
    return {
      iscollapse: false,
      fullscreen: false,
      message: 2,
      infData:[]
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem('ms_username');
      return username
      // ? username : this.name;
    },
  },
  methods: {
    // logoClick(){
    //   this.$router.push({
    //     path: '/dashboard',
    //   })
    // },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginOut') {
        var storage = window.localStorage;
        storage.clear()
        Logout().then((res)=>{
          console.log(res.data)
        }).catch((err)=>{
          console.log(err)
        })
        this.$router.push('/LoginChart');
      }else if (command=='changePwd'){
        this.$router.push('/changePwd');
      }
    },
    //侧边栏折叠
    collapseChage() {

      this.iscollapse = !this.iscollapse;

      bus.emit('iscollapse', this.iscollapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        }
        else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },


  },

  mounted() {

    if (document.body.clientWidth < 1100) {
      this.collapseChage();
    }

  }

};
</script>
<style scoped>
.header {
  /*background:url(../../assets/img/linx.png) #000066 no-repeat;*/
  /*background-size: 100%,100%;*/
  background-color: #FFFFFF;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: black;
}
.collapse-btn {

  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;

}
.header .logo {
  margin-left: 1.25rem;
  float: left;
  width: fit-content;
  line-height: 70px;
  font-size: 25px;
  font-family: "PingFang SC";

}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #0f0f0f;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: black;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
