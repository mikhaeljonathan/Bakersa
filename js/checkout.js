let curLocalStorage = localStorage.getItem('CART');

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
    let totalPrice = 0;
    curLocalStorage = JSON.parse(curLocalStorage);

    for (let i = 0; i < curLocalStorage.length; i++){
        let cart = JSON.parse(curLocalStorage[i]);
        let subTotal = cart.stock * cart.price;
        totalPrice += subTotal;

        document.getElementById('carts').insertAdjacentHTML('beforeend',
        `
        <div class="cart">
            <img src="../src/${cart.type === 'bread' ? `breads/bread${cart.id}.jpg` : 'banners/custom-cake-banner.jpg'}" alt="Cart ${i}" />
            <div class="cart-info">
                <h3>${cart.name}</h3>
                ${cart.type === 'bread' ? '' : `<p>${cart.message}</p>`}
                <p><span class="bold">Subtotal:</span> Rp ${subTotal},00</p>
            </div>
            <div class="quantity">
                <div class="circle">
                    <p>${cart.stock}</p>
                </div>
            </div>
        </div>
        `
        );
    }

    $('#total').html(`<span>Total:</span> Rp ${totalPrice},00`);
}