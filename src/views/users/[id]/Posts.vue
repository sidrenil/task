<template>
  <GoBackHome />
  <div class="posts-container">
    <h1 class="text-2xl font-bold mb-5">Posts</h1>
    <div v-if="posts.length === 0" class="text-gray-600">
      No posts available.
    </div>
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="post">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-body">{{ post.body }}</p>
        <div class="post-actions">
          <button @click="openModal(post)" class="see-more-button">
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
}

.post {
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.post-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.post-body {
  font-size: 1rem;
  color: #555;
}

.post-actions {
  text-align: right;
  margin-bottom: 10px;
}

.see-more-button {
  background-color: transparent;
  border: none;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}

.post-divider {
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 0;
}
</style>
