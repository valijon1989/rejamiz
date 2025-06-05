// c Task
// B Task
// A-TASK

console.log('TRAIN ARIA');

// node.js event loop Callbac xodisasi

// Backend turlari ==> 2xil
// 1. Single thread = Node.JS ==> Bir xonali (Hostell) ==> Bir xonada barcha userlar talabi qabul qilinib uni -> kichik Pool larga taqdim etib bulib tashlaydi va kamida 4ta Pool buladi.

// Tugri tashkillashtirish  ==> ASsinchines va Colback xodisasini bilish muxim

 
// 2. Multi thread = PHP ==> Kup xonali (Hotell) ==> Har bir user talabiga alihida xona ochilish talab etiladi




// Callback ==>
console.log("Jeck Ma maslahati");

    const list = [
    "Yaxshi talaba buling", //20
    "Tugri boshliq tanlang va kuproq xato qiling", // 20~30
    "uz ishingizni boshlang", //30~40
    "Siz kuchli bulgan narsalarni qiling", //40~50 
    "Yoshlarga invistitsiya qiling", // 50~60
    "Endi pushkin bir jaxon yulga tayyorlaning" //60
];

    // Callback function ==> userlardan keladigan datani Callback function orqali bant bulib qolishini oldini olamiz

    function maslahatCallback(a, callback) {
    if (typeof a !== "number") callback("insert a number", null); // birinchi qismi Errorga ikkinchi qismi qaytarmoqchi bulgan qiymatga tegishli
    else if (a <= 20) callback(null, list[0]);
    else if (a > 20 && a <= 30) callback(null, list[1]);
    else if (a > 30 && a <= 40) callback(null, list[2]);
    else if (a > 40 && a <= 50) callback(null, list[3]);
    else if (a > 50 && a <= 60) callback(null, list[4]);
else {
    setInterval(function () { // bu yerda timeoutdagi javob kelishini kutmasdan undan kiyingi tayyor javob aks etdi va shartda berilgan vaqtdan kiyin tyime aoutdagi javobni olib ishga tushirdi
        callback(null, list[5]);
    }, 1000);
    // else callback(null, list[5]);
 }
}
    
 // test ==> buyerda callbackning parametri sifatida function ishga tushadi
console.log("passed here 0");
 maslahatCallback(65, ( err, data) => {  //agar -> 10da xatolik aks etyapti va ikkinchi qismda qaytarmoqchi bulgan qiymat aks etmoqda, yani list[0] listimizdagi ushbu index shartini chiqarib bermoqda.
    if(err) console.log("ERROR:", err);
    console.log('javob:', data)
 });

 console.log("passed here 1");



console.log("Jeck Ma maslahati zuriiiiii");

 // Asynchronos functionlar

const list2 = [
    "Yaxshi talaba buling", //20
    "Tugri boshliq tanlang va kuproq xato qiling", // 20~30
    "uz ishingizni boshlang", //30~40
    "Siz kuchli bulgan narsalarni qiling", //40~50 
    "Yoshlarga invistitsiya qiling", // 50~60
    "Endi pushkin bir jaxon yulga tayyorlaning" //60
];

// difine qismi
 async function maslahatThCa(a) {
    if (typeof a !== "number") /* xatolik kerak bulsa*/ throw new Error("insert a number");
     else if (a <= 20) return list2[0]; // call uchun faqat javobni return qilamiz
    else if (a > 20 && a <= 30) return list2[1];
    else if (a > 30 && a <= 40) return list2[2];
    else if (a > 40 && a <= 50) return list2[3];
    else if (a > 50 && a <= 60) return list2[4];
else {


     // bu yerda  Core packagelar ishlamaydi
    //  setTimeout(function () { 
    //     return list2[5];
    // }, 5000);
     return list2[5];
 }
}
    
// call qismi
console.log("passed here 3");
maslahatThCa(25).then(data => {
    console.log('javob:', data);
}).catch(err => {
    console.log('ERROR:', err);
});
console.log("passed here 4");


