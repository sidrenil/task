<template>
  <div>
    <GoBackHome />
    <h1 class="text-2xl font-bold mb-5">Album Photos</h1>

    <div v-if="photos.length === 0" class="text-gray-600">
      No photos available.
    </div>

    <ul v-else>
      <li v-for="photo in photos" :key="photo.id" class="mb-4">
        <img :src="photo.url" :alt="photo.title" class="w-full h-auto mb-2" />
        <p>{{ photo.title }}</p>
      </li>
    </ul>
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

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    );
    photos.value = response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
});
</script>

<style scoped></style>
