// Слайдера -----------------------------------
class Slider {
    // 
    constructor(name) {
        this.name = name
        this.arrows = document.querySelectorAll(`${name}-slider__arrows > div`)
        this.arrPrev = document.querySelector(`${name}-slider__arrprev`)
        this.arrNext = document.querySelector(`${name}-slider__arrnext`)
        this.slides = document.querySelector(`${name}-slider__slides`)
        this.slide = document.querySelector(`${name}-slider__slide`)
        this.slideList = document.querySelectorAll(`${name}-slider__slide`)
        this.item = document.querySelector(`${name}-slider__item`)
        this.itemList = document.querySelectorAll(`${name}-slider__item`)
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
        // this.mouseArrows()
        
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
                this.slides.append(document.querySelectorAll(`${this.name}-slider__slide`)[0])
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
new Slider('.favorite')
new Slider('.coffeecombo')


// Tabs --------------------------------
class NavTabs {
    constructor(name) {
        this.name = name
        this.navItems = document.querySelectorAll(`.${name}-navs__nav`)
        this.tabs = document.querySelectorAll(`.${name}-tabs__tab`)
        this.clickNavItem()
    }
    clickNavItem() {
        let addClassNavItems = (navItem, tab) => {
            // -- nav items
            this.navItems.forEach(item => {
                item.classList.remove(`${this.name}-navs__nav_active`)
            })
            navItem.classList.add(`${this.name}-navs__nav_active`)
            // -- tab
            this.tabs.forEach(item => {
                item.classList.remove(`${this.name}-tabs__tab_active`)
            })
            tab.classList.add(`${this.name}-tabs__tab_active`)
        }
        this.navItems.forEach((item, i) => {
            item.onclick = () => {
                addClassNavItems(item, this.tabs[i])
            }
        })
    }
}
new NavTabs('giftset')


// Burger open menu --------------------
class MenuOpenShut {
    constructor() {
        this.menu = document.querySelector(`.header__menu`)
        this.burger = document.querySelector(`.header__burger`)
        this.menu.hidden = true
        this.openshutmenu()
    }
    openshutmenu() {
        this.burger.onclick = () => {
            if(this.menu.hidden == true) {
                this.menu.hidden = false
            }
            else {
                this.menu.hidden = true
            }
        }
    }

}
// new MenuOpenShut()



function openClose(burger_btn, menu_oc) {
    let burger = document.querySelector(burger_btn)
    let menu = document.querySelector(menu_oc)
    burger.onclick = () => {
        menu.classList.toggle(`${menu_oc.slice(1)}_open`)
    }
}
openClose('.header__burger', '.header__menu')

