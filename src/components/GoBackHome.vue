<template>
  <button
    @click="goHome"
    class="flex items-center bg-white text-black px-4 py-2 rounded-lg transition duration-300 border border-gray-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-crop-1-1 mr-2"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#2c3e50"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
      />
      <path d="M8 12l4 4" />
      <path d="M8 12l4 -4" />
      <path d="M8 12h8" />
    </svg>
    Go Home
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.push({ name: "UserList" });
}
</script>

<style scoped></style>
