let navbar = document.querySelector(".navbar");
document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle("active");
    cartItem.classList.remove("active");
    searchForm.classList.remove("active");
};
let cartItem = document.querySelector(".header .cart-item-container");
document.querySelector("#cart-btn").onclick = () => {
    cartItem.classList.toggle("active");
    navbar.classList.remove("active");

    searchForm.classList.remove("active");
};
let searchForm = document.querySelector(".search-form");
document.querySelector("#search-btn").onclick = () => {
    searchForm.classList.toggle("active");
    navbar.classList.remove("active");
    cartItem.classList.remove("active");
};
window.onscroll = () => {
    navbar.classList.remove("active");
    cartItem.classList.remove("active");
    searchForm.classList.remove("active");
};
let searchBar = document.querySelector("input");
searchBar.addEventListener("click", function(event) {});

let shoeAddToCart = document.querySelectorAll(".addToCart");
console.log(shoeAddToCart);

shoeAddToCart.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
        let addToCartBtn = event.target;
        let shopItem = addToCartBtn.parentElement;
        let shoeName = shopItem.querySelector("h3").innerText;
        let price = shopItem.querySelector(".price").innerText;
        let finalPrice = parseInt(price.slice(1));

        let image = shopItem.querySelector("img").src;
        addItemToCart(shoeName, price, image);
    });
});

function addItemToCart(shoeName, price, image) {
    let cartRow = document.createElement("div");

    let cartItems = document.querySelector(".cart-item-container");
    let cartRowContents = `
            <div class="cart-item">
                
                <img src="${image}">
                <div class="content">
                    <h3>${shoeName}</h3>
                    <div class="price">${price}</div>
                </div>
                <button class="shoeRemove">Remove</button>
            </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    //totalCartCost(price);
    removeItemFromCart();
    updateCartTotal();
}

let totalCartPrice = document.querySelector(".totalCartCost");
let totalPrice = 0;
//Increasung total price in cart
// function totalCartCost(shoePrice) {
//     let price = parseInt(shoePrice.replace("$", ""));
//     totalPrice += price;
//     totalCartPrice.innerText = totalPrice;
// }

///removing the cart element
function removeItemFromCart() {
    let removeButton = document.querySelectorAll(".shoeRemove");
    for (let i = 0; i < removeButton.length; i++) {
        let button = removeButton[i];
        button.addEventListener("click", function(e) {
            e.target.parentElement.remove();
        });
    }
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName(
        "cart-item-container"
    )[0];
    let cartRows = cartItemContainer.getElementsByClassName("cart-item");
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName("price")[0];
        let price = priceElement.innerText;
        let purePrice = parseInt(price.replace("$", ""));
        totalPrice += purePrice;

        totalCartPrice.innerHTML = totalPrice;
    }
}
const submit = document.querySelector(".submit");
submit.addEventListener("click", function() {
    alert("Thank you For You Enquiry.We will get back to you as ASAP");
});