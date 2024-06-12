const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/community',
    createProxyMiddleware({
      target: 'http://15.165.117.224:8080',
      changeOrigin: true,
    })
  );
};
