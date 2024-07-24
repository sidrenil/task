<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-5">All users</h1>
    <div class="flex flex-wrap gap-5">
      <div
        v-for="user in users"
        :key="user.id"
        class="border p-5 rounded shadow bg-gray-100 w-full lg:w-1/3 xl:w-1/4 text-center transition-transform transform hover:scale-105"
      >
        <router-link
          :to="{ name: 'UserDetails', params: { id: user.id } }"
          class="no-underline text-gray-700 font-bold"
        >
          <img
            :src="`https://i.pravatar.cc/150?img=${user.id}`"
            alt="User avatar"
            class="w-16 h-16 rounded-full mx-auto mb-2"
          />
          <div>{{ user.name }}</div>
          <div class="text-gray-600">{{ user.email }}</div>
          <div class="text-gray-600">{{ user.phone }}</div>
          <div class="text-gray-600 mt-2">
            <div class="font-semibold">Location:</div>
            <div>{{ user.address.street }}, {{ user.address.city }}</div>
          </div>
          <div class="text-gray-600 mt-2">
            <div class="font-semibold">Company:</div>
            <div>{{ user.company.name }}</div>
          </div>
          <div class="text-gray-600 mt-2">
            <div class="font-semibold">Website:</div>
            <a
              :href="`http://${user.website}`"
              target="_blank"
              class="text-blue-600 hover:underline"
            >
              {{ user.website }}
            </a>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);

onMounted(() => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      users.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

<style scoped>
.border:hover {
  background-color: #ffffff;
}
</style>
