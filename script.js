const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1999,
        image: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww" },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        image: "https://static.vecteezy.com/system/resources/thumbnails/036/780/706/small/ai-generated-innovative-smart-watch-mockup-for-tech-marketing-ai-generated-photo.jpg"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1799,
        image: "https://static.vecteezy.com/system/resources/thumbnails/045/633/861/small/a-new-pair-of-blue-running-shoes-on-a-white-background-free-photo.jpg"
    },
    {
        id: 4,
        name: "Travel Backpack",
        price: 1299,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        price: 1499,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Laptop Stand",
        price: 899,
        image: "https://turtlecart.in/cdn/shop/products/laptopstand51.jpg?v=1680443179"
    },
    {
        id: 7,
        name: "USB-C Hub",
        price: 1099,
        image: "https://www.neopackonline.com/cdn/shop/files/TCH8IN1_11.jpg?v=1770377845"},
    {
        id: 8,
        name: "Mechanical Keyboard",
        price: 2999,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
    }
];

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    document.querySelectorAll(".cart-count").forEach(element => {
        element.textContent = count;
    });
}

function displayProducts() {
    const productGrid = document.querySelector(".product-grid");

    if (!productGrid) return;

    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price.toLocaleString("en-IN")}</p>
            <button class="add-cart-button" data-id="${product.id}">
                Add to Cart
            </button>
        `;

        productGrid.appendChild(card);
    });

    document.querySelectorAll(".add-cart-button").forEach(button => {
        button.addEventListener("click", () => {
            addToCart(Number(button.dataset.id));
        });
    });
}

function addToCart(productId) {
    const cart = getCart();
    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
}

function displayCart() {
    const cartBody = document.getElementById("cart-body");

    if (!cartBody) return;

    const cart = getCart();
    cartBody.innerHTML = "";

    if (cart.length === 0) {
        cartBody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-cart">
                    Your cart is empty.
                </td>
            </tr>
        `;

        calculateTotal();
        return;
    }

    cart.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.name}" class="cart-image">
            </td>

            <td>${item.name}</td>

            <td>
                <input
                    type="number"
                    min="1"
                    value="${item.quantity}"
                    class="quantity-input"
                    data-id="${item.id}"
                >
            </td>

            <td>₹${item.price.toLocaleString("en-IN")}</td>

            <td>
                ₹${(item.price * item.quantity).toLocaleString("en-IN")}
                <br>
                <button class="remove-button" data-id="${item.id}">
                    Remove
                </button>
            </td>
        `;

        cartBody.appendChild(row);
    });

    document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("change", () => {
            updateQuantity(
                Number(input.dataset.id),
                Number(input.value)
            );
        });
    });

    document.querySelectorAll(".remove-button").forEach(button => {
        button.addEventListener("click", () => {
            removeFromCart(Number(button.dataset.id));
        });
    });

    calculateTotal();
}

function updateQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity = quantity < 1 || isNaN(quantity) ? 1 : quantity;

    saveCart(cart);
    displayCart();
    updateCartCount();
}

function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);

    saveCart(cart);
    displayCart();
    updateCartCount();
}

function calculateTotal() {
    const totalElement = document.getElementById("grand-total");

    if (!totalElement) return;

    const cart = getCart();

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    totalElement.textContent = `₹${total.toLocaleString("en-IN")}`;
}

function validateCheckout(event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const pincode = document.getElementById("pincode");
    const phone = document.getElementById("phone");

    const nameError = document.getElementById("name-error");
    const addressError = document.getElementById("address-error");
    const cityError = document.getElementById("city-error");
    const pincodeError = document.getElementById("pincode-error");
    const phoneError = document.getElementById("phone-error");
    const paymentError = document.getElementById("payment-error");

    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });

    let valid = true;

    if (name.value.trim() === "") {
        nameError.textContent = "Name is required.";
        valid = false;
    }

    if (address.value.trim() === "") {
        addressError.textContent = "Address is required.";
        valid = false;
    }

    if (city.value.trim() === "") {
        cityError.textContent = "City is required.";
        valid = false;
    }

    if (!/^\d{6}$/.test(pincode.value.trim())) {
        pincodeError.textContent = "Pincode must be exactly 6 digits.";
        valid = false;
    }

    if (!/^\d{10}$/.test(phone.value.trim())) {
        phoneError.textContent = "Phone must be exactly 10 digits.";
        valid = false;
    }

    const payment = document.querySelector(
        'input[name="payment"]:checked'
    );

    if (!payment) {
        paymentError.textContent = "Please select a payment method.";
        valid = false;
    }

    if (!valid) return;

    localStorage.removeItem("cart");
    updateCartCount();

    document.querySelector(".checkout-form").style.display = "none";

    document.getElementById("order-message").innerHTML = `
        <div class="order-success">
            <h2>Order placed!</h2>
            <p>Your order has been placed successfully.</p>
            <a href="index.html" class="checkout-button">
                Continue Shopping
            </a>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    displayCart();
    updateCartCount();

    const checkoutForm = document.querySelector(".checkout-form");

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", validateCheckout);
    }
});