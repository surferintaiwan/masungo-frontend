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
    createOrder({ formData }) {
        return apiHelper.post('/checkout', formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    }
}
