<template>
  <div
    class="pt-6 bg-gray-100 w-64 h-screen border-r border-gray-200"
    style="position: sticky; top: 0; height: 100vh; overflow-y: auto"
  >
    <div v-if="user" class="flex items-center mb-4 px-5">
      <img
        :src="`https://i.pravatar.cc/150?img=${user.id}`"
        alt="User avatar"
        class="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <div class="text-sm font-bold">{{ user.name }}</div>
        <div class="text-gray-600 email text-sm">{{ user.email }}</div>
      </div>
    </div>

    <hr class="my-4 border-gray-300 mx-5" />

    <div class="relative">
      <router-link
        v-if="user"
        :to="{ name: 'Todos', params: { id: user.id } }"
        class="link-item"
        :class="{ 'bg-white': $route.name === 'Todos' }"
      >
        <div v-if="$route.name === 'Todos'" class="active-indicator"></div>
        Todos
      </router-link>

      <router-link
        v-if="user"
        :to="{ name: 'Posts', params: { id: user.id } }"
        class="link-item"
        :class="{ 'bg-white': $route.name === 'Posts' }"
      >
        <div v-if="$route.name === 'Posts'" class="active-indicator"></div>
        Posts
      </router-link>

      <router-link
        v-if="user"
        :to="{ name: 'Albums', params: { id: user.id } }"
        class="link-item"
        :class="{ 'bg-white': $route.name === 'Albums' }"
      >
        <div v-if="$route.name === 'Albums'" class="active-indicator"></div>
        Albums
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  user: {
    type: Object,
    default: () => null,
  },
});
</script>

<style scoped>
hr {
  border-top: 2px solid #e5e7eb;
  margin-bottom: 45px;
}

.email {
  text-decoration: underline;
}

.link-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  padding-left: 32px;
  position: relative;
  text-decoration: none;
  color: purple;
  line-height: 1.2;
  margin-bottom: 15px;
}

.link-item:hover {
  background-color: #f3f4f6;
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #612dbb;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  transition: all 0.3s ease;
}

.link-item.bg-white {
  background-color: white;
}
</style>
