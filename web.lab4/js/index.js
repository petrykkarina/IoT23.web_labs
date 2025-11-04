const STORAGE_KEY = 'keyroom_hotels_v1';
let hotels = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const wrapper = document.querySelector('.hero__cards__wrapper');

function saveHotels() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels));
}

function removeHotel(id) {
  hotels = hotels.filter(h => h.id !== id);
  saveHotels();
  updateCards();
}

function renderHotelCard(hotel) {
  const card = document.createElement('div');
  card.className = 'hero_cards';
  card.innerHTML = `
    <img src="${hotel.image || 'img/default.jpg'}" alt="Hotel photo">
    <h2 class="hero__contetnt--title">${hotel.name}</h2>
    <p class="hero_count-p">${hotel.description}</p>
    <p class="hero__rooms">Number of rooms: <span>${hotel.rooms}</span></p>
    <p class="hero__visitors">Number of visitors per year: <span>${hotel.visitors}</span></p>
    <div class="hero__content--btn">
      <button class="edit-btn" type="button">Edit</button>
      <button class="remove-btn" type="button">Remove</button>
    </div>
  `;
  wrapper.appendChild(card);

  card.querySelector('.edit-btn').addEventListener('click', () => {
    localStorage.setItem('hotel_to_edit', JSON.stringify(hotel));
    window.location.href = 'edit-page.html';
  });

  card.querySelector('.remove-btn').addEventListener('click', () => {
    removeHotel(hotel.id);
  });
}

function updateCards() {
  wrapper.innerHTML = '';
  hotels.forEach(renderHotelCard);
}

document.addEventListener('DOMContentLoaded', updateCards);
