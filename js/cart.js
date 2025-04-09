// DOM Elements
const cartIcon = document.getElementById("cart-icon")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartSubtotal = document.getElementById("cart-subtotal")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")

// Initialize cart
document.addEventListener("DOMContentLoaded", () => {
  // Load cart from localStorage
  loadCart()

  // Setup event listeners
  setupCartEventListeners()
})

// Load cart from localStorage
function loadCart() {
  updateCartCount()
}

// Setup cart event listeners
function setupCartEventListeners() {
  // Cart icon click
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      displayCartItems()
      openModal(cartModal)
    })
  }

  // Close modal buttons
  const closeModalBtns = document.querySelectorAll(".close-modal")
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal")
      closeModal(modal)
    })
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target)
    }
  })
}

// Display cart items
function displayCartItems() {
  if (!cartItemsContainer || !cartSubtotal || !cartTotal || !checkoutBtn) return

  let cartItems = []
  const savedCart = localStorage.getItem("foodhub-cart")
  if (savedCart) {
    cartItems = JSON.parse(savedCart)
  }

  cartItemsContainer.innerHTML = ""

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>'
    cartSubtotal.textContent = "$0.00"
    cartTotal.textContent = "$0.00"
    checkoutBtn.disabled = true
    return
  }

  let subtotal = 0

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity
    subtotal += itemTotal

    const cartItemElement = document.createElement("div")
    cartItemElement.className = "cart-item"
    cartItemElement.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <div class="remove-item" data-id="${item.id}">×</div>
            </div>
        `

    cartItemsContainer.appendChild(cartItemElement)
  })

  // Add event listeners to quantity buttons and remove buttons
  const decreaseButtons = cartItemsContainer.querySelectorAll(".decrease")
  const increaseButtons = cartItemsContainer.querySelectorAll(".increase")
  const removeButtons = cartItemsContainer.querySelectorAll(".remove-item")

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      const itemId = button.dataset.id
      updateCartItemQuantity(itemId, -1)
      displayCartItems()
    })
  })

  increaseButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      const itemId = button.dataset.id
      updateCartItemQuantity(itemId, 1)
      displayCartItems()
    })
  })

  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      const itemId = button.dataset.id
      removeCartItem(itemId)
      displayCartItems()
    })
  })

  // Update subtotal and total
  const deliveryFee = 2.99
  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`
  cartTotal.textContent = `$${(subtotal + deliveryFee).toFixed(2)}`

  // Enable checkout button
  checkoutBtn.disabled = false
  checkoutBtn.addEventListener("click", () => {
    window.location.href = "checkout.html"
  })
}

// Update cart item quantity
function updateCartItemQuantity(itemId, change) {
  let cartItems = []
  const savedCart = localStorage.getItem("foodhub-cart")
  if (savedCart) {
    cartItems = JSON.parse(savedCart)
  }

  const itemIndex = cartItems.findIndex((item) => item.id === itemId)
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity += change

    if (cartItems[itemIndex].quantity <= 0) {
      removeCartItem(itemId)
    } else {
      localStorage.setItem("foodhub-cart", JSON.stringify(cartItems))
      updateCartCount()
    }
  }
}

// Remove item from cart
function removeCartItem(itemId) {
  let cartItems = []
  const savedCart = localStorage.getItem("foodhub-cart")
  if (savedCart) {
    cartItems = JSON.parse(savedCart)
  }

  cartItems = cartItems.filter((item) => item.id !== itemId)
  localStorage.setItem("foodhub-cart", JSON.stringify(cartItems))
  updateCartCount()
}

// Update cart count in the UI
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count")
  if (cartCount) {
    let cartItems = []
    const savedCart = localStorage.getItem("foodhub-cart")
    if (savedCart) {
      cartItems = JSON.parse(savedCart)
    }
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = totalItems
  }
}

// Open modal
function openModal(modal) {
  if (modal) {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
  }
}

// Close modal
function closeModal(modal) {
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }
}
