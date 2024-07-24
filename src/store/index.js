import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async fetchUser({ commit }, userId) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const user = await response.json();
        commit("setUser", user);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
});
