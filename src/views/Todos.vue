<template>
  <div>
    <h1 class="text-2xl font-bold mb-5">Todos</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="flex items-center mb-2">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        <span :class="{ 'line-through': todo.completed }" class="ml-2">
          {{ todo.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const todos = ref([]);

onMounted(() => {
  // LocalStorage'dan veri yükle
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});

function toggleTodo(id) {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    // Güncellenmiş veriyi LocalStorage'a kaydet
    localStorage.setItem("todos", JSON.stringify(todos.value));
  }
}
</script>

<style scoped></style>
