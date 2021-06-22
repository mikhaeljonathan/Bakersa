// GET THE ITEMS IN THE LOCAL STORAGE
let curLocalStorage = localStorage.getItem('CART');
curLocalStorage = JSON.parse(curLocalStorage);

// INITIALIZE TOTAL PRICE
let totalPrice = 0;

// IF ITEMS ARE EMPTY
if (curLocalStorage == undefined || curLocalStorage.length === 0) {
    document.getElementsByTagName('main')[0].insertAdjacentHTML('afterbegin',
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
    $('#cart-container').css('display', 'none');
    $('#customer-info').css('display', 'none');
    $('#cart-customer-divider').css('display', 'none');

} else { // IF THERE ARE ITEMS IN LOCAL STORAGE
    
    for (let i = 0; i < curLocalStorage.length; i++) {
        let cart = JSON.parse(curLocalStorage[i]);
        let subTotal = cart.stock * cart.price;
        totalPrice += subTotal;

        document.getElementById('carts').insertAdjacentHTML('beforeend',
            `
        <div class="cart">
            <div class="cart-overlay">
                <p>Edit Amount</p>
                <div class="edit-amount">
                    <button class="amount-button" onclick="decrementAmount(${i})">-</button>
                    <p class="amount" id="amount-${i}">${cart.stock}</p>
                    <button class="amount-button" onclick="incrementAmount(${i})">+</button>
                </div>
            </div>
            <img src="../src/${cart.type === 'bread' ? `breads/bread${cart.id}/1.jpg` : 'banners/custom-cake-banner.jpg'}" alt="Cart ${i}" />
            <div class="cart-info">
                <h3>${cart.name}</h3>
                ${cart.type === 'bread' ? '' : `<p>${cart.message}</p>`}
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

    $('#total').html(`<span>Total:</span> Rp ${totalPrice},00`);
}

$('.overlay-dialog').click(function (e) {
    let classTarget = e.target.classList[0];
    if (classTarget === 'overlay-dialog') {
        $('.overlay-dialog').css('visibility', 'hidden');
        $('#yes-clear-cart').css('display', 'none');
        $('#yes-delete-item').css('display', 'none');
    }
});

$('#clear-cart').click(function () {
    $('.overlay-dialog').css('visibility', 'visible');
    $('#yes-clear-cart').css('display', 'inline-block');
    $('#dialog-message').html(`⚠️ Are you sure want to <strong>clear this cart</strong>?`);
})

$('#cancel').click(function () {
    $('.overlay-dialog').css('visibility', 'hidden');
    $('#yes-clear-cart').css('display', 'none');
    $('#yes-delete-item').css('display', 'none');
});

$('#yes-clear-cart').click(function () {
    localStorage.clear();
    window.location.reload();
});

function decrementAmount(idx) {
    let amount = Number($(`#amount-${idx}`).html());
    amount--;

    if (amount === 0) {
        showDeleteItemDialog(idx);
        return;
    }

    let curPrice = JSON.parse(JSON.parse(localStorage.getItem('CART'))[idx]).price;
    totalPrice -= curPrice;

    $(`#amount-${idx}`).html(amount);
    $(`#cart-stock-${idx}`).html(amount);
    $(`#subtotal-${idx}`).html(`<span class="bold">Subtotal:</span> Rp ${curPrice * amount},00`)
    $('#total').html(`<span>Total:</span> Rp ${totalPrice},00`);

    updateAmount(amount, idx);
}

function incrementAmount(idx) {
    let amount = Number($(`#amount-${idx}`).html());
    amount++;

    let curPrice = JSON.parse(JSON.parse(localStorage.getItem('CART'))[idx]).price;
    totalPrice += curPrice;

    $(`#amount-${idx}`).html(amount);
    $(`#cart-stock-${idx}`).html(amount);
    $(`#subtotal-${idx}`).html(`<span class="bold">Subtotal:</span> Rp ${curPrice * amount},00`)
    $('#total').html(`<span>Total:</span> Rp ${totalPrice},00`);

    updateAmount(amount, idx);
}

function updateAmount(amount, idx) {

    let bread = JSON.parse(curLocalStorage[idx]);
    bread.stock = amount;
    console.log(amount);
    curLocalStorage[idx] = JSON.stringify(bread);

    localStorage.setItem('CART', JSON.stringify(curLocalStorage));
}

let soonToBeDeletedItemIdx = -1;
function showDeleteItemDialog(idx) {
    $('.overlay-dialog').css('visibility', 'visible');
    $('#yes-delete-item').css('display', 'inline-block');
    $('#dialog-message').html(`⚠️ Are you sure want to delete item: <strong>${JSON.parse(curLocalStorage[idx]).name}</strong> from your cart?`);
    soonToBeDeletedItemIdx = idx;
}

$('#yes-delete-item').click(function () {
    curLocalStorage.splice(soonToBeDeletedItemIdx, 1);
    localStorage.setItem('CART', JSON.stringify(curLocalStorage));

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
let errorPhone = document.getElementById("errormsg-phone")
let errorAddress = document.getElementById("errormsg-address")
let errorCourier = document.getElementById("errormsg-courier")
let errorDelivery = document.getElementById("errormsg-delivery");

function checkName(name) {
    if (name == null || name == "") {
        return "⚠ Name must be filled out";
    }

    return "";
}

function checkEmail(email) {
    if (email == null || email == "") {
        return "⚠ Email must be filled out";
    }
    else if (!email.endsWith(".com") && !email.endsWith(".co.id")) {
        return "⚠ Email must ends with .com or .co.id"
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
        return "⚠ Phone must be filled out"
    }
    else if (!isAllNumber(phone)) {
        return "⚠ Please input only numbers 0 - 9"
    }
    else if (phone.length < 11 || phone.length > 13 ) {
        return "⚠ Phone length must beetwen 11 - 13"
    }

    return "";
}

function checkAddress(address) {
    if (address === null || address === "") {
        return "⚠ Address must be filled out"
    }
    else if (address.length > 10) {
        return "⚠ The max length of 10 characters is reached"
    }

    return "";
}

function checkCourier(courier) {
    if (courier === "-1") {
        return "⚠ Please choose one"
    }

    return "";
}

function checkDelivery(delivery) {
    if (delivery === "-1") {
        return "⚠ Please choose one"
    }

    return "";
}

formElement.addEventListener("submit", (e)=> {
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
        localStorage.clear();
        window.location.reload();
    }
});