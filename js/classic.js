// loop over the breads on the database
for (let i = 0; i < breads.length; i++){
    let curBread = breads[i];
    document.getElementsByClassName('breads')[0].insertAdjacentHTML('beforeend', 
    `<div class="bread" onclick="goDetail(${i})">
        ${curBread.isNew ? '<img src="../src/icons/new-icon_rect.png" alt="New Icon" class="new-icon" />' : ''}
        <img src="../src/breads/bread${i}/1.jpg" alt="Bread ${i}" class="bread-image" />
        <div class="bread-info">
            <h3>${curBread.name}</h3>
            <p>${numberFormat.format(curBread.price)}</p>
        </div>
        <div class="bread-seemore">
            <p class="seemore-text">See<br>more</p>
        </div>
    </div>`);
}

// one of the breads is clicked
function goDetail(idx){
    window.location.href = `detail.html?id=${idx}`;
}