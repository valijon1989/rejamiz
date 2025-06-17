// Frontend JS fayli ishga tushganini konsolga chiqaradi
console.log("FrontEnd JS ishga tushdi");

// Har bir reja uchun HTML elementini yaratadigan funksiyamiz
function itemTemplate(item) {
    return ` <li class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
                <span class="item-text">${item.reja}</span>
                <div>
                    <button
                         data-id="${item._id}"
                         class="edit-me btn btn-secondary btn-sm mr-1">
                         O'zgarish
                    </button>
                    <button data-id="${item._id}"
                    class="delete-me btn btn-danger btn-sm">
                    O'chirish
                    </button>
                </div>
            </li>`;
}

// Input maydonini DOM'dan olish
let createField = document.getElementById("create-field");

// Formani yuborish (submit) hodisasi ushlanadi
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Formani default tarzda yuborilishini to‘xtatamiz

  // Axios orqali serverga POST so‘rov yuboramiz
  axios
    .post("/create-item", { reja: createField.value }) // input qiymatini yuboramiz
    .then((response) => {
      // Yangi reja DOMga qo‘shiladi
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));

      // Inputni tozalaymiz va qaytadan aktiv qilamiz
      createField.value = "";
      createField.focus();
    })
    .catch((err) => {
      console.log("Iltimos qaytadan harakat qiling!");
    });
});

// Sahifada bosilgan har qanday tugma yoki elementni tekshiramiz
document.addEventListener("click", function (e) {
  console.log(e.target); // Qaysi element bosilganini ko‘rsatadi

  // O‘chirish funksiyasi
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Aniq o'chirmoqchimisiz?")) {
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") }) // serverga id yuboriladi
        .then((response) => {
          console.log(response.data); // Javobni ko‘rsatish
          e.target.parentElement.parentElement.remove(); // HTML elementni o‘chiramiz
        })
        .catch((err) => {
          console.log("Iltimos qaytadan harakat qiling!");
        });
    }
  }

  // Tahrirlash funksiyasi
  if (e.target.classList.contains("edit-me")) {
    // Reja matnini prompt orqali o‘zgartirish
    let userInput = prompt(
      "Ozgartirish kiriting",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );

    // Agar foydalanuvchi yangi qiymat kiritgan bo‘lsa
    if (userInput) {
      axios
        .post("/edit-item", {
          id: e.target.getAttribute("data-id"), // reja id-si
          new_input: userInput, // yangi matn
        })
        .then((response) => {
          console.log(response.data); // Javobni ko‘rsatish
          // Ekrandagi matnni yangilash
          e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput;
        })
        .catch((err) => {
          console.log("Iltimos qaytadan harakat qiling!");
        });
    }
  }
});

// "Hamma rejalarni o‘chirish" tugmasiga bosilganda
document.getElementById("clean-all").addEventListener("click", function () {
  axios.post("/delete-all", { delete_all: true }).then((response) => {
    alert(response.data.state); // serverdan kelgan xabarni ko‘rsatamiz
    document.location.reload(); // Sahifani qayta yuklaymiz
  });
});
