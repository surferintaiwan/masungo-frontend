<template>
  <div class="container pt-5">
    <ul class="nav nav-tabs">
      <li v-for="tab in tabs" v-bind:key="tab.id" class="nav-item">
        <router-link
          v-bind:to="{
                        name: 'products-by-category',
                        query: { category1Id: tab.id }
                    }"
          class="nav-link"
        >{{ tab.name }}</router-link>
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
      tabs: []
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
        this.tabs = data.categories;
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
