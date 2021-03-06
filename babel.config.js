module.exports = {
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          assets: "./src/assets",
          features: "./src/features",
          data: "./src/data",
          shared: "./src/shared",
          utils: "./src/utils",
          vendor: "./src/vendor",
          server: "./src/server",
          root: "./src"
        }
      }
    ]
  ]
};
