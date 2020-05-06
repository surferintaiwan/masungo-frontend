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
        return apiHelper.get(`/admin/categories?${rebuiltQuery.toString()}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    addCategory({ formData, query }) {
        const rebuiltQuery = new URLSearchParams(query)
        return apiHelper.post(
            `/admin/categories?${rebuiltQuery.toString()}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        )
    },
    getAllMembers() {
        return apiHelper.get('/admin/members', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    getAllOrders() {
        return apiHelper.get('/admin/orders', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    getAllBrands() {
        return apiHelper.get('/admin/brands', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    addBrand({ brandName }) {
        return apiHelper.post(
            '/admin/brands',
            { brandName },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        )
    },
    updateBrand({ brandName, brandId }) {
        return apiHelper.put(
            '/admin/brands',
            { brandName, brandId },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        )
    },
    deleteBrand({ brandId }) {
        return apiHelper.delete('/admin/brands', {
            params: { brandId },
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    }
}
