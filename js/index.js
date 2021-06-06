$('#arrow-left').click(function () {
    displayNews(currentNews - 1);
});

$('#arrow-right').click(function () {
    displayNews(currentNews + 1);
});

let currentNews = 0;
let displayNews = function (n) {
    let slides = document.getElementsByClassName('news-image');
    let dots = document.getElementsByClassName('dot');

    n = (n < 0) ? slides.length - 1 : n % slides.length;
    currentNews = n;

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('image-active');
        slides[i].style.opacity = '0';
        dots[i].classList.remove('dot-active');
    }

    slides[n].classList.add('image-active');
    $('.image-active').animate({
        opacity: '1'
    }, 'slow');
    dots[n].classList.add('dot-active');
}

displayNews(currentNews);


for (let i = 0; i < breads.length; i++){
    if (!breads[i].isNew) continue;
    
    let curBread = breads[i];
    let id = curBread.id;
    document.getElementsByClassName('breads')[0].insertAdjacentHTML('afterbegin', 
    `<div class="bread" onclick="goDetail(${id})">
        <img src="src/icons/new-icon_rect.png" alt="New Icon" class="new-icon" />
        <img src="src/breads/bread${id}/1.jpg" alt="${curBread.name}" class="bread-image"/>
        <div class="bread-info">
            <h3>${curBread.name}</h3>
            <p>Rp ${curBread.price},00</p>
        </div>
        <div class="bread-seemore">
            <p class="seemore-text">See<br>more</p>
        </div>
    </div>`);
}

$('#bread-more').click(function(){
    window.location.href = `html/classic.html`;
});

function goDetail(idx){
    window.location.href = `html/detail.html?id=${idx}`;
}