let menuBtn = document.querySelector(".menu-btn");
console.log(menuBtn);

menuBtn.addEventListener("click", handleMenuBtnClick);


// write a function
function handleMenuBtnClick(event) {
    console.log(event);
}

function handleMenuBtnClick(event) {
    let nav = document.querySelector("nav");
    nav.classList.toggle("hide");
    menuBtn.classList.toggle("change");
}