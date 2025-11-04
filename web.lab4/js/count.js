document.addEventListener('DOMContentLoaded', () => {
    const countBtn = document.querySelector('.hero__count--btn');
    const totalRoomsElem = document.getElementById('total-expenses');
    const hotelCardsContainer = document.querySelector('.hero__cards__wrapper');

    countBtn.addEventListener('click', () => {
        const hotelCards = hotelCardsContainer.querySelectorAll('.hero_cards');

        let totalRooms = 0;
        hotelCards.forEach(card => {
            const roomsElem = card.querySelector('.hero__rooms span');
            const rooms = roomsElem ? parseInt(roomsElem.innerText) : 0;
            totalRooms += rooms;
        });

        totalRoomsElem.textContent = totalRooms;
    });
});
