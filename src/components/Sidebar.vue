<template>
  <div
    class="pt-6 bg-gray-100 w-64 h-screen border-r border-gray-200 sidebar"
    style="
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    "
  >
    <router-link
      to="/"
      class="sidebar-link text-purple-600 bg-white rounded-md text-lg font-medium flex items-center"
    >
      <div class="sidebar-background"></div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-users ml-4 mr-3 text-purple-600 icon-size"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#4f359b"
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
      <span class="user text-md">Users</span>
    </router-link>

    <div class="sidebar-bottom">
      <span class="sidebar-line"></span>
      <div class="sidebar-content">
        <img src="../img/image.png" alt="Sidebar Image" class="sidebar-image" />
        <span class="text-gray2 sidebar-text">N2Mobil</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 16rem;
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

.sidebar-link {
  position: relative;
  padding: 10px 20px;
  background-color: white;
  display: flex;
  align-items: center;
}

.sidebar-background {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 7px;
  background-color: #4f359b;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 2px solid #4f359b;
}

.icon-size {
  width: 28px;
  height: 28px;
}

.text-md {
  font-size: 18px;
  font-weight: bold;
}

.user {
  color: #4f359b;
}

@media (max-width: 640px) {
  .sidebar {
    width: 3rem;
    overflow: hidden;
  }

  .user {
    display: none;
  }

  .sidebar-text {
    display: none;
  }

  .sidebar-content {
    justify-content: center;
  }

  .sidebar-image {
    width: 24px;
  }

  .sidebar-link {
    padding: 8px 0;
    justify-content: center;
  }
}
</style>
