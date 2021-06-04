let curLocalStorage = localStorage.getItem('CART');
let totalPrice = 0;

if (curLocalStorage == undefined) {
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
    curLocalStorage = JSON.parse(curLocalStorage);

    for (let i = 0; i < curLocalStorage.length; i++){
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
            <img src="../src/${cart.type === 'bread' ? `breads/bread${cart.id}.jpg` : 'banners/custom-cake-banner.jpg'}" alt="Cart ${i}" />
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

$('#clear-cart').click(function(){
    $('.overlay-dialog').css('visibility', 'visible');
    $('#dialog-message').html(`⚠️ Are you sure want to clear this cart?`);
})

$('#cancel-clear-cart').click(function(){
    $('.overlay-dialog').css('visibility', 'hidden');
});

$('#yes-clear-cart').click(function(){
    localStorage.clear();
    window.location.reload();
});

function decrementAmount(idx){
    let amount = Number($(`#amount-${idx}`).html());
    amount--;

    let curPrice = JSON.parse(JSON.parse(localStorage.getItem('CART'))[idx]).price;
    totalPrice -= curPrice;

    $(`#amount-${idx}`).html(amount);
    $(`#cart-stock-${idx}`).html(amount);
    $(`#subtotal-${idx}`).html(`<span class="bold">Subtotal:</span> Rp ${curPrice * amount},00`)
    $('#total').html(`<span>Total:</span> Rp ${totalPrice},00`);
}

function incrementAmount(idx){
    let amount = Number($(`#amount-${idx}`).html());
    amount++;
    
    let curPrice = JSON.parse(JSON.parse(localStorage.getItem('CART'))[idx]).price;
    totalPrice += curPrice;

    $(`#amount-${idx}`).html(amount);
    $(`#cart-stock-${idx}`).html(amount);
    $(`#subtotal-${idx}`).html(`<span class="bold">Subtotal:</span> Rp ${curPrice * amount},00`)
    $('#total').html(`<span>Total:</span> Rp ${totalPrice},00`);
}