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
              <a href="#" class="btn btn-primary">直接購買</a>
              <form action>
                <button type="submit" class="btn btn-primary">加入購物車</button>
              </form>
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
    }
  }
};
</script>