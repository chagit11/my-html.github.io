window.onload = function() {
    const setKeys = new Set()
    document.addEventListener('keydown', e => {
        setKeys.add(e.code)
        if(setKeys.has('Escape')) {
            import('./Comps/IncludesDOM.js')
            import('./Comps/OperElemsDOM.js')
            import('./Comps/OperElemsCSS.js')
            import('./Comps/OperElemsHTML.js')
        }
    })
    document.addEventListener('keyup', (e) => {setKeys.delete(e.code)});
}






// function htmler() {
//         import('./Components/IncludesDOM.js')
//         import('./Components/SelectElemsHtml.js')
//         import('./Components/ViewElem.js')
//         import('./Components/ContextMenu.js')
//         import('./Components/PropsCss.js')
//         import('./Components/OperStyles.js')
//         import('./Components/OperTags.js')
//         import('./Components/ViewStyles.js')
// }



// const setKeys = new Set()
// // --- keydown / keyup ===========================
// document.addEventListener('keydown', (e) => {
//     setKeys.add(e.code)
//     if(setKeys.has('Escape')) htmler()
// });
// document.addEventListener('keyup', (e) => {setKeys.delete(e.code)});





