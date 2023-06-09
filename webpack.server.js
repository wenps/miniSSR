const path = require("path");
const merge = require("webpack-merge").merge;
const main = require("./webpack.main");
module.exports = merge(main, {
  target: "node",
  entry: "./src/main.server.js",
  output: {
    filename: "build.server.js",
    path: path.join(__dirname, "./dist/"),
    libraryTarget: "commonjs2",
  },
});
