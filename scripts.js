// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Movie database
    const movieDatabase = [];

    // Collect all movie data from the DOM
    document.querySelectorAll('.movie-card').forEach(card => {
        try {
            const titleElement = card.querySelector('.movie-title') || card.querySelector('.movie-info p:first-child');
            const title = titleElement ? titleElement.textContent : '';
            const dataTitle = card.getAttribute('data-title') || '';
            const dataYear = card.getAttribute('data-year') || '';
            const dataLanguage = card.getAttribute('data-language') || '';
            
            const posterImg = card.querySelector('.movie-poster img');
            const poster = posterImg ? posterImg.getAttribute('src') : '';
            
            const infoElements = card.querySelectorAll('.movie-info p');
            const info = infoElements ? Array.from(infoElements).map(p => p.textContent) : [];

            movieDatabase.push({
                element: card,
                title: title,
                searchTitle: dataTitle,
                year: dataYear,
                language: dataLanguage,
                poster: poster,
                info: info
            });
        } catch (error) {
            console.error('Error processing movie card:', error);
        }
    });

    // Close alert banner
    const alertBannerClose = document.querySelector('.alert-banner .close');
    if (alertBannerClose) {
        alertBannerClose.addEventListener('click', function () {
            const alertBanner = document.querySelector('.alert-banner');
            if (alertBanner) {
                alertBanner.style.display = 'none';
            }
        });
    }

    // Search functionality elements
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const allMoviesContainer = document.getElementById('all-movies');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsGrid = document.getElementById('search-results-grid');
    const noResultsMessage = document.getElementById('no-results');
    const searchTermDisplay = document.getElementById('search-term-display');

    // Only setup search if all required elements exist
    if (searchButton && searchInput && allMoviesContainer && searchResultsContainer && 
        searchResultsGrid && noResultsMessage && searchTermDisplay) {
        
        searchButton.addEventListener('click', function () {
            performSearch();
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        function performSearch() {
            const searchTerm = searchInput.value.trim().toLowerCase();

            if (!searchTerm) {
                // Reset to show all movies if search is empty
                showAllMovies();
                return;
            }

            // Display the search term
            if (searchTermDisplay) {
                searchTermDisplay.textContent = '"' + searchTerm + '"';
            }

            // Filter movies based on search term
            const results = movieDatabase.filter(movie => {
                return (movie.searchTitle && movie.searchTitle.toLowerCase().includes(searchTerm)) ||
                    (movie.year && movie.year.toLowerCase().includes(searchTerm)) ||
                    (movie.language && movie.language.toLowerCase().includes(searchTerm));
            });

            // Clear previous search results
            if (searchResultsGrid) {
                searchResultsGrid.innerHTML = '';
            }

            // Show search results or no results message
            if (results.length > 0) {
                results.forEach(movie => {
                    if (searchResultsGrid) {
                        const clonedCard = movie.element.cloneNode(true);
                        searchResultsGrid.appendChild(clonedCard);
                    }
                });

                if (noResultsMessage) noResultsMessage.classList.add('hidden');
                if (searchResultsGrid) searchResultsGrid.classList.remove('hidden');
            } else {
                if (noResultsMessage) noResultsMessage.classList.remove('hidden');
                if (searchResultsGrid) searchResultsGrid.classList.add('hidden');
            }

            // Show search results container and hide all movies
            if (searchResultsContainer) {
                searchResultsContainer.style.display = 'block';
                searchResultsContainer.classList.remove('hidden');
            }
            if (allMoviesContainer) {
                allMoviesContainer.style.display = 'none';
                allMoviesContainer.classList.add('hidden');
            }
        }

        function showAllMovies() {
            // Hide search results container and show all movies
            if (searchResultsContainer) {
                searchResultsContainer.style.display = 'none';
                searchResultsContainer.classList.add('hidden');
            }
            if (allMoviesContainer) {
                allMoviesContainer.style.display = 'grid';
                allMoviesContainer.classList.remove('hidden');
            }
            if (searchInput) searchInput.value = '';
        }

        // Reset search when clicking on logo or home
        const logo = document.querySelector('.logo');
        const homeLink = document.querySelector('.nav-links a');
        
        if (logo) logo.addEventListener('click', showAllMovies);
        if (homeLink) homeLink.addEventListener('click', showAllMovies);

        // Pagination functionality
        const paginationButtons = document.querySelectorAll('.pagination button');
        if (paginationButtons.length > 0) {
            paginationButtons.forEach(button => {
                button.addEventListener('click', function () {
                    if (this.textContent !== 'Next' && this.textContent !== '...') {
                        paginationButtons.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        showAllMovies();
                    }
                });
            });
        }

        // Category buttons functionality
        const categoryButtons = document.querySelectorAll('.category-button');
        if (categoryButtons.length > 0 && searchInput) {
            categoryButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const category = this.textContent.toLowerCase();
                    searchInput.value = category;
                    performSearch();
                });
            });
        }

        // Secondary nav buttons functionality
        const secondaryNavLinks = document.querySelectorAll('.secondary-nav a');
        if (secondaryNavLinks.length > 0 && searchInput) {
            secondaryNavLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const category = this.textContent.toLowerCase();
                    searchInput.value = category;
                    performSearch();
                });
            });
        }
    }
});
