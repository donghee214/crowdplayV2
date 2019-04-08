var path = require("path");

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.tsx?$/,
    loader: "awesome-typescript-loader"
  });

  config.resolve = {
    ...config.resolve,
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      ...config.resolve.alias,
      assets: path.resolve(__dirname, "../src/assets"),
      shared: path.resolve(__dirname, "../src/shared")
    }
  };

  // Return the altered config
  return config;
};
