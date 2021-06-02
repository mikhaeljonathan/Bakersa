// CHOOSE FLAVOR

let flavors = ['strawberry', 'vanilla', 'chocolate'];
let colors = ['#C54346', '#EAA52E', '#6D2821'];

$('#arrow-right').click(function () {
    displayCakeFlavor(currentFlavor + 1);
});

$('#arrow-left').click(function () {
    displayCakeFlavor(currentFlavor - 1);
});

let currentFlavor = 1;
let displayCakeFlavor = function (n) {
    let cakes = document.getElementsByClassName('cake-flavor');

    n = (n < 0) ? cakes.length - 1 : n % cakes.length;
    currentFlavor = n;

    for (let i = 0; i < cakes.length; i++) {
        cakes[i].classList.remove('cake-active');
        cakes[i].style.opacity = '0';
    }

    cakes[n].classList.add('cake-active');
    $('.cake-active').animate({
        opacity: '1'
    }, 'slow');

    $('#cake-flavor-title').html(flavors[n]).css('color', colors[n]);

}

$('#choose-flavor-next').click(function () {
    $('#choose-flavor').removeClass('section-active');
    $('#add-cream').addClass('section-active');
    addCream();
});


$('#choose-flavor').addClass('section-active');
displayCakeFlavor(currentFlavor);

// ADD CREAM
let isAddCream = true;
function addCream() {
    let curFLavorName = flavors[currentFlavor];
    document.querySelector('#add-cream-image').insertAdjacentHTML('afterbegin', `<img src="../src/${curFLavorName}cake.png" alt="${curFLavorName} Cake" class="cake cake-active" id="${curFLavorName}-cake" style='position: absolute; z-index: -50;'>`);
}