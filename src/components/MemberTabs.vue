<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link to="/member/orders" class="nav-link">查詢訂單</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/member/edit" class="nav-link">會員資料</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/member/followings" class="nav-link">追蹤清單</router-link>
    </li>
    <li class="nav-item" v-on:click="logout">
      <router-link to="#" class="nav-link">登出</router-link>
    </li>
  </ul>
</template>
<script>
export default {
  methods: {
    logout() {
      console.log(123);
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    }
  }
};
</script>