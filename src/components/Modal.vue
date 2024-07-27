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
          <div v-if="comments.length === 0" class="text-gray-600">
            No comments available.
          </div>
          <div v-else>
            <div v-for="comment in comments" :key="comment.id" class="comment">
              <h3 class="comment-name">{{ comment.name }}</h3>
              <p class="comment-body">{{ comment.body }}</p>
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

watch(
  () => props.post,
  async (newPost) => {
    if (newPost) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${newPost.id}/comments`
        );
        comments.value = response.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
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
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 20px;
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

.comment {
  margin-bottom: 10px;
}

.comment-name {
  font-size: 1.125rem;
  font-weight: bold;
}

.comment-body {
  font-size: 1rem;
  color: #555;
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
</style>
