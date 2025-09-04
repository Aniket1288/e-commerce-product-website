let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart
function addToCart(name, price) {
  let existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cart-count").innerText = cart.length;
  showCart();
}

// Show cart modal
function showCart() {
  document.getElementById("cart-modal").style.display = "block";
  let cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <p>${item.name} (x${item.qty}) - ₹${item.price * item.qty}
         <button onclick="removeItem(${index})">❌</button>
      </p>
    `;
  });

  document.getElementById("cart-total").innerText = total;
}

// Close cart
function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cart-count").innerText = cart.length;
  showCart();
}

// Proceed to checkout
function proceedToCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}

// Checkout page load
if (window.location.pathname.includes("checkout.html")) {
  let checkoutCart = document.getElementById("checkout-cart");
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    checkoutCart.innerHTML += `<p>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</p>`;
  });
  document.getElementById("checkout-total").innerText = total;
}

// Place order
function placeOrder(event) {
  event.preventDefault();
  localStorage.removeItem("cart");
  window.location.href = "success.html";
}

// Update cart count on page load
if (document.getElementById("cart-count")) {
  document.getElementById("cart-count").innerText = cart.length;
}

/* Contact Page Script */
if (window.location.pathname.includes("contact.html")) {
  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you for contacting us! We’ll get back to you soon.");
    this.reset();
  });
}
