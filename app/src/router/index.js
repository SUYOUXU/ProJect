import Vue from 'vue'
import VueRouter from 'vue-router'
import request from '../utils/request'
import axios from 'axios';
Vue.use(VueRouter)
const router = new VueRouter({
  mode:'history',
  routes:

    [
      // 默认开始跳转到首页
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import('../views/Mine.vue'),
        beforeEnter(to, from, next) {
          // console.log('Mine.beforeEnter');
          next()
        }
      }

      , {
        path: '/login',
        name: "Login",
        component: () => import('../views/Login.vue')
      }

      , {
        path: '/reg',
        name: "Reg",
        component: () => import('../views/Reg.vue')
      }, {
        path: '/discover',
        name: "Discover",
        component: () => import('../views/Discover.vue')
      }, {
        path: '/cart',
        name: "Cart",
        component: () => import('../views/Cart.vue'),   
        meta: {
          // 需要访问权限添加requiresAuth
          requiresAuth:true,
        }
      },
      {
        path: '/goods/:id',
        name: "Goods",
        component: () => import('../views/Goods.vue')
      },
      {
        path: '/notfound',
        name: "NotFound",
        component: () => import('../views/NotFound.vue')
      },
      {
        path: '*',
        redirect: '/notfound'
      }
    ]
})
// console.log('$router=', router);
//全局路由守卫
router.beforeEach(function (to, from, next) {
  // console.log('beforeEach', to);

  // 判断目标路由to.meta.requiresAuth是否需要登录权限才可访问
  if (to.meta.requiresAuth) {
    let userInfo = localStorage.getItem('userInfo');
    try {
      userInfo = JSON.parse(userInfo)
    } catch {
      userInfo = null
    }
    if (userInfo) {
      // 获取到用户信息后，还需要校验用户信息是否被篡改或是否过期
      // 校验token
      request.get('/user/login',{
        headers:{
          Authorization:userInfo.authorization
        }
      }).then(({data})=>{
        // 根据token校验结果来决定是否让用户继续访问
        if(data.code === 400){
          // 清空用户信息
          localStorage.removeItem('userInfo');

          router.push({
            path:'/login',
            query:{
              target:to.fullPath
            }
          })
        }
      })
      // 如果有用户信息，不管是否过期或被篡改，先放行
      next();
    } else {
      router.push({
        path: '/login',
        query: {
          target: to.fullPath
        }

      })

    }
  } else {

    next();
  }
})

router.afterEach(function (to, from) {
  // console.log('afterEach')
})
router.beforeResolve(function (to, from, next) {
  // console.log('beforeResolve')
  next();
})

export default router