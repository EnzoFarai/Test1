// Function to load header, footer, and modals dynamically
function loadHeaderFooterAndModals() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('header-placeholder');
            if (headerContainer) {
                headerContainer.innerHTML = data;
                initializeHeader();
            }
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById('footer-placeholder');
            if (footerContainer) {
                footerContainer.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
    
    // Load modals (consultation + application)
    Promise.all([
        fetch('consultation-modal.html').then(response => response.text()),
        fetch('application-modal.html').then(response => response.text())
    ])
    .then(([consultationModal, applicationModal]) => {
        const modalsContainer = document.getElementById('modals-placeholder');
        if (modalsContainer) {
            modalsContainer.innerHTML = consultationModal + applicationModal;
            // Re-initialize modals after they're loaded (if needed)
            if (typeof initializeModals === 'function') {
                setTimeout(initializeModals, 100);
            }
        }
    })
    .catch(error => console.error('Error loading modals:', error));
}

// Initialize header functionality
function initializeHeader() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu when a link is clicked
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Load header, footer, and modals when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeaderFooterAndModals);
