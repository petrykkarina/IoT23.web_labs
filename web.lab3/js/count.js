document.addEventListener('DOMContentLoaded', () => {
    const countBtn = document.querySelector('.hero__count--btn');
    const totalRoomsElem = document.getElementById('total-expenses');
    const hotelCardsContainer = document.querySelector('.hero__cards__wrapper');

    countBtn.addEventListener('click', () => {
        const hotelCards = Array.from(hotelCardsContainer.querySelectorAll('.hero_cards'));
        
        const totalRooms = hotelCards.reduce((sum, card) => {
            const rooms = parseInt(card.querySelector('.hero__rooms span').innerText);
            return sum + rooms;
        }, 0);

        totalRoomsElem.textContent = totalRooms;
    });
});