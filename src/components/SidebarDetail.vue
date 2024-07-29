<template>
  <div
    class="pt-6 bg-gray-100 sidebar w-64 h-screen border-r border-gray-200"
    style="
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    "
  >
    <div v-if="user" class="flex items-center mb-4 px-5 user-container">
      <img
        :src="`https://i.pravatar.cc/150?img=${user.id}`"
        alt="User avatar"
        class="w-12 h-12 rounded-full mr-4 user-image"
      />
      <div class="user-info">
        <div class="username text-sm font-bold">{{ user.name }}</div>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-checkup-list mr-2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#4f359b"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
          />
          <path
            d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"
          />
          <path d="M9 14h.01" />
          <path d="M9 17h.01" />
          <path d="M12 16l1 1l3 -3" />
        </svg>
        <span class="link-text">Todos</span>
      </router-link>

      <router-link
        v-if="user"
        :to="{ name: 'Posts', params: { id: user.id } }"
        class="link-item"
        :class="{ 'bg-white': $route.name === 'Posts' }"
      >
        <div v-if="$route.name === 'Posts'" class="active-indicator"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-notebook mr-2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#4f359b"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18"
          />
          <path d="M13 8l2 0" />
          <path d="M13 12l2 0" />
        </svg>
        <span class="link-text">Posts</span>
      </router-link>

      <router-link
        v-if="user"
        :to="{ name: 'Albums', params: { id: user.id } }"
        class="link-item"
        :class="{
          'bg-white':
            $route.name === 'Albums' || $route.name === 'UserAlbumPhotos',
        }"
      >
        <div
          v-if="$route.name === 'Albums' || $route.name === 'UserAlbumPhotos'"
          class="active-indicator"
        ></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-photo-heart mr-2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#4f359b"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8h.01" />
          <path
            d="M11.5 21h-5.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5"
          />
          <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l1.5 1.5" />
          <path
            d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z"
          />
        </svg>
        <span class="link-text">Albums</span>
      </router-link>
    </div>

    <div class="sidebar-bottom">
      <span class="sidebar-line"></span>
      <div class="sidebar-content">
        <img src="../img/image.png" alt="Sidebar Image" class="sidebar-image" />
        <span class="text-gray2 sidebar-text">N2Mobil</span>
      </div>
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
  margin-bottom: 55px;
}

.email {
  text-decoration: underline;
  overflow-wrap: break-word;
  font-size: 13px;
}

.flex {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: normal;
  margin-left: 10px;
}

.user-info div {
  white-space: normal;
}

.user-container {
  position: relative;
}

.user-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 16px;
}

.link-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  padding-left: 32px;
  position: relative;
  text-decoration: none;
  color: gray;
  line-height: 1.2;
  margin-bottom: 15px;
}

.link-item:hover {
  background-color: #f3f4f6;
  color: #4f359b;
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 7px;
  background-color: #612dbb;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  transition: all 0.3s ease;
}

.link-item.bg-white {
  background-color: white;
  color: #4f359b;
}

.sidebar-bottom {
  margin-top: auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: transparent;
  margin-bottom: 15px;
}

.sidebar-line {
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  height: 2px;
  background-color: #e5e7eb;
  z-index: 1;
  margin-bottom: 10px;
}

.sidebar-content {
  display: flex;
  align-items: center;
  margin-top: 10px;
  z-index: 2;
}

.sidebar-image {
  width: 40px;
  height: auto;
  margin-right: 5px;
}

.sidebar-text {
  font-size: 20px;
  color: #6b7280;
  font-weight: bold;
}

.username {
  color: #26303e;
}

@media (max-width: 640px) {
  .sidebar {
    width: 3rem;
    overflow: hidden;
  }

  .user-info {
    display: none;
  }

  .user-container {
    padding: 8px;
    justify-content: center;
  }

  .user-image {
    width: 48px;
    height: 48px;
    margin-left: 7px;
  }

  .link-item {
    padding: 8px 10px;
    padding-left: 16px;
    font-size: 1.5rem;
    justify-content: center;
  }

  .link-item .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .sidebar-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  .sidebar-image {
    width: 24px;
  }

  .sidebar-text {
    display: none;
  }

  .link-text {
    display: none;
  }
}
</style>
