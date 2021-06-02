let flavors = ['strawberry', 'vanilla', 'chocolate'];
let colors = ['#C54346', '#EAA52E', '#6D2821'];

$('#arrow-right').click(function(){
    displayCakeFlavor(currentFlavor + 1);
});

let currentFlavor = 1;
let displayCakeFlavor = function (n) {
    let cakes = document.getElementsByClassName('cake');

    n = (n < 0) ? cakes.length - 1 : n % cakes.length;
    currentFlavor = n;

    console.log(currentFlavor);
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

displayCakeFlavor(currentFlavor);