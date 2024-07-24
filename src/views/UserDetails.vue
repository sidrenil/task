<template>
  <div class="flex">
    <SidebarDetail :user="user" />
    <div class="flex-1 p-5">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import SidebarDetail from "../components/SidebarDetail.vue";

const route = useRoute();
const user = ref(null);

onMounted(async () => {
  const userId = route.params.id;
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    user.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
</style>
