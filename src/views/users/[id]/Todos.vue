<template>
  <div>
    <GoBackHome />
    <h1 class="text-2xl font-bold mb-20"></h1>

    <div v-if="todos.length === 0" class="text-gray-600">
      No todos available.
    </div>

    <ul v-else>
      <li v-for="todo in todos" :key="todo.id" class="mb-2 ml-5 mt-6 pt-3">
        <input
          type="checkbox"
          :id="'todo-' + todo.id"
          v-model="todo.completed"
          @change="updateTodo(todo)"
          class="checkbox mr-10"
        />
        <label :for="'todo-' + todo.id" :class="{ completed: todo.completed }">
          {{ todo.title }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import GoBackHome from "@/components/GoBackHome.vue";
import axios from "axios";

const route = useRoute();
const userId = route.params.id;
const todos = ref([]);

onMounted(() => {
  const storedTodos = JSON.parse(localStorage.getItem(`todos-${userId}`)) || [];
  todos.value = storedTodos;
  fetchMissingTodos(storedTodos);
});

async function fetchMissingTodos(storedTodos) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
    const apiTodos = response.data;

    const mergedTodos = apiTodos.map((apiTodo) => {
      const storedTodo = storedTodos.find((todo) => todo.id === apiTodo.id);
      return storedTodo ? storedTodo : apiTodo;
    });

    todos.value = mergedTodos;
    localStorage.setItem(`todos-${userId}`, JSON.stringify(mergedTodos));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

function updateTodo(updatedTodo) {
  const storedTodos = JSON.parse(localStorage.getItem(`todos-${userId}`)) || [];
  const index = storedTodos.findIndex((todo) => todo.id === updatedTodo.id);

  if (index !== -1) {
    storedTodos[index] = updatedTodo;
    localStorage.setItem(`todos-${userId}`, JSON.stringify(storedTodos));
  }
}
</script>

<style scoped>
.checkbox {
  transform: scale(1.5);
  margin-right: 15px;
  vertical-align: middle;
  accent-color: #6750a4;
}
</style>
