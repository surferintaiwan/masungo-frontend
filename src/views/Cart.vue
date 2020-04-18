<template>
    <div class="container py-5">
        <h1>購物車</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">產品名稱</th>
                    <th scope="col">售價</th>
                    <th scope="col">數量</th>
                    <th scope="col">小計</th>
                    <th scope="col">刪除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cartItem in cart.CartItems" v-bind:key="cartItem">
                    <td>
                        <img
                            v-bind:src="cartItem.Product.image1"
                            alt=""
                            style="width: 200px"
                        />
                    </td>
                    <td>{{ cartItem.Product.name }}</td>
                    <td>{{ cartItem.Product.sellingPrice }}</td>
                    <td>{{ cartItem.quantity }}</td>
                    <td>
                        {{ cartItem.Product.sellingPrice * cartItem.quantity }}
                    </td>
                    <td>
                        <button
                            class="btn btn-info"
                            v-on:click="deleteCartItem(cartItem.Product.id)"
                        >
                            刪除
                        </button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>總計</td>
                    <td>{{ totalPrice }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import cartsAPI from '../apis/carts'
import { Toast } from '../utils/helpers'
export default {
    data() {
        return {
            cart: {},
            totalPrice: 0
        }
    },
    created() {
        this.getCartItems()
    },
    methods: {
        async getCartItems() {
            try {
                // 取出存在瀏覽器的cartId送去給API
                const cartId = localStorage.getItem('cartId')
                let response = await cartsAPI.getCartItems({ cartId })
                console.log(response)
                const { data, statusText } = response
                if (statusText !== 'OK') {
                    throw new Error(statusText)
                }
                this.cart = data.cart
                this.totalPrice = data.totalPrice
            } catch (error) {
                console.log('error', error)
                Toast.fire({
                    type: 'error',
                    title: '無法取得購物車資料'
                })
            }
        },
        async deleteCartItem(productId) {
            try {
                let response = await cartsAPI.deleteCartItem({
                    cartId: this.cart.id,
                    productId: productId
                })
                const { data, statusText } = response
                if (statusText !== 'OK' || data.status !== 'OK') {
                    throw new Error(statusText)
                }
                // 確定得到API回覆刪除成功了，記得接著要把這個元件內的資料做刪除，否則要到使用者刷新頁面才會看到刪除後的結果
                this.cart.CartItems = this.cart.CartItems.filter((cartItem) => {
                    return cartItem.ProductId !== productId
                })
            } catch (error) {
                console.log('error', error)
                Toast.fire({
                    type: 'error',
                    title: '目前無法移除商品'
                })
            }
        }
    }
}
</script>
