<template>
  <div class="p-5 ml-5">
    <h1 class="text-2xl font-bold mb-5 mt-2">All users</h1>
    <div class="flex flex-wrap gap-5">
      <div
        v-for="user in users"
        :key="user.id"
        class="border p-4 rounded shadow bg-white w-full lg:w-1/3 xl:w-1/4 text-left transition-transform transform hover:scale-105 hover:shadow-lg"
      >
        <router-link
          :to="{ name: 'UserDetails', params: { id: user.id } }"
          class="no-underline text-gray-700"
        >
          <div class="flex items-start">
            <img
              :src="`https://i.pravatar.cc/150?img=${user.id}`"
              alt="User avatar"
              class="w-16 h-16 rounded-full"
            />
            <div class="ml-4 flex-1">
              <div class="text-lg font-bold mb-1 truncate">{{ user.name }}</div>
              <div class="text-gray-600 mb-1 truncate">{{ user.email }}</div>
              <div class="text-gray-600 truncate">{{ user.phone }}</div>
            </div>
          </div>
          <div class="text-gray-600 mt-2">
            <div class="font-semibold">Location:</div>
            <div class="truncate">
              {{ user.address.street }}, {{ user.address.city }}
            </div>
          </div>
          <div class="text-gray-600 mt-2">
            <div class="font-semibold">Company:</div>
            <div class="truncate">{{ user.company.name }}</div>
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
.border {
  background-color: #ffffff;
}

.border:hover {
  background-color: #f8f8f8;
}

img {
  margin-right: 1rem;
}

.ml-4 {
  margin-left: 1rem;
}

.flex-1 {
  flex: 1;
  min-width: 0;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: 700;
}

.text-gray-600 {
  color: #4a5568;
}

.text-blue-600 {
  color: #3182ce;
}

.hover\:shadow-lg:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
