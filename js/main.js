// Update Nigeria Time
function updateNigeriaTime() {
    const options = {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    const nigeriaTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
    // Update all elements with nigeria-time
    const timeElements = document.querySelectorAll('#nigeria-time');
    timeElements.forEach(element => {
        element.textContent = 'NGR ' + nigeriaTime;
    });
}

// Update time immediately and then every second
updateNigeriaTime();
setInterval(updateNigeriaTime, 1000);

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-cta');

// Toggle menu on hamburger click
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
function handleNavbarShadow() {
    if (!navbar) return;
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Run on load and on scroll
handleNavbarShadow();
window.addEventListener('scroll', handleNavbarShadow);

// Testimonial Switcher Logic
const testimonials = [
    {
        text: '"DesignedByComfort didn\'t just build a website; they architected a digital experience that flawlessly captures our brand\'s soul. Their strategic depth and technical precision are unparalleled."',
        name: 'Sarah Jenkins',
        title: 'CEO, Esoterra'
    },
    {
        text: '"Their methodology for HHC allowed us to digitize centuries of history with modern elegance. The team\'s ability to blend heritage with cutting-edge design is truly exceptional."',
        name: 'Marcus Chen',
        title: 'Creative Director, HHC'
    },
    {
        text: '"Vent! has found its true identity through this partnership. They understood our need for freedom and depth, creating a brand that resonates with our listeners on a visceral level."',
        name: 'David Okoro',
        title: 'Founder, Vent!'
    }
];

let testimonialInterval;
let currentTestimonialIndex = 0;

function startTestimonialAutoSlide() {
    stopTestimonialAutoSlide();
    testimonialInterval = setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        switchTestimonial(currentTestimonialIndex);
    }, 5000);
}

function stopTestimonialAutoSlide() {
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
    }
}

function switchTestimonial(index) {
    const textElement = document.getElementById('testimonial-text');
    const nameElement = document.getElementById('testimonial-name');
    const titleElement = document.getElementById('testimonial-title');
    const tabs = document.querySelectorAll('.testimonial-tab');

    if (!textElement || !nameElement || !titleElement) return;

    // Update current index for auto-slide
    currentTestimonialIndex = index;

    // Add fade out effect
    [textElement, nameElement, titleElement].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
    });

    setTimeout(() => {
        // Update content
        textElement.textContent = testimonials[index].text;
        nameElement.textContent = testimonials[index].name;
        titleElement.textContent = testimonials[index].title;

        // Update active classes
        tabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Fade in
        [textElement, nameElement, titleElement].forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 400);

    // Restart auto-slide after manual interaction
    startTestimonialAutoSlide();
}

// Initial start
if (document.getElementById('testimonial-text')) {
    startTestimonialAutoSlide();
}

// Scroll Reveal Animation Logic
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, we can stop observing this element
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15, // Reveal when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Slight offset to make it feel more natural
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});
