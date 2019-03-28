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
      shared: path.join(__dirname, "..", "src", "shared")
    }
  };

  // Return the altered config
  return config;
};

// module.exports = {
//   // Currently we need to add '.ts' to the resolve.extensions array.
//   resolve: {
//     extensions: [".ts", ".tsx", ".js", ".jsx"],
//     alias: {
//       "@shared": path.resolve(__dirname, "../src/shared")
//     }
//   },

//   // Source maps support ('inline-source-map' also works)
//   devtool: "source-map",

//   // Add the loader for .ts files.
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         loader: "awesome-typescript-loader"
//       }
//     ]
//   }
// };
