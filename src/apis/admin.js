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
    }
}
