// const _ = document.querySelector.bind(document)
// const __ = document.querySelectorAll.bind(document)

 

// --- OpenCloseCartHover ---------------------
class OpenCloseCartHover {
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
new OpenCloseCartHover(
  '.header-top__cart-badge',
  '.header-top__cart-hover',
  'flex'
)

_('body').addEventListener('click', (e) => {
  if(![_('.header-top__cart-hover'), ...__('.header-top__cart-hover *')].includes(e.target)) {
    _('.header-top__cart-hover').style.display = 'none'
  }
})




// --- CardsOper ------------------
class CardsOper {
  constructor() {
    
  }
  // -- elemCard
  elemCard(btn) {
    let elem = btn.closest('.card')
    return elem
  }
  // -- getInfoCard
  getInfoCard(elem) {
    return [
        elem.dataset.cid,
        '.'+elem.querySelector('.card__pic img').getAttribute('src').split('.').slice(0, -1).join('')+'-thumb.'+elem.querySelector('.card__pic img').getAttribute('src').split('.').slice(-1).join(''),
        elem.querySelector('.card__info-title').textContent,
        parseInt(elem.querySelector('.card__order-price-main').textContent),
      ]
  }
  // -- changeTextBtn
  changeTextBtn(mapcart) {
    let keysmapcart = Object.keys(Object.fromEntries(mapcart))
    __('.card').forEach( (el, i, arr) => {
      el.querySelector('.card__order-btn').textContent = 'Заказать'
      el.querySelector('.card__order-btn').style.background = ''
    })
    for(let cid of keysmapcart) {
      __('.card[data-cid="'+cid+'"]').forEach( (el, i, arr) => {
        el.querySelector('.card__order-btn').textContent = 'Отменить'
        el.querySelector('.card__order-btn').style.background = 'grey'
      })
    }
  }  
  // -- addCardCart
  addCardCart(mapcart) {
    let arrmapcart = Object.fromEntries(mapcart)
    let prods;
    for(let key in arrmapcart) {
      let [img, name, price, count, countprice] = arrmapcart[key]
      prods += `
        <div class="cart-hover__products-item" data-pid="${key}">
          <div class="cart-hover__products-pic"><img src="${img}" alt=""></div>
          <div class="cart-hover__products-info">
            <div class="cart-hover__products-name">${name}</div>
          </div>
          <div class="cart-hover__products-calculate">
            <div class="cart-hover__products-count"> 
              <div class="minus">-</div>
              <div class="count">${count}</div>
              <div class="plus">+</div>
            </div>
            <div class="cart-hover__products-price" data-pprice="${price}"><span>${countprice}</span> ₽</div>
          </div>
          <div class="cart-hover__products-delbtn"><img src="./img/all/cart-btn-delete.svg" alt=""></div>
        </div>
      `
    }
    _('.cart-hover__products').innerHTML = prods
  }
  
}

// --- CartOper ------------------
class CartOper {
  constructor() {
    
  }
  // -- elemProdCart
  elemProdCart(btn) {
    let elem = btn.closest('.cart-hover__products-item')
    return elem
  }
  // -- getInfoProdCart
  getInfoProdCart(elem) {
    return [
        elem.dataset.pid,
        // '.'+elem.querySelector('.card__pic img').getAttribute('src').split('.').slice(0, -1).join('')+'-thumb.'+elem.querySelector('.card__pic img').getAttribute('src').split('.').slice(-1).join(''),
        elem.querySelector('.card__pic img').getAttribute('src'),
        elem.querySelector('.cart-hover__products-name').textContent,
        parseInt(elem.querySelector('.cart-hover__products-price').textContent),
        +elem.querySelector('.cart-hover__products-count .count').textContent,
        parseInt(elem.querySelector('.cart-hover__products-price').dataset.pprice),
      ]
  }
  // -- resPrice
  totalPrice(mapcart) {
    let rprice = 0
    let objmapcart = Object.fromEntries(mapcart)
    for(let key in objmapcart) rprice += objmapcart[key][4]
    _('.header-top__cart-price span:first-child').textContent = rprice
    _('.cart-hover__footer-price span').textContent = rprice
  }
  // -- isProdsCart
  isProdsCart(mapcart) {
    if(mapcart.size!=0) {
      _('.cart-hover__empty').style.display = 'none'
      _('.cart-hover__products').style.display = 'block'
    }
    else if(mapcart.size==0) {
      _('.cart-hover__products').style.display = 'none'
      _('.cart-hover__empty').style.display = 'flex'
    }
  }
  // -- lenProdsCart
  lenProdsCart(mapcart) {
    _('.header-top__cart-badge sup').textContent = mapcart.size
  }
}




// === 
const cardsoper = new CardsOper()
const cartoper = new CartOper()
// 
const mapcart = new Map()


// --- CLICK ---
_('body').addEventListener('click', (e) => {
  clickBtnOrderCard(e.target) //
  clickBtnDeleteCart(e.target) //
  clickCountCalculate(e.target) //
  clickTabCategs(e.target) //
})


// --- clickBtnOrderCard
function clickBtnOrderCard(etarget) {
  if(etarget.className=='card__order-btn') {
    const card = cardsoper.elemCard(etarget)
    let [cid, cimg, cname, cprice] = cardsoper.getInfoCard(card)
    //
    if(etarget.textContent=='Заказать') {
      mapcart.set(cid, [cimg, cname, cprice, 1, cprice*1])
    } else if(etarget.textContent=='Отменить') {
      mapcart.delete(cid)
    }
    // 
    cardsoper.addCardCart(mapcart)
    cardsoper.changeTextBtn(mapcart)
    cartoper.totalPrice(mapcart) //
    cartoper.lenProdsCart(mapcart) //
    cartoper.isProdsCart(mapcart) //
  }
}
// --- clickBtnDeleteCart
function clickBtnDeleteCart(etarget) {
  if(etarget.parentElement.className=='cart-hover__products-delbtn') {
    const prod = cartoper.elemProdCart(etarget)
    mapcart.delete(prod.dataset.pid) //
    cardsoper.addCardCart(mapcart) //
    cardsoper.changeTextBtn(mapcart) //
    // 
    cartoper.totalPrice(mapcart) 
    cartoper.lenProdsCart(mapcart) 
    cartoper.isProdsCart(mapcart) 
  }
}
// --- clickCountCalculate
function clickCountCalculate(etarget) {
  if(etarget.className=='plus') {
    const prod = cartoper.elemProdCart(etarget) //
    let pid = prod.dataset.pid
    let [img, name, price, count, pricecalc] = mapcart.get(pid)
    count++
    mapcart.set(pid, [img, name, price, count, count*price])
    // 
    cardsoper.addCardCart(mapcart) //
    cartoper.totalPrice(mapcart) //
  }
  if(etarget.className=='minus') {
    const prod = cartoper.elemProdCart(etarget) //
    let pid = prod.dataset.pid
    let [img, name, price, count, pricecalc] = mapcart.get(pid)
    if(count!=1) count--
    mapcart.set(pid, [img, name, price, count, count*price])
    // 
    cardsoper.addCardCart(mapcart) //
    cartoper.totalPrice(mapcart) //
  }
}
// --- clickTabCategs
function clickTabCategs(etarget) {
  if([...__('.categories__tabs-item'), ...__('.categories__tabs-item *'),
    ...__('.categories__tabs-item'), ...__('.categories__tabs-item *'),
    _('.categories__pagination-arrow-next'), ...__('.categories__pagination-arrow-next *'),
    _('.categories__pagination-arrow-prev'), ...__('.categories__pagination-arrow-prev *'),
    ...__('.categories__pagination-nums-item')].includes(etarget)) {
    setTimeout(()=> {
      cardsoper.changeTextBtn(mapcart)
    }, 500) //
  }
}



document.addEventListener('scroll', (e) => {
  if(window.pageYOffset>90) {
    _('.header-top').style.cssText = `
      box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.08);
    `
    _('.header-top__logo').style.cssText = `
      // transform: translateY(-20%) scale(0.4);
      display: none;
    `
  } else {
    _('.header-top').style.cssText = `
      box-shadow: none;
    `
    _('.header-top__logo').style.cssText = `
      // transform: translateY(0) scale(1);
      display: block;
    `
  }
})












