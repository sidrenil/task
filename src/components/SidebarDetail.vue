<template>
  <div class="p-5 bg-gray-100">
    <!-- Kullanıcı verisi olup olmadığını kontrol et -->
    <div v-if="user" class="flex items-center mb-4">
      <img
        :src="`https://i.pravatar.cc/150?img=${user.id}`"
        alt="User avatar"
        class="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <div class="text-lg font-bold">{{ user.name }}</div>
        <div class="text-gray-600">{{ user.email }}</div>
      </div>
    </div>
    <hr class="my-4 border-gray-300" />
    <div>
      <router-link
        v-if="user"
        :to="{ name: 'Todos', params: { id: user.id } }"
        class="block text-blue-600 hover:underline mb-2"
        >Todos</router-link
      >
      <router-link
        v-if="user"
        :to="{ name: 'Posts', params: { id: user.id } }"
        class="block text-blue-600 hover:underline mb-2"
        >Posts</router-link
      >
      <router-link
        v-if="user"
        :to="{ name: 'Albums', params: { id: user.id } }"
        class="block text-blue-600 hover:underline"
        >Albums</router-link
      >
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

<style scoped></style>
