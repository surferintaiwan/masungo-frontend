<template>
  <div class="container py-5">
    <MemberTabs />
    <template v-if="followingProducts.length">
      <div class="row">
        <div class="col-3" v-for="product in followingProducts" v-bind:key="product.id">
          <div class="card" style>
            <img v-bind:src="product.image1" class="card-img-top" alt />

            <div class="card-body">
              <router-link v-bind:to="{name: 'product-detail', params: {productId: product.id}}">
                <h5 class="card-title">{{ product.name }}</h5>
              </router-link>
              <p>NT. {{ product.sellingPrice }}</p>
              <div class="row">
                <button
                  type="submit"
                  class="btn btn-danger ml-2"
                  v-on:click="deleteFollowing(product.id)"
                >取消追蹤</button>
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
    </template>
    <template v-else>
      <div>目前沒有追蹤清單資料</div>
    </template>
  </div>
</template>

<script>
import MemberTabs from "../components/MemberTabs";
import usersAPI from "../apis/users";
import cartsAPI from "../apis/carts";
import { Toast } from "../utils/helpers";
export default {
  components: {
    MemberTabs
  },
  data() {
    return {
      followingProducts: []
    };
  },
  created() {
    this.getFollowingProducts();
  },
  methods: {
    async getFollowingProducts() {
      try {
        let response = await usersAPI.getFollowingProducts();
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.followingProducts = data.followingProducts;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法獲取追蹤清單"
        });
      }
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
    async deleteFollowing(productId) {
      try {
        let response = await usersAPI.deleteFollowingProduct({ productId });
        const { data, statusText } = response;
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // 直接把剛剛移除追蹤的商品移除掉
        this.followingProducts = this.followingProducts.filter(product => {
          return product.id !== productId;
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
  }
};
</script>