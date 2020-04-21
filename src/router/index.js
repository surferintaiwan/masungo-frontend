import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import SignIn from '../views/SignIn'
import Index from '../views/Index'
import store from '../store'

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
    const currentUser = store.state.currentUser
    if (currentUser && !currentUser.isAdmin) {
        next('/404')
        return
    }
}

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
        path: '/search',
        name: 'search',
        component: () => import('../views/Search')
    },
    {
        path: '/categories',
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
        path: '/checkout/payment/:orderId',
        name: 'checkout-payment',
        component: () => import('../views/CheckOutPayment')
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
        redirect: '/admin/index',
        beforeEnter: authorizeIsAdmin
    },
    {
        path: '/admin/index',
        name: 'admin-index',
        component: () => import('../views/admin/Index'),
        beforeEnter: authorizeIsAdmin
    },
    {
        path: '/admin/products',
        name: 'admin-index',
        component: () => import('../views/admin/Products'),
        beforeEnter: authorizeIsAdmin
    },
    {
        path: '/admin/products/new',
        name: 'admin-index',
        component: () => import('../views/admin/ProductNew'),
        beforeEnter: authorizeIsAdmin
    },
    {
        path: '/admin/products/:productId',
        name: 'admin-product-detail',
        component: () => import('../views/admin/ProductDetail'),
        beforeEnter: authorizeIsAdmin
    },
    {
        path: '/admin/products/:productId/edit',
        name: 'admin-index',
        component: () => import('../views/admin/ProductEdit'),
        beforeEnter: authorizeIsAdmin
    },
    {
        path: '/admin/categories',
        name: 'admin-categories',
        component: () => import('../views/admin/Categories'),
        beforeEnter: authorizeIsAdmin
    },
    {
        path: '/admin/orders',
        name: 'admin-orders',
        component: () => import('../views/admin/Orders'),
        beforeEnter: authorizeIsAdmin
    },
    {
        path: '*',
        name: 'not-found',
        component: NotFound
    }
]

const router = new VueRouter({
    linkExactActiveClass: 'active',
    routes
})

router.beforeEach(async (to, from, next) => {
    const tokenInLocalStorage = localStorage.getItem('token')
    const tokenInStore = store.state.token
    let isAuthenticated = store.state.isAuthenticated
    // 不需要驗證的頁面要寫在前面先擋掉，沒有經過這個排除，每一頁都會變成要驗證
    const pathsWithoutAuthentication = [
        'index',
        'sign-up',
        'search',
        'products-by-category',
        'product-detail',
        'cart'
    ]
    if (pathsWithoutAuthentication.includes(to.name)) {
        await store.dispatch('fetchCurrentUser')
        next()
        return
    }
    // 因為state裡存的token絕對是驗證過的，所以可以用來跟瀏覽器的token比較，一比就知道使用者瀏覽器上的token是不是有問題的
    // 如果瀏覽器的token是空的，就跳過這段往下了；如果瀏覽器的token是有的，就讓他去API判斷。
    // 再如果瀏覽器的token跟state裡的token不同，就去問問看API這個瀏覽器token究竟還有沒有效
    if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
        isAuthenticated = await store.dispatch('fetchCurrentUser')
    }

    // 回傳結果是token驗證無效，且他想去的頁面不是'sign-in'的話，才會轉到'sign-in'，反之，如果他是想去'sign-in'頁面，就不幫他再跳轉'sign-in'一次。
    // 如果不多判斷這個'sign-in'會造成無限迴圈。
    if (!isAuthenticated && to.name !== 'sign-in') {
        next('/signin')
        return
    }

    // 如果token驗證有效，而且他想去的是'sign-in'的話，不要顯示'sign-in了，直接讓他回首頁。
    if (isAuthenticated && to.name === 'sign-in') {
        next('/index')
        return
    }
    next()
})
export default router
