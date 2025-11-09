// Function to initialize modals
function initializeModals() {
    // Initialize country code dropdowns
    initializeCountryCodeDropdowns();
    
    // Add event listeners to consultation buttons
    const consultationButtons = document.querySelectorAll('.consultation-btn, .get-started-btn');
    consultationButtons.forEach(button => {
        // Remove any existing listeners to prevent duplicates
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-select and add listeners to consultation buttons
    document.querySelectorAll('.consultation-btn, .get-started-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openConsultationModal();
        });
    });
    
    // Add event listeners to application buttons
    const applicationButtons = document.querySelectorAll('.apply-now-btn');
    applicationButtons.forEach(button => {
        // Remove any existing listeners to prevent duplicates
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-select and add listeners to application buttons
    document.querySelectorAll('.apply-now-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openApplicationModal();
        });
    });
    
    // Add event listeners to close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Add event listeners to forms
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleConsultationForm);
    }
    
    const applicationForm = document.getElementById('application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', handleApplicationForm);
    }
}

// Country data for phone codes
const countries = [
    { name: "Afghanistan", code: "+93" },
    { name: "Albania", code: "+355" },
    { name: "Algeria", code: "+213" },
    { name: "Andorra", code: "+376" },
    { name: "Angola", code: "+244" },
    { name: "Argentina", code: "+54" },
    { name: "Armenia", code: "+374" },
    { name: "Australia", code: "+61" },
    { name: "Austria", code: "+43" },
    { name: "Azerbaijan", code: "+994" },
    { name: "Bahrain", code: "+973" },
    { name: "Bangladesh", code: "+880" },
    { name: "Belarus", code: "+375" },
    { name: "Belgium", code: "+32" },
    { name: "Brazil", code: "+55" },
    { name: "Bulgaria", code: "+359" },
    { name: "Cambodia", code: "+855" },
    { name: "Canada", code: "+1" },
    { name: "Chile", code: "+56" },
    { name: "China", code: "+86" },
    { name: "Colombia", code: "+57" },
    { name: "Croatia", code: "+385" },
    { name: "Czech Republic", code: "+420" },
    { name: "Denmark", code: "+45" },
    { name: "Egypt", code: "+20" },
    { name: "Finland", code: "+358" },
    { name: "France", code: "+33" },
    { name: "Germany", code: "+49" },
    { name: "Ghana", code: "+233" },
    { name: "Greece", code: "+30" },
    { name: "Hong Kong", code: "+852" },
    { name: "Hungary", code: "+36" },
    { name: "India", code: "+91" },
    { name: "Indonesia", code: "+62" },
    { name: "Iran", code: "+98" },
    { name: "Iraq", code: "+964" },
    { name: "Ireland", code: "+353" },
    { name: "Israel", code: "+972" },
    { name: "Italy", code: "+39" },
    { name: "Japan", code: "+81" },
    { name: "Jordan", code: "+962" },
    { name: "Kazakhstan", code: "+7" },
    { name: "Kenya", code: "+254" },
    { name: "Kuwait", code: "+965" },
    { name: "Lebanon", code: "+961" },
    { name: "Malaysia", code: "+60" },
    { name: "Mexico", code: "+52" },
    { name: "Morocco", code: "+212" },
    { name: "Netherlands", code: "+31" },
    { name: "New Zealand", code: "+64" },
    { name: "Nigeria", code: "+234" },
    { name: "Norway", code: "+47" },
    { name: "Oman", code: "+968" },
    { name: "Pakistan", code: "+92" },
    { name: "Philippines", code: "+63" },
    { name: "Poland", code: "+48" },
    { name: "Portugal", code: "+351" },
    { name: "Qatar", code: "+974" },
    { name: "Romania", code: "+40" },
    { name: "Russia", code: "+7" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "Singapore", code: "+65" },
    { name: "South Africa", code: "+27" },
    { name: "South Korea", code: "+82" },
    { name: "Spain", code: "+34" },
    { name: "Sri Lanka", code: "+94" },
    { name: "Sweden", code: "+46" },
    { name: "Switzerland", code: "+41" },
    { name: "Taiwan", code: "+886" },
    { name: "Thailand", code: "+66" },
    { name: "Turkey", code: "+90" },
    { name: "Ukraine", code: "+380" },
    { name: "United Arab Emirates", code: "+971" },
    { name: "United Kingdom", code: "+44" },
    { name: "United States", code: "+1" },
    { name: "Vietnam", code: "+84" }
];

// Sort countries alphabetically by name
countries.sort((a, b) => a.name.localeCompare(b.name));

