<template>
  <GoBackHome />
  <div class="pt-4 ml-5">
    <div v-if="loading" class="flex justify-center items-center h-full">
      <div class="spinner"></div>
    </div>
    <div v-else>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pt-4"
      >
        <router-link
          :to="{
            name: 'UserAlbumPhotos',
            params: { id: userId, albumId: album.id },
          }"
          v-for="album in albums"
          :key="album.id"
          class="album-card border border-graylight hover:shadow-2xl duration-300 rounded-xl p-4 space-y-1 flex flex-col"
        >
          <div class="relative flex flex-col h-full">
            <div class="relative w-full h-48 overflow-hidden">
              <div class="absolute inset-0 grid grid-cols-2 grid-rows-2 p-1">
                <img
                  v-for="photo in getAlbumPhotos(album.id)"
                  :key="photo.id"
                  :src="photo.url"
                  :alt="photo.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div class="p-1 bg-white flex flex-col justify-center flex-grow">
              <h2 class="text-sm text-blackgray">
                {{ album.title }}
              </h2>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import GoBackHome from "@/components/GoBackHome.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userId = parseInt(route.params.id);

const albums = ref([]);
const albumPhotos = ref({});
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/albums`
    );
    albums.value = response.data;

    for (const album of albums.value) {
      const photoResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`
      );
      albumPhotos.value[album.id] = photoResponse.data;
    }
  } catch (error) {
    console.error("Error fetching albums or photos:", error);
  } finally {
    loading.value = false;
  }
});

function getAlbumPhotos(albumId) {
  return albumPhotos.value[albumId]?.slice(0, 4) || [];
}
</script>

<style scoped>
.album-card {
  height: 290px;
}

.album-card img {
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
