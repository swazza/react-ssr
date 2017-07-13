let common = require("./webpack.common.config"),
  path = require("path"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  commonConfig = common.commonConfig;

let devEntries = [
  "react-hot-loader/patch",
  "webpack-dev-server/client?http://localhost:24000/",
  "webpack/hot/only-dev-server"
];

let vendorEntries = ["react", "react-dom"];
let appEntries = [path.resolve(__dirname, "../src/client", "index.js")];

module.exports = function() {
  let clientConfig = {
    target: "web",
    entry: {
      dev: devEntries,
      vendor: vendorEntries,
      app: appEntries
    },
    output: {
      path: path.resolve(__dirname, "../dist/client"),
      publicPath: "http://localhost:24000/",
      filename: "[name].client.bundle-[hash:6].js"
    },
    devServer: {
      contentBase: path.join(__dirname, "../dist/client"),
      port: 24000,
      historyApiFallback: true,
      hot: true,
      host: "0.0.0.0",
      overlay: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: "React SSR example",
        template: path.resolve(__dirname, "../src/client", "index.html")
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ["vendor"],
        minChunks: Infinity
      })
    ]
  };

  let config = Object.assign(commonConfig, clientConfig);
  return config;
};
