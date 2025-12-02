(function () {
  const searchForm = document.getElementById('searchForm');
  const searchBtn = document.querySelector('.header__form--btns');
  const clearBtn = document.querySelector('.header__form--btnc');
  const searchInput = document.querySelector('.header__search');

  async function performSearch() {
    if (typeof API_URL === 'undefined' || typeof updateCards === 'undefined') {
      console.error('search.js: Global "API_URL" or "updateCards" not found.');
      return;
    }

    const query = searchInput.value.trim();

    try {
      const url = query
        ? `${API_URL}?search=${encodeURIComponent(query)}`
        : API_URL;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }

      hotels = await response.json();
      updateCards();
    } catch (error) {
      console.error('Error searching hotels:', error);
    }
  }

  async function clearSearch() {
    searchInput.value = '';

    if (typeof API_URL === 'undefined') {
      console.error('search.js: Global "API_URL" not found.');
      return;
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }

      hotels = await response.json();
      updateCards();
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  }

  searchBtn.addEventListener('click', performSearch);
  clearBtn.addEventListener('click', clearSearch);

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => e.preventDefault());
  }
})();
