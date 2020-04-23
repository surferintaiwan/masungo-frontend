<template>
  <form class="w-100" v-on:submit.prevent.stop="handleSubmit">
    <div class="text-center mb-4">
      <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
    </div>

    <div class="form-label-group mb-2">
      <label for="name">名字</label>
      <input
        v-model="name"
        id="name"
        name="name"
        type="text"
        class="form-control"
        placeholder="輸入名字"
        required
        autofocus
      />
    </div>

    <div class="form-label-group mb-2">
      <label for="email">Email</label>
      <input
        v-model="email"
        id="email"
        name="email"
        type="email"
        class="form-control"
        placeholder="email"
        required
      />
    </div>

    <div class="form-label-group mb-3">
      <label for="password">密碼</label>
      <input
        v-model="password"
        id="password"
        name="password"
        type="password"
        class="form-control"
        placeholder="輸入密碼"
        required
      />
    </div>

    <div class="form-label-group mb-3">
      <label for="passwordCheck">再次輸入密碼</label>
      <input
        v-model="passwordCheck"
        id="passwordCheck"
        name="passwordCheck"
        type="password"
        class="form-control"
        placeholder="輸入密碼"
        required
      />
    </div>

    <button
      class="btn btn-lg btn-primary btn-block mb-3"
      type="submit"
      v-bind:disabled="isProcessing"
    >{{isProcessing ? "處理中": "送出"}}</button>

    <div class="text-center mb-3">
      <p>
        <router-link to="/signin">Sign In</router-link>
      </p>
    </div>

    <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
  </form>
</template>

<script>
export default {
  props: {
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: ""
    };
  },
  methods: {
    handleSubmit() {
      const form = event.target;
      const formData = new FormData(form);
      this.$emit("after-handle-submit", formData);
    }
  }
};
</script>