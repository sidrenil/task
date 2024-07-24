import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser(id) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      this.user = await response.json();
    },
  },
});
