<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="close">X</button>
      <div class="modal-body">
        <div class="post-section">
          <h2 class="section-title">POST TITLE</h2>
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-body">{{ post.body }}</p>
        </div>
        <!-- Comments Section -->
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
  max-width: 1200px; /* Adjusted width */
  max-height: 70vh; /* Adjusted height */
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.post-section,
.comments-section {
  width: 50%;
  padding: 10px;
  overflow-y: auto;
}

.section-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.post-title,
.comment-name {
  font-size: 1.125rem;
  font-weight: bold;
}

.post-body,
.comment-body {
  font-size: 1rem;
  color: #555;
  margin-top: 5px;
}

.comment {
  margin-bottom: 10px;
}
</style>
