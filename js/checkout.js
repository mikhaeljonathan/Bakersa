let curLocalStorage = localStorage.getItem('CART');
curLocalStorage = JSON.parse(curLocalStorage);
let totalPrice = 0;

if (curLocalStorage == undefined || curLocalStorage.length === 0) {
    document.getElementById('carts').insertAdjacentHTML('afterbegin',
        `
    <div class="empty-cart">
        <div class="overlay">
            <p>Your cart is empty :(</p>
            <p>Go buy some some <a href="classic.html" style="display: inline-block;">breads</a> or <a href="custom.html" style="display: inline-block;">cakes</a>.</p>
        </div>
    </div>
    `
    );

    $('.title').css('display', 'none');
    $('#total').css('display', 'none');

} else {

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
        handleZeroAmount(idx);
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
function handleZeroAmount(idx) {
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