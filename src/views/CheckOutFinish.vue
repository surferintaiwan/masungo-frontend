<template>
  <div class="container py-5">
    <h1>訂單付款完成頁</h1>
    <!-- <template v-if="order.OrderStatusId === 2"> 本來是2，但因為上了heroku會跳號，要改成11才是訂單處理中的狀態-->
    <template v-if="order.OrderStatusId === 11">
      <p class="text-danger">謝謝您的訂購，訂單付款完成</p>
      <form>
        <div class="form-group">
          <label for="address">訂單編號:</label>
          <input
            type="text"
            class="form-control"
            id="address"
            name="address"
            required
            disabled
            v-bind:value="order.id"
          />
        </div>
        <div class="form-group">
          <label for="address">收件地址:</label>
          <input
            type="text"
            class="form-control"
            id="address"
            name="address"
            required
            disabled
            v-bind:value="order.address"
          />
        </div>
        <div class="form-group">
          <label for="receiver">收件人:</label>
          <input
            type="text"
            class="form-control"
            id="receiver"
            name="receiver"
            required
            disabled
            v-bind:value="order.receiver"
          />
        </div>
        <div class="form-group">
          <label for="receiver">運送方式:</label>
          <input
            type="text"
            class="form-control"
            id="storePickUp"
            name="storePickUp"
            required
            disabled
            v-bind:value="order.DeliveryMethod.name"
          />
        </div>
        <div class="form-group">
          <label for="receiver">付款方式:</label>
          <input
            type="text"
            class="form-control"
            id="homeDelivery"
            name="homeDelivery"
            required
            disabled
            v-bind:value="order.PaymentMethod.name"
          />
        </div>
      </form>
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">產品名稱</th>
            <th scope="col">售價</th>
            <th scope="col">數量</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="orderItem in order.OrderItems" v-bind:key="orderItem.id">
            <td>
              <img v-bind:src="orderItem.Product.image1" alt style="width: 200px" />
            </td>
            <td>{{ orderItem.Product.name }}</td>
            <td>{{ orderItem.Product.sellingPrice }}</td>
            <td>{{ orderItem.quantity }}</td>
            <td>{{ orderItem.Product.sellingPrice * orderItem.quantity }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>總計</td>
            <td>{{ order.amount }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else-if="order.OrderStatusId === 1 ">
      <p class="text-danger">您的訂單尚未付款</p>
    </template>
  </div>
</template>

<script>
import ordersAPI from "../apis/orders";
import { Toast } from "../utils/helpers";
export default {
  data() {
    return {
      order: {}
    };
  },
  created() {
    this.getOrderFinish();
  },

  methods: {
    async getOrderFinish() {
      try {
        const orderId = this.$route.params.orderId;
        let response = await ordersAPI.getOrderFinish({ orderId });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.order = data.order;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "沒有這筆訂單或沒有該筆訂單權限"
        });
      }
    }
  }
};
</script>