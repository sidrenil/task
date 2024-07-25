<template>
  <div>
    <div class="albums-container">
      <router-link
        v-for="album in albums"
        :key="album.id"
        :to="{ name: 'AlbumPhotos', params: { albumId: album.id } }"
        class="album-card-link"
      >
        <div class="album-card">
          <div class="photo-grid">
            <div class="photo" v-for="photo in album.photos" :key="photo.id">
              <img :src="photo.url" :alt="photo.title" class="photo-img" />
            </div>
          </div>
          <div class="album-caption-container">
            <p class="album-caption">{{ album.title }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const albums = ref([]);

onMounted(async () => {
  try {
    const albumResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/albums"
    );
    const allAlbums = albumResponse.data;

    const albumPhotos = await Promise.all(
      allAlbums.map(async (album) => {
        const photoResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`
        );
        return {
          ...album,
          photos: photoResponse.data.slice(0, 4),
        };
      })
    );

    albums.value = albumPhotos.slice(0, 9);
  } catch (error) {
    console.error("Veri çekme hatası:", error);
  }
});
</script>

<style scoped>
.albums-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

.album-card-link {
  text-decoration: none;
  color: inherit;
}

.album-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease;
}

.album-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 0 4px rgba(128, 128, 128, 0.3);
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0;
  width: 100%;
  height: 200px;
  padding: 10px;
  box-sizing: border-box;
}

.photo {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.album-caption-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: #f8f8f8;
  border-top: 1px solid #ddd;
}

.album-caption {
  font-size: 1em;
  color: #666;
  margin: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
