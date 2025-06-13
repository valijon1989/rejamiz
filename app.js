console.log("Web Serverni boshlash");
const express = require("express");
const res = require("express/lib/response");
const app = express();

// MongoDB ni chaqirish
const db = require("./server").db();
const mongodb = require("mongodb");


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
app.post("/create-item", (req, res) => {
  console.log("User entered /create-item");
  
   const new_reja = req.body.reja;
   db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    res.json(data.ops[0]);
   });
});

app.post("/delete-item", (req, res) => {
  const id = req.body.id;
db.collection("plans").deleteOne({_id: new mongodb.ObjectId(id)}, function (err, data) {
  res.json({state: "success"});
    }  
   );
 
});

app.get("/", function (req, res) {
  console.log("User entered /");
  db.collection("plans")
  .find()
  .toArray((err, data) =>{
    if (err) {
    console.log(err);
    res.end("something went wrong");
  } else {
    res.render("reja", {items: data});
     } 
   });
});

app.get('/author', (req, res) => {
    res.render("author", {user: user});
});


module.exports = app;
