$('#hamburger-menu').click(function () {
    $('#navbar-expanded').slideToggle('slow');
});

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

displayNews(0);