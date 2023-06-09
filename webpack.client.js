const path = require("path");
const merge = require("webpack-merge").merge;
const main = require("./webpack.main");
module.exports = merge(main, {
  entry: "./src/main.client.js",
  output: {
    filename: "build.client.js",
    path: path.join(__dirname, "./dist/"),
  },
});
