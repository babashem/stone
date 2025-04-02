document.addEventListener('DOMContentLoaded', function() {
    // Function to get cart from local storage
    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || {};
    }

    // Function to save cart to local storage
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to add item to cart
    function addToCart(productId, productName, productPrice) {
        let cart = getCart();

        if (cart[productId]) {
            cart[productId].quantity++;
        } else {
            cart[productId] = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
        }

        saveCart(cart);
    }

    // "Buy Now" button functionality (for product pages)
    const buyNowButtons = document.querySelectorAll('.product-details button[data-id]');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);

            addToCart(productId, productName, productPrice);
            window.location.href = 'cart.html'; // Redirect to cart page
        });
    });

    // Cart page functionality
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }

    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        let cart = getCart();
        let cartHTML = '';
        let totalPrice = 0;

        for (const productId in cart) {
            const item = cart[productId];
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            cartHTML += `
                <div class="cart-item">
                    <p>${item.name} - Price: $${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="remove-one" data-id="${productId}">-</button>
                        <span>${item.quantity}</span>
                        <button class="add-one" data-id="${productId}">+</button>
                    </div>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                </div>
            `;
        }

        cartHTML += `<p>Total Price: $${totalPrice.toFixed(2)}</p>`;
        cartItemsContainer.innerHTML = cartHTML;

        // Add event listeners to "Add" and "Remove" buttons
        const addButtons = document.querySelectorAll('.add-one');
        addButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.id;
                updateQuantity(productId, 1);
            });
        });

        const removeButtons = document.querySelectorAll('.remove-one');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.id;
                updateQuantity(productId, -1);
            });
        });
    }

    function updateQuantity(productId, change) {
        let cart = getCart();

        if (cart[productId]) {
            cart[productId].quantity += change;

            if (cart[productId].quantity <= 0) {
                delete cart[productId]; // Remove item if quantity is 0
            }

            saveCart(cart);
            displayCartItems(); // Refresh cart display
        }
    }
});