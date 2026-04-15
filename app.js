// Server ishga tushgani haqida konsolga yozuv
console.log("Web Serverni boshlash");

// Express kutubxonasini chaqiramiz
const express = require("express");

// Express serveri yaratilyapti
const app = express();

// MongoDB bilan ishlash uchun kutubxonalarni chaqiramiz
const db = require("./db").getDb(); // db.js ichidan db funksiyasini chaqiramiz
const { ObjectId } = require("mongodb"); // ObjectId uchun kerak bo‘ladi

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
function createObjectId(id) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid item id");
  }

  return new ObjectId(id);
}

// Reja qo‘shish marshruti (frontenddan POST so‘rovi kelganda)
app.post("/create-item", async (req, res) => {
  console.log("User entered /create-item");

  try {
    const new_reja = req.body.reja; // foydalanuvchidan kelgan reja
    const result = await db.collection("plans").insertOne({ reja: new_reja });

    return res.json({ _id: result.insertedId, reja: new_reja });
  } catch (err) {
    console.log("MongoDB yozishda xato:", err);
    return res.status(500).json({ state: "error" });
  }
});

// Rejani o‘chirish marshruti
app.post("/delete-item", async (req, res) => {
  try {
    const id = req.body.id; // ID ni olish
    await db.collection("plans").deleteOne({ _id: createObjectId(id) });
    return res.json({ state: "success" }); // o‘chirildi deb javob beriladi
  } catch (err) {
    console.log("MongoDB o'chirishda xato:", err);
    return res.status(500).json({ state: "error" });
  }
});

// Rejani o‘zgartirish marshruti
app.post("/edit-item", async (req, res) => {
  try {
    const data = req.body; // { id: "...", new_input: "..." }
    console.log(data); // Konsolda tekshirib ko‘ramiz

    await db.collection("plans").findOneAndUpdate(
      { _id: createObjectId(data.id) }, // ID orqali topamiz
      { $set: { reja: data.new_input } } // yangi reja matnini yozamiz
    );

    return res.json({ state: "success" });
  } catch (err) {
    console.log("MongoDB yangilashda xato:", err);
    return res.status(500).json({ state: "error" });
  }
});

// Hamma rejalarni o‘chirish marshruti
app.post("/delete-all", async (req, res) => {
  if (!req.body.delete_all) {
    return res.status(400).json({ state: "error" });
  }

  try {
    await db.collection("plans").deleteMany({});
    return res.json({ state: "Hamma rejalar o'chirildi" });
  } catch (err) {
    console.log("MongoDB barcha rejalarni o'chirishda xato:", err);
    return res.status(500).json({ state: "error" });
  }
});

// Asosiy sahifa: foydalanuvchiga barcha rejalarni ko‘rsatish
app.get("/", async function (req, res) {
  console.log("User entered /");

  try {
    const data = await db.collection("plans").find().toArray();
    return res.render("reja", { items: data }); // EJS shablon orqali sahifa render qilinadi
  } catch (err) {
    console.log(err);
    return res.end("something went wrong");
  }
});

// Author sahifasini render qilish
app.get('/author', (req, res) => {
  res.render("author", { user: user }); // author.ejs fayliga user ma’lumotlari uzatiladi
});

// Ushbu fayl modul sifatida eksport qilinmoqda
module.exports = app;
