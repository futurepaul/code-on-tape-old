//require path from node.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.tsx",
    "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js"
    // "json.worker": "monaco-editor/esm/vs/language/json/json.worker",
    // "css.worker": "monaco-editor/esm/vs/language/css/css.worker",
    // "html.worker": "monaco-editor/esm/vs/language/html/html.worker",
    // "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker",
  },
  output: {
    globalObject: "self",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};
