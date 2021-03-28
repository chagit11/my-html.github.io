function _(slc) {
    let selector = document.querySelector(slc)
    return selector
}
function __(slc) {
    let selectors = document.querySelectorAll(slc)
    return selectors
}

// --- slider
let sliderOBJ = {
    // --- vars --- =>>
    varsObj(nameSlider, step=0, margin=0 ) {
        this.nameSlider = nameSlider
        this.step = step
        this.arrowsIMG = [
            __(`${this.nameSlider}__slider .arrows img`)[0],
            __(`${this.nameSlider}__slider .arrows img`)[1],
        ]
        this.lenSlides = __(`${this.nameSlider}__slider .slide`).length-step
        this.widthSlide = _(`${this.nameSlider}__slider .slide`).getBoundingClientRect().width+margin
        this.idxSlide = 0
        this.dotsSlider = [
            __(`${this.nameSlider}__slider .dots img`)[0].getAttribute('src'),
            __(`${this.nameSlider}__slider .dots img`)[1].getAttribute('src'),
        ]
        //
        this.autoMove()
        this.createDots()
    }, // <<= varsObj()
    //
    // --- autoMove --- =>>
    autoMove() {
        let setTM = setTimeout(ff = () => {
            let sld = __(`${this.nameSlider}__slider .slide`)[0]
            _(`${this.nameSlider}__slider .slides`).style.cssText = `
                transition: 1s;
                transform: translateX(-${header.widthSlide}px);
            `
            this.activeDots()
            setTimeout(apnd = () => {
                _(`${this.nameSlider}__slider .slides`).appendChild(sld)
                _(`${this.nameSlider}__slider .slides`).style.cssText = `
                    transform: translateX(0px);
                `
            }, 1000)
        
            setTM = setTimeout(ff, 3000)
        }, 3000)
    }, // <<= autoMove
    // - activeDots - =>
    activeDots() {
        _(`${this.nameSlider}__slider .dots`).prepend(_(`${this.nameSlider}__slider .dots img:last-child`))
    }, // <<= activeDots
    // - ............. -

    // --- create dots
    createDots() {
        for(let i=0; i<(this.lenSlides-2); i++) {
            _(`${this.nameSlider}__slider .dots`).insertAdjacentHTML('beforeend', '<img src="'+this.dotsSlider[1]+'">')

        }
    },
}

//
/* let clone = Object.assign({}, sliderOBJ)
clone.varsObj(
    '.clone', // name slider
    5, // step items
    20 // margin slide
) */
let header = Object.assign({}, sliderOBJ)
header.varsObj(
    '.header', // name slider
    0, // step items
    0 // margin slide
)




//---------------------- open close menu-mb ----------------------------
__('.phone-burger img')[1].onclick = () => {
    _('.menu-mb').style.display = 'grid'
}
_('.menu-mb .close').onclick = () => {
    _('.menu-mb').style.display = 'none'
}

//----------------------- open close menu-mb lists ---------------------
__('.menu-mb .block-two .li').forEach((el, i, arr) => {
    el.onclick = () => {
        el.style.height == 'auto'
        ? el.style.height = '25px'
        : el.style.height = 'auto'
    }
});