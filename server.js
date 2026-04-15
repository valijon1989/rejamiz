const http = require("http");

const { connect, getDbName } = require("./db");

connect()
  .then(() => {
    console.log(`MongoDB connection succeed: ${getDbName()}`);

    const app = require("./app");
    const server = http.createServer(app);
    const PORT = Number(process.env.PORT) || 4005;

    server.listen(PORT, function () {
      console.log(`The servis is running on port: ${PORT}, http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("ERROR on connection MongoDB", err);
    process.exit(1);
  });

