let common = require("./webpack.common.config"),
  path = require("path"),
  fs = require("fs"),
  webpack = require("webpack"),
  commonConfig = common.commonConfig;

var nodeModules = {};
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = function() {
  let serverConfig = {
    target: "node",
    entry: {
      app: path.resolve(__dirname, "../src/server", "index.js")
    },
    output: {
      path: path.resolve(__dirname, "../dist/server"),
      publicPath: "",
      filename: "[name].server.bundle.js"
    },
    externals: nodeModules
  };

  let config = Object.assign(commonConfig, serverConfig);
  return config;
};
