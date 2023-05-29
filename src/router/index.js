import { createRouter, createWebHistory } from 'vue-router'
import Category from '../views/Category/category.vue'
import Home from '../views/Home/home.vue'
import layout from '../views/Layout/layout.vue'
import Login from '../views/Login/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: layout,
      children: [
        { path: '', name: 'Home',component: Home},
        { path: 'category', name: 'Category',component: Category}
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
})

export default router
