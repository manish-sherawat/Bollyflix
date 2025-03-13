document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const movieCards = document.querySelectorAll('.movie-card');
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const header = document.querySelector('.header');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        toggleButton.querySelector('.theme-icon').textContent = '☀️';
        toggleButton.querySelector('.theme-text').textContent = 'Light';
    } else {
        toggleButton.querySelector('.theme-icon').textContent = '🌙';
        toggleButton.querySelector('.theme-text').textContent = 'Dark';
    }

    // Search functionality with animation
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        movieCards.forEach((card, index) => {
            const title = card.querySelector('.movie-title').textContent.toLowerCase();
            if (title.includes(query)) {
                // Show card with animation
                card.style.display = 'block';
                card.classList.remove('hidden');
                card.classList.add('appear');
                // Stagger the animation based on index
                card.style.animationDelay = `${index * 0.05}s`;
            } else {
                // Hide card with animation
                card.classList.remove('appear');
                card.classList.add('hidden');
                // Remove display after animation ends to prevent interaction
                setTimeout(() => {
                    if (!card.classList.contains('appear')) {
                        card.style.display = 'none';
                    }
                }, 300); // Matches animation duration
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 0);
    });

    // Clock functionality
    function updateClock() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: false 
        };
        document.getElementById('clock').innerText = now.toLocaleString('en-US', options);
    }

    setInterval(updateClock, 1000);
    updateClock();

    // Theme toggle functionality with ripple effect
    toggleButton.addEventListener('click', (e) => {
        body.classList.toggle('light-mode');
        
        const isLightMode = body.classList.contains('light-mode');
        toggleButton.querySelector('.theme-icon').textContent = isLightMode ? '☀️' : '🌙';
        toggleButton.querySelector('.theme-text').textContent = isLightMode ? 'Light' : 'Dark';
        
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');

        const ripple = document.createElement('span');
        const rect = toggleButton.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.classList.add('ripple');
        
        const existingRipple = toggleButton.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        toggleButton.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});