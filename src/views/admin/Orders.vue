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
          <th scope="col">收件人</th>
          <th scope="col">收件地址</th>
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
          <td>{{order.receiver}}</td>
          <td>{{order.address}}</td>
          <td>{{order.amount}}</td>
          <td>{{order.OrderStatus.name}}</td>
          <td>
            <!-- <button v-if="order.orderStatusId === 2" class="btn btn-info">轉為已出貨</button> 原本是2，但因為上heroku會跳號，所以要改成11-->
            <button
              v-if="order.OrderStatusId === 11"
              v-on:click="updateOrderShipped(order.id)"
              class="btn btn-info"
            >轉為已出貨</button>
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
    this.getAllOrders();
  },
  methods: {
    async getAllOrders() {
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
    },
    async updateOrderShipped(orderId) {
      try {
        let response = await adminsAPI.updateOrderShipped(orderId);
        const { data, statusText } = response;
        if (data.status !== "success" || statusText !== "OK") {
          throw new Error(statusText);
        }

        // 直接在前端更新訂單狀態(同時也會觸發 轉成已出貨按鍵 消失)
        this.orders = this.orders.map(order => {
          if (order.id === orderId) {
            return {
              ...order,
              OrderStatusId: 31, // 原本是4已出貨，但因為上heroku會跳號，所以要改成31
              OrderStatus: {
                id: 31,
                name: "已出貨"
              }
            };
          } else {
            return order;
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法變更訂單狀態為已出貨"
        });
      }
    }
  }
};
</script>