import { createApp } from "vue";
import App from "./App.vue";
import "./assets/base.css";
import router from "@/routeur";

createApp(App).use(router).mount("#app");
