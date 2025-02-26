// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
                <p>Price: R${item.price}</p>
                <p>Storage: ${item.storage}</p>
                <p>Battery Capacity: ${item.battery}</p>
                <p>Extras: ${item.extras}</p>
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

// Function to update quantity
function updateQuantity(index, change) {
    const item = cart[index];

    if (change === 1) {
        // Increase quantity
        item.quantity = (item.quantity || 1) + 1;
    } else if (change === -1) {
        // Decrease quantity
        item.quantity = (item.quantity || 1) - 1;

        // Remove item if quantity is 0
        if (item.quantity <= 0) {
            cart.splice(index, 1);
        }
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Refresh the cart display
    displayCartItems();
}

// Function to send cart information to WhatsApp
function sendCartToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const address = document.getElementById('address').value;

    if (!address) {
        alert("Please enter your address.");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty. Add some products before checking out.");
        return;
    }

    // Create the message
    let message = `Hello, I would like to place an order. Here are the details:\n\n`;
    message += `*Delivery Address:* ${address}\n\n`;
    message += `*Order Details:*\n`;

    cart.forEach((item, index) => {
        message += `\n*Product ${index + 1}:*\n`;
        message += `- Name: ${item.productName}\n`;
        message += `- Color: ${item.color}\n`;
        message += `- Price: R${item.price}\n`;
        message += `- Storage: ${item.storage}\n`;
        message += `- Battery Capacity: ${item.battery}\n`;
        message += `- Extras: ${item.extras}\n`;
    });

    message += `\nTotal Items: ${cart.length}\n`;
    message += `Please confirm the order and provide payment details.`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);

    
    const ownerWhatsAppNumber = "+27766873535"; 

    // Open WhatsApp with the pre-filled message
    const whatsappURL = `https://wa.me/${+27766873535}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Display cart items on page load
displayCartItems();