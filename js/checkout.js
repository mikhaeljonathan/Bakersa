// GET THE ITEMS IN THE LOCAL STORAGE
let curLocalStorage = localStorage.getItem("CART");
curLocalStorage = JSON.parse(curLocalStorage);

// INITIALIZE TOTAL PRICE
let totalPrice = 0;

// IF ITEMS ARE EMPTY
if (curLocalStorage == undefined || curLocalStorage.length === 0) {
  document.getElementsByTagName("main")[0].insertAdjacentHTML(
    "afterbegin",
    `
    <div class="empty-cart">
        <div class="overlay">
            <p>Your cart is empty :(</p>
            <p>Go buy some some <a href="classic.html" style="display: inline-block;">breads</a> or <a href="custom.html" style="display: inline-block;">cakes</a>.</p>
        </div>
    </div>
    `
  );

  // HIDE ALL VIEWS
  $('main').css('display', 'block');
  $("#cart-container").css("display", "none");
  $("#customer-info").css("display", "none");
  $("#cart-customer-divider").css("display", "none");

} else {
  // IF THERE ARE ITEMS IN LOCAL STORAGE

  for (let i = 0; i < curLocalStorage.length; i++) {
    let cart = JSON.parse(curLocalStorage[i]);
    let subTotal = cart.stock * cart.price;
    totalPrice += subTotal;

    // INSERT THE ITEM VIEWS
    document.getElementById("carts").insertAdjacentHTML(
      "beforeend",
      `
        <div class="cart">
            <div class="cart-overlay">
                ${
                  cart.type === "bread"
                    ? `
                <p>Edit Amount</p>
                <div class="edit-amount">
                    <button class="amount-button" onclick="updateAmount(${i}, 'decrement')">-</button>
                    <p class="amount" id="amount-${i}">${cart.stock}</p>
                    <button class="amount-button" onclick="updateAmount(${i})">+</button>
                </div>`
                    : `<button class="trash-cake" onclick="updateAmount(${i}, 'decrement')"><img src="../src/icons/trash-icon.png" alt="Trash" id="trash-icon"></button>`
                }
            </div>
            <img src="../src/${
              cart.type === "bread"
                ? `breads/bread${cart.id}/1.jpg`
                : "banners/custom-cake-banner.jpg"
            }" alt="Cart ${i}" />
            <div class="cart-info">
                <h3>${cart.name}</h3>
                ${cart.type === "bread" ? "" : `<p>${cart.message}</p>`}
                <p id="subtotal-${i}"><span class="bold">Subtotal:</span> Rp ${subTotal},00</p>
            </div>
            <div class="quantity">
                <div class="circle">
                    <p id="cart-stock-${i}">${cart.stock}</p>
                </div>
            </div>
        </div>
        `
    );
  }

  // DISPLAY TOTAL PRICE
  $("#total").html(`<span>Total:</span> Rp ${totalPrice},00`);
}

// HIDE DIALOG WHEN CLICKING OUTSIDE
$(".overlay-dialog").click(function (e) {
  let classTarget = e.target.classList[0];
  if (classTarget === "overlay-dialog") {
    $(".overlay-dialog").css("visibility", "hidden");
    $("#yes-clear-cart").css("display", "none");
    $("#yes-delete-item").css("display", "none");
  }
});

// CLEAR CART BUTTON
$("#clear-cart").click(function () {
  $(".overlay-dialog").css("visibility", "visible");
  $("#yes-clear-cart").css("display", "inline-block");
  $("#dialog-message").html(
    `⚠️ Are you sure want to <strong>clear this cart</strong>?`
  );
});

// CANCEL BUTTON IN DIALOG
$("#cancel").click(function () {
  $(".overlay-dialog").css("visibility", "hidden");
  $("#yes-clear-cart").css("display", "none");
  $("#yes-delete-item").css("display", "none");
});

// YES BUTTON (CLEAR CART)
function clearCart(){
  localStorage.clear();
  window.location.reload();
}
$("#yes-clear-cart").click(clearCart);

// UPDATE (INCREMENT/DECREMENT) AMOUNT OF PARTICULAR BREAD
function updateAmount(idx, action = "increment") {
  // TAKE THE CURRENT AMOUNT AND UPDATE IT
  let amount = JSON.parse(curLocalStorage[idx]).stock;
  amount += action === "increment" ? 1 : -1;

  // IF THE AMOUNT 0, DELETE CORRESPONDING BREAD FROM THE CART
  if (amount === 0) {
    showDeleteItemDialog(idx);
    return;
  }

  // GET THE PRICE AND SUBTRACT TOTALPRICE WITH THE PRICE
  let curPrice = JSON.parse(
    JSON.parse(localStorage.getItem("CART"))[idx]
  ).price;
  totalPrice -= curPrice;

  // UPDATE THE VIEWS
  updateViews(idx, curPrice * amount, amount, totalPrice);

  // UPDATE AMOUNT IN THE CART
  updateInTheCart(amount, idx);
}

