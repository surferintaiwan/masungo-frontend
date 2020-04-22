<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">產品名稱</th>
        <th scope="col">售價</th>
        <th scope="col">數量</th>
        <th scope="col">小計</th>
        <th scope="col" v-if="canDelete">刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cartItem in cart.CartItems" v-bind:key="cartItem">
        <td>
          <img v-bind:src="cartItem.Product.image1" alt style="width: 200px" />
        </td>
        <td>{{ cartItem.Product.name }}</td>
        <td>{{ cartItem.Product.sellingPrice }}</td>
        <td>{{ cartItem.quantity }}</td>
        <td>{{ cartItem.Product.sellingPrice * cartItem.quantity }}</td>
        <td v-if="canDelete">
          <button class="btn btn-info" v-on:click="deleteCartItem(cartItem.Product.id)">刪除</button>
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>總計</td>
        <td>{{ totalPrice }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import cartsAPI from "../apis/carts";
// import { Toast } from "../utils/helpers";
export default {
  props: {
    cart: {
      type: Object,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    canDelete: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    async deleteCartItem(productId) {
      this.$emit("after-delete-cart-item", productId);
    }
  }
};
</script>
>
