// Global variables
let restaurant = null
let menuItems = []
let activeCategory = null

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Get restaurant ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const restaurantId = urlParams.get("id")

  if (restaurantId) {
    // Load restaurant data
    loadRestaurantData(restaurantId)
  } else {
    // Redirect to home page if no restaurant ID
    window.location.href = "index.html"
  }

  // Setup event listeners
  setupEventListeners()
})

// Load restaurant data
function loadRestaurantData(restaurantId) {
  // In a real application, this would be fetched from an API
  const restaurants = [
    {
      id: "1",
      name: "Pizza Palace",
      image: "https://via.placeholder.com/1200x400",
      cuisine: "Italian, Pizza",
      rating: 4.5,
      deliveryTime: "30-40 min",
      priceRange: "$$",
      address: "123 Main St, New York, NY 10001",
      phone: "(123) 456-7890",
      openingHours: "10:00 AM - 10:00 PM",
      tags: ["Italian", "Pizza", "Pasta", "Salads", "Desserts"],
    },
    {
      id: "2",
      name: "Burger King",
      image: "https://via.placeholder.com/1200x400",
      cuisine: "American, Fast Food",
      rating: 4.2,
      deliveryTime: "25-35 min",
      priceRange: "$$",
      address: "456 Broadway, New York, NY 10002",
      phone: "(123) 456-7891",
      openingHours: "11:00 AM - 11:00 PM",
      tags: ["American", "Burgers", "Fries", "Shakes", "Chicken"],
    },
    {
      id: "3",
      name: "Sushi World",
      image: "https://via.placeholder.com/1200x400",
      cuisine: "Japanese, Sushi",
      rating: 4.7,
      deliveryTime: "40-50 min",
      priceRange: "$$$",
      address: "789 5th Ave, New York, NY 10003",
      phone: "(123) 456-7892",
      openingHours: "12:00 PM - 10:00 PM",
      tags: ["Japanese", "Sushi", "Sashimi", "Ramen", "Tempura"],
    },
  ]

  restaurant = restaurants.find((r) => r.id === restaurantId)

  if (!restaurant) {
    window.location.href = "index.html"
    return
  }

  // Load menu items
  loadMenuItems(restaurantId)

  // Display restaurant data
  displayRestaurantData()
}

// Load menu items
function loadMenuItems(restaurantId) {
  // In a real application, this would be fetched from an API
  const allMenuItems = [
    // Pizza Palace Menu
    {
      id: "p1",
      restaurantId: "1",
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      price: 12.99,
      image: "https://via.placeholder.com/100",
      category: "Pizza",
    },
    {
      id: "p2",
      restaurantId: "1",
      name: "Pepperoni Pizza",
      description: "Pizza with tomato sauce, mozzarella, and pepperoni",
      price: 14.99,
      image: "https://via.placeholder.com/100",
      category: "Pizza",
    },
    {
      id: "p3",
      restaurantId: "1",
      name: "Vegetarian Pizza",
      description: "Pizza with tomato sauce, mozzarella, and assorted vegetables",
      price: 13.99,
      image: "https://via.placeholder.com/100",
      category: "Pizza",
    },
    {
      id: "p4",
      restaurantId: "1",
      name: "Spaghetti Bolognese",
      description: "Spaghetti with meat sauce",
      price: 10.99,
      image: "https://via.placeholder.com/100",
      category: "Pasta",
    },
    {
      id: "p5",
      restaurantId: "1",
      name: "Fettuccine Alfredo",
      description: "Fettuccine with creamy Alfredo sauce",
      price: 11.99,
      image: "https://via.placeholder.com/100",
      category: "Pasta",
    },
    {
      id: "p6",
      restaurantId: "1",
      name: "Caesar Salad",
      description: "Romaine lettuce with Caesar dressing, croutons, and parmesan",
      price: 8.99,
      image: "https://via.placeholder.com/100",
      category: "Salads",
    },
    {
      id: "p7",
      restaurantId: "1",
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee and mascarpone",
      price: 6.99,
      image: "https://via.placeholder.com/100",
      category: "Desserts",
    },
    {
      id: "p8",
      restaurantId: "1",
      name: "Soda",
      description: "Assorted sodas",
      price: 2.99,
      image: "https://via.placeholder.com/100",
      category: "Drinks",
    },

    // Burger King Menu
    {
      id: "b1",
      restaurantId: "2",
      name: "Classic Burger",
      description: "Beef patty with lettuce, tomato, and special sauce",
      price: 9.99,
      image: "https://via.placeholder.com/100",
      category: "Burgers",
    },
    {
      id: "b2",
      restaurantId: "2",
      name: "Cheeseburger",
      description: "Beef patty with cheese, lettuce, tomato, and special sauce",
      price: 10.99,
      image: "https://via.placeholder.com/100",
      category: "Burgers",
    },

    // Sushi World Menu
    {
      id: "s1",
      restaurantId: "3",
      name: "California Roll",
      description: "Crab, avocado, and cucumber roll",
      price: 8.99,
      image: "https://via.placeholder.com/100",
      category: "Sushi",
    },
    {
      id: "s2",
      restaurantId: "3",
      name: "Spicy Tuna Roll",
      description: "Spicy tuna and cucumber roll",
      price: 9.99,
      image: "https://via.placeholder.com/100",
      category: "Sushi",
    },
  ]

  menuItems = allMenuItems.filter((item) => item.restaurantId === restaurantId)

  // Get unique categories
  const categories = [...new Set(menuItems.map((item) => item.category))]

  // Display menu categories
  displayMenuCategories(categories)

  // Display menu items for the first category
  if (categories.length > 0) {
    activeCategory = categories[0]
    displayMenuItems(activeCategory)
  }
}

