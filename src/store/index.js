import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') ?? false,
    status: '',
    user: {},
  },
  mutations: {
    fetchToken(state) {
      state.token = localStorage.getItem('token') ?? false;
    },
  },
  actions: {
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  modules: {
  }
})
