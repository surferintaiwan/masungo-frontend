<template>
  <div id="masungo-frontend">
    <Navbar v-if="wantToGoAdminPage === false" />
    <AdminNavbar v-if="wantToGoAdminPage" />
    <main class="mt-5" role="main">
      <CategoryTabs v-if="wantToGoAdminPage === false" />
      <router-view />
      <Footer v-if="wantToGoAdminPage ===false" />
    </main>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Navbar from "./components/NavBar";
import AdminNavbar from "./components/AdminNavBar";
import CategoryTabs from "./components/CategoryTabs";
import Footer from "./components/Footer";
import { mapState } from "vuex";
import $ from "jquery";

export default {
  name: "App",
  data() {
    return {
      keyword: ""
    };
  },
  components: {
    Navbar,
    CategoryTabs,
    AdminNavbar,
    Footer
  },
  computed: {
    ...mapState(["currentUser"]),
    ...mapState(["wantToGoAdminPage"]) // 從Vuex取出來判斷是不是要顯示前台的NavBar跟CategoryTabs
  },
  mounted() {
    $(document).ready(function() {
      $(".dropdown-menu a.dropdown-toggle").on("click", function() {
        var $el = $(this);
        var $parent = $(this).offsetParent(".dropdown-menu");
        if (
          !$(this)
            .next()
            .hasClass("show")
        ) {
          $(this)
            .parents(".dropdown-menu")
            .first()
            .find(".show")
            .removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass("show");

        $(this)
          .parent("li")
          .toggleClass("show");

        $(this)
          .parents("li.nav-item.dropdown.show")
          .on("hidden.bs.dropdown", function() {
            $(".dropdown-menu .show").removeClass("show");
          });

        if (!$parent.parent().hasClass("navbar-nav")) {
          $el
            .next()
            .css({ top: $el[0].offsetTop, left: $parent.outerWidth() - 4 });
        }

        return false;
      });
    });
  }
};
</script>

