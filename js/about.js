// Load about page specific data
async function loadAboutPage() {
  try {
    const [contentRes, teamRes] = await Promise.all([fetch("../data/content.json"), fetch("../data/team.json")])

    const content = await contentRes.json()
    const team = await teamRes.json()

    // Render mission & vision
    const mvContainer = document.getElementById("mission-vision-container")
    if (mvContainer) {
      mvContainer.innerHTML = `
        <div class="mv-card">
          <div class="mv-icon">
            <i class="fas fa-bullseye"></i>
          </div>
          <h3>Our Mission</h3>
          <p>${content.company.mission}</p>
        </div>
        <div class="mv-card">
          <div class="mv-icon">
            <i class="fas fa-eye"></i>
          </div>
          <h3>Our Vision</h3>
          <p>${content.company.vision}</p>
        </div>
      `
    }

    // Render story
    const storyContainer = document.getElementById("story-container")
    if (storyContainer) {
      storyContainer.innerHTML = `
        <h3>Our Story</h3>
        <p>${content.company.story}</p>
      `
    }

    // Render values
    const valuesContainer = document.getElementById("values-container")
    if (valuesContainer && content.values) {
      valuesContainer.innerHTML = content.values
        .map(
          (value) => `
        <div class="value-item">
          <div class="value-icon">
            <i class="${value.icon}"></i>
          </div>
          <div class="value-content">
            <h4>${value.title}</h4>
            <p>${value.description}</p>
          </div>
        </div>
      `,
        )
        .join("")
    }

    // Render leadership message
    const leadershipContainer = document.getElementById("leadership-container")
    if (leadershipContainer) {
      leadershipContainer.innerHTML = `
        <h3>Message from the Director</h3>
        <p>"${content.leadership.directorMessage}"</p>
        <div class="director-name">- ${content.leadership.directorName}, ${content.leadership.directorTitle}</div>
      `
    }

    // Render executives
    const executivesContainer = document.getElementById("executives-container")
    if (executivesContainer && team.executives) {
      executivesContainer.innerHTML = team.executives
        .map(
          (exec) => `
        <div class="team-member">
          <div class="member-image">
            <img src="../${exec.image}" alt="${exec.name}">
          </div>
          <div class="member-info">
            <div class="member-name">${exec.name}</div>
            <div class="member-title">${exec.title}</div>
            <div class="member-contact">
              <div class="contact-links">
                <a href="https://wa.me/${exec.whatsapp}" target="_blank">${exec.phone}</a>
                <a href="mailto:${exec.email}">${exec.email}</a>
              </div>
            </div>
          </div>
        </div>
      `,
        )
        .join("")
    }

    // Render directors
    const directorsContainer = document.getElementById("directors-container")
    if (directorsContainer && team.directors) {
      directorsContainer.innerHTML = team.directors
        .map(
          (director) => `
        <div class="team-member">
          <div class="member-image">
            <img src="../${director.image}" alt="${director.name}">
          </div>
          <div class="member-info">
            <div class="member-name">${director.name}</div>
            <div class="member-title">${director.title}</div>
            <div class="member-contact">
              <div class="contact-links">
                <a href="https://wa.me/${director.whatsapp}" target="_blank">${director.phone}</a>
                <a href="mailto:${director.email}">${director.email}</a>
              </div>
            </div>
          </div>
        </div>
      `,
        )
        .join("")
    }
  } catch (error) {
    console.error("Error loading about page:", error)
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", loadAboutPage)

// Modal functionality (from main app.js)
const modals = {
  consultation: document.getElementById("consultation-modal"),
}

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", (e) => {
    const modalName = e.currentTarget.dataset.modal
    if (modals[modalName]) {
      modals[modalName].classList.add("active")
    }
  })
})

document.querySelectorAll(".close-modal").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const modalName = e.currentTarget.dataset.modal
    if (modals[modalName]) {
      modals[modalName].classList.remove("active")
    }
  })
})

Object.values(modals).forEach((modal) => {
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })
})

// Mobile menu
const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
const navMenu = document.getElementById("nav-menu")

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })
}

// Form submission
const consultationForm = document.getElementById("consultation-form")
if (consultationForm) {
  consultationForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Thank you! We will contact you soon.")
    consultationForm.reset()
    modals.consultation.classList.remove("active")
  })
}
