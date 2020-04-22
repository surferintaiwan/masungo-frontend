import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
    getCurrentUser() {
        return apiHelper.get('/getCurrentUser', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    getOrders() {
        return apiHelper.get('/member/orders', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    addFollowingProduct({ productId }) {
        return apiHelper.post(
            `/products/${productId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        )
    },
    deleteFollowingProduct({ productId }) {
        return apiHelper.delete(`/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    }
}
