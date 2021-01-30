import { createStore } from 'vuex'

import router from '@/router';

export default createStore({
  state: {
    token: localStorage.getItem('token') || false,
    status: '',
    user: {},
  },
  mutations: {
    fetchToken(state) {
      state.token = localStorage.getItem('token') || false;
    },
  },
  actions: {
    async logout({ commit, state }) {
      let req;
      try {
        req = await fetch('/api/staff/logout', {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          }
        })
      } catch (e) {
        // idk what to do
        console.error(e);
        console.log(req);
      } finally {
        localStorage.removeItem('token');
        commit('fetchToken')
        router.push({
          name: 'Logout',
        })
      }
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  modules: {
  }
})
