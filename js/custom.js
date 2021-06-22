// --------------------------------------------------------- CHOOSE FLAVOR
let flavors = ["strawberry", "vanilla", "chocolate"];
let colors = ["#C54346", "#EAA52E", "#6D2821"];

// cycling
function getIndex(n) {
  return n < 0 ? flavors.length - 1 : n % flavors.length;
}

let displayCakeFlavor = function (n) {
  let cakes = document.getElementsByClassName("cake-flavor");

  // remove all cakes
  for (let i = 0; i < cakes.length; i++) {
    cakes[i].classList.remove("cake-active");
    cakes[i].style.opacity = "0";
  }

  // show current cake
  cakes[n].classList.add("cake-active");
  $(".cake-active").animate(
    {
      opacity: "1",
    },
    "slow"
  );
  $("#cake-flavor-title").html(flavors[n]).css("color", colors[n]);

  // show the left and right cake fade (desktop only)
  let left = flavors[getIndex(n - 1)];
  let right = flavors[getIndex(n + 1)];
  document
    .getElementById("left-flavor")
    .setAttribute("src", `../src/cakes/${left}cake.png`);
  document
    .getElementById("right-flavor")
    .setAttribute("src", `../src/cakes/${right}cake.png`);
};

// arrow right and left
$("#arrow-right-flavor").click(function () {
  currentFlavor = getIndex(currentFlavor + 1);
  displayCakeFlavor(currentFlavor);
});

$("#arrow-left-flavor").click(function () {
  currentFlavor = getIndex(currentFlavor - 1);
  displayCakeFlavor(currentFlavor);
});

// to the next section
$("#choose-flavor-next").click(function () {
  $("#choose-flavor").removeClass("section-active");
  $("#add-cream").addClass("section-active");
  displayCakeCream();
});

let currentFlavor = 1;
$("#choose-flavor").addClass("section-active");
displayCakeFlavor(currentFlavor);

// ---------------------------------------------------------- ADD CREAM
// display the cake from previous section
function displayCakeCream() {
  isAddCream = true;

  // displaying the current flavor cake
  let curFLavorName = flavors[currentFlavor];
  let cakeCream = document.getElementsByClassName("cake-cream");
  for (let i = 0; i < cakeCream.length; i++) {
    cakeCream[i].classList.remove("cake-active");
  }
  $(`#${curFLavorName}-cake-cream`).addClass("cake-active");

  document
    .getElementById("left-cream")
    .setAttribute("src", `../src/cakes/${curFLavorName}cake.png`);
  document
    .getElementById("right-cream")
    .setAttribute("src", `../src/cakes/${curFLavorName}cake.png`);
}

// display the actual cream
function displayCream(goto = "right") {
  let right = goto === "right";
  $("#add-cream-title").html(`${right ? "Yes!" : "No... :("}`);
  $("#arrow-right-cream").css("visibility", `${right ? "hidden" : "visible"}`);
  $("#arrow-left-cream").css("visibility", `${right ? "visible" : "hidden"}`);
  $("#cream-price").css("visibility", `${right ? "visible" : "hidden"}`);
  $("#cake-faded-left").css("visibility", `${right ? "visible" : "hidden"}`);
  $("#cake-faded-right").css("visibility", `${right ? "hidden" : "visible"}`);

  $("#cake-cream").animate(
    {
      opacity: `${right ? "1" : "0"}`,
    },
    "slow"
  );
}

// arrow left and right
$("#arrow-left-cream").click(function () {
  isAddCream = false;
  displayCream("left");
});

$("#arrow-right-cream").click(function () {
  isAddCream = true;
  displayCream("right");
});

// go to the previous section (choose flavor)
$("#add-cream-before").click(function () {
  $("#add-cream").removeClass("section-active");
  $("#choose-flavor").addClass("section-active");
  displayCakeFlavor(currentFlavor);
});

// go to the next section (add message)
$("#add-cream-next").click(function () {
  $("#add-cream").removeClass("section-active");
  $("#add-message").addClass("section-active");
  displayCakeMessage();
});

