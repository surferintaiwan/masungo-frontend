<template>
  <div class="container py-5">
    <h1>會員管理</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">會員編號</th>
          <th scope="col">會員名稱</th>
          <th scope="col">email</th>
          <th scope="col">手機號碼</th>
          <th scope="col">累計消費金額</th>
          <th scope="col">身份</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members" v-bind:key="member.id">
          <td>{{member.id}}</td>
          <td>{{member.name}}</td>
          <td>{{member.email}}</td>
          <td>{{member.phone}}</td>
          <td>{{member.totalAmount}}</td>
          <td>{{member.isAdmin? '管理者':'一般用戶' }}</td>
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
      members: []
    };
  },
  created() {
    this.getAllMembers();
  },
  methods: {
    async getAllMembers() {
      try {
        let response = await adminsAPI.getAllMembers();
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.members = data.members;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法獲取會員資料"
        });
      }
    }
  }
};
</script>