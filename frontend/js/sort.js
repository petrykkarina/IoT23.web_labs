(function () {
  const sortBtn = document.querySelector('.hero__sort--btn');

  if (sortBtn) {
    sortBtn.addEventListener('click', async () => {
      if (
        typeof API_URL === 'undefined' ||
        typeof updateCards === 'undefined'
      ) {
        console.error('sort.js: Global "API_URL" or "updateCards" not found.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}?sort=visitors`);
        if (!response.ok) {
          throw new Error('Failed to fetch sorted hotels');
        }
        hotels = await response.json();
        updateCards();
      } catch (error) {
        console.error('Error sorting hotels:', error);
      }
    });
  }
})();