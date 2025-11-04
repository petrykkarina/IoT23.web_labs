(function() {
  const STORAGE_KEY = 'keyroom_hotels_v1';
  const searchBtn = document.querySelector('.header__form--btns');
  const clearBtn = document.querySelector('.header__form--btnc');
  const searchInput = document.querySelector('.header__search');
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
      searchHotels();
    });

    wrapper.appendChild(card);
  }

  function searchHotels() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === '') {
      wrapper.innerHTML = '';
      hotels.forEach(renderHotelCard);
      return;
    }

    const filtered = hotels.filter(h =>
      h.name.toLowerCase().includes(query)
    );

    wrapper.innerHTML = '';
    if (filtered.length > 0) {
      filtered.forEach(renderHotelCard);
    } else {
      wrapper.innerHTML = '<p class="no-results">No hotels found.</p>';
    }
  }

  searchBtn.addEventListener('click', searchHotels);
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchHotels();
  });

  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchHotels();
    }
  });
})();
