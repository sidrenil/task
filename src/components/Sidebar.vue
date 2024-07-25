<template>
  <div class="pt-6 bg-gray-100 w-64 h-screen border-r border-gray-200">
    <router-link
      to="/"
      class="sidebar-link text-purple-600 bg-white rounded-md text-lg font-medium flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-player-stop-filled"
        width="44"
        height="44"
        viewBox="12 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M17 4h-10a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3z"
          stroke-width="0"
          fill="currentColor"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-users ml-2 mr-3 text-purple-600"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
      </svg>

      <span class="text-purple-600">Users</span>
    </router-link>
  </div>
</template>

<style scoped>
.router-link {
  display: flex;
  align-items: center;
}

.icon-tabler-player-stop-filled {
  margin: 0;
  padding: 0;
}

.icon-tabler-users {
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>
