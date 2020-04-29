<template>
  <div class="container py-5">
    <h1>編輯商品</h1>
    <AdminProductForm
      v-on:after-submit="handleAfterSubmit"
      v-bind:product-from-db="product"
      v-bind:is-processing="isProcessing"
    />
  </div>
</template>

<script>
import AdminProductForm from "../../components/AdminProductForm";
import adminsAPI from "../../apis/admin";
import { Toast } from "../../utils/helpers";

export default {
  components: {
    AdminProductForm
  },
  data() {
    return {
      product: {},
      isProcessing: false
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      try {
        const productId = this.$route.params.productId;
        let response = await adminsAPI.getProduct({ productId });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.product = data.product;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法獲取商品資料"
        });
      }
    },
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        const productId = this.$route.params.productId;
        let response = await adminsAPI.updateProduct({ formData, productId });
        const { data, statusText } = response;

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          icon: "success",
          title: "新增更新成功"
        });
        this.isProcessing = false;
        this.$router.push("/admin/products");
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法更新商品"
        });
        this.isProcessing = false;
      }
    }
  }
};
</script>