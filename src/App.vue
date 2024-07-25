<template>
  <div class="flex">
    <Sidebar v-if="isHomePage" />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "./components/Sidebar.vue";

const route = useRoute();
const isHomePage = computed(() => route.path === "/");
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
body {
  font-family: "Poppins", sans-serif;
}
</style>
