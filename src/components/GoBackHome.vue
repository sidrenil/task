<template>
  <div
    class="go flex items-center bg-white text-darkslategray px-4 py-2 rounded-lg transition duration-300 text-2xl font-extrabold"
  >
    <button @click="goHome" class="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-crop-1-1 mr-7"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#26303e"
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
    </button>
    Go Home
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.push({ name: "UserList" });
}
</script>

<style scoped></style>
