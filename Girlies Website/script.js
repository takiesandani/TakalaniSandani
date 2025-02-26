// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = cart.length;

// Update Cart Count on Page Load
updateCartCount();

// Update Cart Count in Header
function updateCartCount() {
    document.getElementById("cart-count").innerText = cartCount;
}

// Add to Cart Functionality
function addToCart(productName, price, imageSrc, description) {
    // Add product to cart array
    cart.push({ name: productName, price: price, image: imageSrc, description: description });
    cartCount++;
    updateCartCount();

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Alert the user
    alert(`${productName} has been added to your cart for R${price}.`);
}

// Function to add items to the cart
function addToCart(productName, price, image, description, colorDropdownId, storage, battery, extras) {
    // Get the selected color
    const colorDropdown = document.getElementById(colorDropdownId);
    const selectedColor = colorDropdown ? colorDropdown.value : "Default Color";

    // Add item to cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ 
        productName, 
        price, 
        image, 
        description, 
        color: selectedColor, 
        storage, 
        battery, 
        extras, 
        quantity: 1 
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}
// Function to update the cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// Function to show more info about a product
function showMoreInfo(productId) {
    let infoDiv = document.getElementById(`${productId}-info`);
    if (infoDiv.style.display === "none" || infoDiv.style.display === "") {
        infoDiv.style.display = "block";
    } else {
        infoDiv.style.display = "none";
    }
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
});

// Function to display cart items
function displayCartItems() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = ""; // Clear the cart list

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.productName}">
            <div class="cart-item-details">
                <h3>${item.productName}</h3>
                <p>Color: ${item.color}</p>
                <p>R${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity || 1}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </div>
        `;

        cartList.appendChild(cartItem);
    });

    // Update cart count in the header
    updateCartCount();
}