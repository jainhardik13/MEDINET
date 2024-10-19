// cart.js

let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartDisplay();
    saveCartToLocalStorage();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItems.innerHTML = '<h3 class="font-bold mb-2">Cart Items:</h3><p>Your cart is empty</p>';
    } else {
        cartItems.innerHTML = '<h3 class="font-bold mb-2">Cart Items:</h3>';
        cart.forEach(item => {
            cartItems.innerHTML += `<p class="mb-1">${item.name} - ₹${item.price}</p>`;
        });
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartDisplay();
}

// Initialize cart
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
    
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', function() {
            const cartItems = document.getElementById('cart-items');
            cartItems.classList.toggle('hidden');
        });
    }
});