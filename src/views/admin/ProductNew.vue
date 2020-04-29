<template>
  <div class="container py-5">
    <h1>新增商品</h1>
    <AdminProductForm v-on:after-submit="handleAfterSubmit" v-bind:is-processing="isProcessing" />
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
      isProcessing: false
    };
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        let response = await adminsAPI.addNewProduct(formData);
        const { data, statusText } = response;
        console.log(response);
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          icon: "success",
          title: "新增商品成功"
        });
        this.isProcessing = false;
        this.$router.push("/admin/products");
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法新增商品"
        });
        this.isProcessing = false;
      }
    }
  }
};
</script>