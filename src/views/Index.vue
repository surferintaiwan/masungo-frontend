<template>
    <div class="container py-5">
        <h1>首頁</h1>
    </div>
</template>

<script>
import productsAPI from '../apis/products'
import { Toast } from '../utils/helpers'

export default {
    data() {
        return {
            products: []
        }
    },
    created() {
        this.fetchProducts()
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await productsAPI.getProducts()
                const { data, statusText } = response
                if (statusText !== 'OK') {
                    throw new Error(statusText)
                }
                console.log(data)
            } catch (error) {
                Toast.fire({
                    type: 'error',
                    title: '無法取得餐廳資料'
                })
                console.log('error', error)
            }
        }
    }
}
</script>
