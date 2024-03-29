const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.[jpg|png|jpeg|svg|gif]$/i,
        type: "asset/resource",
      },
      {
        test: /\."[woff|woff2|eot|ttf|otf"]$/i,
        type: "asset/resource",
      },
    ],
  },
};
