<template>
  <div id="masungo-frontend">
    <Navbar v-if="wantToGoAdminPage === false" />
    <AdminNavbar v-if="wantToGoAdminPage" />
    <main class="mt-5" role="main">
      <CategoryTabs v-if="wantToGoAdminPage === false" />
      <router-view />
    </main>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Navbar from "./components/NavBar";
import AdminNavbar from "./components/AdminNavBar";
import CategoryTabs from "./components/CategoryTabs";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Navbar,
    CategoryTabs,
    AdminNavbar
  },
  computed: {
    ...mapState(["currentUser"]),
    ...mapState(["wantToGoAdminPage"]) // 從Vuex取出來判斷是不是要顯示前台的NavBar跟CategoryTabs
  }
};
</script>
>
