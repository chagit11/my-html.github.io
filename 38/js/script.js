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


// --- openCloseCartHover ---
class openCloseCartHover {
  constructor(clickElem, openCloseElem, displ) {
    _(clickElem)?.addEventListener('click', (e) => {
      e.stopPropagation()
      this.openClose(openCloseElem, displ)
    }, true)
  }
  //
  openClose(openCloseElem, displ) {
    if(_(openCloseElem).style.display!=displ) {
      _(openCloseElem).style.display = displ
    }
    else if(_(openCloseElem).style.display==displ) {
      _(openCloseElem).style.display = 'none'
    }
  }
}
//
new openCloseCartHover(
  '.header-top__cart-badge',
  '.header-top__cart-hover',
  'flex'
)


// --- calcuteCartHover ---
class calcuteCartHover {
  constructor(countElem) {
    countElem.querySelector('.minus')?.addEventListener('click', (e) => {
      e.stopPropagation()
      this.minusCount(countElem)
    }, true)
    countElem.querySelector('.plus')?.addEventListener('click', (e) => {
      e.stopPropagation()
      this.plusCount(countElem)
    }, true)
  }
  //
  plusCount(countElem) {
    let count = countElem.querySelector('.count').textContent
    countElem.querySelector('.count').textContent = +count+1
  }
  //
  minusCount(countElem) {
    let count = countElem.querySelector('.count').textContent
    if(count!='1') countElem.querySelector('.count').textContent = +count-1
  }
}
//
__('.cart-hover__products-count')?.forEach( (el) => {
  new calcuteCartHover(el)
})




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








