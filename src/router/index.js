import { createRouter, createWebHistory } from "vue-router";
import UserList from "../components/UserList.vue";
import UserDetails from "../views/UserDetails.vue";

import Todos from "../views/users/[id]/Todos.vue";
import Albums from "../views/users/[id]/Albums.vue";
import Posts from "../views/users/[id]/Posts.vue";
import AlbumPhotos from "@/views/users/[id]/albums/AlbumPhotos.vue";

const routes = [
  {
    path: "/",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/user/:id",
    name: "UserDetails",
    component: UserDetails,
    props: true,
    children: [
      {
        path: "todos",
        name: "Todos",
        component: Todos,
      },
      {
        path: "posts",
        name: "Posts",
        component: Posts,
      },
      {
        path: "albums",
        name: "Albums",
        component: Albums,
      },
      {
        path: "albums/:albumId",
        name: "UserAlbumPhotos",
        component: AlbumPhotos,
      },

      {
        path: "",
        redirect: "todos",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
