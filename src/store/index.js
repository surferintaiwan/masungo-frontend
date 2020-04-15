import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      },
      state.isAuthenticated = true
    }
  },
  actions: {
      async fetchCurrentUser({commit}) {
        try {
          const response = await usersAPI.getCurrentUser()
          const {data, statusText} = response
          console.log('111111',response)
          if (statusText !== 'OK') {
            throw new Error(statusText)
          }
          commit('setCurrentUser', {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            image: data.user.image,
            isAdmin: data.user.isAdmin
          })

        } catch(error) {
          console.log('error', error)
          console.error('無法獲取使用者資訊')
        }
      }
  },
  modules: {
  }
})
