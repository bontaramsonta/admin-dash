import Vue from 'vue'
import Router from 'vue-router'
import layout from '../layout'
import store from '../store/store'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/dashboard',
      component: layout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/pages/dashboard'),
          beforeEnter:(to, from, next)=>{
            if(store.state.token){
              next()
            }else{
              next('/login')
            }
          }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/pages/login'),
      // beforeEnter:(to, from, next)=>{
      //   if(store.state.token){
      //     next('/dashboard')
      //   }else{
      //     next()
      //   }
      // }
    },
    {
      path: '/register',
      component: () => import('@/pages/register')
    }
  ]
})
