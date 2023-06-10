import { createRouter, createWebHistory } from 'vue-router'
import Category from '../views/Category/category.vue'
import Home from '../views/Home/home.vue'
import layout from '../views/Layout/layout.vue'
import Login from '../views/Login/login.vue'
import SubCategory from '@/views/SubCategory/SubCategory.vue'
import Detail from '@/views/Detail/Detail.vue'
import CartList from '@/views/CartList/CartList.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: layout,
      children: [
        { path: '', name: 'Home',component: Home},
        { path: 'category/:id', name: 'Category',component: Category},
        { path: 'category/sub/:id', name: 'SubCategory',component: SubCategory},
        { path: 'detail/:id', name: 'Detail',component: Detail},
        { path: 'cartlist', name: 'CartList',component: CartList}
      ],
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login,
    },
  ],
  // 路由切换后滚动到顶部
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

export default router
