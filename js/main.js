// Blog Carousel Controls
function initializeBlogCarousel() {
    const blogCarousel = document.getElementById('blog-carousel');
    const blogWrapper = document.getElementById('blog-wrapper');
    const blogPrevBtn = document.getElementById('blog-prev-btn');
    const blogNextBtn = document.getElementById('blog-next-btn');
    
    if (!blogCarousel || !blogPrevBtn || !blogNextBtn) return;
    
    const blogCardWidth = 320; // 300px card + 20px gap
    let blogCurrentPosition = 0;
    const blogMaxPosition = (blogCarousel.children.length - 1) * blogCardWidth;
    
    function updateBlogCarousel() {
        blogCarousel.style.transform = `translateX(-${blogCurrentPosition}px)`;
    }
    
    blogNextBtn.addEventListener('click', function() {
        if (blogCurrentPosition < blogMaxPosition) {
            blogCurrentPosition += blogCardWidth;
        } else {
            blogCurrentPosition = 0;
        }
        updateBlogCarousel();
    });
    
    blogPrevBtn.addEventListener('click', function() {
        if (blogCurrentPosition > 0) {
            blogCurrentPosition -= blogCardWidth;
        } else {
            blogCurrentPosition = blogMaxPosition;
        }
        updateBlogCarousel();
    });
    
    // Auto-scroll for blog carousel
    let blogAutoScroll = setInterval(() => {
        blogNextBtn.click();
    }, 5000);
    
    // Pause auto-scroll on hover
    blogCarousel.addEventListener('mouseenter', () => {
        clearInterval(blogAutoScroll);
    });
    
    blogCarousel.addEventListener('mouseleave', () => {
        blogAutoScroll = setInterval(() => {
            blogNextBtn.click();
        }, 5000);
    });

    // Swipe functionality for blog carousel
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    blogWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - blogWrapper.offsetLeft;
        blogWrapper.style.cursor = 'grabbing';
    });

    blogWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.pageX - blogWrapper.offsetLeft;
    });

    blogWrapper.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        blogWrapper.style.cursor = 'grab';
        
        const diff = startX - currentX;
        
        // Minimum swipe distance to trigger navigation
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe left - go to next
                blogNextBtn.click();
            } else {
                // Swipe right - go to previous
                blogPrevBtn.click();
            }
        }
    });

    // Touch events for mobile devices
    blogWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    blogWrapper.addEventListener('touchmove', (e) => {
        if (!startX) return;
        currentX = e.touches[0].clientX;
    });

    blogWrapper.addEventListener('touchend', () => {
        if (!startX || !currentX) return;
        
        const diff = startX - currentX;
        
        // Minimum swipe distance to trigger navigation
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe left - go to next
                blogNextBtn.click();
            } else {
                // Swipe right - go to previous
                blogPrevBtn.click();
            }
        }
        
        startX = null;
        currentX = null;
    });
}

// Partnership form handling
function initializePartnershipForm() {
    const partnershipForm = document.getElementById('partnership-form');
    
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const organization = document.getElementById('organization').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const partnershipType = document.getElementById('partnership-type').value;
            const message = document.getElementById('message').value;
            
            // Format partnership type for display
            let partnershipTypeText = '';
            switch(partnershipType) {
                case 'educational-institution':
                    partnershipTypeText = 'Educational Institution';
                    break;
                case 'recruitment-agent':
                    partnershipTypeText = 'Recruitment Agent';
                    break;
                case 'corporate-partner':
                    partnershipTypeText = 'Corporate Partner';
                    break;
                case 'other':
                    partnershipTypeText = 'Other';
                    break;
                default:
                    partnershipTypeText = partnershipType;
            }
            
            // Create WhatsApp message with bold formatting
            const whatsappMessage = `Hello Milestone Global Education,

I'm interested in partnership opportunities. Here are my details:

*Full Name:* ${name}
*Organization:* ${organization}
*Email Address:* ${email}
*Phone Number:* ${phone}
*Partnership Interest:* ${partnershipTypeText}

*Message:*
${message}

I look forward to discussing potential collaboration.`;

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/918699750645?text=${encodedMessage}`;
            
            // Redirect to WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Reset form
            this.reset();
        });
    }
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogCarousel();
    initializePartnershipForm();
});
