
const menuMob = {
    run() {
        let header = document.querySelector('.header')
        let burger = document.querySelector('.header-top__burger')
        let nav = document.querySelector('.header-top__nav')
        
        burger.onclick = () => {
            header.classList.toggle('header--mob')
            burger.classList.toggle('header-top__burger--close')
            nav.classList.toggle('header-top__nav--mob')
        }
    }
}
menuMob.run()


const portfolioInfo = {
    run() {
        let info = document.querySelectorAll('.portfolio-pics__pic-info')
        let titleInfo = document.querySelectorAll('.portfolio .info-title')
        let titleInfoImg = document.querySelectorAll('.portfolio .info-title img')
        let descInfo = document.querySelectorAll('.portfolio .info-desc')
        let descInfoImg = document.querySelectorAll('.portfolio .info-desc img')
        titleInfoImg.forEach( (el, i, arr) => {
            el.onclick = () => {
                titleInfo[i].style.display = 'none'
                descInfo[i].style.display = 'flex'
            }
        })
        descInfoImg.forEach( (el, i, arr) => {
            el.onclick = () => {
                descInfo[i].style.display = 'none'
                titleInfo[i].style.display = 'flex'
            }
        })
    }
}
portfolioInfo.run()

const portfolioMore =  {
    run() {
        let morePortfolio = document.querySelector('.portfolio-more')
        let picsTwoPortfolio = document.querySelector('.portfolio-pics:nth-of-type(2)')
        let switchIndex = 0
        let displayArr = [ ['grid', 'Hide works'], ['none','Load more'] ]
        picsTwoPortfolio.style.display = 'none'

        morePortfolio.onclick = openPicsTwoPortfolio
        function openPicsTwoPortfolio() {
            picsTwoPortfolio.style.display = displayArr[switchIndex][0]
            morePortfolio.textContent = displayArr[switchIndex][1]
            switchIndex++
            if(switchIndex==displayArr.length) switchIndex = 0
        }
    }
}
portfolioMore.run()



