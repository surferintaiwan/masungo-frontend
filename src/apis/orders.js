import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
    createOrder({ formData }) {
        return apiHelper.post('/checkout', formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    },
    getPayment({ orderId }) {
        return apiHelper.get(`/checkout/payment/${orderId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    }
}
