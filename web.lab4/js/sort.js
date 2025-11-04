(function() {
  const STORAGE_KEY = 'keyroom_hotels_v1';
  const sortBtn = document.querySelector('.hero__sort--btn');
  const wrapper = document.querySelector('.hero__cards__wrapper');

  let hotels = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

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

    card.querySelector('.edit-btn').addEventListener('click', () => {
      localStorage.setItem('hotel_to_edit', JSON.stringify(hotel));
      window.location.href = 'edit-page.html';
    });

    card.querySelector('.remove-btn').addEventListener('click', () => {
      hotels = hotels.filter(h => h.id !== hotel.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels));
      updateDisplay();
    });

    wrapper.appendChild(card);
  }

  function updateDisplay() {
    wrapper.innerHTML = '';
    hotels.forEach(renderHotelCard);
  }

  sortBtn.addEventListener('click', () => {
    hotels.sort((a, b) => parseInt(b.visitors) - parseInt(a.visitors));
    updateDisplay();
  });
})();
