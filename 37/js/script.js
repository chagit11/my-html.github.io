const _ = document.querySelector.bind(document)
const __ = document.querySelectorAll.bind(document)

// --- Menuburger --- ---------------------
class Menuburger {
    constructor(menu) {
        this.menu = menu
    }
    // --- openclosemenu
    openclosemenu() {
        let menu = this.menu
        _('.'+menu+' .burger')?.addEventListener('click', (e) => {
            e.stopPropagation()
            _('.'+menu).classList.toggle(menu+'--mob')
        }, true)
    }
    // --- 
    some_func() {
        
    }
}
//
new Menuburger('header-top__left-menu').openclosemenu()



// 
// --- Slider --- -----------------------------
class Slider {
    constructor(nameSlider) {
        this.nameSlider = nameSlider
    }
    //
    scrollslide() {
        let nameSlider = this.nameSlider
        let slides = _('.'+nameSlider+' .slides'),
            slide = _('.'+nameSlider+' .slide');
        let arrprev = _('.'+nameSlider+' .arrows-prev'),
            arrnext = _('.'+nameSlider+' .arrows-next');

        arrnext?.addEventListener('click', (e) => {
            e.stopPropagation()
            slides.scrollBy({
                top: 0,
                left: getComputedStyle(slide)['width'].split('px')[0],
                behavior: 'smooth'
            })
        }, true)
        // 
        arrprev?.addEventListener('click', (e) => {
            e.stopPropagation()
            slides.scrollBy({
                top: 0,
                left: -getComputedStyle(slide)['width'].split('px')[0],
                behavior: 'smooth'
            })
        }, true)
    }
}
// 
const headerSlider = new Slider('header-main__slider')
headerSlider.scrollslide()




// --- Swiper --- ---------------------------------
// var swiper = new Swiper(".header-main__slider", {
//     cssMode: true,
//     navigation: {
//       nextEl: ".header-main__slider-arrows .arrows-next",
//       prevEl: ".header-main__slider-arrows .arrows-prev",
//     },
//     pagination: {
//       el: ".swiper-pagination",
//     },
//     mousewheel: true,
//     keyboard: true,
// });


// --- Accordion ---
class Accordion {
    constructor(nameAcrd) {
        this.nameAcrd = nameAcrd
    }
    //
    run() {
        let nameAcrd = this.nameAcrd
        let itemsAcrd = __('.'+nameAcrd+'-accordion__item'),
            headsAcrd = __('.'+nameAcrd+'-accordion__item-head'),
            bodysAcrd = __('.'+nameAcrd+'-accordion__item-body');
        itemsAcrd.forEach( (el, i) => {
            el?.addEventListener('click', (e) => {
                e.stopPropagation()
                itemsAcrd[i].classList.toggle(nameAcrd+'-accordion__item--active')
            }, true)
        })
    }
}
// 
new Accordion('subcatalog').run()




// --- ClickActive ---
class ClickActive {
    constructor(item, itemActive) {
        this.item = item
        this.itemActive = itemActive
    }
    //
    run() {
        __(this.item).forEach( (el, i, arr) => {
        el.addEventListener('click', (e) => {
            __(this.item).forEach( (el1) => {
                el1.classList.remove(this.itemActive)
            })
            e.target.classList.add(this.itemActive)
        })
})
    }
}
//-- 'index' => newandpopular-tabs__item
new ClickActive('.newandpopular-tabs__item', 'newandpopular-tabs__item--active').run()
//-- 'service' => service-nav li
new ClickActive('.service-nav li', 'nav__item--active').run()




// -- 'product' slider
function product() {
    _('.slider')?.scrollBy(getComputedStyle(_('.slider__wrap-pics'))['width'].split('px')[0] / 2 - 1440 / 2, 0)
}
product()



// --- 'cart' enter-quant select ---
function cart() {

    // -- open enter-quant__select
    __('.cart-totalprice__enter-quant').forEach( (el, i, arr) => {
        el.querySelector('span').addEventListener('click', (e) => {
            e.stopPropagation()
            el.querySelector('.enter-quant__select').classList.toggle('enter-quant__select--open')
        }, true)
    })
    // -- select quant 
    __('.cart-totalprice__select-quant').forEach( (el, i, arr) => {
        el.querySelectorAll('.enter-quant__select li').forEach( (el1, i1, arr1) => {
            el1.addEventListener('click', (e) => {
                e.stopPropagation()
                el.querySelector('input').value = el1.textContent
                el.querySelector('.enter-quant__select').classList.remove('enter-quant__select--open')
            }, true)
        })
    })
    // 
    _('body').addEventListener('click', (e) => {
        if(![...__('.cart-totalprice__select-quant .enter-quant__select li')].includes(e.target)) {
            __('.cart-totalprice__select-quant .enter-quant__select').forEach( (el, i, arr) => {
                el.classList.remove('enter-quant__select--open')
            })
        }
    })
    // -- delete product
    __('.cart-totalprice__del-btn').forEach( (el, i, arr) => {
        el.addEventListener('click', (e) => {
            __('.cart-totalprice__item')[i].remove()
        })
    })

}
cart()

// --- 'cart' enter-quant select ---
function service() {

    // -- open 
    __('.service-form__field-input').forEach( (el, i, arr) => {
        el.querySelector('.display__arrow')?.addEventListener('click', (e) => {
            e.stopPropagation()
            el.querySelector('.selectopts').classList.toggle('selectopts--open')
        }, true)
    })
    // -- select  
    __('.service-form__field-input').forEach( (el, i, arr) => {
        el.querySelectorAll('.selectopts li').forEach( (el1, i1, arr1) => {
            el1.addEventListener('click', (e) => {
                e.stopPropagation()
                el.querySelector('input').value = el1.textContent
                el.querySelector('.selectopts').classList.remove('selectopts--open')
            }, true)
        })
    })
    // -- close 
    _('body').addEventListener('click', (e) => {
        if(![...__('.service-form__field-input .selectopts li')].includes(e.target)) {
            __('.service-form__field-input .selectopts').forEach( (el, i, arr) => {
                el.classList.remove('selectopts--open')
            })
        }
    })
    // -- delete product
    __('.cart-totalprice__del-btn').forEach( (el, i, arr) => {
        el.addEventListener('click', (e) => {
            __('.cart-totalprice__item')[i].remove()
        })
    })

}
service()


