

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀';
    }

    // toggle theme
    themeToggleBtn.addEventListener('click', () => {
        if (root.getAttribute('data-theme') === 'dark') {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '🌙';
        } else {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '☀';
        }
    });

    // scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    // active nav link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, {
        threshold: 0.3
    });
    sections.forEach(section => sectionObserver.observe(section));

    
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksList = document.querySelector('.nav-links');
    if (navToggle && navLinksList) {
        navToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('open');
        });
        navLinksList.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                navLinksList.classList.remove('open');
            }
        });
    }
});