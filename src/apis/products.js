import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
    getProducts() {
        return apiHelper.get('/index', {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getCategories() {
        return apiHelper.get('/getallcategories')
    },
    getProductsByCategory(whereQuery) {
        const searchParams = new URLSearchParams(whereQuery)
        return apiHelper.get(`/categories?${searchParams.toString()}`)
    },
    getProductDetail({ productId }) {
        return apiHelper.get(`/products/${productId}`)
    }
}
