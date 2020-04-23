<template>
  <div class="container py-5">
    <UserDetailForm
      v-on:after-handle-submit="afterHandleSubmit"
      v-bind:is-processing="isProcessing"
    />
  </div>
</template>

<script>
import UserDetailForm from "../components/UserDetailForm";
import authorizationAPI from "../apis/authorization";
import { Toast } from "../utils/helpers";

export default {
  components: {
    UserDetailForm
  },
  data() {
    return {
      isProcessing: false
    };
  },
  methods: {
    async afterHandleSubmit(formData) {
      try {
        this.isProcessing = true;
        let response = await authorizationAPI.signUp(formData);
        const { data, statusText } = response;

        if (statusText !== "OK" || data.status !== "success") {
          if (data.message === "兩次密碼輸入不相同") {
            Toast.fire({
              icon: "error",
              title: "兩次密碼輸入不相同"
            });
            return (this.isProcessing = false);
          } else if (data.message === "帳號已被註冊過") {
            Toast.fire({
              icon: "error",
              title: "帳號已被註冊過"
            });
            return (this.isProcessing = false);
          } else {
            throw new Error(statusText);
          }
        }
        Toast.fire({
          icon: "success",
          title: "註冊成功"
        });
        this.$router.push("/signin");
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "註冊失敗"
        });
        this.isProcessing = false;
      }
    }
  }
};
</script>
