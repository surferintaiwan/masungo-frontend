<template>
  <div class="container py-5">
    <h1>結帳頁</h1>
    <CartTable v-bind:cart="cart" v-bind:totalPrice="totalPrice" v-bind:canDelete="canDelete" />
    <form v-on:submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="address">收件地址:</label>
        <input type="text" class="form-control" id="address" name="address" required />
      </div>
      <div class="form-group">
        <label for="receiver">收件人:</label>
        <input type="text" class="form-control" id="receiver" name="receiver" required />
      </div>
      <div class="form-group">
        運送方式:
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="deliveryMethodId"
            id="storePickUp"
            value="1"
            required
          />
          <label class="form-check-label" for="storePickUp">超商取貨</label>
        </div>
      </div>
      <div class="form-group">
        付款方式:
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="paymentMethodId"
            id="creditCart"
            value="1"
            required
          />
          <label class="form-check-label" for="creditCart">信用卡</label>
        </div>
      </div>
      <input name="amount" type="text" v-bind:value="totalPrice" hidden />
      <input name="cartId" type="text" v-bind:value="cart.id" hidden />
      <button type="submit" class="btn btn-primary">確認訂單</button>
    </form>
  </div>
</template>

<script>
import CartTable from "../components/CartTable";
import cartsAPI from "../apis/carts";
import ordersAPI from "../apis/orders";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      cart: {},
      totalPrice: 0,
      canDelete: false // 這資料是為了帶去給元件，把delete按鍵移除
    };
  },
  created() {
    this.getCartItems();
  },
  components: {
    CartTable
  },
  methods: {
    async getCartItems() {
      try {
        // 取出存在瀏覽器的cartId送去給API
        const cartId = localStorage.getItem("cartId");
        let response = await cartsAPI.getCartItems({ cartId });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.cart = data.cart;
        this.totalPrice = data.totalPrice;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得購物車資料"
        });
      }
    },
    async handleSubmit(event) {
      try {
        // !!!!!!!要補個判斷，如果他選的不是信用卡付款，例如超商取貨付款，就不要跳轉至付款頁面了

        const form = event.target;
        const formData = new FormData(form);
        let response = await ordersAPI.createOrder({ formData });
        const { data, statusText } = response;
        if ((data.status !== "success", statusText !== "OK")) {
          throw new Error(statusText);
        }
        // 從API拿到orderId，當作跳轉至付款頁面用的params參數
        this.$router.push(`/checkout/payment/${data.orderId}`);
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "建立訂單失敗"
        });
      }
    }
  }
};
</script>
