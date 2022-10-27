const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use("/api/getAllFlightTables",
    createProxyMiddleware({
      target: "http://localhost:777",
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