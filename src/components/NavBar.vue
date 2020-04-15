<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">馬上購</router-link>
    <form action="/search">
      <div class="input-group mb-3">
        <input
          type="text"
          name="keyword"
          class="form-control"
          placeholder="輸入商品關鍵字"
          aria-describedby="search-button"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="submit" id="search-button">Search</button>
        </div>
      </div>
    </form>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <router-link to="#" class="text-white mr-3" v-if="currentUser.isAdmin">管理員後台</router-link>
        <!-- is user is login -->
        <template v-if="isAuthenticated">
          <router-link to="#" class="text-white mr-3">{{currentUser.name}} 您好</router-link>
          <router-link to="#" class="btn btn-sm btn-outline-success my-2 my-sm-0 mr-2">會員中心</router-link>
          <button type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0 mr-2">購物車</button>
          <button type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0">登出</button>
        </template>
      </div>
    </div>
  </nav>
</template>
    
<script>
const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "http://i.pravatar.cc/300",
    isAdmin: true
  },
  isAuthenticated: true
};

export default {
  name: "Navbar",
  data: function() {
    return {
      currentUser: {
        id: -1,
        name: "",
        email: "",
        image: "",
        isAdmin: false
      },
      isAuthenticated: false
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser
      };
      this.isAuthenticated = dummyUser.isAuthenticated;
    }
  }
};
</script>