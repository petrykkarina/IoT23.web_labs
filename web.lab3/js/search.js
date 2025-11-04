const searchForm = document.getElementById('searchForm');
const searchBtn = document.querySelector('.header__form--btns');
const searchInput = document.querySelector('.header__search');
const hotelCardsContainer = document.querySelector('.hero__cards__wrapper');
const hotelCards = Array.from(document.querySelectorAll('.hero_cards'));

function filterHotels() {
    const query = searchInput.value.trim().toLowerCase();

    const filteredCards = hotelCards.filter(card => {
        const name = card.querySelector('.hero__contetnt--title').innerText.toLowerCase();
        return name.includes(query);
    });

    hotelCardsContainer.innerHTML = '';
    filteredCards.forEach(card => hotelCardsContainer.appendChild(card));
}

searchBtn.addEventListener('click', filterHotels);

searchForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    filterHotels();
});