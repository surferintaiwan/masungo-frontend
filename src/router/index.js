import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import SignIn from '../views/SignIn'
import Index from '../views/Index'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/index' 
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/categories/:categoryName',
    name: 'products-by-category',
    component: () => import('../views/ProductsByCategory')
  },
  {
    path: '/products/:productId',
    name: 'product-detail',
    component: () => import('../views/ProductDetail')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/CheckOut')
  },
  {
    path: '/member/orders',
    name: 'orders',
    component: () => import('../views/Orders')
  },
  {
    path: '/member/followings',
    name: 'followings',
    component: () => import('../views/Followings')
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp')
  },
  {
    path: '/admin',
    name: 'admin-root',
    redirect: '/admin/index'
  },
  {
    path: '/admin/index',
    name: 'admin-index',
    component: () => import('../views/admin/Index')
  },
  {
    path: '/admin/products',
    name: 'admin-index',
    component: () => import('../views/admin/Products')
  },
  {
    path: '/admin/products/new',
    name: 'admin-index',
    component: () => import('../views/admin/ProductNew')
  },
  {
    path: '/admin/products/:productId',
    name: 'admin-product-detail',
    component: () => import('../views/admin/ProductDetail')
  },
  {
    path: '/admin/products/:productId/edit',
    name: 'admin-index',
    component: () => import('../views/admin/ProductEdit')
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/admin/Categories')
  },
  {
    path: '/admin/orders',
    name: 'admin-orders',
    component: () => import('../views/admin/Orders')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
