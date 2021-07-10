import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WelCome from '../views/WelCome.vue'
import users from '../views/users.vue'
import Camera from '../views/Goods/Camera.vue'
import Order from '../views/Order.vue'
import Computer from '../views/Goods/Computer.vue'
import Phone from '../views/Goods/Phone.vue'
import Jewelry from '../views/Goods/Jewelry.vue'
import Furniture from '../views/Goods/Furniture.vue'
import TV from '../views/Goods/TV.vue'


Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // redirect重定向的意思
    redirect: '/home/WelCome',
    children: [{ path: 'WelCome', component: WelCome }]
  },
  // 用户管理
  {
    path: '/home',
    name: 'users',
    component: Home,
    redirect: '/home/WelCome',
    children: [{ path: 'WelCome', component: WelCome },
    { path: 'users', component: users }
    ]
  },

  // 商品管理
  {
    path: '/home',
    name: 'Camera',
    component: Home,
    redirect: '/home/camera',
    children: [{ path: 'WelCome', component: WelCome },
    { path: 'camera', component: Camera }
    ],
  },
  // 电脑
  {
    path: '/home',
    name: 'Computer',
    component: Home,
    redirect: '/computer',
    children: [{ path: 'WelCome', component: WelCome },
    { path: 'computer', component: Computer }
    ],
  },
  // // 手机
  {
    path: '/home',
    name: ' Phone',
    component: Home,
    redirect: '/phone',
    children: [{ path: 'WelCome', component: WelCome },
    { path: 'phone', component: Phone }
    ],
  },
  // // 珠宝
  {
    path: '/home',
    name: 'Jewelry',
    component: Home,
    redirect: '/jewelry',
    children: [{ path: 'WelCome', component: WelCome },
    { path: 'jewelry', component: Jewelry }
    ],
  },
  // // 家具
  {
    path: '/home',
    name: 'Furniture',
    component: Home,
    redirect: '/furniture',
    children: [{ path: 'WelCome', component: WelCome },
    { path: 'furniture', component: Furniture }
    ],
  },
  // 电视
  {
    path: '/home',
    name: 'TV',
    component: Home,
    redirect: '/TV',
    children: [{ path: 'WelCome', component: WelCome },
    { path: 'TV', component: TV }
    ],
  },


  // 订单管理
  {
    path: '/home',
    name: 'Order',
    component: Home,
    redirect: '/home/order',
    children: [{ path: 'WelCome', component: WelCome },
    { path: 'order', component: Order }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]


const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }

  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) {
    return next('/login')
  }
  next()
})
export default router
