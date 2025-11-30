const API_URL = 'http://localhost:3001/api/hotels'; 
let hotels = []; 
const wrapper = document.querySelector('.hero__cards__wrapper');

async function removeHotel(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            hotels = hotels.filter(h => h.id !== id);
            updateCards(hotels);
        } else {
            alert('Failed to delete hotel.');
        }
    } catch (error) {
        console.error('Error deleting hotel:', error);
    }
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
        window.location.href = `edit-page.html?id=${hotel.id}`;
    });

    card.querySelector('.remove-btn').addEventListener('click', () => {
        removeHotel(hotel.id);
    });
}

function updateCards(hotelsToRender = hotels) {
    wrapper.innerHTML = '';
    hotelsToRender.forEach(renderHotelCard);
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        hotels = await response.json(); 
        updateCards(); 
    } catch (error) {
        console.error('Error fetching hotels:', error);
        wrapper.innerHTML = '<p style="color: red;">Error loading hotels. Is the backend server running?</p>';
    }
});