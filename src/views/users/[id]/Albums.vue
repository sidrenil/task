<template>
  <div>
    <GoBackHome />
    <h1 class="text-2xl font-bold mb-5">Albums</h1>

    <div v-if="albums.length === 0" class="text-gray-600">
      No albums available.
    </div>

    <div v-else>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <router-link
          :to="{
            name: 'UserAlbumPhotos',
            params: { id: userId, albumId: album.id },
          }"
          v-for="album in albums"
          :key="album.id"
          class="border border-gray-300 rounded-lg overflow-hidden hover:shadow-xl transition"
        >
          <div class="relative">
            <div class="relative w-full h-40 bg-gray-200 overflow-hidden">
              <div class="absolute inset-0 grid grid-cols-2 gap-1 p-1">
                <img
                  v-for="photo in getAlbumPhotos(album.id)"
                  :key="photo.id"
                  :src="photo.url"
                  :alt="photo.title"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div class="p-4 bg-white">
              <h2 class="font-bold text-lg">{{ album.title }}</h2>
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
  }
});

function getAlbumPhotos(albumId) {
  return albumPhotos.value[albumId]?.slice(0, 4) || [];
}
</script>

<style scoped></style>
