import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router/index.js";
import createStore from "./store/index.js";

Vue.config.productionTip = false;
const router = createRouter();
const store = createStore();
export function createApp() {
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });
  return app;
}
