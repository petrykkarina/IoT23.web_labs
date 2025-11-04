document.addEventListener('DOMContentLoaded', () => {
    const sortBtn = document.querySelector('.hero__sort--btn');
    const hotelCardsContainer = document.querySelector('.hero__cards__wrapper');

    sortBtn.addEventListener('click', () => {
        const hotelCards = Array.from(hotelCardsContainer.querySelectorAll('.hero_cards'));

        hotelCards.sort((a, b) => {
            const visitorsA = parseInt(a.querySelector('.hero__visitors span').innerText);
            const visitorsB = parseInt(b.querySelector('.hero__visitors span').innerText);
            return visitorsB - visitorsA;
        });

        hotelCardsContainer.innerHTML = '';
        hotelCards.forEach(card => hotelCardsContainer.appendChild(card));

        sortBtn.classList.toggle('active');
    });
});