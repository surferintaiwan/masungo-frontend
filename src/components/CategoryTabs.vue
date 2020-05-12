<template>
  <div class="container pt-5">
    <ul class="nav nav-tabs">
      <li>
        <nav class="navbar navbar-expand-md navbar-light bg-light">
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li
                v-for="category1 in category1s"
                v-bind:key="category1.id"
                class="nav-item dropdown active"
              >
                <router-link
                  class="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  v-bind:to="{
                        name: 'products-by-category',
                        query: { category1Id: category1.id }
                    }"
                >{{ category1.name }}</router-link>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li v-for="category2 in category1.Category2s" v-bind:key="category2.id">
                    <router-link
                      class="dropdown-item dropdown-toggle"
                      v-bind:to="{
                        name: 'products-by-category',
                        query: { category2Id: category2.id }
                    }"
                    >{{category2.name}}</router-link>
                    <ul class="dropdown-menu">
                      <li v-for="category3 in category2.Category3s" v-bind:key="category3.id">
                        <router-link
                          class="dropdown-item"
                          v-bind:to="{
                        name: 'products-by-category',
                        query: { category3Id: category3.id }
                    }"
                        >{{category3.name}}</router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </li>
    </ul>
  </div>
</template>

<script>
import productsAPI from "../apis/products";
import { Toast } from "../utils/helpers";
export default {
  data() {
    return {
      category1s: []
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      try {
        let response = await productsAPI.getCategories();
        const { statusText, data } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.category1s = data.category1s;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得商品分類"
        });
      }
    }
  }
};
</script>
