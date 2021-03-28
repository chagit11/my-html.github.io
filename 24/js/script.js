function _(slc) {
    let selector = document.querySelector(slc)
    return selector
}
function __(slc) {
    let selectors = document.querySelectorAll(slc)
    return selectors
}

//--------------------------apartments__grids item hover------------------------------------
__('.apartments__grids .item').forEach((item, i, arr) => {
    item.onmouseover = () => {
        item.querySelector('a.btn').style.cssText = `
            background: #2A94E2;
            color: #ffffff;
        `
        item.querySelector('.title').style.cssText = `
            color: #2A94E2;
        `
    }
    item.onmouseout = () => {
        item.querySelector('a.btn').style.cssText = `
            background: #F6F6F6;
            color: #000000;
        `
        item.querySelector('.title').style.cssText = `
            color: #000000;
        `
    }
})
//----------------------------------------------------
