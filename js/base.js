$('#hamburger-menu').click(function () {
    $('#navbar-expanded').slideToggle('slow');
});

$('.overlay-dialog').click(function(e){
    let classTarget = e.target.classList[0];
    if (classTarget === 'overlay-dialog') {
        $('.overlay-dialog').css('visibility', 'hidden');
    }
});