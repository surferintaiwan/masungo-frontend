import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import SignIn from '../views/SignIn'
import Index from '../views/Index'
import store from '../store'

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
    path:'/search',
    name: 'search',
    component: () => import('../views/Search')
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
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  let isAuthenticated = false

  // 不需要驗證的頁面要寫在前面先擋掉，沒有經過這個排除，每一頁都會變成要驗證
  const pathsWithoutAuthentication = ['index']
  if (pathsWithoutAuthentication.includes(to.name)) {
    next()
    return
  }

  // 有token，就可以呼叫API去驗證token是否有效
  if (token) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  
  // 回傳結果是token驗證無效，且他想去的頁面不是'sign-in'的話，才會轉到'sign-in'，反之，如果他是想去'sign-in'頁面，就不幫他再跳轉'sign-in'一次。
  // 如果不多判斷這個'sign-in'會造成無限迴圈。
  if (!isAuthenticated && to.name !== 'sign-in') {
    next('/signin')
    return
  }

  // 如果token驗證有效，而且他想去的是'sign-in'的話，不要顯示'sign-in了，直接讓他回首頁。
  if(isAuthenticated && to.name === 'sign-in') {
    next('/index')
    return
  }
  
  next()
})
export default router
