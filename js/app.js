// Global variables
let restaurants = []
let categories = []
let cartItems = []
let isLoggedIn = false
let users = JSON.parse(localStorage.getItem('foodhub-users')) || []

// Add default admin user if no users exist
if (users.length === 0) {
  users.push({
    email: 'admin@foodhub.com',
    password: 'admin123',
    isAdmin: true
  })
  localStorage.setItem('foodhub-users', JSON.stringify(users))
}

// DOM Elements
const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
const nav = document.querySelector(".nav")
const loginBtn = document.querySelector(".btn-login")
const loginModal = document.getElementById("login-modal")
const cartIcon = document.getElementById("cart-icon")
const cartModal = document.getElementById("cart-modal")
const closeModalBtns = document.querySelectorAll(".close-modal")
const searchInput = document.getElementById("search-input")
const sortBySelect = document.getElementById("sort-by")
const restaurantsContainer = document.getElementById("restaurants-container")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Load data
  loadRestaurants()
  loadCategories()
  loadCart()

  // Setup event listeners
  setupEventListeners()
})

// Load restaurants data
function loadRestaurants() {
  // In a real application, this would be fetched from an API
  restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      image: "https://via.placeholder.com/300x200",
      cuisine: "Italian, Pizza",
      rating: 4.5,
      deliveryTime: "30-40 min",
      priceRange: "$$",
      categories: ["pizza", "pasta", "drinks"],
    },
    {
      id: 2,
      name: "Burger King",
      image: "https://via.placeholder.com/300x200",
      cuisine: "American, Fast Food",
      rating: 4.2,
      deliveryTime: "25-35 min",
      priceRange: "$$",
      categories: ["burger", "drinks"],
    },
    {
      id: 3,
      name: "Sushi World",
      image: "https://via.placeholder.com/300x200",
      cuisine: "Japanese, Sushi",
      rating: 4.7,
      deliveryTime: "40-50 min",
      priceRange: "$$$",
      categories: ["sushi", "drinks"],
    },
    {
      id: 4,
      name: "Pasta Paradise",
      image: "https://via.placeholder.com/300x200",
      cuisine: "Italian, Pasta",
      rating: 4.3,
      deliveryTime: "35-45 min",
      priceRange: "$$",
      categories: ["pasta", "drinks"],
    },
    {
      id: 5,
      name: "Sweet Treats",
      image: "https://via.placeholder.com/300x200",
      cuisine: "Desserts, Bakery",
      rating: 4.6,
      deliveryTime: "20-30 min",
      priceRange: "$$",
      categories: ["dessert", "drinks"],
    },
    {
      id: 6,
      name: "Healthy Bites",
      image: "https://via.placeholder.com/300x200",
      cuisine: "Salads, Healthy",
      rating: 4.4,
      deliveryTime: "25-35 min",
      priceRange: "$$",
      categories: ["pasta", "drinks"],
    },
  ]

  // Display restaurants if on home page
  if (restaurantsContainer) {
    displayRestaurants(restaurants)
  }
}

// Load categories data
function loadCategories() {
  // In a real application, this would be fetched from an API
  categories = [
    { id: "pizza", name: "Pizza", image: "https://via.placeholder.com/150" },
    { id: "burger", name: "Burger", image: "https://via.placeholder.com/150" },
    { id: "sushi", name: "Sushi", image: "https://via.placeholder.com/150" },
    { id: "pasta", name: "Pasta", image: "https://via.placeholder.com/150" },
    { id: "dessert", name: "Dessert", image: "https://via.placeholder.com/150" },
    { id: "drinks", name: "Drinks", image: "https://via.placeholder.com/150" },
  ]
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("foodhub-cart")
  if (savedCart) {
    cartItems = JSON.parse(savedCart)
    updateCartCount()
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("foodhub-cart", JSON.stringify(cartItems))
  updateCartCount()
}

// Update cart count in the UI
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count")
  if (cartCount) {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = totalItems
  }
}

// Setup event listeners
function setupEventListeners() {
  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Login button
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      if (isLoggedIn) {
        logout()
      } else {
        openModal(loginModal)
      }
    })
  }

  // Login form submission
  const loginForm = document.getElementById('login-form')
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      
      const user = users.find(u => u.email === email && u.password === password)
      if (user) {
        isLoggedIn = true
        // Store user data in session
        sessionStorage.setItem('currentUser', JSON.stringify(user))
        loginBtn.textContent = 'Logout'
        closeModal(loginModal)
        showLoginMessage('Login successful!', 'success', loginForm)
        // Redirect to dashboard with admin status
        window.location.href = user.isAdmin ? 'dashboard.html?admin=true' : 'dashboard.html'
      } else {
        showLoginMessage('Invalid credentials', 'error', loginForm)
      }
    })
  }

  // Signup form submission
  const signupForm = document.getElementById('signup-form')
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const email = document.getElementById('signup-email').value
      const password = document.getElementById('signup-password').value
      const confirmPassword = document.getElementById('confirm-password').value

      if (password !== confirmPassword) {
        showLoginMessage('Passwords do not match', 'error', signupForm)
        return
      }

      if (users.some(u => u.email === email)) {
        showLoginMessage('Email already registered', 'error', signupForm)
        return
      }

      users.push({email, password})
      localStorage.setItem('foodhub-users', JSON.stringify(users))
      showLoginMessage('Account created successfully!', 'success', signupForm)
      setTimeout(() => {
        closeModal(signupModal)
        openModal(loginModal)
      }, 1500)
    })
  }

  // Toggle between login/signup modals
  const showSignupLink = document.getElementById('show-signup')
  const showLoginLink = document.getElementById('show-login')
  if (showSignupLink) {
    showSignupLink.addEventListener('click', (e) => {
      e.preventDefault()
      closeModal(loginModal)
      openModal(signupModal)
    })
  }
  if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
      e.preventDefault()
      closeModal(signupModal)
      openModal(loginModal)
    })
  }

  // Cart icon
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      displayCartItems()
      openModal(cartModal)
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

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase()
      const filteredRestaurants = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm) || restaurant.cuisine.toLowerCase().includes(searchTerm),
      )
      displayRestaurants(filteredRestaurants)
    })
  }

  // Sort by select
  if (sortBySelect) {
    sortBySelect.addEventListener("change", () => {
      const sortValue = sortBySelect.value
      sortRestaurants(sortValue)
    })
  }

  // Category cards
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.category
      filterRestaurantsByCategory(category)
    })
  })
}

