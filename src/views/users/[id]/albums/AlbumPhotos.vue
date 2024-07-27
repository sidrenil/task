<template>
  <div>
    <div
      class="go flex items-center bg-white text-darkslategray px-4 py-2 rounded-lg transition duration-300 text-2xl font-extrabold"
    >
      <button @click="goAlbums" class="">
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
      Go Albums
    </div>

    <div v-if="loading" class="flex justify-center items-center h-full">
      <div class="spinner"></div>
    </div>

    <div v-else-if="photos.length === 0" class="text-gray-600"></div>

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-7 pl-5"
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
const loading = ref(true);

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
  } finally {
    loading.value = false;
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

.spinner {
  border: 4px solid rgb(79, 53, 155);
  border-radius: 50%;
  border-top: 4px solid #4f359b;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 20px;
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
