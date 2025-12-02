(function() {
    const countBtn = document.querySelector('.hero__count--btn');
    const totalRoomsElem = document.getElementById('total-expenses');

    if (countBtn) {
        countBtn.addEventListener('click', async () => {
            if (typeof API_URL === 'undefined') {
                console.error('count.js: Global "API_URL" not found.');
                totalRoomsElem.textContent = 'Error';
                return;
            }

            try {
                const response = await fetch(`${API_URL}/stats/total-rooms`);
                if (!response.ok) {
                    throw new Error('Failed to fetch total rooms');
                }
                const data = await response.json();
                totalRoomsElem.textContent = data.totalRooms;
            } catch (error) {
                console.error('Error fetching total rooms:', error);
                totalRoomsElem.textContent = 'Error';
            }
        });
    }
})();