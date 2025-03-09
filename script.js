document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const movieCards = document.querySelectorAll('.movie-card');

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        movieCards.forEach(card => {
            const title = card.querySelector('.movie-title').textContent.toLowerCase();
            if (title.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Clock functionality
    function updateClock() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        document.getElementById('clock').innerText = now.toLocaleString('en-US', options);
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call to display clock immediately

});
