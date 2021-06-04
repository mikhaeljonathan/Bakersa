let breadId = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let breadNames = ['Roti 1', 'Roti 2', 'Roti 3', 'Roti 4', 'Roti 5', 'Roti 6', 'Roti 7', 'Roti 8', 'Roti 9', 'Roti 10'];
let breadPrices = [20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000];
let breadRating = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
let breadDesc = ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.'];

let urlStr = window.location.href;
let url = new URL(urlStr);
let id = Number(url.searchParams.get('id'));
let stock = 0;
document.title = `Bakersa | ${breadNames[id]}`;

document.getElementById('main').insertAdjacentHTML('afterbegin',
    `
<div class="banner">
    <img src="../src/breads/bread${id}.jpg" alt="Bread ${id}" width="100%">
</div>`
);

document.getElementById('content').insertAdjacentHTML('afterbegin',
    `
<div class="information">
    <h2>${breadNames[id]}</h2>
    <h3>Rp ${breadPrices[id]},00</h3>
    <div class="rating">
    </div>
    <p>${breadDesc[id]}</p>
</div>`
);

let rating = breadRating[id];
for (let i = 0; i < 5; i++) {
    document.getElementsByClassName('rating')[0].insertAdjacentHTML('beforeend',
        `<img src="../src/icons/star${i < rating ? '' : '-kopong'}.jpg" alt="Star">`);
}

function decrement() {
    if (stock > 0) stock--;
    $('#add-to-cart').css('background-color', `var(--${stock > 0 ? 'teal' : 'light-grey'})`).css('cursor', `${stock > 0 ? 'pointer' : 'not-allowed'}`);
    $('#stock').html(stock);
    $('#subtotal').html(`Rp ${breadPrices[id] * stock},00`);
}

function increment() {
    stock++;
    $('#add-to-cart').css('background-color', `var(--${stock > 0 ? 'teal' : 'light-grey'})`).css('cursor', `${stock > 0 ? 'pointer' : 'not-allowed'}`);
    $('#stock').html(stock);
    $('#subtotal').html(`Rp ${breadPrices[id] * stock},00`);
}

$('#add-to-cart').click(function(){
    if (stock === 0) return;

    let curBread = {
        type: 'bread',
        id: breadId[id],
        name: breadNames[id],
        price: breadPrices[id],
        stock: stock
    };

    let curLocalStorage = localStorage.getItem('CART') == undefined ? '[]' : localStorage.getItem('CART');
    curLocalStorage = JSON.parse(curLocalStorage);

    let alreadyExist = false;
    for (let i = 0; i < curLocalStorage.length; i++){

        let bread = JSON.parse(curLocalStorage[i]);
        if (bread.id != undefined && bread.id === id) {
            alreadyExist = true;
            bread.stock += stock;
        }
        curLocalStorage[i] = JSON.stringify(bread);

    }

    if (!alreadyExist){
        curLocalStorage.push(JSON.stringify(curBread));
    }

    localStorage.setItem('CART', JSON.stringify(curLocalStorage));

    $('.overlay-dialog').css('visibility', 'visible');
    $('#dialog-message').html(`✔️ Your item${stock > 1 ? 's' : ''}: <strong>${breadNames[id]} x${stock}</strong> ${stock > 1 ? 'are' : 'is'} added to the cart successfully<br><br>Subtotal: <strong>Rp ${breadPrices[id] * stock},00</strong>.`);

    stock = 1;
    decrement();
});

$('#buy-another-bread').click(function(){
    window.location.href = 'classic.html';
});

$('#go-to-checkout-page').click(function(){
    window.location.href = 'checkout.html';
});