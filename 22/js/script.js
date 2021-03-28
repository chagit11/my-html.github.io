
function _(slc) {
    let selector = document.querySelector(slc)
    return selector
}
function __(slc) {
    let selectors = document.querySelectorAll(slc)
    return selectors
}
// ---------------------------------------------------


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
        this.lenSlides = __(`${this.nameSlider}__slider .slide > *`).length-step
        this.widthSlide = _(`${this.nameSlider}__slider .slide > *`).getBoundingClientRect().width+margin
        this.idxSlide = 0
        this.dotsSlider = [
            __(`${this.nameSlider}__slider .dots img`)[0].getAttribute('src'),
            __(`${this.nameSlider}__slider .dots img`)[1].getAttribute('src'),
        ]
        //
        this.arrowsClick()
        this.createDots()
    }, // <<= varsObj()

    //
    // --- click arrows --- =>>
    arrowsClick() {
        __(`${this.nameSlider}__slider .arrows img`).forEach((item, i, arr) => {
            item.onclick = () => {
                if(item==this.arrowsIMG[1]) {
                    this.idxSlide++
                    if(this.idxSlide==this.lenSlides) this.idxSlide = 0
                }
                if(item==this.arrowsIMG[0]) {
                    if(this.idxSlide==0) this.idxSlide = this.lenSlides
                    this.idxSlide--
                }
                this.moveSlides()
                this.activeDots()
                // -- more functions
                this.opacityItem()
            }
        })
    }, // <<= arrowsClick

    // - moveSlides - =>>
    moveSlides() {
        _(`${this.nameSlider}__slider .slides`).style.cssText = `
            transition: 1s;
            transform: translateX(-${this.widthSlide*this.idxSlide}px);
        `
    }, // <<= moveSlides
    // - activeDots - =>
    activeDots() {
        __(`${this.nameSlider}__slider .dots img`).forEach((item, i, arr) => {
            item.setAttribute('src', this.dotsSlider[1])
        })
        __(`${this.nameSlider}__slider .dots img`)[this.idxSlide].setAttribute('src', this.dotsSlider[0])
    }, // <<= activeDots
    // - more functions for arrowsClick() -
    // - opacityItem - =>>
    opacityItem() {
        __(`${this.nameSlider}__slider .slide > *`).forEach((item, i, arr) => {
            item.style.cssText = `
                transition: 1s;
                opacity: 1;
            `
        })
        __(`${this.nameSlider}__slider .slide > *`)[this.idxSlide].style.cssText = `
            transition: 1s;
            opacity: 0.3;
        `
        __(`${this.nameSlider}__slider .slide > *`)[this.idxSlide+this.step].style.cssText = `
            transition: 1s;
            opacity: 0.3;
        `
    }, // <<= opacityItem

    // --- create dots
    createDots() {
        for(let i=0; i<(this.lenSlides-2); i++) {
            _(`${this.nameSlider}__slider .dots`).insertAdjacentHTML('beforeend', '<img src="'+this.dotsSlider[1]+'">')
        }
    },
}

//
let skills = Object.assign({}, sliderOBJ)
skills.varsObj(
    '.skills', // name slider
    5, // step items
    20 // margin slide
)
//
let reviews = Object.assign({}, sliderOBJ)
reviews.varsObj(
    '.reviews', // name slider
    3, // step
    20 // margin
)




