module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          assets: './src/assets',
          features: './src/features',
          data: './src/data',
          shared: './src/shared',
          utils: './src/utils',
          vendor: './src/vendor',
          root: './src'
        },
      },
    ],
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-class-properties'],
  ],
}
