import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./index.css";

const app = createApp(App);
app.use(store);
app.use(createPinia());
app.use(router);
app.mount("#app");
