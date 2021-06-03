function getIndex(n){
    return (n < 0) ? flavors.length - 1 : n % flavors.length;
}

// CHOOSE FLAVOR

let flavors = ['strawberry', 'vanilla', 'chocolate'];
let colors = ['#C54346', '#EAA52E', '#6D2821'];

$('#arrow-right-flavor').click(function () {
    currentFlavor = displayCakeFlavor(currentFlavor + 1);
});

$('#arrow-left-flavor').click(function () {
    currentFlavor = displayCakeFlavor(currentFlavor - 1);
});

let currentFlavor = 1;
let displayCakeFlavor = function (n) {
    let cakes = document.getElementsByClassName('cake-flavor');

    n = getIndex(n);

    for (let i = 0; i < cakes.length; i++) {
        cakes[i].classList.remove('cake-active');
        cakes[i].style.opacity = '0';
    }

    cakes[n].classList.add('cake-active');
    $('.cake-active').animate({
        opacity: '1'
    }, 'slow');

    $('#cake-flavor-title').html(flavors[n]).css('color', colors[n]);

    let left = flavors[getIndex(n - 1)];
    let right = flavors[getIndex(n + 1)];
    document.getElementById('left-flavor').setAttribute('src', `../src/${left}cake.png`);
    document.getElementById('right-flavor').setAttribute('src', `../src/${right}cake.png`);

    return n;
}

$('#choose-flavor-next').click(function () {
    $('#choose-flavor').removeClass('section-active');
    $('#add-cream').addClass('section-active');
    displayCakeCream();
});


$('#choose-flavor').addClass('section-active');
displayCakeFlavor(currentFlavor);




// ADD CREAM
function displayCakeCream() {
    isAddCream = true;
    let curFLavorName = flavors[currentFlavor];

    let cakeCream = document.getElementsByClassName('cake-cream');
    for (let i = 0; i < cakeCream.length; i++){
        cakeCream[i].classList.remove('cake-active');
    }

    $(`#${curFLavorName}-cake-cream`).addClass('cake-active');
}

$('#arrow-left-cream').click(function () {
    isAddCream = false;

    $('#add-cream-title').html('No... :(');
    $('#arrow-right-cream').css('visibility', 'visible');
    $('#arrow-left-cream').css('visibility', 'hidden');
    $('#cream-price').css('visibility', 'hidden');

    $('#cake-cream').animate({
        opacity: '0'
    }, 'slow');

});

$('#arrow-right-cream').click(function () {
    isAddCream = true;

    $('#add-cream-title').html('Yes!');
    $('#arrow-right-cream').css('visibility', 'hidden');
    $('#arrow-left-cream').css('visibility', 'visible');
    $('#cream-price').css('visibility', 'visible');

    $('#cake-cream').animate({
        opacity: '1'
    }, 'slow');
});

$('#add-cream-before').click(function(){
    $('#add-cream').removeClass('section-active');
    $('#choose-flavor').addClass('section-active');
    displayCakeFlavor(currentFlavor);
})

$('#add-cream-next').click(function () {
    $('#add-cream').removeClass('section-active');
    $('#add-message').addClass('section-active');
    displayCakeMessage();
});

let isAddCream = true;
$('#arrow-right-cream').css('visibility', 'hidden');


// ADD MESSAGE
function displayCakeMessage() {
    let curFLavorName = flavors[currentFlavor];

    let cakeMessage = document.getElementsByClassName('cake-message');
    for (let i = 0; i < cakeMessage.length; i++){
        cakeMessage[i].classList.remove('cake-active');
    }

    $(`#${curFLavorName}-cake-message`).addClass('cake-active');

    $('#cake-cream-message').css('opacity', `${isAddCream ? '1' : '0'}`);

}

$('#add-message-previous').click(function(){
    $('#add-message').removeClass('section-active');
    $('#add-cream').addClass('section-active');
    displayCakeCream();
})

$('#add-message-finish').click(function () {
    message = document.getElementById('cake-input-message').value;
    colorMessage = document.getElementById('cake-input-message-color').value;

    $('#add-message').removeClass('section-active');
    $('#cake-finish').addClass('section-active');
    displayCakeFinish();
});

let message = '';
let colorMessage = '';


// FINISH

function displayCakeFinish() {
    let curFLavorName = flavors[currentFlavor];

    let cakeFinish = document.getElementsByClassName('cake-finish');
    for (let i = 0; i < cakeFinish.length; i++){
        cakeFinish[i].classList.remove('cake-active');
    }

    $(`#${curFLavorName}-cake-finish`).addClass('cake-active');
    $('#cake-cream-finish').css('opacity', `${isAddCream ? '1' : '0'}`);

    $('#cake-message').html(message).css('color', colorMessage);

    $('#cake-price').html(`Rp ${isAddCream ? '110' : '100'}.000,00`);
}

$('#cake-finish-previous').click(function(){
    $('#cake-finish').removeClass('section-active');
    $('#add-message').addClass('section-active');
    displayCakeFinish();
});