// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Load cart items
  loadCheckoutItems()

  // Setup event listeners
  setupCheckoutEventListeners()
})

// Load checkout items
function loadCheckoutItems() {
  const checkoutItemsContainer = document.getElementById("checkout-items")
  const summarySubtotal = document.getElementById("summary-subtotal")
  const summaryTax = document.getElementById("summary-tax")
  const summaryTotal = document.getElementById("summary-total")

  if (!checkoutItemsContainer || !summarySubtotal || !summaryTax || !summaryTotal) return

  let cartItems = []
  const savedCart = localStorage.getItem("foodhub-cart")
  if (savedCart) {
    cartItems = JSON.parse(savedCart)
  }

  if (cartItems.length === 0) {
    // Redirect to home page if cart is empty
    window.location.href = "index.html"
    return
  }

  checkoutItemsContainer.innerHTML = ""
  let subtotal = 0

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity
    subtotal += itemTotal

    const checkoutItemElement = document.createElement("div")
    checkoutItemElement.className = "checkout-item"
    checkoutItemElement.innerHTML = `
            <div class="checkout-item-info">
                <h4 class="checkout-item-name">${item.name}</h4>
                <p class="checkout-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="checkout-item-quantity">
                $${itemTotal.toFixed(2)}
            </div>
        `

    checkoutItemsContainer.appendChild(checkoutItemElement)
  })

  // Calculate tax and total
  const deliveryFee = 2.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + deliveryFee + tax

  // Update summary
  summarySubtotal.textContent = `$${subtotal.toFixed(2)}`
  summaryTax.textContent = `$${tax.toFixed(2)}`
  summaryTotal.textContent = `$${total.toFixed(2)}`
}

// Setup checkout event listeners
function setupCheckoutEventListeners() {
  const paymentOptions = document.querySelectorAll('input[name="payment"]')
  const cardDetails = document.getElementById("card-details")
  const placeOrderBtn = document.getElementById("place-order-btn")
  const confirmationModal = document.getElementById("confirmation-modal")
  const trackOrderBtn = document.getElementById("track-order-btn")
  const continueShoppingBtn = document.getElementById("continue-shopping-btn")
  const closeModalBtns = document.querySelectorAll(".close-modal")

  // Payment method change
  if (paymentOptions && cardDetails) {
    paymentOptions.forEach((option) => {
      option.addEventListener("change", () => {
        if (option.value === "card") {
          cardDetails.style.display = "block"
        } else {
          cardDetails.style.display = "none"
        }
      })
    })
  }

  // Place order button
  if (placeOrderBtn && confirmationModal) {
    placeOrderBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Validate form
      const deliveryForm = document.getElementById("delivery-form")
      const paymentForm = document.getElementById("payment-form")

      if (!deliveryForm.checkValidity()) {
        deliveryForm.reportValidity()
        return
      }

      const selectedPayment = document.querySelector('input[name="payment"]:checked').value
      if (selectedPayment === "card" && !paymentForm.checkValidity()) {
        paymentForm.reportValidity()
        return
      }

      // Generate order ID and delivery time
      const orderId = "ORD-" + Math.floor(Math.random() * 1000000)
      const deliveryTime = new Date()
      deliveryTime.setMinutes(deliveryTime.getMinutes() + Math.floor(Math.random() * 30) + 30)

      // Update confirmation modal
      document.getElementById("order-id").textContent = orderId
      document.getElementById("delivery-time").textContent = deliveryTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })

      // Clear cart
      localStorage.removeItem("foodhub-cart")

      // Show confirmation modal
      openModal(confirmationModal)
    })
  }

  // Track order button
  if (trackOrderBtn) {
    trackOrderBtn.addEventListener("click", () => {
      // In a real application, this would redirect to an order tracking page
      alert("Order tracking functionality would be implemented here.")
    })
  }

  // Continue shopping button
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      window.location.href = "index.html"
    })
  }

  // Close modal buttons
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
