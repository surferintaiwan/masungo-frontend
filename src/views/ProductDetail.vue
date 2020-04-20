<template>
  <div class="container py-5">
    <h1>商品詳細頁</h1>
    <div class="row">
      <div class="col-sm-6">
        <div class="row">
          <img class="col-sm-12 py-2" src="http://lorempixel.com/640/480" alt style />

          <img class="col-sm-4" src="http://lorempixel.com/640/480" alt style />
          <img class="col-sm-4" src="http://lorempixel.com/640/480" alt style />
          <img class="col-sm-4" src="http://lorempixel.com/640/480" alt style />
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card" style>
          <div class="card-body">
            <p>{{ product.Brand.name }}</p>
            <h3 class="card-title">{{ product.name }}</h3>
            <h5 class="card-subtitle mb-2 text-muted">
              <span style="color: green">NT {{product.sellingPrice}}</span>
              <del>{{product.listPrice}}</del>
              <span v-if="product.shippingFee">免運費</span>
            </h5>
            <div>
              <label for>數量</label>
              <button v-on:click="addAmount">+</button>
              <input type="text" value v-model="amount" />
              <button v-on:click="deleteAmount">-</button>
            </div>
            <!-- <form v-on:submit.stop.prevent="">
              <input type="text" name="cartId" hidden />
            <input type="text" name="productId" v-bind:value="product.id" hidden />-->
            <button
              type="submit"
              class="btn btn-info mr-2"
              v-on:click="addCartItem(product.id)"
            >加入購物車</button>
            <!-- </form> -->

            <button class="btn btn-warning">加入追蹤</button>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <h3>產品介紹</h3>
        <p>{{ product.detail }}</p>
      </div>
      <div class="col-sm-12">
        <h3>運送須知</h3>
        <p>{{ product.deliveryKnow }}</p>
      </div>
      <div class="col-sm-12">
        <h3>退購須知</h3>
        <p>{{ product.refundKnow }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import productsAPI from "../apis/products";
import cartAPI from "../apis/carts";
import { Toast } from "../utils/helpers";
export default {
  data() {
    return {
      product: {},
      amount: 1,
      isProcessing: false
    };
  },
  created() {
    this.getProductDetail();
  },
  methods: {
    addAmount() {
      this.amount += 1;
    },
    deleteAmount() {
      this.amount -= 1;
    },
    async getProductDetail() {
      try {
        const productId = this.$route.params.productId;
        let response = await productsAPI.getProductDetail({ productId });
        const { data, statusText } = response;

        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.product = data.product;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法獲取產品詳細資料"
        });
      }
    },
    async addCartItem(productId) {
      try {
        // 取出瀏覽器上的cartId，如果瀏覽器上沒有會是null，打給API會產生新的cartId
        const cartId = localStorage.getItem("cartId");
        let response = await cartAPI.addCartItem({
          cartId: cartId,
          productId: productId,
          amount: this.amount
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
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getProductDetail();
    next();
  }
};
</script>
