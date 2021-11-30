// import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
//
// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]
//
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })
//
// export default router
import { createRouter, createWebHistory } from 'vue-router'

import LoginChart from "../views/LoginChart";
import register from "../views/register";
// import changePwd from "../views/pages/changePwd";


const routes = [
  {
    path:'/',
    redirect:'/LoginChart',
  },
  {
    path: '/LoginChart',
    name: 'LoginChart',
    meta:{title:'登录页面'},
    component: LoginChart
  },
  {
    path: '/register',
    name: 'register',
    meta:{title:'注册页面'},
    component: register
  },
  {
    path: '/register',
    name: 'register',
    meta:{title:'用户注册'},
    component:()=>import('../views/register')
  },
  {
    path: '/companyRegister',
    name: 'companyRegister',
    meta:{title:'企业认证'},
    component:()=>import('../views/companyRegister')
  },

  // {
  //   path:'/forgetAccount' ,
  //   name: 'forgetAccount',
  //   component:()=>import('../views/pages/past/forgetAccount'),
  //   meta:{title: '忘记账号'}
  // },
  // {
  //   path:'/forgetPwd' ,
  //   name:'forgetPwd',
  //   component:()=>import('../views/forgetPwd'),
  //   meta:{title: '忘记密码'}
  // },
  // {
  //   path: '/changePwd',
  //   name: 'changePwd',
  //   meta:{title:'修改密码'},
  //   component: changePwd
  // },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/BasicModule/Home'),
    meta : {                      //加一个自定义obj
      requireAuth:true      //这个参数 true 代表需要登录才能进入A
    },
    children:[
        //root
      {
        path:'/allCompany',
        name:'allCompany',
        component:()=>import('../views/pages/asuperMan/allCompany'),
        meta:{title:'所有公司',
          keepAlive: true}
      },
      {
        path:'/certify',
        name:'certify',
        component:()=>import('../views/pages/asuperMan/certify'),
        meta:{title:'认证公司',
          keepAlive: true }
      },
        //公司root

      {
        path:'/addMembers',
        name:'addMembers',
        component:()=>import('../views/pages/bcompanyAdministrator/addmembers'),
        meta:{title:'添加员工',
          }
      },
      {
        path:'/allMembers',
        name:'allMembers',
        component:()=>import('../views/pages/bcompanyAdministrator/allMembers'),
        meta:{title:'所有员工',
          keepAlive: true}
      },

      {
        path:'/departmentInf',
        name:'departmentInf',
        component:()=>import('../views/pages/companyHR/departmentInf'),
        meta:{title:'公司部门信息',
          keepAlive: true}
      } ,
      //hr
      {
        path:'/recruit',
        name:'recruit',
        component:()=>import('../views/pages/companyHR/recruit'),
        meta:{title:'本人发布招聘信息',
          keepAlive: true}
      },

      //部门主管
      {
        path:'/departmentMember',
        name:'departmentMember',
        component:()=>import('../views/pages/departmentManager/departmentMember'),
        meta:{title:'部门员工',
          keepAlive: true}
      },
      //普通用户/hr
      {
        path:'/companyRecruit',
        name:'companyRecruit',
        component:()=>import('../views/pages/enormalUsers/companyRecruit'),
        meta:{title:'公司招聘信息',
          keepAlive: true}
      }

    ]
  },

]




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('Authorization')? true : false;
  if (to.path == '/LoginChart'||to.path == '/register'||to.path == '/companyRegister') {
    next();
  } else {
    // 是否在登录状态下
    isLogin ? next() : next('/LoginChart');
  }
})
export default router
