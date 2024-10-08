<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-square-rounded-x"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 10l4 4m0 -4l-4 4" />
          <path
            d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"
          />
        </svg>
      </button>
      <div class="modal-body">
        <div class="post-section">
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-body">{{ post.body }}</p>
        </div>

        <div class="comments-section">
          <h2 class="section-title">COMMENTS</h2>
          <div v-if="loading" class="spinner-container">
            <div class="spinner"></div>
          </div>

          <div v-else>
            <div v-for="comment in comments" :key="comment.id" class="comment">
              <img
                src="../img/image.png"
                alt="profile"
                class="comment-avatar"
              />
              <div class="comment-info">
                <h3 class="comment-name">{{ comment.name }}</h3>
                <p class="comment-body">{{ comment.body }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  post: Object,
});

const emits = defineEmits(["close"]);

const comments = ref([]);
const loading = ref(true);

watch(
  () => props.post,
  async (newPost) => {
    if (newPost) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${newPost.id}/comments`
        );
        comments.value = response.data.map((comment) => ({
          ...comment,
          profilePicture: "../img/image.png",
        }));
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        loading.value = false;
      }
    }
  },
  { immediate: true }
);

function close() {
  emits("close");
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 1200px;
  max-height: 70vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button svg {
  fill: none;
}

.modal-body {
  display: flex;
  width: 100%;
  height: calc(70vh - 40px);
  overflow: hidden;
  flex-direction: row;
}

.post-section,
.comments-section {
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
}

.post-section {
  width: 60%;
  border-right: 1px solid #ccc;
  position: relative;
}

.comments-section {
  width: 40%;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 20px;
  max-height: 100%;
  overflow-y: auto;
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
  color: #26303e;
}

.post-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #26303e;
}

.post-body {
  font-size: 1rem;
  color: #555;
  margin-top: 25px;
  margin-left: 10px;
}

.post-section::-webkit-scrollbar,
.comments-section::-webkit-scrollbar {
  width: 8px;
}

.post-section::-webkit-scrollbar-thumb,
.comments-section::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.post-section::-webkit-scrollbar-thumb:hover,
.comments-section::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.post-section::-webkit-scrollbar-track,
.comments-section::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.comment {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 10px;
  flex-wrap: wrap;
}

.comment-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.comment-info {
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 65px);
}

.comment-name {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.comment-body {
  font-size: 1rem;
  color: #555;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  margin-bottom: 10px;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner {
  border: 4px solid rgb(79, 53, 155);
  border-radius: 50%;
  border-top: 4px solid #4f359b;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .modal-content {
    flex-direction: column;
    max-height: 80vh;
  }

  .post-section,
  .comments-section {
    width: 100%;
    border-right: none;
    padding: 10px;
  }

  .comments-section {
    margin-top: 0;
  }
}
</style>
