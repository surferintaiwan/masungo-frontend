<template>
  <ul class="nav nav-tabs mb-4">
    <li v-for="tab in tabs" v-bind:key="tab.id" class="nav-item">
      <router-link
        v-bind:to="{
          name: 'products-by-category',
          params: { categoryId: tab.id },
        }"
        class="nav-link"
        >{{ tab.name }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import productsAPI from '../apis/products'
import { Toast } from '../utils/helpers'
export default {
  data() {
    return {
      tabs: [],
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      try {
        let response = await productsAPI.getCategories()
        const { statusText, data } = response
        console.log(data)
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        this.tabs = data.categories
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得商品分類',
        })
      }
    },
  },
}
</script>
