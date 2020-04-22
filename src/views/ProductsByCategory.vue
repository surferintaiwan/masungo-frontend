<template>
  <div class="container py-5">
    <p>麵包屑 商品大分類>商品中分類>商品小分類</p>
    <select name="brand" v-on:change="handleClick($event)">
      <option value="1">Nike</option>
      <option value="2">Puma</option>
    </select>
    <div class="row">
      <div class="col-3" v-for="product in products" v-bind:key="product.id">
        <div class="card" style>
          <img v-bind:src="product.image1" class="card-img-top" alt />

          <div class="card-body">
            <router-link v-bind:to="{name: 'product-detail', params: {productId: product.id}}">
              <h5 class="card-title">{{ product.name }}</h5>
            </router-link>
            <p>NT. {{ product.sellingPrice }}</p>
            <a href="#" class="btn btn-primary">直接購買</a>
            <form action>
              <button type="submit" class="btn btn-primary">加入購物車</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsAPI from "../apis/products";
export default {
  data() {
    return {
      products: []
    };
  },
  created() {
    this.getProductsByCategory(this.$route.query);
  },
  methods: {
    async getProductsByCategory(query) {
      try {
        let response = await productsAPI.getProductsByCategory(query);
        const { data, statusText } = response;
        console.log("response", response);
        this.products = data.products;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleClick(event) {
      const brandId = event.target.value;
      const category1Id = this.$route.query.category1Id;

      this.$router.push({
        name: "products-by-category",
        query: { category1Id: category1Id, brandId: brandId }
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log(777, to.query);
    this.getProductsByCategory(to.query);
    next();
  }
};
</script>