// Display restaurant data
function displayRestaurantData() {
  // Update page title
  document.title = `${restaurant.name} - FoodHub`

  // Update restaurant banner
  const restaurantBanner = document.getElementById("restaurant-banner")
  restaurantBanner.style.backgroundImage = `url(${restaurant.image})`

  // Update restaurant details
  const restaurantDetails = document.getElementById("restaurant-details")
  restaurantDetails.innerHTML = `
        <div class="restaurant-header">
            <h2>${restaurant.name}</h2>
            <p>${restaurant.cuisine}</p>
            <div class="restaurant-tags">
                ${restaurant.tags.map((tag) => `<span class="restaurant-tag">${tag}</span>`).join("")}
            </div>
            <div class="restaurant-data">
                <div class="restaurant-data-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>${restaurant.rating}</span>
                </div>
                <div class="restaurant-data-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>${restaurant.deliveryTime}</span>
                </div>
                <div class="restaurant-data-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>${restaurant.priceRange}</span>
                </div>
            </div>
        </div>
        <div class="restaurant-actions">
            <div class="restaurant-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${restaurant.address}</span>
            </div>
            <div class="restaurant-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>${restaurant.phone}</span>
            </div>
            <div class="restaurant-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>${restaurant.openingHours}</span>
            </div>
        </div>
    `
}

// Display menu categories
function displayMenuCategories(categories) {
  const categoryTabs = document.getElementById("category-tabs")
  categoryTabs.innerHTML = ""

  categories.forEach((category) => {
    const categoryTab = document.createElement("li")
    categoryTab.className = `category-tab ${category === activeCategory ? "active" : ""}`
    categoryTab.textContent = category
    categoryTab.dataset.category = category

    categoryTab.addEventListener("click", () => {
      // Update active category
      document.querySelectorAll(".category-tab").forEach((tab) => {
        tab.classList.remove("active")
      })
      categoryTab.classList.add("active")
      activeCategory = category

      // Display menu items for the selected category
      displayMenuItems(category)
    })

    categoryTabs.appendChild(categoryTab)
  })
}

// Display menu items for a category
function displayMenuItems(category) {
  const menuItemsContainer = document.getElementById("menu-items")
  menuItemsContainer.innerHTML = ""

  const categoryItems = menuItems.filter((item) => item.category === category)

  const menuCategory = document.createElement("div")
  menuCategory.className = "menu-category"
  menuCategory.innerHTML = `
        <h3 class="menu-category-title">${category}</h3>
        <div class="menu-items-grid">
            ${categoryItems
              .map(
                (item) => `
                <div class="menu-item" data-id="${item.id}">
                    <div class="menu-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="menu-item-info">
                        <h4 class="menu-item-name">${item.name}</h4>
                        <p class="menu-item-desc">${item.description}</p>
                        <div class="menu-item-actions">
                            <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                            <button class="add-to-cart" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>
    `

  menuItemsContainer.appendChild(menuCategory)

  // Add event listeners to menu items
  const menuItemElements = menuItemsContainer.querySelectorAll(".menu-item")
  menuItemElements.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      const itemId = menuItem.dataset.id
      displayItemDetails(itemId)
    })
  })

  // Add event listeners to add to cart buttons
  const addToCartButtons = menuItemsContainer.querySelectorAll(".add-to-cart")
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      const itemId = button.dataset.id
      const item = menuItems.find((item) => item.id === itemId)
      if (item) {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          restaurantId: item.restaurantId,
          restaurantName: restaurant.name,
        })
      }
    })
  })
}

// Display item details in a modal
function displayItemDetails(itemId) {
  const item = menuItems.find((item) => item.id === itemId)
  if (!item) return

  const itemModal = document.getElementById("item-modal")
  const modalItemDetails = document.getElementById("modal-item-details")

  modalItemDetails.innerHTML = `
        <div class="item-modal-content">
            <div class="item-modal-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-modal-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="item-modal-price">$${item.price.toFixed(2)}</p>
                <button class="btn btn-primary add-to-cart-modal" data-id="${item.id}">Add to Cart</button>
            </div>
        </div>
    `

  // Add event listener to add to cart button
  const addToCartButton = modalItemDetails.querySelector(".add-to-cart-modal")
  addToCartButton.addEventListener("click", () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: item.restaurantId,
      restaurantName: restaurant.name,
    })
    closeModal(itemModal)
  })

  openModal(itemModal)
}

// Setup event listeners
function setupEventListeners() {
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

// Add item to cart
function addToCart(item) {
  let cartItems = []
  const savedCart = localStorage.getItem("foodhub-cart")
  if (savedCart) {
    cartItems = JSON.parse(savedCart)
  }

  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.push({
      ...item,
      quantity: 1,
    })
  }

  localStorage.setItem("foodhub-cart", JSON.stringify(cartItems))
  updateCartCount()

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
