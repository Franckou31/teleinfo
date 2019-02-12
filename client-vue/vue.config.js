module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://78.222.146.209:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
};
