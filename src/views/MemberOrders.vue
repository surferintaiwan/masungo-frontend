<template>
  <div class="container py-5">
    <MemberTabs />
    <h1>訂單總表</h1>
    <div v-for="order in orders" v-bind:key="order.id" class="md-4">
      <h6>訂單編號 {{order.id}}</h6>
      <h6>訂購時間 {{order.createdAt}}</h6>
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
    </div>
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
        console.log(6666666);
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