let isAddCream = true;
displayCream("right");

// --------------------------------------------------------- ADD MESSAGE
// display the cake from previous section
function displayCakeMessage() {
  // cake flavor
  let curFLavorName = flavors[currentFlavor];
  let cakeMessage = document.getElementsByClassName("cake-message");
  for (let i = 0; i < cakeMessage.length; i++) {
    cakeMessage[i].classList.remove("cake-active");
  }
  $(`#${curFLavorName}-cake-message`).addClass("cake-active");

  // cream
  $("#cake-cream-message").css("opacity", `${isAddCream ? "1" : "0"}`);
}

// go to the previous section (add cream)
$("#add-message-previous").click(function () {
  $("#add-message").removeClass("section-active");
  $("#add-cream").addClass("section-active");
  displayCakeCream();
});

function validMessage(message) {
  let messages = message.split(" ");
  if (messages.length > 3) return false;

  for (m of messages) {
    if (m.length > 11) return false;
  }

  return true;
}

// go to the next section (finish)
$("#add-message-finish").click(function () {
  message = document.getElementById("cake-input-message").value.trim();
  colorMessage = document.getElementById("cake-input-message-color").value;

  if (!validMessage(message)) {
    $("#error-msg").css("display", "block");
    return;
  }

  $("#add-message").removeClass("section-active");
  $("#cake-finish").addClass("section-active");
  displayCakeFinish();
});

let message = "";
let colorMessage = "";

// ------------------------------------------------------- FINISH
// display the cake from previous section
function displayCakeFinish() {
  //cake flavor
  let curFLavorName = flavors[currentFlavor];
  let cakeFinish = document.getElementsByClassName("cake-finish");
  for (let i = 0; i < cakeFinish.length; i++) {
    cakeFinish[i].classList.remove("cake-active");
  }
  $(`#${curFLavorName}-cake-finish`).addClass("cake-active");

  // cream
  $("#cake-cream-finish").css("opacity", `${isAddCream ? "1" : "0"}`);

  // message
  $("#cake-message").html(message).css("color", colorMessage);

  // price
  $("#cake-price").html(`Rp ${isAddCream ? "110" : "100"}.000,00`);
}

// go to the previous section
$("#cake-finish-previous").click(function () {
  $("#cake-finish").removeClass("section-active");
  $("#add-message").addClass("section-active");
  displayCakeFinish();
});

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ----------------------------------------------------- add the cake to the cart
function displayFinishDialog(name, cream) {
  $(".overlay-dialog").css("visibility", "visible");
  $("#dialog-message").html(
    `✔️ Your item: <strong>${name} x1</strong> is added to the cart successfully<br><br>Price: <strong>Rp ${
      cream ? 110000 : 100000
    },00</strong>.`
  );
}

function addCakeToTheCart() {
  // the fields
  let price = isAddCream ? 110000 : 100000;
  let name = `${capitalize(flavors[currentFlavor])} ${
    isAddCream ? "Cream" : ""
  } Cake`;

  // the object
  let curCake = {
    type: "cake",
    name: name,
    message: `${
      message.length === 0
        ? "No message attached"
        : `message: ${message} (color: ${colorMessage})`
    }`,
    price: price,
    stock: 1,
  };

  // get the localStorage arrays
  let curLocalStorage =
    localStorage.getItem("CART") == undefined
      ? "[]"
      : localStorage.getItem("CART");
  curLocalStorage = JSON.parse(curLocalStorage);

  // add to the arrays
  curLocalStorage.push(JSON.stringify(curCake));

  // put it back to the localStorage
  localStorage.setItem("CART", JSON.stringify(curLocalStorage));

  // display dialog
  displayFinishDialog(name, isAddCream);
}

$("#cake-finish-cart").click(addCakeToTheCart);

$("#make-another-cake").click(function () {
  window.location.reload();
});

$("#go-to-checkout-page").click(function () {
  window.location.href = "checkout.html";
});
