// CHOOSE FLAVOR

let flavors = ['strawberry', 'vanilla', 'chocolate'];
let colors = ['#C54346', '#EAA52E', '#6D2821'];

$('#arrow-right-flavor').click(function () {
    displayCakeFlavor(currentFlavor + 1);
});

$('#arrow-left-flavor').click(function () {
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
    $(`#${curFLavorName}-cake-cream`).addClass('cake-active');
}

$('#arrow-left-cream').click(function(){
    isAddCream = false;

    $('#add-cream-title').html('No... :(');
    $('#arrow-right-cream').css('visibility', 'visible');
    $('#arrow-left-cream').css('visibility', 'hidden');
    $('#cream-price').css('visibility', 'hidden');

    $('#cake-cream').animate({
        opacity: '0'
    }, 'slow');

});

$('#arrow-right-cream').click(function(){
    isAddCream = true;

    $('#add-cream-title').html('Yes!');
    $('#arrow-right-cream').css('visibility', 'hidden');
    $('#arrow-left-cream').css('visibility', 'visible');
    $('#cream-price').css('visibility', 'visible');

    $('#cake-cream').animate({
        opacity: '1'
    }, 'slow');
});

$('#add-cream-next').click(function(){
    $('#add-cream').removeClass('section-active');
    $('#add-message').addClass('section-active');
});

$('#arrow-right-cream').css('visibility', 'hidden');



// ADD MESSAGE
