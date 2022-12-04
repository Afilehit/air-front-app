const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use("/api/getAllFlightTables",
    createProxyMiddleware({
      target: "http://158.160.14.25",
      secure: false,
      changeOrigin: true
    })
  );

//   app.use(
//     proxy("/api/breeds", {
//       target: "https://dog.ceo",
//       secure: false,
//       changeOrigin: true
//     })
//   );
};