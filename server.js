console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
const http = require('http');
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
  } else {
    user = JSON.parse(data);
  }
});

// 1.Kirish kodlari==> Expressga kirib kelayotgan malumotlarga oid bulgan malumotlar yoziladi
app.use(express.static("public"));  // har qanday brauzerdan kelayotgan malumotlar uchun public folderi ochiq manosini anglatadi
app.use(express.json());  // krib kelayotgan jeson xolatdagi datani object xolatiga ugirib beradi
app.use(express.urlencoded({ extended: true})); // HTML dan bron narsani form qilsak express servir qabul qilib oladi. buni yozmasak HTML dan form qilgan naralarni form qilib bulmaydi.


// 2.Session code

// 3. Views code==> traditional usulda beckandda frontend yasemiz==> yani backendda HTML yasab uni klaintga yuboramiz
app.set("views","views");  // folder kursatilyapti
app.set("view engine","ejs");


// 4.Routing Codes==> ruterlarga muljallangan
app.post("/create item", (req, res) => {
    console.log(req);
    res.json({ test: "success" });
});
app.get("/", function (req, res) {
    res.render("harid");
});

app.get('/author', (req, res) => {
    res.render("author", {user: user});
});




const server = http.createServer(app);
// Portga biriktirish
let PORT = 3000;
// tugri ishlasa pastdagi function ishga tushadi
server.listen(PORT, function () {
console.log(`The servis is running on port: ${PORT}`);
});