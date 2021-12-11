const _ = document.querySelector.bind(document)
const __ = document.querySelectorAll.bind(document)





class Popup {
    constructor(clck, popupWrap) {
        this.clck = clck
        this.popupWrap = popupWrap
        this.popup = _('#popup')
        this.run()
    }
    run() {
        this.clck.onclick = () => {
            this.popupWrap.style.display = 'block'
            this.popup.style.display = 'flex'
            // this.popup.innerHTML = ''
            this.popup.append(this.popupWrap)
            console.dir(this.popupWrap)
            console.log(this.popupWrap)
        }
    }
}
new Popup(
    _('.header-main__info-buttons-video img'),
    _('.header-main__info-buttons-video-popup')
)


// swiper -------------------------
new Swiper('.buyproduct-swiper', {
    // autoplay: {
    //     delay: 5000,
    // },
    slidesPerView: 1,
    spaceBetween: 35,
    breakpoints: {
        425: {
            slidesPerView: 1,
            spaceBetween: 30,

        },
        576: {
            slidesPerView: 2,
            spaceBetween: 30,

        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,

        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30,

        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 35,

        },
    },
    navigation: {
        nextEl: '.buyproduct-swiper__arrs-next',
        prevEl: '.buyproduct-swiper__arrs-prev',
    },
});


// burger -----------------------

class MenuBurger {
    constructor(burger, menuList) {
        this.burger = _(`.${burger}`)
        this.menuList = _(`.${menuList}`)
        this.classMob = `${menuList}--mob`
        this.run()
    }
    //
    run() {
        this.burger.onclick = () => {
            this.menuList.classList.add(this.classMob)
            _('.header-top__menu-list--mob').insertAdjacentHTML('afterbegin',
            `<span class="--mob-close" style="
                position: absolute;
                top: 60px; right: 60px;
                font-weight: 900;
                color: white;
            ">X</span>`
            )
            _('.--mob-close').onclick = () => {
                this.menuList.classList.remove(this.classMob)
            }
        }
    }
}
new MenuBurger(
    'header-top__menu-burger',
    'header-top__menu-list'
)
