<template>
  <button @click="goHome" class="bg-blue-500 text-white px-4 py-2 rounded">
    Go Home
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.push("/");
}
</script>

<style scoped></style>
