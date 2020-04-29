<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <router-link to="/admin">
        <img src="../../public/logo.png" alt="馬上購LOGO" />
      </router-link>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <router-link class="nav-link text-warning" to="/admin/products">商品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-warning" to="/admin/orders">訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-warning" to="/admin/members">會員管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-warning" to="/admin/categories">商品分類管理</router-link>
          </li>
        </ul>
      </div>

      <div id="navbarSupportedContent" class="navbar-collapse collapse">
        <div class="ml-auto d-flex align-items-center">
          <!-- is user is admin -->
          <router-link to="/" class="text-warning mr-3">前往前台</router-link>
          <!-- is user is login -->
          <router-link to="#" class="text-warning mr-3">{{ currentUser.name }}，您好</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentUser"])
  }
};
</script>