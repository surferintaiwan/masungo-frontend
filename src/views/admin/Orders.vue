<template>
  <div class="container py-5">
    <h1>訂單管理</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">訂單日期</th>
          <th scope="col">會員姓名</th>
          <th scope="col">會員電子郵件</th>
          <th scope="col">訂單金額</th>
          <th scope="col">訂單狀態</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" v-bind:key="order.id">
          <td>{{order.id}}</td>
          <td>{{order.createdAt}}</td>
          <td>{{order.User.name}}</td>
          <td>{{order.User.email}}</td>
          <td>{{order.amount}}</td>
          <td>{{order.OrderStatus.name}}</td>
          <td>
            <router-link class="btn btn-info" to="#">編輯</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import adminsAPI from "../../apis/admin";
import { Toast } from "../../utils/helpers";
export default {
  data() {
    return {
      orders: []
    };
  },
  created() {
    this.getAllMembers();
  },
  methods: {
    async getAllMembers() {
      try {
        let response = await adminsAPI.getAllOrders();
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.orders = data.orders;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法獲取訂單資料"
        });
      }
    }
  }
};
</script>