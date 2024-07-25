<template>
  <div>
    <h1 class="text-2xl font-bold mb-5">Todos</h1>
    <div v-if="todos.length === 0" class="text-gray-600">
      No todos available.
    </div>
    <ul v-else>
      <li v-for="todo in todos" :key="todo.id" class="mb-2">
        <input
          type="checkbox"
          :id="'todo-' + todo.id"
          v-model="todo.completed"
          @change="updateTodo(todo)"
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
import axios from "axios";

const todos = ref([]);

onMounted(() => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.value = storedTodos;
  fetchMissingTodos(storedTodos);
});

async function fetchMissingTodos(storedTodos) {
  const userId = 1;
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
    localStorage.setItem("todos", JSON.stringify(mergedTodos));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

function updateTodo(updatedTodo) {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const index = storedTodos.findIndex((todo) => todo.id === updatedTodo.id);

  if (index !== -1) {
    storedTodos[index] = updatedTodo;
    localStorage.setItem("todos", JSON.stringify(storedTodos));
  }
}
</script>

<style scoped></style>
