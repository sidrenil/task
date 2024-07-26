<template>
  <GoBackHome />
  <div class="posts-container">
    <h1 class="text-2xl font-bold mb-5"></h1>
    <div v-if="posts.length === 0" class="text-gray-600">
      No posts available.
    </div>
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="post">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-body">{{ post.body }}</p>
        <div class="post-actions">
          <button @click="openModal(post)" class="see-more-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-crop-1-1 mr-7"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#4f359b"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
              />
              <path d="M5 12l14 0" />
              <path d="M13 18l6 -6" />
              <path d="M13 6l6 6" />
            </svg>
            See More
          </button>
        </div>
        <hr class="post-divider" />
      </div>
    </div>

    <Modal v-if="showModal" :post="selectedPost" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Modal from "@/components/Modal.vue";
import GoBackHome from "@/components/GoBackHome.vue";

const route = useRoute();
const userId = route.params.id;

const posts = ref([]);
const showModal = ref(false);
const selectedPost = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    posts.value = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
});

function openModal(post) {
  selectedPost.value = post;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedPost.value = null;
}
</script>
<style scoped>
.posts-container {
  padding: 20px;
  padding-top: 40px;
}

.post {
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.post-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-body {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 20px;
  max-height: 50vh;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.post-actions {
  text-align: right;
}

.see-more-button {
  background-color: transparent;
  border: none;
  color: darkslategray;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 25px;
  margin-right: 50px;
}

.post-divider {
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 0;
}
</style>
