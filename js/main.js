const pages = [...document.getElementById('main').querySelectorAll('div')].map(d => d.id).filter(id => id !== '');

function openPage(id){
    pages.forEach(x => { document.getElementById(x).style.display = 'none' })
    document.getElementById(id).style.display = 'flex'
}

window.onload = () => { openPage('home') }