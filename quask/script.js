// Initialize Lucide icons
lucide.createIcons();

// Elements
const header = document.querySelector('header');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenu.classList.contains('active') ? 'x' : 'menu';
        menuToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
        lucide.createIcons();
    });
}

// Smooth scroll and active state management
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const isHome = document.body.id === 'home-page';
        const target = this.getAttribute('href');
        
        // If we are on the home page and clicking a hash link
        if (isHome && target.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(target);
            if (element) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({
                    top: element.offsetTop - headerHeight + 5,
                    behavior: 'smooth'
                });
            }
        }
        
        // Close mobile menu on click
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuToggle.innerHTML = `<i data-lucide="menu"></i>`;
            lucide.createIcons();
        }
    });
});