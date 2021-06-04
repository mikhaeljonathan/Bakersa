let breadTitles = ['Roti 1', 'Roti 2', 'Roti 3', 'Roti 4', 'Roti 5', 'Roti 6', 'Roti 7', 'Roti 8', 'Roti 9', 'Roti 10'];
let breadPrices = ['20.000', '20.000', '20.000', '20.000', '20.000', '20.000', '20.000', '20.000', '20.000', '20.000'];
let breadRating = ['3', '3', '3', '3', '3', '3', '3', '3', '3', '3'];
let breadDesc = ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores quam eius enim, fuga debitis quisquam exercitationem deleniti ipsum odit quas eos! At ipsam similique voluptas sed id quae nemo consectetur.'];

let urlStr = window.location.href;
let url = new URL(urlStr);
let id = Number(url.searchParams.get('id'));

document.getElementById('main').insertAdjacentHTML('afterbegin',
`
<div class="banner">
    <img src="../src/breads/bread${id + 1}.jpg" alt="Bread ${id + 1}" width="100%">
</div>`
);

document.getElementById('content').insertAdjacentHTML('afterbegin',
`
<div class="information">
    <h2>${breadTitles[id]}</h2>
    <h3>Rp ${breadPrices[id]},00</h3>
    <div class="rating">
    </div>
    <p>${breadDesc[id]}</p>
</div>`
);

let rating = Number(breadRating[id]);
for (let i = 0; i < 5; i++){
    document.getElementsByClassName('rating')[0].insertAdjacentHTML('beforeend', 
    `<img src="../src/icons/star${i < rating ? '' : '-kopong'}.jpg" alt="Star">`);
}

let stock = 0;

function decrement(){
    if (stock > 0) stock--;
    $('#stock').html(stock);
}

function increment(){
    stock++;
    $('#stock').html(stock);
}