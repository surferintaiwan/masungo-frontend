<template>
  <div class="container py-5">
    <h1>商品管理</h1>
    <router-link to="/admin/products/new" class="btn btn-info">新增商品</router-link>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">商品編號</th>
          <th scope="col">商品名稱</th>
          <th scope="col">商品數量</th>
          <th scope="col">商品市價</th>
          <th scope="col">商品售價</th>
          <th scope="col">狀態</th>
          <th scope="col">執行</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" v-bind:key="product.id">
          <td>{{product.id}}</td>
          <td>{{product.name}}</td>
          <td>{{product.inventory}}</td>
          <td>{{product.listPrice}}</td>
          <td>{{product.sellingPrice}}</td>
          <td>{{product.sellingStatus? '上架中': '已下架'}}</td>

          <td>
            <router-link
              class="btn btn-info mr-2"
              v-bind:to="{name: 'admin-product-detail', params: {productId: product.id}}"
            >查看</router-link>
            <router-link
              class="btn btn-info"
              v-bind:to="{name: 'admin-product-edit', params: {productId: product.id}}"
            >編輯</router-link>
          </td>
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
      products: {}
    };
  },
  created() {
    this.getAllProducts();
  },
  methods: {
    async getAllProducts() {
      try {
        let response = await adminsAPI.getAllProducts();
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.products = data.products;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法獲取商品資料"
        });
      }
    }
  }
};
</script>
