import { apiHelper } from '../utils/helpers'

export default {
    getCartItems({ cartId }) {
        return apiHelper.get(`/cart/${cartId}`)
    },
    addCartItem({ cartId, productId, amount }) {
        return apiHelper.post('/cart', { cartId, productId, amount })
    },
    deleteCartItem({ cartId, productId }) {
        return apiHelper.delete('/cart', { cartId, productId })
    }
}
