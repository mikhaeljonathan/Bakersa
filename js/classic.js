let breadTitles = ['Roti 1', 'Roti 2', 'Roti 3', 'Roti 4', 'Roti 5', 'Roti 6', 'Roti 7', 'Roti 8' , 'Roti 9', 'Roti 10'];
let breadPrices = ['20.000', '20.000', '20.000', '20.000', '20.000', '20.000', '20.000', '20.000', '20.000', '20.000'];

for (let i = 0; i < breadTitles.length; i++){
    document.getElementsByClassName('breads')[0].insertAdjacentHTML('beforeend', 
    `<div class="bread" onclick="goDetail(${i})">
        <img src="../src/breads/bread${i + 1}.jpg" alt="Bread ${i + 1}" />
        <div class="bread-info">
            <h3>${breadTitles[i]}</h3>
            <p>Rp ${breadPrices[i]},00</p>
        </div>
        <div class="bread-seemore">
            <p class="seemore-text">See<br>more</p>
        </div>
    </div>`);
}

function goDetail(idx){
    window.location.href = `detail.html?id=${idx}`;
}