function updateViews(idx, subTotal, amount, totalPrice) {
  $(`#amount-${idx}`).html(amount);
  $(`#cart-stock-${idx}`).html(amount);
  $(`#subtotal-${idx}`).html(
    `<span class="bold">Subtotal:</span> Rp ${subTotal},00`
  );
  $("#total").html(`<span>Total:</span> Rp ${totalPrice},00`);
}

function updateInTheCart(amount, idx) {
  // TAKE THE BREAD OBJECT AND UPDATE THE BREAD STOCK
  let bread = JSON.parse(curLocalStorage[idx]);
  bread.stock = amount;
  curLocalStorage[idx] = JSON.stringify(bread);

  // SET IT BACK TO THE LOCALSTORAGE
  localStorage.setItem("CART", JSON.stringify(curLocalStorage));
}

// HANDLING THE DELETE ITEM DIALOG
let soonToBeDeletedItemIdx = -1;
function showDeleteItemDialog(idx) {
  // ASSIGN THE INDEX TO GLOBAL VARIABLE
  soonToBeDeletedItemIdx = idx;

  // SHOW THE DIALOG
  let item = JSON.parse(curLocalStorage[idx]);
  $(".overlay-dialog").css("visibility", "visible");
  $("#yes-delete-item").css("display", "inline-block");
  $("#dialog-message").html(
    `⚠️ Are you sure want to delete item: <strong>${item.name} ${
      item.type === "bread" ? "" : `(${item.message})`
    }</strong> from your cart?`
  );
}

// YES BUTTON (DELETE ITEM) IN DIALOG
$("#yes-delete-item").click(function () {
  // DELETE THE OBJECT THAT WANT TO BE DELETED DIRECTLY IN THE ARRAY AND UPDATE IT TO THE LOCALSTORAGE
  curLocalStorage.splice(soonToBeDeletedItemIdx, 1);
  localStorage.setItem("CART", JSON.stringify(curLocalStorage));

  // RELOAD THE PAGE TO REMOVE THE VIEW
  window.location.reload();
});

// VALIDATION
let nameElement = document.getElementById("name-input");
let emailElement = document.getElementById("email-input");
let phoneElement = document.getElementById("phone-input");
let addressElement = document.getElementById("address-input");
let courierElement = document.getElementById("courier-select");
let deliveryElement = document.getElementById("delivery-select");

let formElement = document.getElementById("form");
let errorName = document.getElementById("errormsg-name");
let errorEmail = document.getElementById("errormsg-email");
let errorPhone = document.getElementById("errormsg-phone");
let errorAddress = document.getElementById("errormsg-address");
let errorCourier = document.getElementById("errormsg-courier");
let errorDelivery = document.getElementById("errormsg-delivery");

function checkName(name) {
  if (name == null || name === "") {
    return "⚠ Name must be filled out";
  }

  return "";
}

function checkEmail(email) {
  if (email == null || email == "") {
    return "⚠ Email must be filled out";
  } else if (!email.endsWith(".com") && !email.endsWith(".co.id")) {
    return "⚠ Email must ends with .com or .co.id";
  }

  return "";
}

function isAllNumber(text) {
  for (let i = 0; i < text.length; i++) {
    let c = text[i];

    if (isNaN(c) == true) {
      return false;
    }
  }

  return true;
}

function checkPhone(phone) {
  if (phone === null || phone === "") {
    return "⚠ Phone must be filled out";
  } else if (!isAllNumber(phone)) {
    return "⚠ Please input only numbers 0 - 9";
  } else if (phone.length < 11 || phone.length > 13) {
    return "⚠ Phone length must beetwen 11 - 13";
  }

  return "";
}

function checkAddress(address) {
  if (address === null || address === "") {
    return "⚠ Address must be filled out";
  }

  return "";
}

function checkCourier(courier) {
  if (courier === "-1") {
    return "⚠ Please choose one";
  }

  return "";
}

function checkDelivery(delivery) {
  if (delivery === "-1") {
    return "⚠ Please choose one";
  }

  return "";
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  let finalValidation = "";

  let name = nameElement.value;
  errorName.innerHTML = checkName(name);
  finalValidation += checkName(name);

  let email = emailElement.value;
  errorEmail.innerHTML = checkEmail(email);
  finalValidation += checkEmail(email);

  let phone = phoneElement.value;
  errorPhone.innerHTML = checkPhone(phone);
  finalValidation += checkPhone(phone);

  let address = addressElement.value;
  errorAddress.innerHTML = checkAddress(address);
  finalValidation += checkAddress(address);

  let courier = courierElement.value;
  errorCourier.innerHTML = checkCourier(courier);
  finalValidation += checkCourier(courier);

  let delivery = deliveryElement.value;
  errorDelivery.innerHTML = checkDelivery(delivery);
  finalValidation += checkDelivery(delivery);

  if (finalValidation === "") {
    $('#dialog-message').html('Your order has been received. Thank you for shopping with us!')
    $(".overlay-dialog").css("visibility", "visible");
    $('#cancel').css('visibility', 'hidden');
    $("#yes-clear-cart").css("display", "inline-block");
    $(".overlay-dialog").click(function (e) {
      let classTarget = e.target.classList[0];
      if (classTarget === "overlay-dialog") {
        clearCart();
      }
    });
  }

});
