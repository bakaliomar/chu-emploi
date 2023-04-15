import { createApp } from "vue";
import "@/assets/index.scss";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import Notifications from "@kyvg/vue3-notification";

const app = createApp(App);

app.use(Notifications);
app.use(createPinia());
app.use(router);

app.mount("#app");
