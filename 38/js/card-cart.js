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


// --- numProdsCart ---
class numProdsCart {
  constructor() {
    let lencards = __('.cart-hover__products-item').length
    _('.header-top__cart-badge sup').textContent = lencards
  }
}

// --- IsProductsCart ------------
class IsProductsCart {
  constructor() {
    if(_('.cart-hover__products-item')) {
      _('.cart-hover__empty').style.display = 'none'
      _('.cart-hover__products').style.display = 'block'
    }
    else {
      _('.cart-hover__products').style.display = 'none'
      _('.cart-hover__empty').style.display = 'flex'
    }
  }
}

// --- CardsOper ------------------
class CardsOper {
  constructor() {
    
  }
  // -- setDataCard
  setDataCard(elem, i) {
      elem.dataset.cid = i
      elem.dataset.card = 'noselected'
  }
  // -- setSelecteds
  setSelecteds(elem, select) {
    elem.dataset.card = select
    if(select=='selected') {
      elem.querySelector('.card__order-btn').textContent = 'Отменить'
    }
    else if(select=='noselected') {
      elem.querySelector('.card__order-btn').textContent = 'Заказать'
    }
  }
  // -- getInfoCard
  getInfoCard(elem) {
    return [
        Number(elem.dataset.cid),
        '.'+elem.querySelector('.card__pic img').getAttribute('src').split('.').slice(0, -1).join('')+'-thumb.'+elem.querySelector('.card__pic img').getAttribute('src').split('.').slice(-1).join(''),
        elem.querySelector('.card__info-title').textContent,
        parseInt(elem.querySelector('.card__order-price-main').textContent),
      ]
  }
  // -- addCardCart
  addCardCart(cid, cimg, cname, cprice) {
    _('.cart-hover__products').insertAdjacentHTML('beforeend', `
      <div class="cart-hover__products-item" data-pid="${cid}">
        <div class="cart-hover__products-pic"><img src="${cimg}" alt=""></div>
        <div class="cart-hover__products-info">
          <div class="cart-hover__products-name">${cname}</div>
          <div class="cart-hover__products-properties"> 
            <div class="cart-hover__products-properties-item --select">30 см</div>
            <div class="cart-hover__products-properties-item">50 см</div>
          </div>
        </div>
        <div class="cart-hover__products-calculate">
          <div class="cart-hover__products-count"> 
            <div class="minus">-</div>
            <div class="count">1</div>
            <div class="plus">+</div>
          </div>
          <div class="cart-hover__products-price" data-pprice="${cprice}"><span>${cprice}</span> ₽</div>
        </div>
        <div class="cart-hover__products-delbtn"><img src="./img/all/cart-btn-delete.svg" alt=""></div>
      </div>
    `)
  }
  // -- cancelCardCart
  cancelCardCart(cid) {
    _('.cart-hover__products-item[data-pid="'+cid+'"]').remove()
  }
}

// --- CartOper ------------------
class CartOper {
  constructor() {
    
  }
  // -- removeProdCart
  removeProdCart(pid) {
    _('.cart-hover__products-item[data-pid="'+pid+'"]')?.remove()
  }
  // -- resPrice
  resPrice() {
    let rprice = 0
    __('.cart-hover__products-item').forEach( (el, i, arr) => {
      let price = el.querySelector('.cart-hover__products-price span').textContent
      rprice += +price
    })
    _('.cart-hover__footer-price span').textContent = rprice
  }
}

// --- CounterCalculateCart ----------------------
class CounterCalculateCart {
  constructor() {
    this.reloadProds()
    __('.cart-hover__products-item')?.forEach( (el) => {
      el.querySelector('.cart-hover__products-count .minus')?.addEventListener('click', (e) => {
        e.stopPropagation()
        this.minusCount(el)
        this.calcPrice(el)
        new CartOper().resPrice()
      }, true)
      el.querySelector('.cart-hover__products-count .plus')?.addEventListener('click', (e) => {
        e.stopPropagation()
        this.plusCount(el)
        this.calcPrice(el)
        new CartOper().resPrice()
      }, true)
    })
  }
  // -- plusCount
  plusCount(elem) {
    let count = elem.querySelector('.count').textContent
    elem.querySelector('.count').textContent = +count+1
    return +count
  }
  // -- minusCount
  minusCount(elem) {
    let count = elem.querySelector('.count').textContent
    if(count!='1') elem.querySelector('.count').textContent = +count-1
    return +count
  }
  // -- reloadProds
  reloadProds() {
    _('.cart-hover__products').innerHTML = _('.cart-hover__products').innerHTML
  }
  // -- calcPrice
  calcPrice(elem) {
    let price = elem.querySelector('.cart-hover__products-price').dataset.pprice
    let count = elem.querySelector('.cart-hover__products-count .count').textContent
    elem.querySelector('.cart-hover__products-price span').textContent = +price * +count
  }
}




// === 
const cardsoper = new CardsOper()
const cartoper = new CartOper()

// 
__('.card').forEach( (el, i, arr) => {
  cardsoper.setDataCard(el, i)
  el.querySelector('.card__order-btn').addEventListener('click', (e) => {
    e.stopPropagation()
    // 
    let [cid, cimg, cname, cprice] = cardsoper.getInfoCard(__('.card')[i])
    // -- ADD PROD
    if(__('.card')[i].dataset.card=='noselected') {
      cardsoper.setSelecteds(__('.card')[i], 'selected')
      cardsoper.addCardCart(cid, cimg, cname, cprice)
    }
    // -- CANSEL PROD
    else if(__('.card')[i].dataset.card=='selected') {
      cardsoper.setSelecteds(__('.card')[i], 'noselected')
      cardsoper.cancelCardCart(cid)
    }
    // 
    new CounterCalculateCart()
    cartoper.resPrice()
    // 
    __('.cart-hover__products-item').forEach( (elp, i, arr) => {
      elp.querySelector('.cart-hover__products-delbtn').addEventListener('click', (e) => {
        e.stopPropagation()
        // 
        let pid = elp.dataset.pid
        cartoper.removeProdCart(pid)
        cardsoper.setSelecteds(_('.card[data-cid="'+pid+'"]'), 'noselected')
        cartoper.resPrice()
        new IsProductsCart()
        new numProdsCart()
      }, true)
    })
    // 
    new IsProductsCart()
    new numProdsCart()
  }, true)
})



















