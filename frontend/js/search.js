(function() {
    const searchForm = document.getElementById('searchForm');
    const searchBtn = document.querySelector('.header__form--btns');
    const clearBtn = document.querySelector('.header__form--btnc');
    const searchInput = document.querySelector('.header__search');

    function performSearch() {
        if (typeof hotels === 'undefined' || typeof updateCards === 'undefined') {
            console.error('search.js: Глобальні "hotels" або "updateCards" не знайдені. Переконайся, що index.js завантажений першим.');
            return;
        }

        const query = searchInput.value.trim().toLowerCase();

        const filtered = hotels.filter(h =>
            h.name.toLowerCase().includes(query)
        );

        updateCards(filtered);
    }

    searchBtn.addEventListener('click', performSearch);

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        if (typeof hotels !== 'undefined') {
            updateCards(hotels); 
        }
    });

    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            performSearch();
        }
    });

    if (searchForm) {
        searchForm.addEventListener('submit', e => e.preventDefault());
    }
})();