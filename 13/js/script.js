$(document).ready(function() {
    
    /////////////////////////////////////////////
    // Menu
    $('.menu').click(function() {
        let display = $('.menu-block').css('display');
        if(display === 'none') $('.menu-block').css({'display':'grid'});
        else if(display === 'grid') $('.menu-block').css({'display':'none'});
    });
    //
    $('.menu-block').hover(function() {

    }, function() {
        $('.menu-block').css({'display':'none'});
    });
    // Menu nav-main li
    $('.nav-main li').mouseover(function() {
        $(this).children('span').children('img').attr('src','./img/svg/nav-menu-arleft-ico.svg');
        $('.nav-main li').not(this).children('span').children('img').attr('src','./img/svg/nav-menu-arright-ico.svg');
        $(this).children('span').css({'border':'1px solid #000000'});
        $('.nav-main li').not(this).children('span').css({'border':'none'});
        
        let ind = $(this).index();
        $('.nav-sub .sub-li').not(this).css({'display':'none'});
        $('.nav-sub .sub-li').eq(ind).css({'display':'block'});
    });
    // Menu ul.items li
    $('ul.items li').click(function() {

        let imgSrc = $(this).children('span').children('img').attr('src');
        if(imgSrc === './img/svg/nav-sub-arright-ico.svg') {
            $(this).css({'color':'#000000'});
            $(this).children('span').children('img').attr('src','./img/svg/nav-sub-arbottom-ico.svg');
        } 
        else if(imgSrc === './img/svg/nav-sub-arbottom-ico.svg') {
            $(this).css({'color':'#9B9B9B'});
            $(this).children('span').children('img').attr('src','./img/svg/nav-sub-arright-ico.svg');
        } 
        $('ul.items li').not(this).children('span').children('img').attr('src','./img/svg/nav-sub-arright-ico.svg');
            //
        let display = $(this).children('ul.sub-items').css('display');
        if(display === 'none') $(this).children('ul.sub-items').css({'display':'block'});
        else if(display === 'block') $(this).children('ul.sub-items').css({'display':'none'});
    });
    /////////////////////////////////////////////
    // 'Popup' demo-window
    $('.header-main .text .btn').click(function() {
        $('.demo-window, .demo-block').fadeIn(100);
        //$('.demo-window, .demo-block').css({'display':'block'});
    });
    $('.demo-window').click(function() {
        $('.demo-window, .demo-block').fadeOut(100);
        //$('.demo-window, .demo-block').css({'display':'none'});
    });


    /////////////////////////////////////////////
    // Header bg click slide slider
    $('.header-bottom .slide').click(function() {
        
        slideHide(this);
        bgHeaderMain(this);
        titleHeaderMain(this);

    });
    function slideHide(slide) {
        setTimeout(function() {
            $(slide).css({'display': 'none'});
        }, 300);
        $('.header-bottom .slide').not(slide).css({'display': 'block'});
    }
    function bgHeaderMain(slide) {
        var imgThumb = $(slide).children('img').attr('src');
        var imgBg = imgThumb.replace('-thumb.png', '.png');
        $('.header-main').css({'background':'url(.'+imgBg+') no-repeat center'});        
    }
    function titleHeaderMain(slide) {
        var textH4 = $(slide).children('h4').text();
        $('.header-main h1.title').text(textH4);
    }
    //  Header bg click toleft-toright slider
    $('.header-bottom .toleft, .header-bottom .toright').click(function() {
        var btn = $(this).attr('class');
        var bgNum = +$('.header-main').css('backgroundImage').slice(-7, -6);
        if(btn == 'toright') {
            bgNum++;
            if(bgNum == 6) bgNum = 1;
        }
        if(btn == 'toleft') {
            bgNum--;
            if(bgNum == 0) bgNum = 5;
        }
        var thisSlide = $('.header-bottom .slide').eq(bgNum-1).css({'display': 'none'});
        $('.header-bottom .slide').not(thisSlide).css({'display': 'block'});
        $('.header-main').css({'background':'url(../img/header-bg/header-bg-0'+bgNum+'.png) no-repeat center'});  
    });
    /////////////////////////////////////////////////
    // Advantage hover ul
    $('.advantage .cards .card').hover(function() {
        $(this).children('ul').fadeIn(100);
        $(this).children('ul').css({'display':'flex'});
    },function(){
        //$(this).children('ul').fadeOut(100);
        $(this).children('ul').css({'display':'none'});
    });
    //////////////////////////////////////////////////
    //Reviews slider
    var wslidesR = $('.reviews .wrap-slides').width();
    var lslidesR = $('.reviews .wrap-slides').length;
    for(var i=1; i<lslidesR; i++) {
        $('.reviews .btns-dots').append('<div class="dot"></div>');
    }
    var fnumR = 0;
    $('.reviews .toright, .reviews .toleft').click(function() {
        var btn = $(this).attr('class');
        if(btn == 'toright') {
            if(fnumR!=lslidesR-1) fnumR++;
            else fnumR = 0;
        } 
        if(btn == 'toleft') {
            if(fnumR!=0) fnumR--;
            else fnumR = 0;
        } 
        $('.reviews .btns-dots div').attr('class','dot');
        $('.reviews .btns-dots div:nth-of-type('+(fnumR+1)+')').attr('class','dot-red');
        $('.reviews .wrap-slides').css({'transform': 'translateX(-'+(wslidesR*fnumR)+'px)'});
    });
    ////////
    // Clients slider
    var wslidesC = $('.clients .wrap-slides').width();
    var lslidesC = $('.clients .wrap-slides').length;
    // dots
    for(var i=1; i<lslidesC; i++) { 
        $('.clients .btns-dots').append('<div class="dot"></div>');
    }
    // click arrows
    var fnumC = 0;
    $('.clients .toright, .clients .toleft').click(function() {
        var btn = $(this).attr('class');
        if(btn == 'toright') {
            if(fnumC!=lslidesC-1) fnumC++;
            else fnumC = 0;
        } 
        if(btn == 'toleft') {
            if(fnumC!=0) fnumC--;
            else fnumC = 0;
        } 
        $('.clients .btns-dots div').attr('class','dot');
        $('.clients .btns-dots div:nth-of-type('+(fnumC+1)+')').attr('class','dot-red');
        $('.clients .wrap-slides').css({'transform': 'translateX(-'+(wslidesC*fnumC)+'px)'});
        
    });
    




    
});