<template>
  <div>
    <button
      @click="goAlbums"
      class="flex items-center bg-white text-black px-4 py-2 rounded-lg transition duration-300 border border-gray-300 mb-4"
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
      Go Albums
    </button>

    <div v-if="photos.length === 0" class="text-gray-600">
      No photos available.
    </div>

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <div v-for="photo in photos" :key="photo.id" class="photo-card">
        <img :src="photo.url" :alt="photo.title" class="photo-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const albumId = parseInt(route.params.albumId);
const photos = ref([]);

function goAlbums() {
  router.push({ name: "Albums" });
}

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

<style scoped>
.photo-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-img {
  width: 100%;
  height: auto;
  max-height: 150px;
  object-fit: cover;
}
</style>
