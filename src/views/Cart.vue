<template>
  <div class="container py-5">
    <h1>購物車</h1>
    <template v-if="this.cart.CartItems.length !== 0">
      <CartTable
        v-bind:cart="cart"
        v-bind:totalPrice="totalPrice"
        v-on:after-delete-cart-item="afterDeleteCartItem"
      />

      <div class="text-right">
        <router-link to="/checkout" class="btn btn-info mr-2 text-right">前往結帳</router-link>
      </div>
    </template>
    <template v-else>
      <h2>---購物車內尚無商品---</h2>
    </template>
  </div>
</template>

<script>
import cartsAPI from "../apis/carts";
import { Toast } from "../utils/helpers";
import CartTable from "../components/CartTable";
export default {
  components: {
    CartTable
  },
  data() {
    return {
      cart: {},
      totalPrice: 0
    };
  },
  created() {
    this.getCartItems();
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
    async afterDeleteCartItem(productId) {
      try {
        let response = await cartsAPI.deleteCartItem({
          cartId: this.cart.id,
          productId: productId
        });
        const { data, statusText } = response;
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // 確定得到API回覆刪除成功了，記得接著要把這個元件內的資料做刪除，否則變成等到使用者刷新頁面才會看到刪除後的結果
        this.cart.CartItems = this.cart.CartItems.filter(cartItem => {
          return cartItem.ProductId !== productId;
        });
        // 再來是totalPrice也要商品金額重新做加總，但要先判斷購物車裡面還有沒有商品
        if (this.cart.CartItems.length !== 0) {
          this.cart.CartItems.forEach(cartItem => {
            this.totalPrice = 0;
            this.totalPrice = cartItem.Product.sellingPrice * cartItem.quantity;
          });
        } else {
          this.totalPrice = 0;
        }
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "目前無法移除商品"
        });
      }
    }
  }
};
</script>
