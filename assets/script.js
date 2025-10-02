// --- DOM Elements ---
const pageLoader = document.getElementById('pageLoader');
const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.getElementById('scrollTop');
const cartBadge = document.getElementById('cartBadge');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const productCards = document.querySelectorAll('.product-card');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMsg');

let cartCount = 0;

// --- Event Handlers ---

// 1. Page Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        pageLoader.style.opacity = '0';
        pageLoader.addEventListener('transitionend', () => {
            pageLoader.style.display = 'none';
        }, {
            once: true
        });
    }, 500);
});

// 2. Navbar Scroll and Scroll-to-Top Visibility
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    updateActiveNavLink();
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 3. Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 4. Shopping Cart Logic
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        cartCount++;
        cartBadge.textContent = cartCount;

        const originalText = this.textContent;
        this.textContent = 'ADDED!';
        this.style.backgroundColor = '#ff0000';
        this.style.borderColor = '#ff0000';
        this.style.color = '#fff';

        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = 'transparent';
            this.style.borderColor = '#fff';
            this.style.color = '#fff';
        }, 1500);
    });
});

// 5. Product Card Parallax Effect
productCards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// 6. Newsletter Form Handler
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        newsletterMsg.textContent = "Thank you for subscribing!";
        newsletterMsg.style.color = "#ff0000";
        newsletterForm.reset();
        setTimeout(() => {
            newsletterMsg.textContent = "";
        }, 3000);
    });
}

// --- Utility Functions ---
function updateActiveNavLink() {
    let current = '';
    const scrollCheckPoint = window.scrollY + 200;
    sections.forEach(section => {
        if (scrollCheckPoint >= section.offsetTop && scrollCheckPoint < (section.offsetTop + section.clientHeight)) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}
updateActiveNavLink();