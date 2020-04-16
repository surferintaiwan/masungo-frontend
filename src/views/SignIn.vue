// ./src/views/SignIn.vue
<template>
  <div class="container py-5">
    <form class="w-100" v-on:submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
          autofocus
          v-model="email"
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
          v-model="password"
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" v-bind:disabled="isProcessing" type="submit">Submit</button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from '../apis/authorization'
import {Toast} from '../utils/helpers'

export default {
    data: function () {
        return {
            email: '',
            password: '',
            isProcessing: false
        }
    },
    methods: {
        async handleSubmit() {
            this.isProcessing = true
            try {
              if (!this.email || !this.password) {
                Toast.fire({
                  type: 'warning',
                  title: '請輸入email和password'
                })
                this.isProcessing = false
                return
              }
              
              let response = await authorizationAPI.signIn({
                email: this.email,
                password: this.password
              })
              const {data, statusText} = response
              if (statusText !== 'OK') {
                throw new Error(statusText)
              }
              localStorage.setItem('token', data.token)
              
              this.$store.commit('setCurrentUser', data.user)
              this.$router.push('/index')
            } catch(error) {
              console.log(error)
              this.password = ''
              Toast.fire({
                type: 'warning',
                title: '您的帳號或密碼錯誤'
              })
              console.log('error', error)
              this.isProcessing = false
            }
            
        }
    }
}
</script>