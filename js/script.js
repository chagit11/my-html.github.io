function _(slc) {
    let selector = document.querySelector(slc)
    return selector
}
function __(slc) {
    let selectors = document.querySelectorAll(slc)
    return selectors
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// 
_('.header-top__link-lsub').hidden = true
__('.header-top__link')[2].onmouseover = function() {
    if(_('.header-top__link-lsub').hidden == true) {
        _('.header-top__link-lsub').hidden = false
    }
    else {
        _('.header-top__link-lsub').hidden = true
    }
}


// 
_('.header-top__link-rsub').style.display = 'none'
_('.header-top__geoloc > span').onclick = function() {
    if(_('.header-top__link-rsub').style.display == 'none') {
        _('.header-top__link-rsub').style.display = 'grid'
    }
    else {
        _('.header-top__link-rsub').style.display = 'none'
    }
}
_('.header-top__geoloc > img').onclick = function() {
    if(_('.header-top__link-rsub').style.display == 'none') {
        _('.header-top__link-rsub').style.display = 'grid'
    }
    else {
        _('.header-top__link-rsub').style.display = 'none'
    }
}


// 
let header_plus = document.querySelector('.header-top__left > .header-top__link:first-child')
header_plus.onclick = function() {
    if(_('.header-top__left').style.height == 'auto') {
        _('.header-top__left').style.height = '25px'
        _('.header-top__left').style.overflow = 'hidden'
        this.textContent = '+'
    }
    else {
        _('.header-top__left').style.height = 'auto'
        _('.header-top__left').style.overflow = 'visible'
        this.textContent = '-'
    }
    
}



// 
let header_burger = document.querySelector('.header-bottom__burger')
header_burger.onclick = function() {
    if(_('.header-bottom__catalog').style.height == 'auto') {
        _('.header-bottom__catalog').style.height = '30px'
        _('.header-bottom__catalog').style.overflow = 'hidden'
        // this.textContent = '+'
    }
    else {
        _('.header-bottom__catalog').style.height = 'auto'
        _('.header-bottom__catalog').style.overflow = 'visible'
        // this.textContent = '-'
    }
    
}

// 
_('.header-bottom__subcat').style.display = 'none'
_('.header-bottom__catalog li:nth-child(2) a').onclick = function() {
    if(_('.header-bottom__subcat').style.display == 'none') {
        _('.header-bottom__subcat').style.display = 'grid'
    }
    else {
        _('.header-bottom__subcat').style.display = 'none'
    }
}

let faqRow = document.querySelectorAll('.faq__row')
faqRow.forEach(item =>  {
    item.onclick = () => {
        faqRow.forEach(item2 => {
            item2.classList.remove('faq__row_open')
        })
        item.classList.add('faq__row_open')
    }
})



// Слайдера ----------------------------------------------
class Slider {
    // 
    constructor(name) {
        this.name = name
        this.arrows = document.querySelectorAll(`${name}__slider-arrows > div`)
        this.arrPrev = document.querySelector(`${name}__slider-arrprev`)
        this.arrNext = document.querySelector(`${name}__slider-arrnext`)
        this.slides = document.querySelector(`${name}__slider-slides`)
        this.slide = document.querySelector(`${name}__slider-slide`)
        this.slideList = document.querySelectorAll(`${name}__slider-slide`)
        this.item = document.querySelector(`${name}__slider-item`)
        this.itemList = document.querySelectorAll(`${name}__slider-item`)
        // 
        this.slideWidth = this.slide.getBoundingClientRect().width
        this.slideLen = this.slideList.length
        
        let columnGap = window.getComputedStyle(this.slides)["grid-column-gap"]
        if(columnGap=='normal') columnGap = '0'
        this.columnGap = ( Math.round( columnGap.slice(0, columnGap.indexOf('px')) ) ) 
        this.slideWidth = this.slideWidth + this.columnGap
        // 
        this.clickArrows()
        this.autoMoveSlides()
        this.mouseArrows()
        
    }
    // 
    clickArrows() {
        let stop = 'no'
        this.arrows.forEach(el => {
            el.onclick = () => {
                if(el==this.arrNext) this.moveSlides('next')
                if(el==this.arrPrev) this.moveSlides('prev')
            }
        })
    }
    // 
    moveSlides(arrow) {
        if(arrow=='next') {
            if(stop=='yes') return 'stop'
            this.slides.style.cssText = `
                transition: 1s;
                transform: translateX(-${this.slideWidth}px);
            `
            stop = 'yes'
                setTimeout(() => {
                    this.slides.append(document.querySelectorAll(`${this.name}__slider-slide`)[0])
                    this.slides.style.cssText = `
                        transform: translateX(0px);
                    `
                    stop = 'no'
                }, 1000)
        }
        if(arrow=='prev') {
            if(stop=='yes') return 'stop'
            this.slides.prepend(document.querySelectorAll(`${this.name}__slider-slide`)[this.slideLen-1])
            this.slides.style.cssText = `
                transform: translateX(-${this.slideWidth}px);
            `
            stop = 'yes'
            setTimeout(() => {
                this.slides.style.cssText = `
                    transition: 1s;
                    transform: translateX(0px);
                `
            }, 0)
            setTimeout(() => {
                stop = 'no'
            }, 1000)
        }
    }
    // 
    autoMoveSlides() {
        // this.iter = 1
        this.clrIntrvl = setInterval(() => {
            this.slides.style.cssText = `
                transition: 1s;
                transform: translateX(-${this.slideWidth}px);
            `
            setTimeout(() => {
                this.slides.append(document.querySelectorAll(`${this.name}__slider-slide`)[0])
                this.slides.style.cssText = `
                    transform: translateX(0px);
                `
            }, 1000)
        }, 3000)
    }
    // 
    mouseArrows() {
        this.arrows.forEach(el => {
            el.onmouseover = () => {
                clearInterval(this.clrIntrvl)
            }
            el.onmouseout = () => {
                this.autoMoveSlides()
            }
        })
    }

}

new Slider('.banner')
new Slider('.popular-products')






