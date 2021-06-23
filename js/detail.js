// take the current bread id
let urlStr = window.location.href;
let url = new URL(urlStr);
let id = Number(url.searchParams.get("id"));
let curBread = breads[id]; // breads from database in base.js

// set the title
document.title = `Bakersa | ${curBread.name}`;

// add the picture
document.getElementById("main").insertAdjacentHTML(
  "afterbegin",
  `
<div class="banner">
    <img src="../src/breads/bread${id}/1.jpg" id="img-banner" alt="Bread ${id}" width="100%">
    <div id="image-picker">
        <img src="../src/breads/bread${id}/1.jpg" alt="Bread ${id}" id="pick-image-1" onclick="pickImage(1)" class="image-picker-active">
        <img src="../src/breads/bread${id}/2.jpg" alt="Bread ${id}" id="pick-image-2" onclick="pickImage(2)">
        <img src="../src/breads/bread${id}/3.jpg" alt="Bread ${id}" id="pick-image-3" onclick="pickImage(3)">
    </div>
</div>`
);

// add the bread's information
document.getElementById("content").insertAdjacentHTML(
  "afterbegin",
  `
<div class="information">
    <h2>${curBread.name}</h2>
    <h3>${numberFormat.format(curBread.price)}</h3>
    <div class="rating">
    </div>
    <p>${curBread.desc}</p>
</div>`
);

// pick image
function pickImage(idx) {
    $('#image-picker img').removeClass('image-picker-active');
    $(`#pick-image-${idx}`).addClass('image-picker-active');

    $('#img-banner').attr('src', `../src/breads/bread${id}/${idx}.jpg`)
}

// fill the rating
let rating = curBread.rating;
for (let i = 0; i < 5; i++) {
  document
    .getElementsByClassName("rating")[0]
    .insertAdjacentHTML(
      "beforeend",
      `<img src="../src/icons/star${
        i < rating ? "-fill" : "-outline"
      }.png" alt="Star">`
    );
}

function displaySubtotal() {
    $('#subtotal').html(`Subtotal: <strong>${numberFormat.format(stock * curBread.price)}</strong>`)
}

function updateAmount(method = "increment") {
  if (method === "increment") stock++;
  else if (stock > 0) stock--;

  // update the stock text
  $("#stock").html(stock);

  // display subtotal
  displaySubtotal();

  // can't add to cart if the stock is 0
  $("#add-to-cart")
    .css("background-color", `var(--${stock > 0 ? "teal" : "light-grey"})`)
    .css("cursor", `${stock > 0 ? "pointer" : "not-allowed"}`);
}

// hampir sama seperti function isExist (but ini return index nya)
function getIndexInLocalStorage(curLocalStorage) {
  for (let i = 0; i < curLocalStorage.length; i++) {
    let bread = JSON.parse(curLocalStorage[i]);
    if (bread.id === id) {
      return i;
    }
  }
  return -1;
}

function showAddedToCartDialog() {
  $(".overlay-dialog").css("visibility", "visible");
  $("#dialog-message").html(
    `✔️ Your item${stock > 1 ? "s" : ""}: <strong>${
      curBread.name
    } x${stock}</strong> ${
      stock > 1 ? "are" : "is"
    } added to the cart successfully<br><br>Subtotal: <strong>${numberFormat.format(
      curBread.price * stock
    )}</strong>.`
  );
}

// add to cart button functionality
$("#add-to-cart").click(function () {
  if (stock <= 0) return;

  // make the bread object to be inserted into localStorage
  let insertedBread = {
    type: "bread",
    id: curBread.id,
    name: curBread.name,
    price: curBread.price,
    stock: stock,
  };

  // get the localStorage
  let curLocalStorage =
    localStorage.getItem("CART") == undefined
      ? "[]"
      : localStorage.getItem("CART");
  curLocalStorage = JSON.parse(curLocalStorage);

  // if there's already the same bread in the cart, just add the quantity (not adding a new item)
  let localStorageIdx = getIndexInLocalStorage(curLocalStorage);

  if (localStorageIdx !== -1) {
    let bread = JSON.parse(curLocalStorage[localStorageIdx]);
    bread.stock += stock;
    curLocalStorage[localStorageIdx] = JSON.stringify(bread);
  } else {
    // if there's no corresponding bread in the cart, add the items to the cart
    curLocalStorage.push(JSON.stringify(insertedBread));
  }

  // set back to the localStorage
  localStorage.setItem("CART", JSON.stringify(curLocalStorage));

  // show dialog
  showAddedToCartDialog();

  // reset
  stock = 1;
  updateAmount("decrement");
});

// buttons in the dialog
$("#buy-another-bread").click(function () {
  window.location.href = "classic.html";
});

$("#go-to-checkout-page").click(function () {
  window.location.href = "checkout.html";
});

let stock = 0;
displaySubtotal();
