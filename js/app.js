// Load and render data from JSON files

// Modal functionality
const modals = {
  consultation: document.getElementById("consultation-modal"),
  application: document.getElementById("application-modal"),
}

// Modal toggle
document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", (e) => {
    const modalName = e.currentTarget.dataset.modal
    if (modals[modalName]) {
      modals[modalName].classList.add("active")
    }
  })
})

// Close modal
document.querySelectorAll(".close-modal").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const modalName = e.currentTarget.dataset.modal
    if (modals[modalName]) {
      modals[modalName].classList.remove("active")
    }
  })
})

// Close modal on overlay click
Object.values(modals).forEach((modal) => {
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })
})

// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
const navMenu = document.getElementById("nav-menu")

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })
}

// Render highlights from content.json
async function renderHighlights() {
  try {
    const response = await fetch("data/content.json")
    const data = await response.json()
    const container = document.getElementById("highlights-container")

    if (container && data.highlights) {
      container.innerHTML = data.highlights
        .map(
          (highlight) => `
        <div class="highlight-card">
          <div class="highlight-icon">
            <i class="${highlight.icon}"></i>
          </div>
          <h3>${highlight.title}</h3>
          <p>${highlight.description}</p>
        </div>
      `,
        )
        .join("")
    }
  } catch (error) {
    console.error("Error loading highlights:", error)
  }
}

// Render services preview from services.json
async function renderServicesPreview() {
  try {
    const response = await fetch("data/services.json")
    const data = await response.json()
    const container = document.getElementById("services-preview-container")

    if (container && data.services) {
      const first4Services = data.services.slice(0, 4)
      container.innerHTML = first4Services
        .map(
          (service) => `
        <div class="service-item">
          <div class="service-icon">
            <i class="${service.icon}"></i>
          </div>
          <div class="service-content">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
          </div>
        </div>
      `,
        )
        .join("")
    }
  } catch (error) {
    console.error("Error loading services:", error)
  }
}

// Render destinations preview from destinations.json
async function renderDestinationsPreview() {
  try {
    const response = await fetch("data/destinations.json")
    const data = await response.json()
    const container = document.getElementById("destinations-preview-container")

    if (container && data.destinations) {
      const first4Destinations = data.destinations.slice(0, 4)
      container.innerHTML = first4Destinations
        .map(
          (dest) => `
        <div class="destination-card">
          <div class="destination-image">
            <img src="${dest.image}" alt="${dest.name}">
          </div>
          <div class="destination-content">
            <h3>${dest.name}</h3>
            <p>${dest.advantages[0]}</p>
          </div>
        </div>
      `,
        )
        .join("")
    }
  } catch (error) {
    console.error("Error loading destinations:", error)
  }
}

// Render blog preview from blog.json
async function renderBlogPreview() {
  try {
    const response = await fetch("data/blog.json")
    const data = await response.json()
    const container = document.getElementById("blog-carousel-container")

    if (container && data.posts) {
      container.innerHTML = data.posts
        .map(
          (post) => `
        <div class="blog-card">
          <div class="blog-image">
            <img src="${post.image}" alt="${post.title}">
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <div class="blog-date">${new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
          <a href="pages/blog.html#${post.slug}" class="btn btn-primary" style="align-self: flex-start;">Read More</a>
        </div>
      `,
        )
        .join("")
    }
  } catch (error) {
    console.error("Error loading blog posts:", error)
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderHighlights()
  renderServicesPreview()
  renderDestinationsPreview()
  renderBlogPreview()
})

// Form submission handlers
const consultationForm = document.getElementById("consultation-form")
const applicationForm = document.getElementById("application-form")

if (consultationForm) {
  consultationForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Thank you for your interest! We will contact you soon.")
    consultationForm.reset()
    modals.consultation.classList.remove("active")
  })
}

if (applicationForm) {
  applicationForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Application submitted! We will review and contact you soon.")
    applicationForm.reset()
    modals.application.classList.remove("active")
  })
}
