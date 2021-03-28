/* $(document).ready(function() {
    
    
    
}); */


function _(slc) {
    let selector = document.querySelector(slc)
    return selector
}
function __(slc) {
    let selectors = document.querySelectorAll(slc)
    return selectors
}
// ---------------------------------------------------

// --- slider production
let productionOBJ = {
    arrowsIMG: [
        __('.production__arrows img')[0],
        __('.production__arrows img')[1],
    ],
    lenSlides: __('.production__slide').length,
    widthSlide: _('.production__slide').getBoundingClientRect().width,
    idxSlide: 0,
}
//
__('.production__arrows img').forEach((item, i, arr) => {
    item.onclick = () => {
        if(item==productionOBJ.arrowsIMG[1]) {
            productionOBJ.idxSlide++
            if(productionOBJ.idxSlide==productionOBJ.lenSlides) productionOBJ.idxSlide = 0
        }
        if(item==productionOBJ.arrowsIMG[0]) {
            if(productionOBJ.idxSlide==0) productionOBJ.idxSlide = productionOBJ.lenSlides
            productionOBJ.idxSlide--
        }
        //
        _('.production__slides').style.cssText = `
            transition: 1s;
            transform: translateX(-${productionOBJ.widthSlide*productionOBJ.idxSlide}px);
        `
        __('.production__tab').forEach((item, i, arr) => {
            item.classList.remove('production__tab_active')
        })
        __('.production__tab')[productionOBJ.idxSlide].classList.add('production__tab_active')
    }

})

// --- industry open close
let spanTEXT = _('.industry__openclose span').textContent
_('.industry__openclose img').onclick = () => {
    _('.industry__openclose span').textContent = 
        (_('.industry__openclose span').textContent == spanTEXT) 
        ? 'СКРЫТЬ ВСЕ РЕШЕНИЯ' 
        : spanTEXT
    _('.industry__items').classList.toggle('industry__items_opened')
    _('.industry__openclose img').classList.toggle('industry__openclose_img-opened')
}

// --- manufacture slider
let manufactureOBJ = {
    arrowsIMG: [
        __('.manufacture__arrows img')[0],
        __('.manufacture__arrows img')[1],
    ],
    lenSlides: __('.manufacture__slide').length,
    widthSlide: _('.manufacture__slide').getBoundingClientRect().width,
    idxSlide: 0,
    dotsSlider: [
        __('.manufacture__dots img')[0].getAttribute('src'),
        __('.manufacture__dots img')[1].getAttribute('src'),
    ],
}
//
__('.manufacture__arrows img').forEach((item, i, arr) => {
    item.onclick = () => {
        if(item==manufactureOBJ.arrowsIMG[1]) {
            manufactureOBJ.idxSlide++
            if(manufactureOBJ.idxSlide==manufactureOBJ.lenSlides) manufactureOBJ.idxSlide = 0
        }
        if(item==manufactureOBJ.arrowsIMG[0]) {
            if(manufactureOBJ.idxSlide==0) manufactureOBJ.idxSlide = manufactureOBJ.lenSlides
            manufactureOBJ.idxSlide--
        }
        //
        _('.manufacture__slides').style.cssText = `
            transition: 1s;
            transform: translateX(-${manufactureOBJ.widthSlide*manufactureOBJ.idxSlide}px);
        `
        //
        __('.manufacture__dots img').forEach((item, i, arr) => {
            item.setAttribute('src', manufactureOBJ.dotsSlider[1])
        })
        __('.manufacture__dots img')[manufactureOBJ.idxSlide].setAttribute('src', manufactureOBJ.dotsSlider[0])
    }
})
//
for(let i=0; i<(manufactureOBJ.lenSlides-2); i++) {
    _('.manufacture__dots').insertAdjacentHTML('beforeend', '<img src="'+manufactureOBJ.dotsSlider[1]+'">')
}