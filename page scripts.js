// Toggle dropdown menus
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            e.preventDefault();
            // Add functionality for dropdown menus here
        });
    });

    // Responsive navigation toggle
    const mobileBreakpoint = 768;

    function handleResponsiveNav() {
        const nav = document.querySelector('.main-nav');
        if (window.innerWidth <= mobileBreakpoint) {
            nav.classList.add('mobile');
        } else {
            nav.classList.remove('mobile');
        }
    }

    window.addEventListener('resize', handleResponsiveNav);
    handleResponsiveNav();

    // Simulate download interaction
    const downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Download starting... Please wait.');
        });
    });

    // Language options selection
    const languageBtns = document.querySelectorAll('.language-btn');

    languageBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            languageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});