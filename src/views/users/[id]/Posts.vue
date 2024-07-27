<template>
  <GoBackHome />
  <div class="posts-container">
    <h1 class="text-2xl font-bold mb-5"></h1>
    <div v-if="loading" class="flex justify-center items-center h-full">
      <div class="spinner"></div>
    </div>
    <div v-else>
      <div v-if="posts.length === 0" class="text-gray-600"></div>
      <div v-else>
        <div v-for="post in posts" :key="post.id" class="post">
          <div class="post-content">
            <h2 class="post-title">{{ post.title }}</h2>
            <p class="post-body">{{ post.body }}</p>
          </div>
          <div class="post-actions">
            <button @click="openModal(post)" class="see-more-button">
              <span class="see-more-content">
                See More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-square-rounded-arrow-right"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="#4f359b"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 16l4 -4l-4 -4" />
                  <path d="M8 12h8" />
                  <path
                    d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"
                  />
                </svg>
              </span>
            </button>
          </div>
          <hr class="post-divider" />
        </div>
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
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    posts.value = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    loading.value = false;
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
  color: #26303e;
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
  display: box;
  box-orient: vertical;
  line-clamp: 4;
}

.post-actions {
  display: flex;
  justify-content: flex-end;
}

.see-more-button {
  background-color: transparent;
  border: none;
  color: darkslategray;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
}

.see-more-content {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 20px;
  margin-right: 40px;
  color: #26303e;
  font-weight: bold;
}

.icon {
  margin-left: 20px;
}

.post-divider {
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 0;
}

.post-content {
  display: flex;
  flex-direction: column;
  width: 40vw;
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
