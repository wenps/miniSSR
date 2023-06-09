import { createApp } from "./main.js";
// 对于vue而言，每一次访问都会返回一个新的组件实例，ssr也是同理，也需要返回一个新的组件实例
// 服务端渲染会返回完整的html，然后在页面执行组件实例的mount激活页面

// 所谓客户端激活，指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程

const app = createApp();

if (window.__INITIAL_STATE__) {
  app.$store.replaceState(window.__INITIAL_STATE__);
}

app.$mount("#app");
