import Vue from 'vue'
import VueRouter from 'vue-router'
import BudgetAdd from '@/pages/BudgetAdd'
import BudgetList from '@/pages/BudgetList'
import BudgetDetail from '@/pages/BudgetDetail'
import Login from '@/pages/Login'
// import store from '../vuex/store'
import {getCookie} from '@/util/utils'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {requireAuth: false}
    },
    {
      path: '/BudgetAdd',
      name: 'BudgetAdd',
      component: BudgetAdd,
      meta: {requireAuth: true}
    },
    {
      path: '/BudgetList',
      name: 'BudgetList',
      component: BudgetList,
      meta: {requireAuth: true}
    },
    {
      path: '/BudgetDetail',
      name: 'BudgetDetail',
      component: BudgetDetail,
      meta: {requireAuth: true}
    },
    {path: '*', redirect: '/Login'}
  ]
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

// 登录控制
router.beforeEach((to, from, next) => {
  // store.dispatch('changePath', to.name)
  if (to.meta.requireAuth) {
    if (getCookie('ZTC_18a808c40bba58c2c')) {
      next()
    } else {
      localStorage.clear()
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
  // store.dispatch('changePath', to.name)
})
export default router
