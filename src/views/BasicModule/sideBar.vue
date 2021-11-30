<template>
  <div class="sidebar">
<!--  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--    <el-radio-button :label="false">展开</el-radio-button>-->
<!--    <el-radio-button :label="true">收起</el-radio-button>-->
<!--  </el-radio-group>-->

  <el-menu  :uniqueOpened="true"
            :default-active="onRoutes"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color=#303133
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="iscollapse"
            unique-opened
            router>
    <template v-for="item in item2">
      <template v-if="item.subs">
        <el-submenu :index="item.index" :key="item.index">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subs">
            <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"

            >
              <template #title>{{ subItem.title }}</template>
              <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
              >
                {{ threeItem.title }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
            >{{ subItem.title }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :key="item.index">
          <i :class="item.icon"></i>
          <span >{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
  </div>
</template>

<script>
import bus from "./bus";
import {Decrypt} from "../../util/secret";
export default {

  data() {
    return {
       iscollapse: false,
      items: [
          //root
        {
          icon: 'el-icon-circle-check',
          index: 'asuperMan',
          title: '公司服务',
          meta: {
            permissions:["4"]
          },
          subs:[
            {
              index:'certify',
              title:'公司认证'
            },
            {
              index:'allCompany',
              title:'所有公司'
            },
          ]
        },
          //公司root
        {
          icon: 'el-icon-document-checked',
          index: 'companyAdministration',
          title:'员工服务',
          meta: {
            permissions: ["1"]
          },
          subs: [
            {
              index: 'addMembers',
              title: '添加员工'
            },
            {
              index: 'allMembers',
              title: '所有员工'
            },
          ]
        },
        {
          icon: 'el-icon-document-checked',
          index: 'departmentInf',
          title: '部门管理',
          meta: {
            permissions: ["1"]
          },
        },
        //hr
        {
          icon: 'el-icon-tickets',
          index: 'recruit',
          title: '个人发布信息',
          meta: {
            permissions:["2"]
          },
        },

          //部门主管
        {
          icon: 'el-icon-s-custom',
          index: 'departmentMember',
          title: '部门员工',
          meta: {
            permissions: ["3"]
          },
        },
        //普通用户
        {
          icon: 'el-icon-date',
          index: 'companyRecruit',
          title: '公司招聘信息',
          meta: {
            permissions: ["5"]
          },
        },


      ],
      item2:[]
    };
  },
  created() {
    bus.on('iscollapse',(e)=>{
      this.iscollapse=e
    })
  },

  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  methods: {
    isCollapse:function (param){
        console.log(param)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    checkPermission(){
      for (let i=0;i<this.items.length;i++){
        this.items[i]=JSON.parse(JSON.stringify(this.items[i]))
      }
      this.item2=this.items.filter((item)=>{
        for (let i=0;i<item.meta.permissions.length;i++){
          let inf=Decrypt( localStorage.getItem('level'))
          if (item.meta.permissions[i]==inf){//筛选权限
            return item
          }
        }
      })
      // this.item2=this.item
    }
  },
  mounted() {
     this.checkPermission()
  },
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: 100%;
}
</style>
