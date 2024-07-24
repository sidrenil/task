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

// Load todos from Local Storage on component mount
onMounted(() => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.value = storedTodos;
});

// Fetch todos from API and store in todos array
onMounted(async () => {
  const userId = 1; // Use the user ID dynamically if needed
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
    todos.value = response.data;
    localStorage.setItem("todos", JSON.stringify(response.data)); // Save API data to local storage
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
});

// Update todo in local storage
function updateTodo(updatedTodo) {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const index = storedTodos.findIndex((todo) => todo.id === updatedTodo.id);

  if (index !== -1) {
    storedTodos[index] = updatedTodo;
    localStorage.setItem("todos", JSON.stringify(storedTodos));
  }
}
</script>

<style scoped>
/* Define styles for completed todos */
.completed {
  color: gray;
  text-decoration: line-through;
}
</style>
