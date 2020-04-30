import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
    getAllProducts() {
        return apiHelper.get('/admin/products', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    getAllBrandsAndCategories() {
        return apiHelper.get('/admin/getAllBrandsAndCategories', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    addNewProduct(formData) {
        return apiHelper.post('/admin/products', formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    getProduct({ productId }) {
        return apiHelper.get(`/admin/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    updateProduct({ formData, productId }) {
        return apiHelper.post(`/admin/products/${productId}`, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    getCategories(query) {
        const rebuiltQuery = new URLSearchParams(query)
        console.log()
        // 要把name 跟value重新組合，其中要注意如果是created傳進來的，value是undefine，要看組不組的起來，讓後端那邊順利獨到getcategory1s
        return apiHelper.get(`/admin/categories?${rebuiltQuery.toString()}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    }
}
