<template>
  <div class="container py-5">
    <MemberTabs />
    <template v-if="orders.length">
      <div v-for="order in orders" v-bind:key="order.id" class="md-2">
        <div class="row">
          <h5 class="col-2">訂單編號:{{order.id}}</h5>
          <h5 class="col-5">訂購時間: {{order.createdAt}}</h5>
          <h5 class="col-5">
            訂單狀態: {{order.OrderStatus.name}}
            <span v-if="order.OrderStatusId === 1">
              <router-link
                v-bind:to="{name:'checkout-payment', params:{orderId: order.id}}"
                class="btn btn-info"
              >前往付款</router-link>
            </span>
          </h5>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">產品照片</th>
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
      </div>
    </template>
    <template v-else>目前沒有訂單資料</template>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import MemberTabs from "../components/MemberTabs";
import { Toast } from "../utils/helpers";

export default {
  components: {
    MemberTabs
  },
  data() {
    return {
      orders: []
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      try {
        let response = await usersAPI.getOrders();
        console.log(response);
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.orders = data.orders;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法獲取訂單資料"
        });
      }
    }
  }
};
</script>