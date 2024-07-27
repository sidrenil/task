<template>
  <div>
    <GoBackHome />
    <h1 class="text-2xl font-bold mb-5">Album Photos</h1>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="spinner"></div>
    </div>

    <div v-else>
      <div v-if="photos.length === 0" class="text-gray-600"></div>

      <ul v-else>
        <li v-for="photo in photos" :key="photo.id" class="mb-4">
          <img :src="photo.url" :alt="photo.title" class="w-full h-auto mb-2" />
          <p>{{ photo.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import GoBackHome from "@/components/GoBackHome.vue";

const route = useRoute();
const userId = route.params.id;
const albumId = route.params.albumId;

const photos = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    );
    photos.value = response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.spinner {
  border: 4px solid rgb(79, 53, 155);
  border-radius: 50%;
  border-top: 4px solid #4f359b;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
