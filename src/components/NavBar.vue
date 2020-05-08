<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-white">
    <router-link to="/">
      <img src="../../public/logo.png" alt="馬上購LOGO" />
    </router-link>
    <form v-on:submit.stop.prevent="searchSubmit">
      <div class="input-group mb-3">
        <input
          type="text"
          name="keyword"
          class="form-control"
          placeholder="輸入商品關鍵字"
          aria-describedby="search-button"
          v-model="keyword"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="submit" id="search-button">Search</button>
        </div>
      </div>
    </form>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <router-link to="/admin" class="text-secondary mr-3" v-if="currentUser.isAdmin">管理員後台</router-link>
        <!-- is user is login -->
        <template v-if="isAuthenticated">
          <router-link to="#" class="text-secondary mr-3">{{ currentUser.name }}，您好</router-link>
        </template>
        <router-link to="/member" class="btn btn-sm btn-outline-success my-2 my-sm-0 mr-2">會員中心</router-link>
        <router-link to="/cart" class="btn btn-sm btn-outline-success my-2 my-sm-0 mr-2">購物車</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    searchSubmit() {
      this.$emit("after-search-submit", this.keyword);
    }
  }
};
</script>
