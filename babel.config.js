module.exports = function (api) {
  api.cache(true)

  return {
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            assets: './assets',
            src: './src'
          }
        }
      ]
    ],
    presets: ['babel-preset-expo']
  }
}
