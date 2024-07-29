<template>
  <div>
    <GoBackHome />
    <h1 class="text-2xl font-bold mb-20"></h1>

    <div v-if="loading" class="flex justify-center items-center h-screen">
      <div class="spinner"></div>
    </div>

    <div v-else>
      <div v-if="todos.length === 0" class="text-gray-600"></div>

      <ul v-else>
        <li v-for="todo in todos" :key="todo.id" class="mb-2 ml-5 mt-6">
          <input
            type="checkbox"
            :id="'todo-' + todo.id"
            v-model="todo.completed"
            @change="updateTodo(todo)"
            class="checkbox mr-10"
          />
          <label
            :for="'todo-' + todo.id"
            :class="{ completed: todo.completed }"
          >
            {{ todo.title }}
          </label>
        </li>
      </ul>
    </div>
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
const loading = ref(true);
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
  } finally {
    loading.value = false;
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
</style>
