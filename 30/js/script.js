// Menu burger -------------------------
class MenuBurger {
    constructor(name) {
        this.burger = document.querySelector(`.${name}-menu__burger`)
        this.burgerClose = `${name}-menu__burger--close`
        this.menuList = document.querySelector(`.${name}-menu__list`)
        this.menuListMob = `${name}-menu__list--mob`
        this.clickBurger()
    }
    clickBurger() {
        this.burger.onclick = () => {
            this.burger.classList.toggle(this.burgerClose)
            this.menuList.classList.toggle(this.menuListMob)
        }
    }
}
// 
new MenuBurger('header')



// Слайдера ------------------------
class Slider {
    // 
    constructor(name) {
        this.name = name
        this.iter = 0
        this.arrows = document.querySelectorAll(`${name}-slider__arrows > div`)
        this.arrPrev = document.querySelector(`${name}-slider__arrprev`)
        this.arrNext = document.querySelector(`${name}-slider__arrnext`)
        this.slides = document.querySelector(`${name}-slider__slides`)
        this.slide = document.querySelector(`${name}-slider__slide`)
        this.slideList = document.querySelectorAll(`${name}-slider__slide`)
        this.item = document.querySelector(`${name}-slider__item`)
        this.itemList = document.querySelectorAll(`${name}-slider__item`)
        this.dots = document.querySelector(`${name}-slider__dots`)
        this.dot = document.querySelector(`${name}-slider__dots-dot`)
        this.dotList = document.querySelectorAll(`${name}-slider__dots-dot`)
        this.dotActive = `${this.name.slice(1)}-slider__dots-dot--active`
        // 
        this.slideWidth = this.slide.getBoundingClientRect().width
        this.slideLen = this.slideList.length
        
        let columnGap = window.getComputedStyle(this.slides)['grid-column-gap']
        if(columnGap=='normal') columnGap = '0'
        this.columnGap = ( Math.round( columnGap.slice(0, columnGap.indexOf('px')) ) ) 
        this.slideWidth = this.slideWidth + this.columnGap
        // 
        this.clickArrows()
        // this.autoMoveSlides()
        this.mouseArrows()
        this.dotsSlider()
        
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
            this.dotsActiveSlider('+')
            setTimeout(() => {
                this.slides.append(document.querySelectorAll(`${this.name}-slider__slide`)[0])
                this.slides.style.cssText = `
                    transform: translateX(0px);
                `
                stop = 'no'
            }, 1000)
        }
        if(arrow=='prev') {
            if(stop=='yes') return 'stop'
            this.slides.prepend(document.querySelectorAll(`${this.name}-slider__slide`)[this.slideLen-1])
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
            this.dotsActiveSlider('-')
            setTimeout(() => {
                stop = 'no'
            }, 1000)
        }
    }
    // 
    autoMoveSlides() {
        this.setintrvl_automoveslides = setInterval(() => {
            this.slides.style.cssText = `
                transition: 1s;
                transform: translateX(-${this.slideWidth}px);
            `
            setTimeout(() => {
                this.slides.append(document.querySelectorAll(`${this.name}-slider__slide`)[0])
                this.slides.style.cssText = `
                    transform: translateX(0px);
                `
            }, 1000)
            this.dotsActiveSlider('+')
        }, 3000)
    }
    // 
    mouseArrows() {
        this.arrows.forEach(el => {
            el.onmouseover = () => {
                clearInterval(this.setintrvl_automoveslides)
            }
            el.onmouseout = () => {
                this.autoMoveSlides()
            }
        })
    }
    // 
    dotsSlider() {
        for(let i=this.slideLen-1; i>0; i--) {
            this.dots.append(this.dot.cloneNode())
        }
        this.dot.classList.add(this.dotActive)
    }
    // 
    dotsActiveSlider(direction) {
        if(direction == '+') this.iter++
        if(direction == '-') this.iter--
        if(this.iter==this.slideLen) this.iter = 0
        if(this.iter<0) this.iter = this.slideLen-1
        let dotList = document.querySelectorAll(`${this.name}-slider__dots-dot`)
        dotList.forEach(el => {
            el.classList.remove(this.dotActive)
        })
        dotList[this.iter].classList.add(this.dotActive)
    }
}

const headerSlider = new Slider('.header')
headerSlider.autoMoveSlides()
// -
new Slider('.resources')
// -
const testimonialsSlider = new Slider('.testimonials')
testimonialsSlider.autoMoveSlides()


// Accordion ------------
class Accordion {
    constructor(name) {
        this.quests = document.querySelectorAll(`.${name}__item-quest`)
        this.items = document.querySelectorAll(`.${name}__item`)
        this.itemOpen = `${name}__item--open`
        this.clickAccordion()
    }
    clickAccordion() {
        this.quests.forEach(qu => {
            qu.onclick = () => {
                this.items.forEach(itm => {
                    itm.classList.remove(this.itemOpen)
                })
                qu.parentElement.classList.add(this.itemOpen)
            }
        })
    }
}
new Accordion('questions')