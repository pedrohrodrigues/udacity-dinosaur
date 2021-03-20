const show = function (element) {
    element.style.display = 'block';
}

const hide = function (element) {
    element.style.display = 'none';
}

document.getElementById('compare-button').addEventListener('click', function(event){
    form = document.getElementById('main-form');
    tiles = document.getElementById('tiles');
    hide(form);
    show(tiles);
    event.preventDefault();
});