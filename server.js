const http = require('http');

const mongodb = require("mongodb");

let db;
const connectionString = "mongodb+srv://volfvolf0505:3323626v_@cluster0.pztgqtr.mongodb.net/"

mongodb.connect(connectionString,
     {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, client) => {
    if(err) console.log("ERROR on connection MongoDB");
    else {
        console.log("MongoDB connection succeed");
       module.exports = client;

        const app = require("./app");
        const server = http.createServer(app);
// Portga biriktirish
        let PORT = 3000;
// tugri ishlasa pastdagi function ishga tushadi
        server.listen(PORT, function () {
        console.log(`The servis is running on port: ${PORT}, http://localhost:${PORT}`
      );
     }); 
    }
  }
);

