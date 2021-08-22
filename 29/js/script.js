// click
let burger = document.querySelector(`.header-menu__burger`)
let menuList = document.querySelector(`.header-menu__list`)
burger.onclick = () => {
    burger.classList.toggle('header-menu__burger--close')
    menuList.classList.toggle('header-menu__list-mob')
}