// ishlashi   ==> sunchrenes functionlar ishlab bulgandan kiyin Assynchrenes fanction natijalari bilan node.js ishlaydi
// Assynchrenes function event loop orqali orqali thread poolga tawlash evaziga single threadni bant qulnaydi

 // agar birinchi shatdan keyin 2 yoki 3 va 4chi shartlarni ham javobi kerak bulsa unda 1ni ichiga 2. 2ni ichiga 3 va uni ichiga 4ni yozsak buladi lekin bu callback Hall yoki Promise Hall xatoliklarini keltirib chiqaradi


console.log("Jeck Ma maslahati   than chath daaa");

 // then  ==== cath
 maslahatThCa(65).then(data => {
//      maslahatThCa(31).then(data => {
//          maslahatThCa(55).then(data => {
//             maslahatThCa(65).then(data => {
//      console.log('javob:', data);
//  }).catch(err => {
//      console.log('ERROR:', err);
//  });
//  console.log("passed here 5");
//      console.log('javob:', data);
//  }).catch(err => {
//      console.log('ERROR:', err);
//  });
//  console.log("passed here 6");
//      console.log('javob:', data);
//  }).catch(err => {
//      console.log('ERROR:', err);
//  });
//  console.log("passed here 7");
     console.log('javob:', data);
 }).catch(err => {
     console.log('ERROR:', err);
 });
 console.log("passed here 8");


console.log("Jeck Ma maslahati ==== awaitda");

 // asyn ==== await

 const list3 = [
    "Yaxshi talaba buling", //20
    "Tugri boshliq tanlang va kuproq xato qiling", // 20~30
    "uz ishingizni boshlang", //30~40
    "Siz kuchli bulgan narsalarni qiling", //40~50 
    "Yoshlarga invistitsiya qiling", // 50~60
    "Endi pushkin bir jaxon yulga tayyorlaning" //60
 ];

 async function maslahatAwait(a) {
    if (typeof a !== "number") /* xatolik kerak bulsa*/ throw new Error("insert a number");
     else if (a <= 20) return list2[0]; // call uchun faqat javobni return qilamiz
    else if (a > 20 && a <= 30) return list3[1];
    else if (a > 30 && a <= 40) return list3[2];
    else if (a > 40 && a <= 50) return list3[3];
    else if (a > 50 && a <= 60) return list3[4];
else {


     // bu yerda  Core packagelar ishlamaydi
    //  setTimeout(function () { 
    //     return list2[5];
    // }, 5000);
     return list3[5];
 }
}
    
 console.log("passed here 10000000");

async function  run() {
let javob = await  maslahatAwait(20);
console.log(javob);
javob = await  maslahatAwait(33); 
console.log(javob); 
javob = await  maslahatAwait(43); 
console.log(javob); 
javob = await  maslahatAwait(62); 
console.log(javob); 
}
// bu usulda tartib va joylashuv yaxwiroq



// Promise

console.log("Jeck Ma maslahati Promise daaa");

    const list5 = [
    "Yaxshi talaba buling", //20
    "Tugri boshliq tanlang va kuproq xato qiling", // 20~30
    "uz ishingizni boshlang", //30~40
    "Siz kuchli bulgan narsalarni qiling", //40~50 
    "Yoshlarga invistitsiya qiling", // 50~60
    "Endi pushkin bir jaxon yulga tayyorlaning" //60
];

   

    function maslahatPromise(a, callback) {
    if (typeof a !== "number") throw new Error("insert a number");
 // birinchi qismi Errorga ikkinchi qismi qaytarmoqchi bulgan qiymatga tegishli
    else if (a <= 20) callback(null, list5[0]);
    else if (a > 20 && a <= 30) return list5[1];
    else if (a > 30 && a <= 40) return list5[2];
    else if (a > 40 && a <= 50) return list5[3];
    else if (a > 50 && a <= 60) return list5[4];
else {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
    resolve(list5[5]);
    }, 5000);
   
   });
 }
}


async function  run() {
let javob = await  maslahatAwait(20);
console.log(javob);
javob = await  maslahatAwait(33); 
console.log(javob); 
javob = await  maslahatAwait(43); 
console.log(javob); 
javob = await  maslahatAwait(62); 
console.log(javob); 
}

run();
// qulayligi
// Asynchronos ===> ketma- ketlik uchun juda qulay
// Promise ===> Promise All arraylarniung mapi bilan juda yaxwi ishlaydi
// callback ===> javoblar takrida qulay 