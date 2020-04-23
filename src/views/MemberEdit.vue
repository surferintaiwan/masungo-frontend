<template>
  <div class="container py-5">
    <MemberTabs />
    <form class="w-100" v-on:submit.prevent.stop="handleSubmit">
      <div class="form-label-group mb-2">
        <label for="name">姓名</label>
        <input
          id="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          required
          autofocus
          v-model="name"
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="email">email</label>
        <input
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
          v-model="email"
          disabled
        />
      </div>
      <div class="form-label-group mb-3">
        <div>性別</div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="gender"
            id="male"
            value="1"
            v-model="gender"
          />
          <label class="form-check-label" for="male">男</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="gender"
            id="female"
            value="2"
            v-model="gender"
          />
          <label class="form-check-label" for="female">女</label>
        </div>
      </div>
      <div class="form-label-group mb-3">
        <label for="birthday">生日</label>
        <input
          id="birthday"
          name="birthday"
          type="date"
          class="form-control hasDatepicker"
          placeholder="birthday"
          required
          v-model="birthday"
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        v-bind:disabled="isProcessing"
        type="submit"
      >Submit</button>
    </form>
  </div>
</template>
<script>
import usersAPI from "../apis/users";
import MemberTabs from "../components/MemberTabs";
import { Toast } from "../utils/helpers";
export default {
  components: {
    MemberTabs
  },
  data() {
    return {
      name: "",
      email: "",
      gender: "",
      birthday: "",
      isProcessing: false
    };
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      try {
        let response = await usersAPI.getCurrentUser();
        const { data, statusText } = response;
        console.log(response);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.name = data.user.name;
        this.email = data.user.email;
        this.gender = data.user.gender;
        this.birthday = data.user.birthday;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法獲取會員資料"
        });
      }
    },
    async handleSubmit() {
      try {
        this.isProcessing = true;
        const form = event.target;
        const formData = new FormData(form);
        for (let [name, value] of formData.entries()) {
          console.log(name + ": " + value);
        }
        let response = await usersAPI.updateUser(formData);
        const { data, statusText } = response;
        console.log(data, statusText);
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          icon: "success",
          title: "個人資料更新成功"
        });
        this.isProcessing = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "個人資料更新失敗"
        });
        this.isProcessing = false;
      }
    }
  }
};
</script>