let urlStr = window.location.href;
let url = new URL(urlStr);
let id = Number(url.searchParams.get('id'));
let stock = 0;
let curBread = breads[id];

document.title = `Bakersa | ${curBread.name}`;

document.getElementById('main').insertAdjacentHTML('afterbegin',
    `
<div class="banner">
    <img src="../src/breads/bread${id}/1.jpg" alt="Bread ${id}" width="100%">
</div>`
);

document.getElementById('content').insertAdjacentHTML('afterbegin',
    `
<div class="information">
    <h2>${curBread.name}</h2>
    <h3>Rp ${curBread.price},00</h3>
    <div class="rating">
    </div>
    <p>${curBread.desc}</p>
</div>`
);

let rating = curBread.rating;
for (let i = 0; i < 5; i++) {
    document.getElementsByClassName('rating')[0].insertAdjacentHTML('beforeend',
        `<img src="../src/icons/star${i < rating ? '-fill' : '-outline'}.png" alt="Star">`);
}

function decrement() {
    if (stock > 0) stock--;
    $('#add-to-cart').css('background-color', `var(--${stock > 0 ? 'teal' : 'light-grey'})`).css('cursor', `${stock > 0 ? 'pointer' : 'not-allowed'}`);
    $('#stock').html(stock);
    $('#subtotal').html(`Rp ${curBread.price * stock},00`);
}

function increment() {
    stock++;
    $('#add-to-cart').css('background-color', `var(--${stock > 0 ? 'teal' : 'light-grey'})`).css('cursor', `${stock > 0 ? 'pointer' : 'not-allowed'}`);
    $('#stock').html(stock);
    $('#subtotal').html(`Rp ${curBread.price * stock},00`);
}

$('#add-to-cart').click(function(){
    if (stock === 0) return;

    let insertedBread = {
        type: 'bread',
        id: curBread.id,
        name: curBread.name,
        price: curBread.price,
        stock: stock
    };

    let curLocalStorage = localStorage.getItem('CART') == undefined ? '[]' : localStorage.getItem('CART');
    curLocalStorage = JSON.parse(curLocalStorage);

    let alreadyExist = false;
    for (let i = 0; i < curLocalStorage.length; i++){

        let bread = JSON.parse(curLocalStorage[i]);
        if (bread.id === id) {
            alreadyExist = true;
            bread.stock += stock;
            curLocalStorage[i] = JSON.stringify(bread);
        }

    }

    if (!alreadyExist){
        curLocalStorage.push(JSON.stringify(insertedBread));
    }

    localStorage.setItem('CART', JSON.stringify(curLocalStorage));

    $('.overlay-dialog').css('visibility', 'visible');
    $('#dialog-message').html(`✔️ Your item${stock > 1 ? 's' : ''}: <strong>${curBread.name} x${stock}</strong> ${stock > 1 ? 'are' : 'is'} added to the cart successfully<br><br>Subtotal: <strong>Rp ${curBread.price * stock},00</strong>.`);

    stock = 1;
    decrement();
});

$('#buy-another-bread').click(function(){
    window.location.href = 'classic.html';
});

$('#go-to-checkout-page').click(function(){
    window.location.href = 'checkout.html';
});