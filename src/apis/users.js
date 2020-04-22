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
    }
}
