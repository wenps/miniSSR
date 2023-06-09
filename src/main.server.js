import { createApp } from "./main.js";
// 对于vue而言，每一次访问都会返回一个新的组件实例，ssr也是同理，也需要返回一个新的组件实例
export default (content) => {
  // 抛出个函数
  return new Promise((resolve, reject) => {
    const app = createApp(); // 获取组价实例
    const router = app.$router; // 获取路由实例
    const store = app.$store; // 获取vuex实例
    const { url } = content; // 解构地址
    router.push(url); // 设置当前的路由
    router.onReady(() => {
      const components = router.getMatchedComponents();
      if (components.length) {
        Promise.all(
          components.map((item) => {
            if (item.asyncData) {
              return item.asyncData(store, router);
            }
          })
        )
          .then(() => {
            content.state = store.state;
            resolve(app);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject({ code: 404, msg: "无匹配路由" });
      }
    }, reject); // 兜底
  });
};