// Function to populate country dropdown
function populateCountryDropdown(dropdownElement, filter = "") {
    if (!dropdownElement) return;
    
    dropdownElement.innerHTML = "";
    const filteredCountries = countries.filter(country => 
        country.name.toLowerCase().includes(filter.toLowerCase()) || 
        country.code.includes(filter)
    );
    
    filteredCountries.forEach(country => {
        const option = document.createElement('div');
        option.className = 'country-code-option';
        option.textContent = `${country.name} (${country.code})`;
        option.addEventListener('click', () => {
            // Find the corresponding input field
            const inputId = dropdownElement.id.replace('-dropdown', '');
            const inputElement = document.getElementById(inputId);
            if (inputElement) {
                inputElement.value = country.code;
                dropdownElement.classList.remove('active');
            }
        });
        dropdownElement.appendChild(option);
    });
}

// Function to initialize country code dropdowns
function initializeCountryCodeDropdowns() {
    const countryCodeInputs = document.querySelectorAll('input[id$="country-code"]');
    
    countryCodeInputs.forEach(input => {
        const dropdownId = input.id + '-dropdown';
        const dropdown = document.getElementById(dropdownId);
        
        if (dropdown) {
            // Initial population
            populateCountryDropdown(dropdown);
            
            // Event listeners
            input.addEventListener('focus', () => {
                dropdown.classList.add('active');
            });
            
            input.addEventListener('input', (e) => {
                populateCountryDropdown(dropdown, e.target.value);
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
}

// Function to open consultation modal
function openConsultationModal() {
    const modal = document.getElementById('consultation-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        console.error('Consultation modal not found');
    }
}

// Function to open application modal
function openApplicationModal() {
    const modal = document.getElementById('application-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        console.error('Application modal not found');
    }
}

// Function to close any modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Function to handle consultation form submission
function handleConsultationForm(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('consultation-full-name').value;
    const email = document.getElementById('consultation-email').value;
    const countryCode = document.getElementById('consultation-country-code').value;
    const phone = document.getElementById('consultation-phone').value;
    const countryResidence = document.getElementById('consultation-country-residence').value;
    const nationality = document.getElementById('consultation-nationality').value;
    const course = document.getElementById('consultation-course').value;
    const studyDestination = document.getElementById('consultation-study-destination').value;
    const studyLevel = document.getElementById('consultation-study-level').value;
    const studyYear = document.getElementById('consultation-study-year').value;
    const intakeMonth = document.getElementById('consultation-intake-month').value;
    
    // Create WhatsApp message with bold formatting
    const message = `Subject: Booking Consultation\n\n*Full name:* ${fullName}\n*Email:* ${email}\n*Mobile Number:* ${countryCode} ${phone}\n*Country of Residence:* ${countryResidence}\n*Nationality:* ${nationality}\n*Desired Course/Program:* ${course}\n*Preferred study destination:* ${studyDestination}\n*Level of study:* ${studyLevel}\n*Preferred study year:* ${studyYear}\n*Preferred intake month:* ${intakeMonth}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number (without +)
    const whatsappNumber = "918699750645";
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Close modal first
    closeModal('consultation-modal');
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    // Optional: Show success message
    alert('Redirecting to WhatsApp to book your consultation...');
}

// Function to handle application form submission
function handleApplicationForm(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('application-full-name').value;
    const email = document.getElementById('application-email').value;
    const countryCode = document.getElementById('application-country-code').value;
    const phone = document.getElementById('application-phone').value;
    const countryResidence = document.getElementById('application-country-residence').value;
    const nationality = document.getElementById('application-nationality').value;
    const course = document.getElementById('application-course').value;
    const studyDestination = document.getElementById('application-study-destination').value;
    const studyLevel = document.getElementById('application-study-level').value;
    const studyYear = document.getElementById('application-study-year').value;
    const intakeMonth = document.getElementById('application-intake-month').value;
    
    // Create WhatsApp message with bold formatting
    const message = `Subject: Application\n\n*Full name:* ${fullName}\n*Email:* ${email}\n*Mobile Number:* ${countryCode} ${phone}\n*Country of Residence:* ${countryResidence}\n*Nationality:* ${nationality}\n*Desired Course/Program:* ${course}\n*Preferred study destination:* ${studyDestination}\n*Level of study:* ${studyLevel}\n*Preferred study year:* ${studyYear}\n*Preferred intake month:* ${intakeMonth}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number (without +)
    const whatsappNumber = "918699750645";
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Close modal first
    closeModal('application-modal');
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    // Optional: Show success message
    alert('Redirecting to WhatsApp to complete your application...');
}

// Initialize modals when DOM is ready (fallback)
document.addEventListener('DOMContentLoaded', function() {
    // If modals are already in the HTML (not dynamically loaded), initialize them
    if (document.getElementById('consultation-modal') || document.getElementById('application-modal')) {
        initializeModals();
    }
});
