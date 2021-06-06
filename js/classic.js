for (let i = 0; i < breads.length; i++){
    document.getElementsByClassName('breads')[0].insertAdjacentHTML('beforeend', 
    `<div class="bread" onclick="goDetail(${i})">
        <img src="../src/breads/bread${i}/1.jpg" alt="Bread ${i}" />
        <div class="bread-info">
            <h3>${breads[i].name}</h3>
            <p>Rp ${breads[i].price},00</p>
        </div>
        <div class="bread-seemore">
            <p class="seemore-text">See<br>more</p>
        </div>
    </div>`);
}

function goDetail(idx){
    window.location.href = `detail.html?id=${idx}`;
}