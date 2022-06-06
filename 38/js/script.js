const _ = document.querySelector.bind(document)
const __ = document.querySelectorAll.bind(document)

// --- Mobmenu ---
class Mobmenu {
  constructor(mobmenu) {
    this.mobmenu = mobmenu
    this.run(mobmenu)
  }
  // -- run
  run() {
    let mobmenu = this.mobmenu
    _('.'+mobmenu+' .button')?.addEventListener('click', (e) => {
      e.stopPropagation()
      _('.'+mobmenu).classList.toggle(mobmenu+'--open')
    }, true)
  }
  // -- 
  addWrap(elems) {
    [...elems].forEach( (el) => {
      let elm = _(el).cloneNode(true)
      _('.'+this.mobmenu+' .wrapper').append(elm)
    })
  }
}
// 
const mobmenu = new Mobmenu('header-top__mobmenu')
mobmenu.addWrap([
  '.header-top__logo',
  '.header-top__login',
  '.header-top__phone',
  '.header-categories',
  '.header-top__menu',
])




// --- LoginPopup ---
class LoginPopup {
  constructor(pos) {
    __('.header-top__login')[pos].addEventListener('click', (e) => {
      e.stopPropagation()
      this.openLoginPopup(pos)
    })
    __('.login-popup__btn-close')[pos].addEventListener('click', (e) => {
      e.stopPropagation()
      this.closeLoginPopup(pos)
    })
  }
  //
  openLoginPopup(pos) {
    __('.header-top__login-popup')[pos].style.display = 'block'
  }
  //
  closeLoginPopup(pos) {
    __('.header-top__login-popup')[pos].style.display = 'none'    
  }
}
//
new LoginPopup(0)
new LoginPopup(1)



// --- Categs ---
class Categs {
  constructor() {
    
  }
  // -- itemTabs
  itemTabs() {
    __('.categories__tabs-item').forEach( (el, i, arr) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        _('.categories__tabs-item.--active').classList.remove('--active')
        el.classList.add('--active')
      }, true)
    })
  }
  // -- numsPagin
  numsPagin() {
    __('.categories__pagination-nums-item').forEach( (el, i, arr) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        _('.categories__pagination-nums-item.--active').classList.remove('--active')
        el.classList.add('--active')
      }, true)
    })
  }
  // -- arrsPagin
  arrsPagin() {
    _('.categories__pagination-arrow-next').addEventListener('click', (e) => {
      e.stopPropagation()
      let numnext = _('.categories__pagination-nums-item.--active').nextElementSibling
      if(numnext) {
        _('.categories__pagination-nums-item.--active').classList.remove('--active')
        numnext.classList.add('--active')
      }
    }, true)
    _('.categories__pagination-arrow-prev').addEventListener('click', (e) => {
      e.stopPropagation()
      let numprev = _('.categories__pagination-nums-item.--active').previousElementSibling
      if(numprev) {
        _('.categories__pagination-nums-item.--active').classList.remove('--active')
        numprev.classList.add('--active')
      }
    }, true)
  }
}
//
const categs = new Categs()
categs.itemTabs()
// 
categs.numsPagin()
categs.arrsPagin()







// --- 
var headerSlider = new Swiper(".header-slider__wrapper", {
  navigation: {
    nextEl: ".header-slider__arrows-next",
    prevEl: ".header-slider__arrows-prev",
  },
});

// --- 
var topnewSlider = new Swiper(".topnew__slider", {
  slidesPerView: 1,
  // spaceBetween: 24,
  // pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    // },
    navigation: {
      nextEl: ".topnew__arrows-next",
      prevEl: ".topnew__arrows-prev",
    },
    breakpoints: {
      1070: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 30
      },
    }
  });
  
  
// --- 
var combomenuSlider = new Swiper(".combomenu__slider", {
    slidesPerView: 1,
    // spaceBetween: 24,
    // pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    // },
    navigation: {
      nextEl: ".combomenu__arrows-next",
      prevEl: ".combomenu__arrows-prev",
    },
    breakpoints: {
      1070: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 30
      },
    }
});








