
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.header .nav');
    const socialIcons = document.querySelectorAll('.header .social-icons a');
    const socialContainer = document.querySelector('.header .social-icons');
    const socialContainerOnBurgerMenu = document.createElement('div');
    socialContainerOnBurgerMenu.classList.add('social-icons-on-burger-menu');

    const toggleSocialIcons = (appendTo) => {
        socialIcons.forEach(icon => appendTo.appendChild(icon));
    };

    burgerMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
        const isActive = nav.classList.contains('active');
        const screenWidth = window.innerWidth;

        if (screenWidth < 600) {
            if (isActive) {
                nav.appendChild(socialContainerOnBurgerMenu);
                toggleSocialIcons(socialContainerOnBurgerMenu);
            } else {
                toggleSocialIcons(socialContainer);
                nav.removeChild(socialContainerOnBurgerMenu);
            }
        } else if (!isActive) {
            toggleSocialIcons(socialContainer);
        }
    });

    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && !burgerMenu.contains(event.target)) {
            nav.classList.remove('active');
            toggleSocialIcons(socialContainer);
            if (nav.contains(socialContainerOnBurgerMenu)) {
                nav.removeChild(socialContainerOnBurgerMenu);
            }
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    // Select all catalog items
    const catalogItems = document.querySelectorAll(".catalog-item");

    // Load the cart or initialize it
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    catalogItems.forEach((item) => {
        const minusBtn = item.querySelector(".counter-button:first-child");
        const plusBtn = item.querySelector(".counter-button:last-child");
        const quantityInput = item.querySelector("input");
        const price = parseInt(item.querySelector(".price").textContent); // Extract price
        const name = item.querySelector("h3").textContent; // Extract item name
        const image = item.querySelector("img").src; // Extract image source

        // Check if the product exists in cart and set the input value
        const cartItem = cart.find((product) => product.name === name);
        if (cartItem) {
            quantityInput.value = cartItem.quantity;
        }

        // Increase quantity
        plusBtn.addEventListener("click", () => {
            let quantity = parseInt(quantityInput.value);
            quantity++;
            quantityInput.value = quantity;
            updateCart(name, price, image, quantity);
        });

        // Decrease quantity
        minusBtn.addEventListener("click", () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                quantity--;
                quantityInput.value = quantity;
                updateCart(name, price, image, quantity);
            }
        });
    });

    // Function to update cart in localStorage
    function updateCart(name, price, image, quantity) {
        const existingItem = cart.find((item) => item.name === name);

        if (existingItem) {
            if (quantity > 0) {
                existingItem.quantity = quantity; // Update quantity
            } else {
                cart = cart.filter((item) => item.name !== name); // Remove item if quantity = 0
            }
        } else {
            cart.push({ name, price, image, quantity });
        }

        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update cart count immediately
        updateCartCount();
    }

});

document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-items");
    const totalContainer = document.querySelectorAll(".cart-total .price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    displayCart();

    // Function to display cart items
    function displayCart() {
        cartContainer.innerHTML = ""; // Clear cart items container
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            // Generate cart item HTML
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p class="price">${item.price} &#x20B4;</p>
            <div class="counter">
                <div class="counter-button" data-index="${index}">-</div>
                <input type="number" value="${item.quantity}" min="0">
                <div class="counter-button" data-index="${index}">+</div>
            </div>
        </div>
      `;
            cartContainer.appendChild(cartItem);
        });

        totalContainer[0].textContent = `${total > 0 ? total + 100 : total} грн`;
        totalContainer[1].textContent = `${total} грн`;

        // Add event listeners for counters
        addCounterListeners();
    }

    // Function to handle counter buttons
    function addCounterListeners() {
        const minusButtons = document.querySelectorAll(".counter-button:first-child");
        const plusButtons = document.querySelectorAll(".counter-button:last-child");
        const inputs = document.querySelectorAll(".counter input");

        minusButtons.forEach((btn) => {
            btn.addEventListener("click", () => updateQuantity(btn.dataset.index, -1));
        });

        plusButtons.forEach((btn) => {
            btn.addEventListener("click", () => updateQuantity(btn.dataset.index, 1));
        });

        inputs.forEach((input, index) => {
            input.addEventListener("input", () => {
                const value = Math.max(0, parseInt(input.value) || 0);
                updateQuantity(index, value, true);
            });
        });
    }

    // Function to update quantity and cart
    function updateQuantity(index, change, directInput = false) {
        if (directInput) {
            cart[index].quantity = change; // Direct input update
        } else {
            cart[index].quantity += change;
        }

        // Remove if quantity <= 0
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        // Save and refresh cart
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Function to calculate and display cart count

    // Update cart count on page load
    updateCartCount();

    // Optional: Update cart count whenever the cart changes (e.g., events in other scripts)
    window.addEventListener("storage", updateCartCount);
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountSpan = document.getElementById("cart-count");

    // Calculate total quantity
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update the cart count
    if (cartCountSpan) {
        cartCountSpan.textContent = totalItems;
        cartCountSpan.style.display = totalItems > 0 ? "flex" : "none"; // Hide if 0
    }
}



