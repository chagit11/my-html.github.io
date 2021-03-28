$(document).ready(function() {
    
    // --->> Header-top login
    $('.header-top .login').click(function() {
        $('.header-top .login-popup').fadeIn(300);
    });
    $('.header-top .login-popup .dark-bg').click(function() {
        $('.header-top .login-popup').fadeOut(300);
    });
    //
    $('.header-top .login-popup input[type="button"]').click(function() {
        $('.header-top .popup').fadeOut();
        $('.header-top .success').fadeIn(100);
    });
    $('.header-top .login-popup .dark-bg, .header-top .success img').click(function() {
        $('.header-top .login-popup, .header-top .success').fadeOut(300);
        $('.header-top .popup').fadeIn();
    });
    


    // --->> Header-bottom Scroll img
    let ind1 = 0;
    setInterval(function() {
        $('.header-bottom .scroll .arrow img').attr('src', './img/svg/scroll/scroll-white-ico.svg')
        $('.header-bottom .scroll .arrow img').eq(ind1).attr('src', './img/svg/scroll/scroll-green-ico.svg')
        ind1++;
        if(ind1>2) ind1 = 0;
    }, 400);

    
    // --->> Main projects img
    function imgsSlide(thisSLC) {
        let img = $(thisSLC).children('img');
        let limg = $(img).length;
        let ind2 = 0;
        if(limg>2) ind2 = 2;
        if(limg!=1) {
            $(thisSLC).children('img').css({'display':'none'});
            $(thisSLC).children('img').eq(1).css({'display':'inline-block'});
        }
        startIntv = setInterval(function() {
            $(img).css({'display':'none'});
            $(img).eq(ind2).css({'display':'inline-block'});
            ind2++;
            if(ind2==limg) ind2 = 0;
        }, 1000);
    }
    function clearIntvFun() {
        clearInterval(startIntv);
    }
    $('.projects .items .item').hover(function() {
        imgsSlide(this);
    }, function() {
        clearIntvFun();
        $(this).children('img').css({'display':'none'});
        $(this).children('img').eq(0).css({'display':'inline-block'});
    });

    //----> Thank slider
    
    let lnSlide = $('.thank .slider .slide').length;
    for(let i=0; i<lnSlide-1; i++) {
        $('.thank .slider .btns-dot').append('<img src="./img/svg/thank-dot-ico.svg" alt=""/>');
    }
    let it = 0;
    $('.thank .slider .arrows img').click(function() {
        let arrImg = $(this).attr('src');
        if(arrImg == './img/svg/thank-arright-ico.svg') {
            it++;
            if(it===lnSlide) it = 0;
            $('.thank .slider .slide').css({'transform': 'translateX(-'+(it*800)+'px)'});
        }
        if(arrImg == './img/svg/thank-arleft-ico.svg') {
            if(it!=0) it--;
            $('.thank .slider .slide').css({'transform': 'translateX(-'+(it*800)+'px)'});
        }
        $('.thank .slider .btns-dot img').attr('src','./img/svg/thank-dot-ico.svg');
        $('.thank .slider .btns-dot img:nth-of-type('+(it+1)+')').attr('src','./img/svg/thank-actdot-ico.svg');
    });

    // -----> Thank doc popup
    let docThank = $('.thank .slider .slides .info img[src="./img/thank/doc.png"]');
    $(docThank).click(function() {
        $('.popup-doc').fadeIn(300);
    });
    $('.popup-doc .dark-bg').click(function() {
        $('.popup-doc').fadeOut(300);
    });




    
});