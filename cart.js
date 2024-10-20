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
        cartItems.innerHTML += '<button id="clear-cart" class="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">Clear Cart</button>';
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

function clearCart() {
    cart = [];
    updateCartDisplay();
    saveCartToLocalStorage();
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

    // Add event listener for the Clear Cart button
    document.body.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'clear-cart') {
            clearCart();
        }
    });

    // Uncomment the following line to clear the cart on page load
    clearCart();
});

// Function to check if this is a new session
function isNewSession() {
    if (!localStorage.getItem('sessionId')) {
        const sessionId = Date.now().toString();
        localStorage.setItem('sessionId', sessionId);
        return true;
    }
    return false;
}

// Clear cart on new session (uncomment to enable)
if (isNewSession()) {
    clearCart();
}