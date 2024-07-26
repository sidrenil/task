<template>
  <div class="p-5 ml-5">
    <h1 class="text-2xl font-bold mb-5 mt-2">All Users</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      <router-link
        :to="{ name: 'Todos', params: { id: user.id } }"
        v-for="user in users"
        :key="user.id"
        class="border border-graylight hover:shadow-2xl duration-300 rounded-xl p-6 space-y-4 flex flex-col"
      >
        <div class="flex flex-col lg:flex-row lg:space-x-4">
          <div class="overflow-hidden rounded-full mb-2">
            <img
              :src="`https://i.pravatar.cc/150?img=${user.id}`"
              alt="User avatar"
              class="w-16 h-16 rounded-full"
            />
          </div>
          <div class="flex flex-col justify-center">
            <p class="font-medium text-lg text-blackgray">{{ user.name }}</p>
            <p
              class="text-gray text-[15px] xl:text-sm font-normal overflow-hidden"
            >
              {{ user.email }}
            </p>
            <p class="text-gray text-[15px] xl:text-sm font-normal">
              {{ user.phone }}
            </p>
          </div>
        </div>

        <div class="flex flex-col space-y-4">
          <div class="flex flex-col space-y-1">
            <div class="flex items-center space-x-2 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-map-pin-heart"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#000000"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 11a3 3 0 1 0 -3.973 2.839" />
                <path
                  d="M11.76 21.47a1.991 1.991 0 0 1 -1.173 -.57l-4.244 -4.243a8 8 0 1 1 13.657 -5.588"
                />
                <path
                  d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z"
                />
              </svg>

              <span class="font-medium text-sm text-black">Location</span>
            </div>

            <div class="text-light-gray font-light flex flex-col text-sm">
              <div>{{ user.address.street }}, {{ user.address.suite }}</div>
              <div>{{ user.address.city }}, {{ user.address.zipcode }}</div>
            </div>
          </div>
          <div class="flex flex-col space-y-1">
            <div class="flex items-center space-x-2 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-building-skyscraper"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#000000"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 21l18 0" />
                <path d="M5 21v-14l8 -4v18" />
                <path d="M19 21v-10l-6 -4" />
                <path d="M9 9l0 .01" />
                <path d="M9 12l0 .01" />
                <path d="M9 15l0 .01" />
                <path d="M9 18l0 .01" />
              </svg>
              <span class="font-medium text-sm text-black">Company</span>
            </div>
            <div class="text-light-gray font-light flex flex-col text-sm">
              {{ user.company.name }}
            </div>
          </div>
          <div class="flex flex-col space-y-1">
            <div class="flex items-center space-x-2 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-world-share"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#000000"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20.94 13.045a9 9 0 1 0 -8.953 7.955" />
                <path d="M3.6 9h16.8" />
                <path d="M3.6 15h9.4" />
                <path d="M11.5 3a17 17 0 0 0 0 18" />
                <path d="M12.5 3a16.991 16.991 0 0 1 2.529 10.294" />
                <path d="M16 22l5 -5" />
                <path d="M21 21.5v-4.5h-4.5" />
              </svg>
              <span class="font-medium text-sm text-black">Website</span>
            </div>
            <div class="text-light-gray font-light flex flex-col text-sm">
              {{ user.website }}
            </div>
          </div>
        </div>
      </router-link>
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

<style>
.text-light-gray {
  color: gray;
}
</style>
