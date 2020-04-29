<template>
  <div class="container py-5">
    <h1>商品詳細頁</h1>
    <div class="row">
      <div class="col-sm-6">
        <div class="row">
          <img class="col-sm-12 py-2" v-bind:src="product.image1" alt style />

          <img class="col-sm-4" v-bind:src="product.image2" alt style />
          <img class="col-sm-4" v-bind:src="product.image3" alt style />
          <img class="col-sm-4" v-bind:src="product.image4" alt style />
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card" style>
          <div class="card-body">
            <p>{{ product.Brand ? product.Brand.name: null }}</p>
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
            <button
              type="submit"
              class="btn btn-info mr-2"
              v-on:click="addCartItem(product.id)"
            >加入購物車</button>
            <button
              v-if="product.isFollowed"
              class="btn btn-warning"
              v-on:click="handleDelete(product.id)"
            >取消追蹤</button>
            <button v-else class="btn btn-warning" v-on:click="handleAdd(product.id)">加入追蹤</button>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <h3>產品介紹</h3>
        <img class="col-sm-12 py-2" v-bind:src="product.detail" style="width: 600px" />
      </div>
      <div class="col-sm-12">
        <h3>運送須知</h3>
        <img class="col-sm-12 py-2" v-bind:src="product.deliveryKnow" style="width: 600px" />
      </div>
      <div class="col-sm-12">
        <h3>退購須知</h3>
        <img class="col-sm-12 py-2" v-bind:src="product.refundKnow" style="width: 600px" />
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
        this.isProcessing = true;
        // 取出瀏覽器上的cartId，如果瀏覽器上沒有會是null，打給API會產生新的cartId
        const cartId = localStorage.getItem("cartId");
        let response = await cartsAPI.addCartItem({
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
        this.isProcessing = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入購物車"
        });
        this.isProcessing = false;
        console.log(error);
      }
    },
    async handleAdd(productId) {
      try {
        this.isProcessing = true;
        let response = await usersAPI.addFollowingProduct({ productId });
        const { data, statusText } = response;
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          icon: "success",
          title: "追蹤成功"
        });
        this.product.isFollowed = true;
        this.isProcessing = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤清單"
        });
        this.isProcessing = false;
      }
    },
    async handleDelete(productId) {
      try {
        this.isProcessing = true;
        let response = await usersAPI.deleteFollowingProduct({ productId });
        const { data, statusText } = response;
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          icon: "success",
          title: "移除追蹤成功"
        });
        this.product.isFollowed = false;
        this.isProcessing = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法將商品自追蹤清單移除"
        });
        this.isProcessing = false;
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getProductDetail();
    next();
  }
};
</script>
