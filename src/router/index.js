import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import FrontendUsers from '../components/user/FrontendUsers.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import GoodsList from '../components/goods/List.vue'
import Add from '../components/goods/Add.vue'
import Manufacturers from '../components/user/Manufacturers.vue'
import Community from '../components/group/Community.vue'
import Club from '../components/group/Club.vue'
import Market from '../components/posts/Market.vue'
import Posts from '../components/posts/Posts.vue'
import Type from '../components/goods/Type.vue'
import Report from '../components/report/Report'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home', component: Home, redirect: '/welcome', children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users},
      { path: '/frontendUsers', component: FrontendUsers}, //These are determined by the backend, are fixed and cannot be changed by the frontend
      { path: '/rights', component: Rights},
      { path: '/roles', component: Roles},
      { path: '/games', component: GoodsList},
      { path: '/games/add', component: Add},
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/Manufacturers', component: Manufacturers},
      { path: '/communities', component: Community},
      { path: '/clubs', component: Club},
      { path: '/markets', component: Market},
      { path: '/posts', component: Posts},
      { path: '/GameTypes', component: Type},
      { path: '/reports', component: Report}
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
