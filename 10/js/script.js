$(document).ready(function() {



    //Slider profects >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //Клик на право
    $('.projects__pag-btn img:nth-child(2)').click(function() {
        $('.projects__pics_active').next().attr('class', 'projects__pics projects__pics_active');
        $('.projects__pics_active').fadeTo(100, 0.1).fadeTo(100, 1);
        $('.projects__pics_active').prev().attr('class', 'projects__pics');
    });
    //Клик на лево
    $('.projects__pag-btn img:nth-child(1)').click(function() {
        $('.projects__pics_active').prev().attr('class', 'projects__pics projects__pics_active');
        $('.projects__pics_active').fadeTo(100, 0.1).fadeTo(100, 1);
        $('.projects__pics_active').next().attr('class', 'projects__pics');
    });


    //Slider catalog >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //Клик на право
    $('.catalog__switch span:nth-child(2)').click(function() {
        $(this).css({'color': '#005BC1'});
        $('.catalog__switch span:nth-child(1)').css({'color': '#343434'});
        $('.catalog__pics_active').next().attr('class', 'catalog__pics catalog__pics_active');
        $('.catalog__pics_active').fadeTo(100, 0.1).fadeTo(100, 1);
        $('.catalog__pics_active').prev().attr('class', 'catalog__pics');
    });
    //Клик на лево
    $('.catalog__switch span:nth-child(1)').click(function() {
        $(this).css({'color': '#005BC1'});
        $('.catalog__switch span:nth-child(2)').css({'color': '#343434'});
        $('.catalog__pics_active').prev().attr('class', 'catalog__pics catalog__pics_active');
        $('.catalog__pics_active').fadeTo(100, 0.1).fadeTo(100, 1);
        $('.catalog__pics_active').next().attr('class', 'catalog__pics');
    });



    //Slider rent >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //Клик на право
    $('.rent__pag-btn img:nth-child(2)').click(function() {
        $('.rent__info-card_active').next().attr('class', 'rent__info-card rent__info-card_active');
        $('.rent__info-card_active').fadeTo(100, 0.1).fadeTo(100, 1);
        $('.rent__info-card_active').prev().attr('class', 'rent__info-card');
    });
    //Клик на лево
    $('.rent__pag-btn img:nth-child(1)').click(function() {
        $('.rent__info-card_active').prev().attr('class', 'rent__info-card rent__info-card_active');
        $('.rent__info-card_active').fadeTo(100, 0.1).fadeTo(100, 1);
        $('.rent__info-card_active').next().attr('class', 'rent__info-card');
    });


});