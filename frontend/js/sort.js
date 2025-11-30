(function() {
    const sortBtn = document.querySelector('.hero__sort--btn');

    if (sortBtn) {
        sortBtn.addEventListener('click', () => {
            if (typeof hotels === 'undefined' || typeof updateCards === 'undefined') {
                console.error('sort.js: Глобальні "hotels" або "updateCards" не знайдені.');
                return;
            }

            hotels.sort((a, b) => Number(b.visitors) - Number(a.visitors));
            
            updateCards(); 
        });
    }
})();