const proxy  = require('http-proxy-middleware');

const apiContext = ['/api'];
module.exports = (app) => {
  app.use(
      proxy(apiContext, {
          target: process.env.REACT_APP_BASE_URL,
          changeOrigin: true,
      })
  );
};