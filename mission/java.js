
let selectElem = document.querySelector('select');
let logo = document.querySelector("img");

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        document.documentElement.style.backgroundColor = 'black';
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        logo.src = 'images/byui-logo-white.png';
        // code for changes to colors and logo
    } else {
        document.documentElement.style.backgroundColor = 'white';
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        logo.src = 'images/byui-logo-blue.jpeg';
        // code for changes to colors and logo
    }
}           
                    