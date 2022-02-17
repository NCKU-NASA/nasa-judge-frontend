module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/': {
        ws:           true,
        target:       'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
}
