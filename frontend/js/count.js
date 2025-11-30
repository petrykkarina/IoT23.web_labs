(function() {
    const countBtn = document.querySelector('.hero__count--btn');
    const totalRoomsElem = document.getElementById('total-expenses');

    if (countBtn) {
        countBtn.addEventListener('click', () => {
            if (typeof hotels === 'undefined') {
                console.error('count.js: Глобальна "hotels" не знайдена.');
                totalRoomsElem.textContent = 'Error';
                return;
            }

            const totalRooms = hotels.reduce((sum, hotel) => {
                return sum + Number(hotel.rooms); 
            }, 0);
    
            totalRoomsElem.textContent = totalRooms;
        });
    }
})();