<template>
    <div class="container py-5">
        <p>麵包屑 商品大分類>商品中分類>商品小分類</p>
        <select name="brand" v-on:change="handleClick($event)">
            <option value="1">
                Nike
            </option>
            <option value="2">
                Puma
            </option>
        </select>
        <div class="row">
            <div
                class="col-3"
                v-for="product in products"
                v-bind:key="product.id"
            >
                <div class="card" style="">
                    <img
                        v-bind:src="product.image1"
                        class="card-img-top"
                        alt=""
                    />

                    <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p>NT. {{ product.sellingPrice }}</p>
                        <a href="#" class="btn btn-primary">直接購買</a>
                        <form action="">
                            <button class="btn btn-primary">加入購物車</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import productsAPI from '../apis/products'
export default {
    data() {
        return {
            products: []
        }
    },
    created() {
        this.getProductsByCategory(this.$route.query)
    },
    methods: {
        async getProductsByCategory(query) {
            try {
                let response = await productsAPI.getProductsByCategory(query)
                const { data, statusText } = response
                console.log('response', response)
                this.products = data.products
                if (statusText !== 'OK') {
                    throw new Error(statusText)
                }
            } catch (error) {
                console.log(error)
            }
        },
        handleClick(event) {
            const brandId = event.target.value
            const query = this.$route.query
            query['brandId'] = brandId

            console.log(query)
            console.log(666)
            // this.getProductsByCategory(query)
            this.$router.push({
                name: 'products-by-category',
                // query: { brandId: 1, category1Id: 1 }
                query
            })
        }
    },
    beforeRouteUpdate(to, from, next) {
        console.log(777, to.query)
        this.getProductsByCategory(to.query)
        next()
    }
}
</script>
