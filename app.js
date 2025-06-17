// Server ishga tushgani haqida konsolga yozuv
console.log("Web Serverni boshlash");

// Express kutubxonasini chaqiramiz
const express = require("express");

// Expressning "response" modulini chaqiramiz (lekin bu holatda foydalanilmayapti)
const res = require("express/lib/response");

// Express serveri yaratilyapti
const app = express();

// MongoDB bilan ishlash uchun kutubxonalarni chaqiramiz
const db = require("./server").db(); // server.js ichidan db funksiyasini chaqiramiz
const mongodb = require("mongodb");  // ObjectId uchun kerak bo‘ladi

// Foydalanuvchi haqidagi json faylni o‘qish uchun fs modulidan foydalanamiz
const fs = require("fs");
let user;

// "user.json" faylini o‘qiymiz va JS obyektga aylantiramiz
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log("ERROR:", err); // xatolik bo‘lsa chiqaramiz
  } else {
    user = JSON.parse(data); // muvaffaqiyatli o‘qilsa, user o‘zgaruvchisiga joylaymiz
  }
});

// 1. Kirish kodlari
// public papkasidagi fayllarga ochiq ruxsat beriladi (CSS, JS, rasm va h.k.)
app.use(express.static("public"));

// JSON formatidagi POST datani qabul qilish uchun middleware
app.use(express.json());

// HTML formadan keladigan datani objectga aylantirib beradi
app.use(express.urlencoded({ extended: true }));

// 2. (Bo‘sh) Session uchun joy ajratilgan lekin ishlatilmagan

// 3. Views sozlamalari (EJS shablonlar bilan ishlash uchun)
app.set("views", "views");          // EJS fayllar qayerda joylashganini ko‘rsatamiz
app.set("view engine", "ejs");      // EJS templating engine sifatida belgilanadi

// 4. Routing - marshrutlar

// Reja qo‘shish marshruti (frontenddan POST so‘rovi kelganda)
app.post("/create-item", (req, res) => {
  console.log("User entered /create-item");
  
  const new_reja = req.body.reja; // foydalanuvchidan kelgan reja
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    // Reja MongoDB'ga yoziladi va javob sifatida clientga qaytariladi
    res.json(data.ops[0]); // .ops eski versiyada ishlatilgan - MongoDB versiyasiga bog‘liq
  });
});

// Rejani o‘chirish marshruti
app.post("/delete-item", (req, res) => {
  const id = req.body.id; // ID ni olish
  db.collection("plans").deleteOne({ _id: new mongodb.ObjectId(id) }, function (err, data) {
    res.json({ state: "success" }); // o‘chirildi deb javob beriladi
  });
});

// Rejani o‘zgartirish marshruti
app.post("/edit-item", (req, res) => {
  const data = req.body; // { id: "...", new_input: "..." }
  console.log(data); // Konsolda tekshirib ko‘ramiz

  db.collection("plans").findOneAndUpdate(
    { _id: new mongodb.ObjectId(data.id) }, // ID orqali topamiz
    { $set: { reja: data.new_input } },     // yangi reja matnini yozamiz
    function (err, result) {
      if (err) {
        console.log("MongoDB yangilashda xato:", err);
        return res.json({ state: "error" });
      }
      res.json({ state: "success" });
    }
  );
});

// Hamma rejalarni o‘chirish marshruti
app.post("/delete-all", (req, res) => {
  if (req.body.delete_all) {
    db.collection("plans").deleteMany(function () {
      res.json({ state: "Hamma rejalar o'chirildi" });
    });
  }
});

// Asosiy sahifa: foydalanuvchiga barcha rejalarni ko‘rsatish
app.get("/", function (req, res) {
  console.log("User entered /");

  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("something went wrong");
      } else {
        res.render("reja", { items: data }); // EJS shablon orqali sahifa render qilinadi
      }
    });
});

// Author sahifasini render qilish
app.get('/author', (req, res) => {
  res.render("author", { user: user }); // author.ejs fayliga user ma’lumotlari uzatiladi
});

// Ushbu fayl modul sifatida eksport qilinmoqda
module.exports = app;
