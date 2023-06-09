// 服务端核心代码
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express(); // 创建服务器
const template = fs.readFileSync("./public/index.html", "utf-8"); // 获取编译模板

// 创建一个渲染器 可以把vue实例对象,渲染成html
const vueRender = require("vue-server-renderer").createRenderer({
  template: template,
});
const initApp = require("./dist/build.server").default; // 获取打包后的createApp函数，即初始化vue实例的函数

app.use(express.static("./dist"));

// 请求监听
app.get("*", async (request, response) => {
  let url = request.url; // 获取请求url

  // 处理文件类型
  if (url.endsWith(".png") || url.endsWith(".js")) {
    let Path = path.join(__dirname, `./dist${url}`);
    const file = fs.readFileSync(Path);
    response.end(file);
    return;
  }

  let ssrHtml = ""; // 暂存返回的html
  const content = { url: url };
  await initApp(content)
    .then((res) => {
      console.log(content);
      // renderToString 在服务器端渲染Vue应用程序时，可以使用该方法将Vue组件转换为HTML字符串
      vueRender.renderToString(res, content, (err, html) => {
        ssrHtml = html;
      });
    })
    .catch((err) => {
      console.log(err);
      ssrHtml = "Err";
    });
  response.end(ssrHtml); // 返回Vue组件转换成的HTML字符串
});

// 服务器启动
app.listen(3001, function () {
  console.log("服务启动");
});

// createRenderer参数：
// - template: 字符串类型，用于指定渲染器的模板。如果不指定，则默认使用 Vue 应用程序的模板。
// - clientManifest: 对象类型，用于指定客户端构建清单。如果不指定，则默认使用服务器端构建清单。
// - inject: 布尔类型，用于指定是否将服务器端的注入函数注入到渲染上下文中。默认为 true。
// - shouldPreload: 函数类型，用于指定是否应该预加载资源。默认为 undefined。
// - shouldPrefetch: 函数类型，用于指定是否应该预取资源。默认为 undefined。
// - runInNewContext: 布尔类型，用于指定是否应该在新的上下文中运行渲染器。默认为 true。
// - basedir: 字符串类型，用于指定应用程序的基本目录。默认为当前工作目录
