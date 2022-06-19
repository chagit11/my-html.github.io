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
    _('.categories__tabs').addEventListener('click', (e) => {
      if(e.target.closest('.categories__tabs-item')) {
        _('.categories__tabs-item.--active').classList.remove('--active')
        e.target.closest('.categories__tabs-item').classList.add('--active')
      }
    })
  }  
  // -- arrowsPagin
  arrowsPagin() {
    [_('.categories__pagination-arrow-next'), ...__('.categories__pagination-arrow-next *')].forEach( (el, i, arr) => {
      el.addEventListener('click', (e) => {
        let numnext = _('.categories__pagination-nums-item.--active').nextElementSibling
        if(numnext) {
          _('.categories__pagination-nums-item.--active').classList.remove('--active')
          numnext.classList.add('--active')
        }
      })
    });
    [_('.categories__pagination-arrow-prev'), ...__('.categories__pagination-arrow-prev *')].forEach( (el, i, arr) => {
      el.addEventListener('click', (e) => {
        let numprev = _('.categories__pagination-nums-item.--active').previousElementSibling
        if(numprev) {
          _('.categories__pagination-nums-item.--active').classList.remove('--active')
          numprev.classList.add('--active')
        }
      })
    })
  }
  // -- setactiveNumPagin
  setactiveNumPagin(el) {
    _('.categories__pagination-nums-item.--active').classList.remove('--active')
    el.classList.add('--active')
  }
  // -- getvalActivedNumPagin
  getvalActivedNumPagin() {
    let activednum = _('.categories__pagination-nums-item.--active').textContent
    return activednum
  }
}
//
const categs = new Categs()
categs.arrowsPagin()
categs.itemTabs()





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




// ===============================
// --- ResponseJsonCardsCategs ---
class ResponseJsonCardsCategs {
  constructor(url) {
    this.url = url
    this.arrCards = []
    this.setdataCategs()
    this.respFetch('pizza')
    setTimeout(()=>{
      this.addCards(0)
      this.addNumsPagin()
    }, 300)
  }
  // -- setdataCategs
  setdataCategs() {
    let arrcategs = ['pizza', 'sushi', 'rolles', 'sets', 'wok', 'soups', 'salads', 'desserts', 'drinks', 'sales']
    __('.categories__tabs-item').forEach( (el, i, arr) => {
      el.dataset.categ = arrcategs[i]
    })
  }
  // -- respFetch
  async respFetch(cat) {
    let response = await fetch(this.url)
    if(response.ok) {
      let res = await response.json()
      this.arrCards = []
      this.createCards(cat, res?.[cat])
    }
    else console.log('Error!!!')
  }
  // -- createCard
  createCards(cat, val) {
    let arrcards = val.map( (el, i, arr) => {
        let [name, props, desc, prices] = el
        return `
          <div class="categories__cards-item card" data-cid="${cat+'-'+i}"> 
            <div class="card__pic-wrap">
              <div class="card__pic-before"><img src="./img/all/card-pic-before-hot.svg" alt=""/><img src="./img/all/card-pic-before-baked.svg" alt=""/></div>
              <div class="card__pic"><img src="./img/all/cards-pic/${cat}/${name}.jpg" alt=""/></div>
              <div class="card__pic-after"><img src="./img/all/card-pic-after-top.svg" alt=""/></div>
            </div>
            <div class="card__info">
              <div class="card__info-properties">
                <div class="card__info-properties-item">${props.split('/')[0]}</div>
                <div class="card__info-properties-item">${props.split('/')[1]}</div>
              </div>
            </div>
            <div class="card__info-title">${name}</div>
            <div class="card__info-desc">${desc}</div>
            <div class="card__order"> 
              <div class="card__order-price"> 
                <div class="card__order-price-old">${prices.split('/')[0]}</div>
                <div class="card__order-price-main">${prices.split('/')[1]}</div>
              </div>
              <div class="card__order-btn">Заказать</div>
            </div>
          </div>
        `
    })
    return this.arrCards = arrcards
  }
  // -- addCards
  addCards(pn) {
    let arrCards = [...this.arrCards]
    _('.categories__cards').innerHTML = arrCards.splice((6*pn), 6).join('\n')
  }
  // -- addNumsPagin
  addNumsPagin() {
    let numspag = Math.ceil(this.arrCards.length / 6)
    _('.categories__pagination-nums').innerHTML = ''
    for(let i=1; i<=numspag; i++) {
      _('.categories__pagination-nums').insertAdjacentHTML('beforeend', `
        <div class="categories__pagination-nums-item">${i}</div>
      `)
    }
    _('.categories__pagination-nums-item')?.classList.add('--active');
  }
}
// ===
const respcards = new ResponseJsonCardsCategs('../img/all/cards-pic/cards.json')
// const respcards = new ResponseJsonCardsCategs('https://chagit11.github.io/ruslan-html/38/img/all/cards-pic/cards.json')
// 
_('body').addEventListener('click', (e) => {
  clickTabsCategs(e.target) //
  clickArrowsPagin(e.target) //
})

// --- clickTabsCategs
function clickTabsCategs(etarget) {
  if(etarget.closest('.categories__tabs-item')) {
    respcards.respFetch(etarget.closest('.categories__tabs-item').dataset.categ)
    setTimeout(()=>{
      respcards.addNumsPagin()
      respcards.addCards(0)
    }, 500)
  }
} 
// --- clickArrowsPagin
function clickArrowsPagin(etarget) {
  if([_('.categories__pagination-arrow-next'), ...__('.categories__pagination-arrow-next *'),
    _('.categories__pagination-arrow-prev'), ...__('.categories__pagination-arrow-prev *')].includes(etarget)) {
    respcards.addCards(+categs.getvalActivedNumPagin()-1)
  }
}
// --- clickNumsPagin
function clickNumsPagin() {
  setTimeout(()=>{
    [...__('.categories__pagination-nums-item')].forEach( (el, i, arr) => {
      el.addEventListener('click', (e) => { 
        categs.setactiveNumPagin(el)
        respcards.addCards(+categs.getvalActivedNumPagin()-1)
      })
    });
  }, 500)
}
clickNumsPagin() //








