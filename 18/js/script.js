/* $(document).ready(function() {
    
    //--------------------------------------------------
    let sliderVars = {
        lenSlides: $('.slider .slides .slide').length,
        widthSlide: $('.slider .slides .slide').width(),
        idxSlide: 0,
        dotsSlider: [
            $('.slider .dots img').eq(0).attr('src'),
            $('.slider .dots img').eq(1).attr('src'),
        ],
    }
    //
    $('.slider .arrows img').click(function() {
        sliderVars.idxSlide++;
        if(sliderVars.idxSlide==sliderVars.lenSlides) sliderVars.idxSlide = 0;
        //
        $('.slider .slides').css({
            'transitionDuration': '1s',
            'transform': 'translateX(-'+(sliderVars.widthSlide*sliderVars.idxSlide)+'px)'
        });
        //
        let thisDot = $('.slider .dots img').eq(sliderVars.idxSlide).attr('src', sliderVars.dotsSlider[0]);
        $('.slider .dots img').not(thisDot).attr('src', sliderVars.dotsSlider[1]);
    });
    //
    for(let i=0; i<(sliderVars.lenSlides-2); i++) {
        $('.dots').append('<img src="'+sliderVars.dotsSlider[1]+'" alt="">');
    }
    //--------------------------------------------------//
    

    



}); */


//-----------------------------------------------
function _(slc) {
    let selector = document.querySelector(slc)
    return selector
}
function __(slc) {
    let selectors = document.querySelectorAll(slc)
    return selectors
}


let slcV = {
    lenSlides: __('.slider .slides .slide').length,
    widthSlide: _('.slider .slides .slide').getBoundingClientRect().width,
    idxSlide: 0,
    dotsSlider: [
        __('.slider .dots img')[0].getAttribute('src'),
        __('.slider .dots img')[1].getAttribute('src'),
    ],
}
//
_('.slider .arrows img').onclick = () => {
    slcV.idxSlide++
    if(slcV.idxSlide==slcV.lenSlides) slcV.idxSlide = 0
    //
    _('.slider .slides').style.cssText = `
    transition: 1s;
    transform: translateX(-${slcV.widthSlide*slcV.idxSlide}px);
    `
    //
    __('.slider .dots img').forEach((item, i, arr) => {
        item.setAttribute('src', slcV.dotsSlider[1])
    })
    __('.slider .dots img')[slcV.idxSlide].setAttribute('src', slcV.dotsSlider[0])
    //console.log(slcV.dotsSlider[1])
}
//
for(let i=0; i<(slcV.lenSlides-2); i++) {
    _('.slider .dots').insertAdjacentHTML('beforeend', '<img src="'+slcV.dotsSlider[1]+'">')
}
