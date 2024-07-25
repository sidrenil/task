<template>
  <div>
    <div class="photos-container">
      <div class="photo" v-for="photo in albumPhotos" :key="photo.id">
        <img :src="photo.url" :alt="photo.title" class="photo-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const albumPhotos = ref([]);
const route = useRoute();

onMounted(async () => {
  try {
    const albumId = route.params.albumId;
    const photoResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    );
    albumPhotos.value = photoResponse.data;
  } catch (error) {
    console.error("Veri çekme hatası:", error);
  }
});
</script>

<style scoped>
.photos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
}

.photo {
  flex: 0 0 calc(20% - 10px);
  box-sizing: border-box;
}

.photo-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