// Display restaurants in the UI
function displayRestaurants(restaurantsToDisplay) {
  if (!restaurantsContainer) return

  restaurantsContainer.innerHTML = ""

  if (restaurantsToDisplay.length === 0) {
    restaurantsContainer.innerHTML = '<p class="no-results">No restaurants found. Try a different search term.</p>'
    return
  }

  restaurantsToDisplay.forEach((restaurant) => {
    const restaurantCard = document.createElement("div")
    restaurantCard.className = "restaurant-card"
    restaurantCard.innerHTML = `
            <div class="restaurant-img">
                <img src="${restaurant.image}" alt="${restaurant.name}">
            </div>
            <div class="restaurant-info">
                <h3 class="restaurant-name">${restaurant.name}</h3>
                <p class="restaurant-cuisine">${restaurant.cuisine}</p>
                <div class="restaurant-meta">
                    <div class="restaurant-rating">
                        <span class="rating-star">★</span>
                        <span>${restaurant.rating}</span>
                    </div>
                    <div class="restaurant-delivery">${restaurant.deliveryTime}</div>
                </div>
            </div>
        `

    restaurantCard.addEventListener("click", () => {
      window.location.href = `restaurant.html?id=${restaurant.id}`
    })

    restaurantsContainer.appendChild(restaurantCard)
  })
}

// Sort restaurants
function sortRestaurants(sortValue) {
  const sortedRestaurants = [...restaurants]

  switch (sortValue) {
    case "rating":
      sortedRestaurants.sort((a, b) => b.rating - a.rating)
      break
    case "delivery-time":
      sortedRestaurants.sort((a, b) => {
        const aTime = Number.parseInt(a.deliveryTime.split("-")[0])
        const bTime = Number.parseInt(b.deliveryTime.split("-")[0])
        return aTime - bTime
      })
      break
    case "price-low":
      sortedRestaurants.sort((a, b) => a.priceRange.length - b.priceRange.length)
      break
    case "price-high":
      sortedRestaurants.sort((a, b) => b.priceRange.length - a.priceRange.length)
      break
  }

  displayRestaurants(sortedRestaurants)
}

// Filter restaurants by category
function filterRestaurantsByCategory(category) {
  const filteredRestaurants = restaurants.filter((restaurant) => restaurant.categories.includes(category))
  displayRestaurants(filteredRestaurants)
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

// Show login/signup message
function showLoginMessage(message, type, formElement) {
  const messageElement = document.createElement('div')
  messageElement.className = `login-message ${type}`
  messageElement.textContent = message
  
  if (formElement) {
    const existingMessage = formElement.querySelector('.login-message')
    if (existingMessage) {
      formElement.removeChild(existingMessage)
    }
    formElement.prepend(messageElement)
    
    setTimeout(() => {
      if (messageElement.parentNode === formElement) {
        formElement.removeChild(messageElement)
      }
    }, 3000)
  }
}

// Logout function
function logout() {
  isLoggedIn = false
  loginBtn.textContent = 'Login'
  window.location.href = 'index.html'
}

// Display cart items in the cart modal
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items")
  const cartSubtotal = document.getElementById("cart-subtotal")
  const cartTotal = document.getElementById("cart-total")
  const checkoutBtn = document.getElementById("checkout-btn")

  if (!cartItemsContainer) return

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
  const itemIndex = cartItems.findIndex((item) => item.id === itemId)
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity += change

    if (cartItems[itemIndex].quantity <= 0) {
      removeCartItem(itemId)
    } else {
      saveCart()
    }
  }
}

// Remove item from cart
function removeCartItem(itemId) {
  cartItems = cartItems.filter((item) => item.id !== itemId)
  saveCart()
}

// Add item to cart
function addToCart(item) {
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.push({
      ...item,
      quantity: 1,
    })
  }

  saveCart()

  // Show confirmation message
  const confirmationMessage = document.createElement("div")
  confirmationMessage.className = "confirmation-message"
  confirmationMessage.textContent = `${item.name} added to cart`
  document.body.appendChild(confirmationMessage)

  setTimeout(() => {
    confirmationMessage.classList.add("show")
    setTimeout(() => {
      confirmationMessage.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(confirmationMessage)
      }, 300)
    }, 2000)
  }, 10)
}
