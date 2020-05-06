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
            <div class="row">
              <button
                v-if="product.isFollowed"
                type="submit"
                class="btn btn-danger ml-2"
                v-on:click="deleteFollowing(product.id)"
              >取消追蹤</button>
              <button
                v-else
                type="submit"
                class="btn btn-info ml-2"
                v-on:click="addFollowing(product.id)"
              >+追蹤</button>

              <button
                type="submit"
                class="btn btn-warning ml-2"
                v-on:click="addCartItem(product.id)"
              >+購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsAPI from "../apis/products";
import cartsAPI from "../apis/carts";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";
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
    },
    async addCartItem(productId) {
      try {
        // 取出瀏覽器上的cartId，如果瀏覽器上沒有會是null，打給API會產生新的cartId
        const cartId = localStorage.getItem("cartId");
        let response = await cartsAPI.addCartItem({
          cartId: cartId,
          productId: productId,
          amount: 1
        });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        // 把API回傳的cartId存在瀏覽器上
        localStorage.setItem("cartId", data.cartId);

        Toast.fire({
          type: "success",
          title: "已將本商品加入購物車"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入購物車"
        });
        console.log(error);
      }
    },
    async addFollowing(productId) {
      try {
        let response = await usersAPI.addFollowingProduct({ productId });
        const { data, statusText } = response;
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // 直接把剛剛加入追蹤的商品的+追蹤按鈕變成取消追蹤
        this.products = this.products.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              isFollowed: true
            };
          } else {
            return product;
          }
        });
        Toast.fire({
          icon: "success",
          title: "追蹤成功"
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤清單"
        });
      }
    },
    async deleteFollowing(productId) {
      try {
        let response = await usersAPI.deleteFollowingProduct({ productId });
        const { data, statusText } = response;
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // 直接把剛剛移除追蹤的商品的取消追蹤按鈕變成+追蹤
        this.products = this.products.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              isFollowed: false
            };
          } else {
            return product;
          }
        });
        Toast.fire({
          icon: "success",
          title: "移除追蹤成功"
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法將商品自追蹤清單移除"
        });
      }
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.getProductsByCategory(to.query);
    next();
  }
};
</script>
