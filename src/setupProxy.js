const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      '/hanzoomApi', // 이 경로를 모든 API 요청의 공통 경로로 사용합니다.
      createProxyMiddleware({
            target: 'http://parkingzone.shop:8080',
        //   target: 'http://15.165.117.224:8080',
          changeOrigin: true,
          onError: (err, req, res) => {
              console.error('Proxy Error:', err);
              res.status(500).send('Proxy Error');
          },
      })
  );
};
